import Handlebars from "handlebars";
import { NonRetriableError } from "inngest";
import db from "@/server/db";
import { decrypt } from "@/lib/encryption";
import type { NodeExecutor } from "@/features/executions/types";

interface DeepSeekData {
  credentialId?: string;
  variableName?: string;
  model?: "deepseek-chat" | "deepseek-reasoner";
  systemPrompt?: string;
  userPrompt?: string;
}

export const deepseekExecutor: NodeExecutor<DeepSeekData> = async ({
  data,
  nodeId,
  userId,
  context,
  step,
  publish,
}) => {
  if (!data.credentialId) {
    throw new NonRetriableError("DeepSeek node: API key is required");
  }

  if (!data.userPrompt) {
    throw new NonRetriableError("DeepSeek node: User prompt is required");
  }

  const credential = await step.run("get-deepseek-credential", async () => {
    return db.query.credentials.findFirst({
      where: (creds, { and, eq }) =>
        and(eq(creds.id, data.credentialId!), eq(creds.userId, userId)),
    });
  });

  if (!credential) {
    throw new NonRetriableError("DeepSeek node: Credential not found");
  }

  const systemPrompt = data.systemPrompt
    ? Handlebars.compile(data.systemPrompt)(context)
    : undefined;
  const userPrompt = Handlebars.compile(data.userPrompt)(context);
  const modelId = data.model || "deepseek-chat";
  const apiKey = decrypt(credential.value);

  const result = await step.run("deepseek-generate-text", async () => {
    const messages = [];
    if (systemPrompt) {
      messages.push({ role: "system", content: systemPrompt });
    }
    messages.push({ role: "user", content: userPrompt });

    const res = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: modelId,
        messages,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`DeepSeek API call failed (${res.status}): ${err}`);
    }

    const json = await res.json();
    const message = json.choices?.[0]?.message;

    return {
      text: message?.content || "",
      reasoningContent: message?.reasoning_content || null,
      usage: json.usage,
      model: json.model,
    };
  });

  return {
    ...context,
    [data.variableName || "deepseek"]: result,
  };
};
