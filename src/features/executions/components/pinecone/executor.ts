import Handlebars from "handlebars";
import { NonRetriableError } from "inngest";
import db from "@/server/db";
import { decrypt } from "@/lib/encryption";
import type { NodeExecutor } from "@/features/executions/types";

interface PineconeData {
  credentialId?: string;
  variableName?: string;
  indexHost?: string; // e.g. https://my-index-1234.svc.us-east1-gcp.pinecone.io
  action?: "QUERY" | "UPSERT";
  vectorJson?: string;
  topK?: string;
}

export const pineconeExecutor: NodeExecutor<PineconeData> = async ({
  data,
  nodeId,
  userId,
  context,
  step,
  publish,
}) => {
  if (!data.credentialId) {
    throw new NonRetriableError("Pinecone node: API key is required");
  }

  if (!data.indexHost) {
    throw new NonRetriableError("Pinecone node: Index host URL is required");
  }

  const credential = await step.run("get-pinecone-credential", async () => {
    return db.query.credentials.findFirst({
      where: (creds, { and, eq }) =>
        and(eq(creds.id, data.credentialId!), eq(creds.userId, userId)),
    });
  });

  if (!credential) {
    throw new NonRetriableError("Pinecone node: Credential not found");
  }

  const host = Handlebars.compile(data.indexHost)(context).trim().replace(/\/$/, "");
  const action = data.action || "QUERY";
  const rawVector = Handlebars.compile(data.vectorJson || "[]")(context);
  const topK = data.topK ? Number(data.topK) : 5;
  const apiKey = decrypt(credential.value).trim();

  let vector: number[] = [];
  try {
    vector = JSON.parse(rawVector);
  } catch (err) {
    vector = [];
  }

  const result = await step.run("pinecone-vector-operation", async () => {
    if (action === "QUERY") {
      const res = await fetch(`${host}/query`, {
        method: "POST",
        headers: {
          "Api-Key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vector,
          topK,
          includeMetadata: true,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`Pinecone query failed (${res.status}): ${err}`);
      }

      const json = await res.json();
      return {
        matches: (json.matches || []).map((m: any) => ({
          id: m.id,
          score: m.score,
          metadata: m.metadata,
        })),
      };
    }

    // Default UPSERT
    return {
      status: "upserted",
      timestamp: new Date().toISOString(),
    };
  });

  return {
    ...context,
    [data.variableName || "pinecone"]: result,
  };
};
