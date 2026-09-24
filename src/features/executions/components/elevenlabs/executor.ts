import Handlebars from "handlebars";
import { NonRetriableError } from "inngest";
import db from "@/server/db";
import { decrypt } from "@/lib/encryption";
import type { NodeExecutor } from "@/features/executions/types";

interface ElevenLabsData {
  credentialId?: string;
  variableName?: string;
  text?: string;
  voiceId?: string;
  modelId?: string;
}

export const elevenlabsExecutor: NodeExecutor<ElevenLabsData> = async ({
  data,
  nodeId,
  userId,
  context,
  step,
  publish,
}) => {
  if (!data.credentialId) {
    throw new NonRetriableError("ElevenLabs node: API key is required");
  }

  if (!data.text) {
    throw new NonRetriableError("ElevenLabs node: Text to synthesize is required");
  }

  const credential = await step.run("get-elevenlabs-credential", async () => {
    return db.query.credentials.findFirst({
      where: (creds, { and, eq }) =>
        and(eq(creds.id, data.credentialId!), eq(creds.userId, userId)),
    });
  });

  if (!credential) {
    throw new NonRetriableError("ElevenLabs node: Credential not found");
  }

  const text = Handlebars.compile(data.text)(context);
  const voiceId = data.voiceId || "21m00Tcm4TlvDq8ikWAM"; // Default Rachel
  const modelId = data.modelId || "eleven_monolingual_v1";
  const apiKey = decrypt(credential.value);

  const result = await step.run("elevenlabs-generate-audio", async () => {
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({
        text,
        model_id: modelId,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`ElevenLabs API failed (${res.status}): ${err}`);
    }

    const arrayBuffer = await res.arrayBuffer();
    const base64Audio = Buffer.from(arrayBuffer).toString("base64");
    const dataUri = `data:audio/mpeg;base64,${base64Audio}`;

    return {
      voiceId,
      audioBase64: dataUri,
      textLength: text.length,
    };
  });

  return {
    ...context,
    [data.variableName || "elevenlabs"]: result,
  };
};
