"use client";

import { createId } from "@paralleldrive/cuid2";
import { useReactFlow } from "@xyflow/react";
import {
  GlobeIcon,
  MousePointerIcon,
  MailIcon,
  GitPullRequestIcon,
  BookOpenIcon,
  SearchIcon,
  BotIcon,
  Volume2Icon,
  GitForkIcon,
  MessageSquareIcon,
  MicIcon,
  ClockIcon,
  WebhookIcon,
} from "lucide-react";
import { useCallback } from "react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NodeType } from "@/generated/prisma";
import { Separator } from "./ui/separator";

export type NodeTypeOption = {
  type: NodeType;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }> | string;
};

const triggerNodes: NodeTypeOption[] = [
  {
    type: NodeType.MANUAL_TRIGGER,
    label: "Trigger manually",
    description: "Runs the flow on clicking a button. Good for getting started quickly",
    icon: MousePointerIcon,
  },
  {
    type: NodeType.GOOGLE_FORM_TRIGGER,
    label: "Google Form",
    description: "Runs the flow when a Google Form is submitted",
    icon: "/logos/googleform.svg",
  },
  {
    type: NodeType.STRIPE_TRIGGER,
    label: "Stripe Event",
    description: "Runs the flow when a Stripe Event is captured",
    icon: "/logos/stripe.svg",
  },
  {
    type: NodeType.WEBHOOK_TRIGGER,
    label: "Custom Webhook",
    description: "Runs the flow when an HTTP POST request is received",
    icon: WebhookIcon,
  },
  {
    type: NodeType.SCHEDULE_TRIGGER,
    label: "Schedule / Cron",
    description: "Runs the flow automatically on a recurring schedule or interval",
    icon: ClockIcon,
  },
  {
    type: NodeType.GITHUB_TRIGGER,
    label: "GitHub Event",
    description: "Runs the flow when a GitHub commit, PR, or issue occurs",
    icon: "/logos/github.svg",
  },
];

const executionNodes: NodeTypeOption[] = [
  {
    type: NodeType.HTTP_REQUEST,
    label: "HTTP Request",
    description: "Makes an HTTP request",
    icon: GlobeIcon,
  },
  {
    type: NodeType.CONDITION,
    label: "Condition / Router",
    description: "Evaluate variables and branch logic",
    icon: GitForkIcon,
  },
  {
    type: NodeType.RESEND,
    label: "Resend Email",
    description: "Deliver transactional and marketing emails",
    icon: "/logos/resend.svg",
  },
  {
    type: NodeType.TWILIO,
    label: "Twilio SMS & WhatsApp",
    description: "Send SMS or WhatsApp notifications",
    icon: "/logos/twilio.svg",
  },
  {
    type: NodeType.GITHUB,
    label: "GitHub",
    description: "Create issues and comments on repositories",
    icon: "/logos/github.svg",
  },
  {
    type: NodeType.NOTION,
    label: "Notion",
    description: "Create database pages and query workspaces",
    icon: "/logos/notion.svg",
  },
  {
    type: NodeType.WEB_SEARCH,
    label: "Web Search (Tavily)",
    description: "Real-time AI web search and citations",
    icon: "/logos/tavily.svg",
  },
  {
    type: NodeType.DEEPSEEK,
    label: "DeepSeek (V3 / R1)",
    description: "DeepSeek-V3 chat or DeepSeek-R1 reasoning",
    icon: "/logos/deepseek.svg",
  },
  {
    type: NodeType.ELEVENLABS,
    label: "ElevenLabs Voice TTS",
    description: "Ultra-realistic AI voice synthesis",
    icon: "/logos/elevenlabs.svg",
  },
  {
    type: NodeType.DEEPGRAM,
    label: "Deepgram Speech-to-Text",
    description: "Ultra-fast voice & audio transcription (Nova-3)",
    icon: "/logos/deepgram.svg",
  },
  {
    type: NodeType.TELEGRAM,
    label: "Telegram Bot",
    description: "Send alerts, chats, and channel broadcasts",
    icon: "/logos/telegram.svg",
  },
  {
    type: NodeType.AIRTABLE,
    label: "Airtable Database",
    description: "Insert and update structured base records",
    icon: "/logos/airtable.svg",
  },
  {
    type: NodeType.S3,
    label: "S3 / Cloudflare R2",
    description: "Store files, voice audio, and data backups",
    icon: "/logos/s3.svg",
  },
  {
    type: NodeType.PINECONE,
    label: "Pinecone Vector Search",
    description: "Perform semantic search for RAG workflows",
    icon: "/logos/pinecone.svg",
  },
  {
    type: NodeType.LINEAR,
    label: "Linear Issues",
    description: "File engineering bugs and feature tickets",
    icon: "/logos/linear.svg",
  },
  {
    type: NodeType.GEMINI,
    label: "Gemini",
    description: "Google Gemini generative text model",
    icon: "/logos/gemini.svg",
  },
  {
    type: NodeType.OPENAI,
    label: "OpenAI",
    description: "OpenAI GPT-4o language model",
    icon: "/logos/openai.svg",
  },
  {
    type: NodeType.ANTHROPIC,
    label: "Anthropic Claude",
    description: "Anthropic Claude 3.5 Sonnet",
    icon: "/logos/anthropic.svg",
  },
  {
    type: NodeType.DISCORD,
    label: "Discord",
    description: "Send webhook messages to Discord channels",
    icon: "/logos/discord.svg",
  },
  {
    type: NodeType.SLACK,
    label: "Slack",
    description: "Send webhook messages to Slack channels",
    icon: "/logos/slack.svg",
  },
];

