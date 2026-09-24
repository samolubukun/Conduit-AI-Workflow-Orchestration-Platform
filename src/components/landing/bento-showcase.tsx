"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Sparkles, 
  Workflow, 
  Split, 
  BellRing, 
  ArrowUpRight,
  Database,
  Cpu,
  Mic,
  MessageSquare,
  FileSpreadsheet,
  Layers,
  ChevronRight,
  PlayCircle
} from "lucide-react";

export function BentoShowcase() {
  const [activeTab, setActiveTab] = useState<"ai" | "flow" | "triggers">("ai");

  return (
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
          Engineered for speed, clarity, and scalable automation
        </h2>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground">
          Combine state-of-the-art LLMs, multi-modal audio transcription, vector databases, and instant messaging into unified reactive workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Bento 1: Natural Language & Multi-Model AI Hub (Large Left 7 cols) */}
        <div className="md:col-span-7 group relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-card via-card/90 to-card/60 p-5 sm:p-8 shadow-lg hover:shadow-xl transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <span className="self-start text-xs font-mono text-primary font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 whitespace-nowrap">
              Multi-LLM Engine
            </span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="text-[11px] sm:text-xs text-muted-foreground font-mono">OpenAI • Anthropic • Gemini • DeepSeek</span>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-foreground">
            Multi-Model AI Reasoning
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-md leading-relaxed">
            Route prompts dynamically across DeepSeek R1, Claude 3.5 Sonnet, and GPT-4o with automatic fallback handling and token optimization.
          </p>

          {/* Interactive preview UI */}
          <div className="mt-6 sm:mt-8 rounded-2xl bg-muted/30 border border-border/60 p-3.5 sm:p-5">
            <div className="flex flex-wrap items-center gap-2 border-b border-border/40 pb-3 mb-4 text-[11px] sm:text-xs font-mono text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
              <span>Prompt Ingest</span>
              <span className="text-foreground font-semibold">→ DeepSeek R1 Chain-of-Thought</span>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-card border border-border/50 text-[11px] sm:text-xs font-mono text-muted-foreground break-words">
                <span className="text-primary font-semibold">$ input:</span> Extract entities from PDF upload and summarize key deliverables
              </div>
              <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-[11px] sm:text-xs font-mono text-foreground flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span>Tokens: 1,420 • Cost: 1 credit • Latency: 420ms</span>
                <span className="self-start sm:self-auto px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold text-[10px]">
                  Success
                </span>
              </div>
            </div>

            {/* Provider icons array */}
            <div className="mt-5 flex flex-wrap items-center gap-3 pt-3 border-t border-border/40">
              <span className="text-xs text-muted-foreground">Supported Providers:</span>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-card border flex items-center justify-center p-1 shrink-0" title="OpenAI">
                  <Image src="/logos/openai.svg" alt="OpenAI" width={18} height={18} />
                </div>
                <div className="w-7 h-7 rounded-lg bg-card border flex items-center justify-center p-1 shrink-0" title="Anthropic">
                  <Image src="/logos/anthropic.svg" alt="Anthropic" width={18} height={18} />
                </div>
                <div className="w-7 h-7 rounded-lg bg-card border flex items-center justify-center p-1 shrink-0" title="Gemini">
                  <Image src="/logos/gemini.svg" alt="Gemini" width={18} height={18} />
                </div>
                <div className="w-7 h-7 rounded-lg bg-card border flex items-center justify-center p-1 shrink-0" title="DeepSeek">
                  <Image src="/logos/deepseek.svg" alt="DeepSeek" width={18} height={18} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bento 2: Visual Canvas & React Flow (Right 5 cols) */}
        <div className="md:col-span-5 group relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-card via-card/90 to-card/60 p-5 sm:p-8 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono text-sky-500 font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md bg-sky-500/10 border border-sky-500/20 whitespace-nowrap inline-block">
              Visual Editor
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mt-4">
              Infinite Drag & Drop Canvas
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Built on React Flow. Connect triggers, transformations, conditions, and actions with instantaneous state persistence.
            </p>
          </div>

          <div className="mt-6 rounded-2xl bg-muted/40 border border-border/60 p-3.5 sm:p-4 relative overflow-hidden">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-card border border-border/50 text-xs">
                <Workflow className="w-4 h-4 text-sky-500 shrink-0" />
                <span className="font-semibold text-foreground truncate">Topological Edge Sort</span>
                <span className="ml-auto text-[10px] font-mono text-muted-foreground shrink-0 pl-1">Acyclic</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-card border border-border/50 text-xs">
                <Split className="w-4 h-4 text-purple-500 shrink-0" />
                <span className="font-semibold text-foreground truncate">Smart Condition Split</span>
                <span className="ml-auto text-[10px] font-mono text-muted-foreground shrink-0 pl-1">True/False</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-card border border-border/50 text-xs">
                <Database className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-semibold text-foreground truncate">Encrypted Credential Vault</span>
                <span className="ml-auto text-[10px] font-mono text-muted-foreground shrink-0 pl-1">AES-256</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bento 3: Multi-Modal Audio & Voice (4 cols) */}
        <div className="md:col-span-4 group relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-card via-card/90 to-card/60 p-5 sm:p-8 shadow-lg hover:shadow-xl transition-all">
          <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-4">
            <Mic className="w-5 h-5 text-violet-500" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-foreground">Voice & Audio Pipelines</h3>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Transcribe raw audio via Deepgram Nova-2 and synthesize human-like voice responses with ElevenLabs.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-muted/60 border text-xs font-mono shrink-0">
              <Image src="/logos/deepgram.svg" alt="Deepgram" width={16} height={16} className="shrink-0" />
              <span>Deepgram STT</span>
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-muted/60 border text-xs font-mono shrink-0">
              <Image src="/logos/elevenlabs.svg" alt="ElevenLabs" width={16} height={16} className="dark:invert shrink-0" />
              <span>ElevenLabs TTS</span>
            </div>
          </div>
        </div>

        {/* Bento 4: Omnichannel Messaging & Alerts (4 cols) */}
        <div className="md:col-span-4 group relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-card via-card/90 to-card/60 p-5 sm:p-8 shadow-lg hover:shadow-xl transition-all">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
            <BellRing className="w-5 h-5 text-emerald-500" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-foreground">Instant Broadcasts</h3>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Fire multi-channel notifications via Resend emails, Telegram bots, and Twilio SMS/WhatsApp without leaving your flow.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-muted/60 border text-xs font-mono shrink-0">
              <Image src="/logos/telegram.svg" alt="Telegram" width={16} height={16} className="shrink-0" />
              <span>Telegram Bot</span>
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-muted/60 border text-xs font-mono shrink-0">
              <Image src="/logos/twilio.svg" alt="Twilio" width={16} height={16} className="shrink-0" />
              <span>Twilio SMS</span>
            </div>
          </div>
        </div>

        {/* Bento 5: Vector Search & Cloud Storage (4 cols) */}
        <div className="md:col-span-4 group relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-card via-card/90 to-card/60 p-5 sm:p-8 shadow-lg hover:shadow-xl transition-all">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4">
            <Database className="w-5 h-5 text-indigo-500" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-foreground">Vector RAG & S3 Storage</h3>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Query high-dimensional Pinecone vector indexes and persist file artifacts directly to Cloudflare R2 and AWS S3 buckets.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-muted/60 border text-xs font-mono shrink-0">
              <Image src="/logos/pinecone.svg" alt="Pinecone" width={16} height={16} className="shrink-0" />
              <span>Pinecone DB</span>
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-muted/60 border text-xs font-mono shrink-0">
              <Image src="/logos/s3.svg" alt="S3" width={16} height={16} className="shrink-0" />
              <span>Cloudflare R2</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
