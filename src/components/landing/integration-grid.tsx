"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface IntegrationItem {
  name: string;
  category: "ai" | "messaging" | "data" | "productivity" | "storage";
  description: string;
  logo: string;
}

const INTEGRATIONS: IntegrationItem[] = [
  { name: "OpenAI", category: "ai", description: "GPT-4o, o1, and embeddings generation", logo: "/logos/openai.svg" },
  { name: "Anthropic", category: "ai", description: "Claude 3.5 Sonnet advanced reasoning", logo: "/logos/anthropic.svg" },
  { name: "DeepSeek", category: "ai", description: "DeepSeek R1 and reasoning models", logo: "/logos/deepseek.svg" },
  { name: "Google Gemini", category: "ai", description: "Gemini 1.5 Pro & Flash multi-modal models", logo: "/logos/gemini.svg" },
  { name: "ElevenLabs", category: "ai", description: "Hyper-realistic voice synthesis & TTS", logo: "/logos/elevenlabs.svg" },
  { name: "Deepgram", category: "ai", description: "Speech-to-text Nova-2 transcription", logo: "/logos/deepgram.svg" },
  { name: "Stripe", category: "productivity", description: "Real-time payment triggers & webhooks", logo: "/logos/stripe.svg" },
  { name: "GitHub", category: "productivity", description: "Commits, pull requests & issue sync", logo: "/logos/github.svg" },
  { name: "Notion", category: "data", description: "Read, write & update database records", logo: "/logos/notion.svg" },
  { name: "Airtable", category: "data", description: "Relational cloud spreadsheets & formulas", logo: "/logos/airtable.svg" },
  { name: "Linear", category: "productivity", description: "Issue tracking & automated engineering triage", logo: "/logos/linear.svg" },
  { name: "Tavily", category: "productivity", description: "Real-time autonomous AI search engine", logo: "/logos/tavily.svg" },
  { name: "Telegram", category: "messaging", description: "Bot messaging, group alerts & updates", logo: "/logos/telegram.svg" },
  { name: "Resend", category: "messaging", description: "Transactional email delivery engine", logo: "/logos/resend.svg" },
  { name: "Twilio", category: "messaging", description: "Global SMS and WhatsApp messages", logo: "/logos/twilio.svg" },
  { name: "Pinecone", category: "storage", description: "High-dimensional vector database for RAG", logo: "/logos/pinecone.svg" },
  { name: "AWS S3 / R2", category: "storage", description: "Cloud object storage for audio & files", logo: "/logos/s3.svg" },
  { name: "Google Forms", category: "productivity", description: "Instant webhook submission triggers", logo: "/logos/googleform.svg" },
];

export function IntegrationGrid() {
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" 
    ? INTEGRATIONS 
    : INTEGRATIONS.filter((item) => item.category === filter);

  return (
    <section id="integrations" className="py-24 px-4 sm:px-6 max-w-[1200px] mx-auto border-t border-[#f2f2f3]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="font-['var(--font-sohne)',sans-serif] text-[14px] text-[#979799] uppercase tracking-wider block mb-3">
            Ecosystem
          </span>
          <h2 className="font-['var(--font-signifier)',Georgia,serif] text-4xl sm:text-5xl font-normal tracking-[-0.96px] text-[#17191c]">
            Native connectors & protocols
          </h2>
          <p className="mt-3 font-['var(--font-sohne)',sans-serif] text-[17px] text-[#777b86]">
            Trigger pipelines from any service, process with top-tier AI, and dispatch anywhere.
          </p>
        </div>

        {/* Filter pill buttons */}
        <div className="flex flex-wrap items-center gap-2 font-['var(--font-sohne)',sans-serif]">
          {["all", "ai", "messaging", "data", "productivity", "storage"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full text-[14px] font-normal capitalize transition-all ${
                filter === cat
                  ? "bg-[#17191c] text-[#ffffff]"
                  : "bg-[#f2f2f3] text-[#777b86] hover:text-[#17191c]"
              }`}
            >
              {cat === "all" ? "All Connectors" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: 20px radius cards on white with hairline border */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-['var(--font-sohne)',sans-serif]">
        {filtered.map((item) => (
          <div
            key={item.name}
            className="group flex items-start gap-4 p-5 rounded-[20px] bg-[#ffffff] border border-[#ececec] hover:border-[#17191c] transition-all"
          >
            <div className="flex items-center justify-center w-11 h-11 rounded-[14px] bg-[#f2f2f3] shrink-0">
              <Image 
                src={item.logo} 
                alt={item.name} 
                width={22} 
                height={22} 
                className="object-contain" 
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-[16px] font-medium text-[#17191c]">
                  {item.name}
                </h4>
                <span className="text-[11px] font-mono text-[#979799]">
                  {item.category}
                </span>
              </div>
              <p className="text-[13px] text-[#777b86] mt-1 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/workflows"
          className="inline-flex items-center text-[15px] text-[#17191c] hover:underline underline-offset-4"
        >
          <span>Need custom API webhooks or OAuth? Configure in studio</span>
          <span className="ml-1.5">→</span>
        </Link>
      </div>
    </section>
  );
}