interface NodeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function NodeSelector({
  open,
  onOpenChange,
  children,
}: NodeSelectorProps) {
  const { setNodes, getNodes, screenToFlowPosition } = useReactFlow();

  const handleNodeSelect = useCallback(
    (selection: NodeTypeOption) => {
      // Check if trying to add a manual trigger when one already exists
      if (selection.type === NodeType.MANUAL_TRIGGER) {
        const nodes = getNodes();
        const hasManualTrigger = nodes.some(
          (node) => node.type === NodeType.MANUAL_TRIGGER
        );

        if (hasManualTrigger) {
          toast.error("Only one manual trigger is allowed per workflow");
          return;
        }
      }

      setNodes((nodes) => {
        const hasInitialTrigger = nodes.some(
          (node) => node.type === NodeType.INITIAL
        );

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const flowPosition = screenToFlowPosition({
          x: centerX + (Math.random() - 0.5) * 200,
          y: centerY + (Math.random() - 0.5) * 200,
        });

        const newNode = {
          id: createId(),
          data: {},
          position: flowPosition,
          type: selection.type,
        };

        if (hasInitialTrigger) {
          return [newNode];
        }

        return [...nodes, newNode];
      });

      onOpenChange(false);
    },
    [setNodes, getNodes, onOpenChange, screenToFlowPosition]
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>What triggers this workflow?</SheetTitle>
          <SheetDescription>
            A trigger is a step that starts your workflow.
          </SheetDescription>
        </SheetHeader>
        <div>
          {triggerNodes.map((nodeType) => {
            const Icon = nodeType.icon;

            return (
              <div
                key={nodeType.type}
                className="w-full justify-start h-auto py-5 px-4 rounded-none cursor-pointer border-l-2 border-transparent hover:border-l-primary"
                onClick={() => handleNodeSelect(nodeType)}
              >
                <div className="flex items-center gap-6 w-full overflow-hidden">
                  {typeof Icon === "string" ? (
                    <img
                      src={Icon}
                      alt={nodeType.label}
                      className="size-5 object-contain rounded-sm"
                    />
                  ) : (
                    <Icon className="size-5" />
                  )}
                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium text-sm">
                      {nodeType.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {nodeType.description}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Separator />
        <div className="py-2">
          <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Actions &amp; Integrations
          </p>
          {executionNodes.map((nodeType) => {
            const Icon = nodeType.icon;

            return (
              <div
                key={nodeType.type}
                className="w-full justify-start h-auto py-4 px-4 rounded-none cursor-pointer border-l-2 border-transparent hover:border-l-primary hover:bg-accent/40 transition-colors"
                onClick={() => handleNodeSelect(nodeType)}
              >
                <div className="flex items-center gap-5 w-full overflow-hidden">
                  {typeof Icon === "string" ? (
                    <img
                      src={Icon}
                      alt={nodeType.label}
                      className="size-5 object-contain rounded-sm shrink-0"
                    />
                  ) : (
                    <Icon className="size-5 shrink-0" />
                  )}
                  <div className="flex flex-col items-start text-left">
                    <span className="font-medium text-sm">
                      {nodeType.label}
                    </span>
                    <span className="text-xs text-muted-foreground line-clamp-1">
                      {nodeType.description}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
