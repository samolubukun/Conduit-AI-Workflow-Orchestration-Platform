"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight,
  Sparkles,
  Workflow,
  Radio,
  KeyRound,
  Layers
} from "lucide-react";

const SECONDARY_SCREENSHOTS = [
  {
    id: "triggers",
    badge: "Event Ingest",
    title: "Trigger Library",
    description: "Google Forms, Stripe webhooks, GitHub commits & cron intervals.",
    image: "/screenshots/trigger-library.jpg",
  },
  {
    id: "integrations-1",
    badge: "Model Hub",
    title: "AI & Search Actions",
    description: "DeepSeek R1 reasoning, ElevenLabs voice & Tavily web search.",
    image: "/screenshots/integrations-drawer-1.jpg",
  },
  {
    id: "integrations-2",
    badge: "Ecosystem",
    title: "Storage & Dispatch",
    description: "Pinecone vector search, Cloudflare R2, Slack & Airtable sync.",
    image: "/screenshots/integrations-drawer-2.jpg",
  },
  {
    id: "credentials",
    badge: "AES-256 Vault",
    title: "Credential Vault",
    description: "Hardware-encrypted storage for API keys and webhook secrets.",
    image: "/screenshots/credentials-vault.jpg",
  },
];

export function BentoShowcase() {
  return (
    <section className="py-24 px-4 sm:px-6 max-w-[1200px] mx-auto">
      
      {/* Editorial Section Header */}
      <div className="max-w-2xl mb-12 sm:mb-16">
        <span className="font-['var(--font-sohne)',sans-serif] text-[14px] text-[#979799] uppercase tracking-wider block mb-3">
          Studio Architecture
        </span>
        <h2 className="font-['var(--font-signifier)',Georgia,serif] text-4xl sm:text-5xl font-normal tracking-[-0.96px] text-[#17191c] leading-[1.15]">
          Autonomous modules, <br />
          <span className="italic">orchestrated on a quiet canvas.</span>
        </h2>
        <p className="mt-4 font-['var(--font-sohne)',sans-serif] text-[17px] text-[#777b86] leading-relaxed">
          Combine multi-modal LLMs, voice transcription, vector databases, and instant messaging into unified reactive workflows.
        </p>
      </div>

      {/* 1. LARGE HERO CANVAS STUDIO SHOWCASE */}
      <div className="rounded-[20px] sm:rounded-[24px] bg-[#f2f2f3] p-2.5 sm:p-8 mb-6 sm:mb-8 font-['var(--font-sohne)',sans-serif]">
        
        {/* Header bar */}
        <div className="p-2 sm:p-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#ececec]/80 pb-4 sm:pb-5 mb-4 sm:mb-6">
          <div>
            <div className="flex items-center gap-2 text-[12px] font-mono text-[#979799] mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#17191c]" />
              <span>Interactive Graph Runtime</span>
            </div>
            <h3 className="text-[20px] sm:text-[26px] font-medium text-[#17191c] leading-snug">
              Infinite Canvas Editor
            </h3>
            <p className="mt-1 text-[14px] sm:text-[15px] text-[#777b86] leading-relaxed max-w-2xl">
              Design multi-branch pipelines visually with automatic topological cycle validation, draggable node handles, and real-time execution states.
            </p>
          </div>

          <Link 
            href="/workflows"
            className="inline-flex items-center gap-2 text-[13px] sm:text-[14px] font-normal bg-[#17191c] text-[#ffffff] px-4 sm:px-5 py-2 sm:py-2.5 rounded-full hover:bg-black transition-all shrink-0 self-start sm:self-auto"
          >
            <span>Launch studio</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Link>
        </div>

        {/* Full uncropped zoomed-out canvas screenshot - Maximized mobile view */}
        <div className="rounded-[16px] sm:rounded-[20px] bg-[#ffffff] border border-[#ececec] overflow-hidden shadow-[0_0_0_1px_rgba(4,23,43,0.05),0_20px_25px_-5px_rgba(0,0,0,0.08),0_8px_10px_-6px_rgba(0,0,0,0.06)] group">
          {/* Browser frame title */}
          <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 bg-[#fafafb] border-b border-[#ececec] text-[11px] sm:text-[12px] font-mono text-[#979799]">
            <div className="flex items-center gap-1.5 truncate">
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ececec] shrink-0" />
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ececec] shrink-0" />
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ececec] shrink-0" />
              <span className="ml-1 sm:ml-2 text-[#777b86] truncate">app.conduit.run / workflows</span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-[#979799] shrink-0">DAG Graph</span>
          </div>

          {/* Zero padding on mobile for edge-to-edge crispness */}
          <div className="w-full p-0 sm:p-4 bg-[#ffffff]">
            <Image
              src="/screenshots/canvas-editor.jpg"
              alt="Conduit Visual Canvas Editor"
              width={1920}
              height={1080}
              className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.005]"
              priority
            />
          </div>
        </div>

      </div>

      {/* 2. ROW OF 2 SECONDARY FEATURE SCREENSHOTS - Maximized mobile view */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 font-['var(--font-sohne)',sans-serif]">
        {SECONDARY_SCREENSHOTS.map((item) => (
          <div
            key={item.id}
            className="rounded-[20px] sm:rounded-[24px] bg-[#f2f2f3] p-3.5 sm:p-8 flex flex-col justify-between group hover:border-[#17191c] transition-all"
          >
            <div className="p-1 sm:p-0">
              <div className="text-[12px] sm:text-[13px] font-mono text-[#979799] mb-1.5 sm:mb-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#17191c]" />
                <span>{item.badge}</span>
              </div>
              <h4 className="text-[18px] sm:text-[20px] font-medium text-[#17191c] leading-snug mb-1.5 sm:mb-2">
                {item.title}
              </h4>
              <p className="text-[13px] sm:text-[15px] text-[#777b86] leading-relaxed mb-3 sm:mb-6">
                {item.description}
              </p>
            </div>

            {/* Edge-to-edge screenshot container on mobile for maximal image size */}
            <div className="rounded-[14px] sm:rounded-[18px] bg-[#ffffff] border border-[#ececec] overflow-hidden p-0 sm:p-3 shadow-sm group-hover:shadow-md transition-shadow">
              <Image
                src={item.image}
                alt={item.title}
                width={1200}
                height={750}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
