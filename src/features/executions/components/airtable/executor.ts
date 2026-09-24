import Handlebars from "handlebars";
import { NonRetriableError } from "inngest";
import db from "@/server/db";
import { decrypt } from "@/lib/encryption";
import type { NodeExecutor } from "@/features/executions/types";

interface AirtableData {
  credentialId?: string;
  variableName?: string;
  baseId?: string;
  tableName?: string;
  fieldsJson?: string;
}

export const airtableExecutor: NodeExecutor<AirtableData> = async ({
  data,
  nodeId,
  userId,
  context,
  step,
  publish,
}) => {
  if (!data.credentialId) {
    throw new NonRetriableError("Airtable node: Personal Access Token is required");
  }

  if (!data.baseId || !data.tableName) {
    throw new NonRetriableError("Airtable node: Base ID and Table Name are required");
  }

  const credential = await step.run("get-airtable-credential", async () => {
    return db.query.credentials.findFirst({
      where: (creds, { and, eq }) =>
        and(eq(creds.id, data.credentialId!), eq(creds.userId, userId)),
    });
  });

  if (!credential) {
    throw new NonRetriableError("Airtable node: Credential not found");
  }

  const baseId = Handlebars.compile(data.baseId)(context).trim();
  const tableName = Handlebars.compile(data.tableName)(context).trim();
  const rawFields = Handlebars.compile(data.fieldsJson || "{}")(context);
  const token = decrypt(credential.value).trim();

  let fields: Record<string, unknown> = {};
  try {
    fields = JSON.parse(rawFields);
  } catch (err) {
    fields = { Notes: rawFields };
  }

  const result = await step.run("airtable-create-record", async () => {
    const res = await fetch(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Airtable API failed (${res.status}): ${err}`);
    }

    const json = await res.json();
    return {
      id: json.id,
      createdTime: json.createdTime,
      fields: json.fields,
    };
  });

  return {
    ...context,
    [data.variableName || "airtable"]: result,
  };
};
