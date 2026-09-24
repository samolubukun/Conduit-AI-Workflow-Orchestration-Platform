import { NodeType } from "@/generated/prisma";
import { NodeExecutor } from "../types";
import { manualTriggerExecutor } from "@/features/triggers/components/manual-trigger/executor";
import { httpRequestExecutor } from "../components/http-request/executor";
import { googleFormTriggerExecutor } from "@/features/triggers/components/google-form-trigger/executor";
import { stripeTriggerExecutor } from "@/features/triggers/components/stripe-trigger/executor";
import { webhookTriggerExecutor } from "@/features/triggers/components/webhook-trigger/executor";
import { scheduleTriggerExecutor } from "@/features/triggers/components/schedule-trigger/executor";
import { githubTriggerExecutor } from "@/features/triggers/components/github-trigger/executor";
import { geminiExecutor } from "../components/gemini/executor";
import { openAiExecutor } from "../components/openai/executor";
import { anthropicExecutor } from "../components/anthropic/executor";
import { discordExecutor } from "../components/discord/executor";
import { slackExecutor } from "../components/slack/executor";
import { resendExecutor } from "../components/resend/executor";
import { githubExecutor } from "../components/github/executor";
import { notionExecutor } from "../components/notion/executor";
import { webSearchExecutor } from "../components/web-search/executor";
import { deepseekExecutor } from "../components/deepseek/executor";
import { elevenlabsExecutor } from "../components/elevenlabs/executor";
import { conditionExecutor } from "../components/condition/executor";
import { twilioExecutor } from "../components/twilio/executor";
import { deepgramExecutor } from "../components/deepgram/executor";
import { telegramExecutor } from "../components/telegram/executor";
import { airtableExecutor } from "../components/airtable/executor";
import { s3Executor } from "../components/s3/executor";
import { pineconeExecutor } from "../components/pinecone/executor";
import { linearExecutor } from "../components/linear/executor";

export const executorRegistry: Record<NodeType, NodeExecutor> = {
  [NodeType.INITIAL]: manualTriggerExecutor,
  [NodeType.MANUAL_TRIGGER]: manualTriggerExecutor,
  [NodeType.HTTP_REQUEST]: httpRequestExecutor,
  [NodeType.GOOGLE_FORM_TRIGGER]: googleFormTriggerExecutor,
  [NodeType.STRIPE_TRIGGER]: stripeTriggerExecutor,
  [NodeType.WEBHOOK_TRIGGER]: webhookTriggerExecutor,
  [NodeType.SCHEDULE_TRIGGER]: scheduleTriggerExecutor,
  [NodeType.GITHUB_TRIGGER]: githubTriggerExecutor,
  [NodeType.GEMINI]: geminiExecutor,
  [NodeType.ANTHROPIC]: anthropicExecutor,
  [NodeType.OPENAI]: openAiExecutor,
  [NodeType.DISCORD]: discordExecutor,
  [NodeType.SLACK]: slackExecutor,
  [NodeType.RESEND]: resendExecutor,
  [NodeType.GITHUB]: githubExecutor,
  [NodeType.NOTION]: notionExecutor,
  [NodeType.WEB_SEARCH]: webSearchExecutor,
  [NodeType.DEEPSEEK]: deepseekExecutor,
  [NodeType.ELEVENLABS]: elevenlabsExecutor,
  [NodeType.CONDITION]: conditionExecutor,
  [NodeType.TWILIO]: twilioExecutor,
  [NodeType.DEEPGRAM]: deepgramExecutor,
  [NodeType.TELEGRAM]: telegramExecutor,
  [NodeType.AIRTABLE]: airtableExecutor,
  [NodeType.S3]: s3Executor,
  [NodeType.PINECONE]: pineconeExecutor,
  [NodeType.LINEAR]: linearExecutor,
};

export const getExecutor = (type: NodeType): NodeExecutor => {
  const executor = executorRegistry[type];
  if (!executor) {
    throw new Error(`No executor found for node type: ${type}`);
  }

  return executor;
};
