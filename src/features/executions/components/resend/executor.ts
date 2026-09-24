import { Resend } from "resend";
import Handlebars from "handlebars";
import { NonRetriableError } from "inngest";
import db from "@/server/db";
import { decrypt } from "@/lib/encryption";
import type { NodeExecutor } from "@/features/executions/types";

interface ResendData {
  credentialId?: string;
  variableName?: string;
  toEmail?: string;
  subject?: string;
  body?: string;
}

export const resendExecutor: NodeExecutor<ResendData> = async ({
  data,
  nodeId,
  userId,
  context,
  step,
  publish,
}) => {
  if (!data.credentialId) {
    throw new NonRetriableError("Resend node: API Key credential is required");
  }

  if (!data.toEmail) {
    throw new NonRetriableError("Resend node: Recipient email is required");
  }

  if (!data.subject) {
    throw new NonRetriableError("Resend node: Subject is required");
  }

  const credential = await step.run("get-resend-credential", async () => {
    return db.query.credentials.findFirst({
      where: (creds, { and, eq }) =>
        and(eq(creds.id, data.credentialId!), eq(creds.userId, userId)),
    });
  });

  if (!credential) {
    throw new NonRetriableError("Resend node: Credential not found");
  }

  const to = Handlebars.compile(data.toEmail)(context);
  const subject = Handlebars.compile(data.subject)(context);
  const body = Handlebars.compile(data.body || "")(context);

  const resend = new Resend(decrypt(credential.value));

  const response = await step.run("send-email", async () => {
    const res = await resend.emails.send({
      from: "Conduit Workflows <onboarding@resend.dev>",
      to: [to],
      subject,
      html: `<div style="font-family: sans-serif; line-height: 1.5;">${body.replace(
        /\n/g,
        "<br/>"
      )}</div>`,
    });

    if (res.error) {
      throw new NonRetriableError(`Resend error: ${res.error.message}`);
    }

    return res.data;
  });

  return {
    ...context,
    [data.variableName || "resend"]: {
      id: response?.id,
      to,
      subject,
      status: "delivered",
    },
  };
};
