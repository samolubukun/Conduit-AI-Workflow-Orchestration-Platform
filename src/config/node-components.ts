import { InitialNode } from "@/components/initial-node";
import { NodeType } from "@/generated/prisma";
import type { NodeTypes } from "@xyflow/react";

import { HttpRequestNode } from "@/features/executions/components/http-request/node";
import { ManualTriggerNode } from "@/features/triggers/components/manual-trigger/node";
import { GoogleFormTrigger } from "@/features/triggers/components/google-form-trigger/node";
import { StripeTriggerNode } from "@/features/triggers/components/stripe-trigger/node";
import { WebhookTriggerNode } from "@/features/triggers/components/webhook-trigger/node";
import { ScheduleTriggerNode } from "@/features/triggers/components/schedule-trigger/node";
import { GitHubTriggerNode } from "@/features/triggers/components/github-trigger/node";
import { GeminiNode } from "@/features/executions/components/gemini/node";
import { OpenAiNode } from "@/features/executions/components/openai/node";
import { AnthropicNode } from "@/features/executions/components/anthropic/node";
import { DiscordNode } from "@/features/executions/components/discord/node";
import { SlackNode } from "@/features/executions/components/slack/node";
import { ResendNode } from "@/features/executions/components/resend/node";
import { GitHubNode } from "@/features/executions/components/github/node";
import { NotionNode } from "@/features/executions/components/notion/node";
import { WebSearchNode } from "@/features/executions/components/web-search/node";
import { DeepSeekNode } from "@/features/executions/components/deepseek/node";
import { ElevenLabsNode } from "@/features/executions/components/elevenlabs/node";
import { ConditionNode } from "@/features/executions/components/condition/node";
import { TwilioNode } from "@/features/executions/components/twilio/node";
import { DeepgramNode } from "@/features/executions/components/deepgram/node";
import { TelegramNode } from "@/features/executions/components/telegram/node";
import { AirtableNode } from "@/features/executions/components/airtable/node";
import { S3Node } from "@/features/executions/components/s3/node";
import { PineconeNode } from "@/features/executions/components/pinecone/node";
import { LinearNode } from "@/features/executions/components/linear/node";

export const nodeComponents = {
  [NodeType.INITIAL]: InitialNode,
  [NodeType.HTTP_REQUEST]: HttpRequestNode,
  [NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
  [NodeType.GOOGLE_FORM_TRIGGER]: GoogleFormTrigger,
  [NodeType.STRIPE_TRIGGER]: StripeTriggerNode,
  [NodeType.WEBHOOK_TRIGGER]: WebhookTriggerNode,
  [NodeType.SCHEDULE_TRIGGER]: ScheduleTriggerNode,
  [NodeType.GITHUB_TRIGGER]: GitHubTriggerNode,
  [NodeType.GEMINI]: GeminiNode,
  [NodeType.OPENAI]: OpenAiNode,
  [NodeType.ANTHROPIC]: AnthropicNode,
  [NodeType.DISCORD]: DiscordNode,
  [NodeType.SLACK]: SlackNode,
  [NodeType.RESEND]: ResendNode,
  [NodeType.GITHUB]: GitHubNode,
  [NodeType.NOTION]: NotionNode,
  [NodeType.WEB_SEARCH]: WebSearchNode,
  [NodeType.DEEPSEEK]: DeepSeekNode,
  [NodeType.ELEVENLABS]: ElevenLabsNode,
  [NodeType.CONDITION]: ConditionNode,
  [NodeType.TWILIO]: TwilioNode,
  [NodeType.DEEPGRAM]: DeepgramNode,
  [NodeType.TELEGRAM]: TelegramNode,
  [NodeType.AIRTABLE]: AirtableNode,
  [NodeType.S3]: S3Node,
  [NodeType.PINECONE]: PineconeNode,
  [NodeType.LINEAR]: LinearNode,
} as const satisfies NodeTypes;

export type RegisteredNodeType = keyof typeof nodeComponents;
