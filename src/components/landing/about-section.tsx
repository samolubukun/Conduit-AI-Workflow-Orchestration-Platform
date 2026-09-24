"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Zap, Globe2, ShieldCheck, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StoryCard {
  badge: string;
  title: string;
  description: string;
  gradient: string;
  icon: React.ReactNode;
  heroTag?: string;
}

const FEATURED_HERO = {
  badge: "Core Architecture",
  headline: "Visual AI Orchestration & Execution",
  description:
    "Conduit connects multi-model AI reasoning, speech transcription, and cloud storage into unified reactive workflows. Built on a fast drag-and-drop canvas with instant execution guarantees and encrypted credentials.",
  cardTitle: "Multi-Modal Workflow Engine",
  cardSubtitle: "Orchestrate real-time pipelines with DeepSeek, Anthropic Claude, OpenAI, ElevenLabs voice, and instant database syncing.",
};

const STORIES: StoryCard[] = [
  {
    badge: "Intelligence",
    title: "Introducing Dynamic Model Arbitration",
    description:
      "Route complex reasoning jobs to DeepSeek R1 while falling back to Claude 3.5 Sonnet and GPT-4o based on live latency, token expenditure, and error thresholds.",
    gradient: "from-amber-400/80 via-orange-400/80 to-rose-400/80",
    icon: <Zap className="w-10 h-10 text-white drop-shadow-md" />,
    heroTag: "Smart Arbitrage",
  },
  {
    badge: "Infrastructure",
    title: "Global Low-Latency Edge Runners",
    description:
      "Trigger instantaneous webhooks from Stripe, GitHub, or Telegram anywhere in the world with sub-100ms execution guarantees and zero server warmup penalties.",
    gradient: "from-sky-400/80 via-blue-500/80 to-indigo-600/80",
    icon: <Globe2 className="w-10 h-10 text-white drop-shadow-md" />,
    heroTag: "Global Mesh",
  },
  {
    badge: "Security",
    title: "Zero-Trust Encrypted Credential Vault",
    description:
      "Store production API secrets and keys with AES-256 GCM hardware encryption. Secrets are decrypted strictly in ephemeral sandbox memory during node runtime.",
    gradient: "from-indigo-400/80 via-purple-500/80 to-pink-500/80",
    icon: <ShieldCheck className="w-10 h-10 text-white drop-shadow-md" />,
    heroTag: "AES-256 Vault",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto border-t border-border/40">
      
      {/* Top Featured Split Hero Section (Matches the "Supporters is now Plus" top layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* Left Headline & Overview */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-[1.08]">
            Built for scale.<br />Engineered for speed.
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {FEATURED_HERO.description}
          </p>

          <div className="pt-2">
            <Button asChild size="lg" className="rounded-full h-11 px-7 text-xs font-semibold shadow-md">
              <Link href="/signup">
                <span>Explore the Platform</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Right Large Featured Card (Matches the top teal card from reference) */}
        <div className="lg:col-span-7">
          <div className="group overflow-hidden rounded-3xl border border-border/80 bg-card shadow-xl transition-all duration-300 hover:shadow-2xl">
            {/* Upper Gradient Art Banner */}
            <div className="relative h-64 sm:h-72 w-full bg-gradient-to-tr from-cyan-400 via-sky-400 to-indigo-500 flex flex-col items-center justify-center p-6 text-white overflow-hidden">
              
              {/* Subtle mesh circle glows */}
              <div className="absolute w-60 h-60 rounded-full bg-white/15 blur-2xl pointer-events-none -top-10 -right-10" />
              <div className="absolute w-40 h-40 rounded-full bg-black/10 blur-xl pointer-events-none -bottom-10 -left-10" />

              {/* Tag pill at top-left */}
              <div className="absolute top-5 left-5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold tracking-wide text-white border border-white/25">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>{FEATURED_HERO.badge}</span>
              </div>

              {/* Center Iconic Emblem & Brand Title */}
              <div className="flex flex-col items-center text-center transform transition-transform duration-300 group-hover:scale-105">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 shadow-inner flex items-center justify-center mb-3">
                  <Layers className="w-7 h-7 text-white" />
                </div>
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight drop-shadow-sm">
                  Conduit Studio
                </span>
                <span className="text-xs sm:text-sm font-medium text-white/85 mt-1 tracking-wide">
                  Visual Workflow Orchestration
                </span>
              </div>
            </div>

            {/* Lower Metadata & Narrative Box */}
            <div className="p-6 sm:p-8 space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                {FEATURED_HERO.cardTitle}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {FEATURED_HERO.cardSubtitle}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* "More Stories / Platform Pillars" Row (Matches the 3 bottom cards from reference) */}
      <div className="mt-20 sm:mt-24 space-y-8">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
            Engineering Milestones
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Explore the core architectural breakthroughs powering Conduit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {STORIES.map((story) => (
            <div
              key={story.title}
              className="group overflow-hidden rounded-3xl border border-border/80 bg-card shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Card Banner with Soft Gradient & Emblem */}
              <div className={`relative h-44 sm:h-48 w-full bg-gradient-to-tr ${story.gradient} flex items-center justify-center p-4 text-white overflow-hidden`}>
                
                {/* Micro badge in top-left */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-semibold text-white border border-white/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span>{story.badge}</span>
                </div>

                {/* Central Motif Icon */}
                <div className="transform transition-transform duration-300 group-hover:scale-110">
                  {story.icon}
                </div>

                {/* Bottom subtle indicator */}
                <div className="absolute bottom-3 right-4 text-[10px] font-mono text-white/80 bg-black/15 px-2 py-0.5 rounded-md backdrop-blur-sm">
                  {story.heroTag}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-foreground leading-snug">
                    {story.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                    {story.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
