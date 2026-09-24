import Handlebars from "handlebars";
import { NonRetriableError } from "inngest";
import db from "@/server/db";
import { decrypt } from "@/lib/encryption";
import type { NodeExecutor } from "@/features/executions/types";

interface DeepgramData {
  credentialId?: string;
  variableName?: string;
  audioUrl?: string;
  model?: string;
  smartFormat?: boolean;
}

export const deepgramExecutor: NodeExecutor<DeepgramData> = async ({
  data,
  nodeId,
  userId,
  context,
  step,
  publish,
}) => {
  if (!data.credentialId) {
    throw new NonRetriableError("Deepgram node: API key is required");
  }

  if (!data.audioUrl) {
    throw new NonRetriableError("Deepgram node: Audio URL is required");
  }

  const credential = await step.run("get-deepgram-credential", async () => {
    return db.query.credentials.findFirst({
      where: (creds, { and, eq }) =>
        and(eq(creds.id, data.credentialId!), eq(creds.userId, userId)),
    });
  });

  if (!credential) {
    throw new NonRetriableError("Deepgram node: Credential not found");
  }

  const audioUrl = Handlebars.compile(data.audioUrl)(context).trim();
  const model = data.model || "nova-3";
  const smartFormat = data.smartFormat ?? true;
  const apiKey = decrypt(credential.value);

  const result = await step.run("deepgram-transcribe-audio", async () => {
    const queryParams = new URLSearchParams({
      model,
      smart_format: String(smartFormat),
      punctuate: "true",
      paragraphs: "true",
    });

    const res = await fetch(`https://api.deepgram.com/v1/listen?${queryParams.toString()}`, {
      method: "POST",
      headers: {
        Authorization: `Token ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: audioUrl }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Deepgram API failed (${res.status}): ${err}`);
    }

    const transcription = await res.json();
    const transcript =
      transcription?.results?.channels?.[0]?.alternatives?.[0]?.transcript || "";
    const confidence =
      transcription?.results?.channels?.[0]?.alternatives?.[0]?.confidence || 0;
    const wordsCount =
      transcription?.results?.channels?.[0]?.alternatives?.[0]?.words?.length || 0;

    return {
      transcript,
      confidence,
      wordsCount,
      duration: transcription?.metadata?.duration || 0,
      model: transcription?.metadata?.models?.[0] || model,
    };
  });

  return {
    ...context,
    [data.variableName || "deepgram"]: result,
  };
};
