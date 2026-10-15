"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Workflow, 
  Split, 
  Database,
  Mic,
  BellRing,
  ArrowRight
} from "lucide-react";

export function BentoShowcase() {
  return (
    <section className="py-24 px-4 sm:px-6 max-w-[1200px] mx-auto">
      
      {/* Editorial Section Header */}
      <div className="max-w-2xl mb-16">
        <span className="font-['var(--font-sohne)',sans-serif] text-[14px] text-[#979799] uppercase tracking-wider block mb-3">
          Capabilities
        </span>
        <h2 className="font-['var(--font-signifier)',Georgia,serif] text-4xl sm:text-5xl font-normal tracking-[-0.96px] text-[#17191c] leading-[1.15]">
          Autonomous modules, <br />
          <span className="italic">orchestrated on a quiet canvas.</span>
        </h2>
        <p className="mt-4 font-['var(--font-sohne)',sans-serif] text-[17px] text-[#777b86] leading-relaxed">
          Combine multi-modal LLMs, voice transcription, vector databases, and instant messaging into unified reactive workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 font-['var(--font-sohne)',sans-serif]">
        
        {/* Bento 1: Multi-Model AI Reasoning Hub (Large Left 7 cols) */}
        <div className="md:col-span-7 rounded-[24px] bg-[#f2f2f3] p-7 sm:p-9 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[14px] text-[#979799]">
                Intelligence
              </span>
              <span className="text-[12px] font-mono text-[#777b86]">
                DeepSeek · Claude · GPT-4o
              </span>
            </div>

            <h3 className="text-[22px] sm:text-[26px] font-medium tracking-tight text-[#17191c]">
              Multi-Model AI Arbitration
            </h3>
            <p className="mt-2 text-[15px] text-[#777b86] max-w-lg leading-relaxed">
              Route prompts dynamically across DeepSeek R1, Claude 3.5 Sonnet, and GPT-4o with automated fallback handling and token budgeting.
            </p>
          </div>

          {/* Quiet floating artifact inside card */}
          <div className="mt-8 rounded-[16px] bg-[#ffffff] border border-[#ececec] p-4 sm:p-5 shadow-[0_0_0_1px_rgba(4,23,43,0.05),0_8px_16px_-4px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between border-b border-[#f2f2f3] pb-3 mb-3 text-[12px] font-mono text-[#777b86]">
              <span>prompt.payload</span>
              <span className="text-[#17191c] font-medium">DeepSeek R1 Chain-of-Thought</span>
            </div>

            <div className="space-y-2 text-[13px] font-mono">
              <div className="text-[#777b86]">
                <span className="text-[#17191c] font-medium">input:</span> &quot;Synthesize customer telemetry & trigger executive dispatch&quot;
              </div>
              <div className="flex items-center justify-between text-[12px] text-[#777b86] pt-1">
                <span>Tokens: 1,420 · Cold Start: 82ms</span>
                <span className="text-[#17191c] font-medium">Verified 200 OK</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bento 2: Visual Canvas Architecture (Right 5 cols) */}
        <div className="md:col-span-5 rounded-[24px] bg-[#f2f2f3] p-7 sm:p-9 flex flex-col justify-between">
          <div>
            <div className="text-[14px] text-[#979799] mb-4">
              Execution
            </div>
            <h3 className="text-[22px] sm:text-[26px] font-medium tracking-tight text-[#17191c]">
              Visual React Flow Engine
            </h3>
            <p className="mt-2 text-[15px] text-[#777b86] leading-relaxed">
              Acyclic directed graphs with live topological validation and sub-second execution rollbacks.
            </p>
          </div>

          <div className="mt-8 space-y-2.5">
            <div className="flex items-center justify-between p-3.5 rounded-[16px] bg-[#ffffff] border border-[#ececec] text-[14px]">
              <div className="flex items-center gap-2.5">
                <Workflow className="w-4 h-4 text-[#17191c]" />
                <span className="text-[#17191c] font-medium">Topological Graph Sort</span>
              </div>
              <span className="text-[12px] font-mono text-[#777b86]">Acyclic</span>
            </div>
            <div className="flex items-center justify-between p-3.5 rounded-[16px] bg-[#ffffff] border border-[#ececec] text-[14px]">
              <div className="flex items-center gap-2.5">
                <Split className="w-4 h-4 text-[#17191c]" />
                <span className="text-[#17191c] font-medium">Dynamic Condition Router</span>
              </div>
              <span className="text-[12px] font-mono text-[#777b86]">Branching</span>
            </div>
          </div>
        </div>

        {/* Bento 3: Voice & Audio Pipelines (4 cols) */}
        <div className="md:col-span-4 rounded-[24px] bg-[#f2f2f3] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="text-[14px] text-[#979799] mb-3">
              Audio Synthesis
            </div>
            <h3 className="text-[20px] font-medium text-[#17191c]">
              Voice & Audio Pipelines
            </h3>
            <p className="mt-2 text-[15px] text-[#777b86] leading-relaxed">
              Transcribe multi-speaker audio with Deepgram Nova-2 and synthesize expressive speech with ElevenLabs.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#ececec]/60 flex flex-wrap items-center gap-2 text-[13px] text-[#17191c]">
            <span className="font-mono text-[#777b86]">Integrations:</span>
            <span>ElevenLabs</span>
            <span className="text-[#979799]">·</span>
            <span>Deepgram</span>
          </div>
        </div>

        {/* Bento 4: Omnichannel Messaging & Alerts (4 cols) */}
        <div className="md:col-span-4 rounded-[24px] bg-[#f2f2f3] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="text-[14px] text-[#979799] mb-3">
              Communication
            </div>
            <h3 className="text-[20px] font-medium text-[#17191c]">
              Multi-Channel Dispatch
            </h3>
            <p className="mt-2 text-[15px] text-[#777b86] leading-relaxed">
              Broadcast verified alerts via Resend email, Telegram bots, and Twilio SMS without latency penalty.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#ececec]/60 flex flex-wrap items-center gap-2 text-[13px] text-[#17191c]">
            <span className="font-mono text-[#777b86]">Destinations:</span>
            <span>Telegram</span>
            <span className="text-[#979799]">·</span>
            <span>Resend</span>
            <span className="text-[#979799]">·</span>
            <span>Twilio</span>
          </div>
        </div>

        {/* Bento 5: Vector Search & Cloud Storage (4 cols) */}
        <div className="md:col-span-4 rounded-[24px] bg-[#f2f2f3] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="text-[14px] text-[#979799] mb-3">
              Storage
            </div>
            <h3 className="text-[20px] font-medium text-[#17191c]">
              Vector RAG & Cloud S3
            </h3>
            <p className="mt-2 text-[15px] text-[#777b86] leading-relaxed">
              Query Pinecone indexes and persist pipeline artifacts directly to Cloudflare R2 and AWS S3.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-[#ececec]/60 flex flex-wrap items-center gap-2 text-[13px] text-[#17191c]">
            <span className="font-mono text-[#777b86]">Engines:</span>
            <span>Pinecone</span>
            <span className="text-[#979799]">·</span>
            <span>AWS S3</span>
            <span className="text-[#979799]">·</span>
            <span>R2</span>
          </div>
        </div>

      </div>
    </section>
  );
}
