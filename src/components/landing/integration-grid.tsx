"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, CheckCircle2 } from "lucide-react";

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
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto border-t border-border/60">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="text-xs font-mono font-semibold uppercase tracking-wider text-primary mb-2">
            Native Connectors
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Connect your favorite tools & models
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Trigger pipelines from any service, process with top-tier AI, and dispatch anywhere.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {["all", "ai", "messaging", "data", "productivity", "storage"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${
                filter === cat
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {cat === "all" ? "All Tools" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.name}
            className="group relative flex items-start gap-4 p-5 rounded-2xl border border-border/70 bg-card/70 hover:bg-card hover:border-primary/40 backdrop-blur-sm transition-all duration-200 hover:shadow-md"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-muted/60 border border-border/80 shrink-0 group-hover:scale-105 transition-transform">
              <Image 
                src={item.logo} 
                alt={item.name} 
                width={24} 
                height={24} 
                className={`object-contain ${item.name === "ElevenLabs" ? "dark:invert" : ""}`} 
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {item.name}
                </h4>
                <span className="text-[10px] font-mono uppercase text-muted-foreground px-1.5 py-0.5 rounded bg-muted/80">
                  {item.category}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/credentials"
          className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-primary hover:underline"
        >
          <span>Need custom API webhooks or OAuth? Explore credentials</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
