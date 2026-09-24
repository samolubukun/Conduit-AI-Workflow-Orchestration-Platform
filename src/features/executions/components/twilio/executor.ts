import twilio from "twilio";
import Handlebars from "handlebars";
import { NonRetriableError } from "inngest";
import db from "@/server/db";
import { decrypt } from "@/lib/encryption";
import type { NodeExecutor } from "@/features/executions/types";

interface TwilioData {
  credentialId?: string;
  variableName?: string;
  channel?: "SMS" | "WHATSAPP";
  fromNumber?: string;
  toNumber?: string;
  body?: string;
}

export const twilioExecutor: NodeExecutor<TwilioData> = async ({
  data,
  nodeId,
  userId,
  context,
  step,
  publish,
}) => {
  if (!data.credentialId) {
    throw new NonRetriableError("Twilio node: Credential is required");
  }

  if (!data.fromNumber || !data.toNumber) {
    throw new NonRetriableError("Twilio node: Sender and Recipient numbers are required");
  }

  if (!data.body) {
    throw new NonRetriableError("Twilio node: Message body is required");
  }

  const credential = await step.run("get-twilio-credential", async () => {
    return db.query.credentials.findFirst({
      where: (creds, { and, eq }) =>
        and(eq(creds.id, data.credentialId!), eq(creds.userId, userId)),
    });
  });

  if (!credential) {
    throw new NonRetriableError("Twilio node: Credential not found");
  }

  // Value format: "ACCOUNT_SID:AUTH_TOKEN"
  const rawKey = decrypt(credential.value);
  const [accountSid, authToken] = rawKey.split(":");

  if (!accountSid || !authToken) {
    throw new NonRetriableError(
      "Twilio node: Invalid credential format. Expected AccountSID:AuthToken"
    );
  }

  const client = twilio(accountSid.trim(), authToken.trim());

  let rawFrom = Handlebars.compile(data.fromNumber)(context).trim();
  let rawTo = Handlebars.compile(data.toNumber)(context).trim();
  const body = Handlebars.compile(data.body)(context);
  const isWhatsApp = data.channel === "WHATSAPP";

  const from = isWhatsApp && !rawFrom.startsWith("whatsapp:") ? `whatsapp:${rawFrom}` : rawFrom;
  const to = isWhatsApp && !rawTo.startsWith("whatsapp:") ? `whatsapp:${rawTo}` : rawTo;

  const result = await step.run("twilio-send-message", async () => {
    const msg = await client.messages.create({
      from,
      to,
      body,
    });

    return {
      sid: msg.sid,
      status: msg.status,
      to: msg.to,
      from: msg.from,
      dateCreated: msg.dateCreated,
    };
  });

  return {
    ...context,
    [data.variableName || "twilio"]: result,
  };
};
