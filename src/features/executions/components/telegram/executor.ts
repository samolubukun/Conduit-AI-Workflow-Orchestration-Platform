import Handlebars from "handlebars";
import { NonRetriableError } from "inngest";
import db from "@/server/db";
import { decrypt } from "@/lib/encryption";
import type { NodeExecutor } from "@/features/executions/types";

interface TelegramData {
  credentialId?: string;
  variableName?: string;
  chatId?: string;
  message?: string;
  parseMode?: "Markdown" | "HTML";
}

export const telegramExecutor: NodeExecutor<TelegramData> = async ({
  data,
  nodeId,
  userId,
  context,
  step,
  publish,
}) => {
  if (!data.credentialId) {
    throw new NonRetriableError("Telegram node: Bot Token credential is required");
  }

  if (!data.chatId) {
    throw new NonRetriableError("Telegram node: Chat ID is required");
  }

  if (!data.message) {
    throw new NonRetriableError("Telegram node: Message content is required");
  }

  const credential = await step.run("get-telegram-credential", async () => {
    return db.query.credentials.findFirst({
      where: (creds, { and, eq }) =>
        and(eq(creds.id, data.credentialId!), eq(creds.userId, userId)),
    });
  });

  if (!credential) {
    throw new NonRetriableError("Telegram node: Credential not found");
  }

  const botToken = decrypt(credential.value).trim();
  const chatId = Handlebars.compile(data.chatId)(context).trim();
  const message = Handlebars.compile(data.message)(context);
  const parseMode = data.parseMode || "Markdown";

  const result = await step.run("telegram-send-message", async () => {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: parseMode,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Telegram API failed (${res.status}): ${err}`);
    }

    const json = await res.json();
    return {
      messageId: json.result?.message_id,
      chatId: json.result?.chat?.id,
      date: json.result?.date,
    };
  });

  return {
    ...context,
    [data.variableName || "telegram"]: result,
  };
};
