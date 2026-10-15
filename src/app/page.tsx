"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Github, 
  Sparkles, 
  Send, 
  AtSign, 
  Info,
  TrendingUp,
  SlidersHorizontal,
  CheckCircle2
} from "lucide-react";
import { LandingNavbar, LandingFooter } from "@/components/landing/landing-nav";
import { HeroWorkflowSimulator } from "@/components/landing/hero-workflow-simulator";
import { AboutSection } from "@/components/landing/about-section";
import { BentoShowcase } from "@/components/landing/bento-showcase";
import { IntegrationGrid } from "@/components/landing/integration-grid";
import { PricingPreview } from "@/components/landing/pricing-preview";
import { useShowcase } from "@/components/landing/showcase-modal";

export default function LandingPage() {
  const [composerPrompt, setComposerPrompt] = useState("");
  const [submittedPrompt, setSubmittedPrompt] = useState<string | null>(null);
  const { isOpenSourceMode, openShowcaseModal } = useShowcase();

  const handleStartBuildingClick = (e: React.MouseEvent) => {
    if (isOpenSourceMode) {
      e.preventDefault();
      openShowcaseModal("Studio Registration & Workspace Setup");
    }
  };

  const handleComposerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composerPrompt.trim()) return;
    setSubmittedPrompt(composerPrompt);
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#17191c] flex flex-col selection:bg-[#fbe1d1] selection:text-[#5d2a1a] overflow-x-hidden">
      {/* Editorial Navbar */}
      <LandingNavbar />

      <main className="flex-1 w-full overflow-x-hidden">
        {/* HERO SECTION: Editorial Spread on Paper White Canvas */}
        <section className="relative pt-12 sm:pt-24 pb-16 sm:pb-20 px-3.5 sm:px-6 overflow-hidden">
          
          <div className="max-w-[1200px] mx-auto relative z-10 w-full">
            
            {/* Top Display Typography Spread */}
            <div className="max-w-4xl mx-auto text-center">
              {/* 90px Display Serif Headline */}
              <h1 className="font-['var(--font-signifier)',Georgia,serif] text-4xl sm:text-6xl md:text-[76px] lg:text-[88px] font-normal tracking-[-2px] text-[#17191c] leading-[1.08]">
                The workflow platform <br className="hidden sm:inline" />
                <span className="italic">built for modern intelligence.</span>
              </h1>

              {/* Sub-headline: Sohne 18px */}
              <p className="mt-7 font-['var(--font-sohne)',sans-serif] text-[17px] sm:text-[19px] text-[#777b86] max-w-2xl mx-auto leading-relaxed">
                Connect reasoning models, voice synthesis, vector databases, and instant webhooks on an interactive visual canvas. Backed by durable execution and hardware-encrypted vaults.
              </p>

              {/* Hero CTA Button Pair */}
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4 font-['var(--font-sohne)',sans-serif]">
                <Link
                  href="/signup"
                  onClick={handleStartBuildingClick}
                  className="inline-flex items-center justify-center text-[15px] font-normal bg-transparent text-[#17191c] border border-[#17191c] px-7 py-3 rounded-full hover:bg-[#17191c] hover:text-[#ffffff] transition-all"
                >
                  <span>Start building free</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <a
                  href="https://github.com/samolubukun/Conduit-AI-Workflow-Orchestration-Platform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center text-[15px] font-normal bg-[#17191c] text-[#ffffff] px-6 py-3 rounded-full hover:bg-black transition-all gap-2"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </div>

              {/* Micro Badges (Typographic tags in Ash Gray) */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 font-['var(--font-sohne)',sans-serif] text-[13px] text-[#979799]">
                <span>No credit card required</span>
                <span>·</span>
                <span>50 Complimentary credits</span>
                <span>·</span>
                <span>Sub-100ms execution runners</span>
              </div>
            </div>

            {/* FLOATING PRODUCT ARTIFACTS COLLAGE */}
            <div className="mt-14 relative">
              
              {/* Floating Artifact 1: Active Execution Stat Card (Top Right / Offset) */}
              <div className="hidden lg:flex absolute -top-10 -right-6 z-20 w-72 rounded-[20px] bg-[#ffffff] p-5 shadow-[0_0_0_1px_rgba(4,23,43,0.05),0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] flex-col gap-3 font-['var(--font-sohne)',sans-serif]">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] text-[#979799]">Pipeline Throughput</span>
                  {/* Live Avatar Monogram with directional pointer */}
                  <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#fbe1d1] text-[#5d2a1a] text-[11px] font-medium">
                    AF
                    <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-[#5d2a1a] rotate-45" />
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <div className="text-[24px] font-medium text-[#17191c]">48.2k ops</div>
                  <div className="text-[12px] text-[#5d2a1a] font-mono">↑ 5.5x vs last week</div>
                </div>
                {/* Gestural line sparkline in Sienna Brown stroke */}
                <svg className="w-full h-8 overflow-visible" viewBox="0 0 100 24" fill="none">
                  <path
                    d="M 0 18 Q 20 22, 35 12 T 70 8 T 100 2"
                    stroke="#5d2a1a"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="100" cy="2" r="3" fill="#5d2a1a" />
                </svg>
              </div>

              {/* Floating Artifact 2: Live Pipeline Queue Table (Top Left / Offset) */}
              <div className="hidden lg:flex absolute -top-8 -left-6 z-20 w-72 rounded-[20px] bg-[#ffffff] p-4 shadow-[0_0_0_1px_rgba(4,23,43,0.05),0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] flex-col gap-2.5 font-['var(--font-sohne)',sans-serif]">
                <div className="flex items-center justify-between border-b border-[#f2f2f3] pb-2 text-[12px] text-[#979799]">
                  <span>Active Nodes</span>
                  <span className="text-[#17191c] font-medium">Latency</span>
                </div>
                <div className="space-y-1.5 text-[12px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#17191c] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#17191c]" />
                      DeepSeek R1
                    </span>
                    <span className="font-mono text-[#777b86]">420ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#17191c] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#17191c]" />
                      ElevenLabs Voice
                    </span>
                    <span className="font-mono text-[#777b86]">180ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#17191c] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#17191c]" />
                      Telegram Webhook
                    </span>
                    <span className="font-mono text-[#777b86]">45ms</span>
                  </div>
                </div>
              </div>

              {/* Interactive Node Canvas Simulator */}
              <div id="workflow">
                <HeroWorkflowSimulator />
              </div>

              {/* Floating Artifact 3: AI Input Composer (Sitting below the simulator) */}
              <div className="mt-8 max-w-xl mx-auto w-full px-1">
                <form
                  onSubmit={handleComposerSubmit}
                  className="w-full rounded-[16px] bg-[#ffffff] border border-[#ececec] p-1.5 sm:p-3 shadow-[0_0_0_1px_rgba(4,23,43,0.05),0_8px_20px_-4px_rgba(0,0,0,0.08)] flex items-center gap-2 sm:gap-3 transition-all focus-within:border-[#17191c]"
                >
                  <div className="hidden sm:flex items-center gap-1 text-[#979799] pl-2 shrink-0">
                    <AtSign className="w-4 h-4 cursor-pointer hover:text-[#17191c]" />
                    <Info className="w-4 h-4 cursor-pointer hover:text-[#17191c]" />
                  </div>
                  
                  <input
                    type="text"
                    value={composerPrompt}
                    onChange={(e) => setComposerPrompt(e.target.value)}
                    placeholder="Ask anything... or prompt a pipeline"
                    className="flex-1 min-w-0 bg-transparent text-[14px] sm:text-[15px] text-[#17191c] placeholder:text-[#a3a6af] focus:outline-none font-['var(--font-sohne)',sans-serif] px-2 sm:px-0"
                  />

                  <button
                    type="submit"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#17191c] text-[#ffffff] flex items-center justify-center shrink-0 hover:bg-black transition-transform active:scale-95"
                    aria-label="Send prompt"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {submittedPrompt && (
                  <div className="mt-3 text-center font-['var(--font-sohne)',sans-serif] text-[13px] text-[#777b86] animate-in fade-in">
                    Prompt dispatched to studio runtime: &ldquo;<span className="text-[#17191c]">{submittedPrompt}</span>&rdquo;
                  </div>
                )}
              </div>

            </div>

          </div>
        </section>

        {/* LOGO MARQUEE / MODEL ARCHITECTURE BAND (Fog White background) */}
        <section className="py-14 border-y border-[#f2f2f3] bg-[#fafafb]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <p className="text-center font-['var(--font-sohne)',sans-serif] text-[13px] text-[#979799] tracking-wider uppercase mb-8">
              Seamlessly orchestrates with world-class models & platforms
            </p>

            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 font-['var(--font-sohne)',sans-serif] text-[14px] text-[#777b86]">
              <div className="flex items-center gap-2">
                <Image src="/logos/openai.svg" alt="OpenAI" width={20} height={20} />
                <span>OpenAI</span>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/logos/anthropic.svg" alt="Anthropic" width={20} height={20} />
                <span>Anthropic</span>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/logos/deepseek.svg" alt="DeepSeek" width={20} height={20} />
                <span>DeepSeek</span>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/logos/stripe.svg" alt="Stripe" width={24} height={18} />
                <span>Stripe</span>
              </div>
              <a 
                href="https://github.com/samolubukun/Conduit-AI-Workflow-Orchestration-Platform" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 hover:text-[#17191c] transition-colors"
              >
                <Image src="/logos/github.svg" alt="GitHub" width={18} height={18} />
                <span>GitHub</span>
              </a>
              <div className="flex items-center gap-2">
                <Image src="/logos/notion.svg" alt="Notion" width={18} height={18} />
                <span>Notion</span>
              </div>
              <div className="flex items-center gap-2">
                <Image src="/logos/telegram.svg" alt="Telegram" width={18} height={18} />
                <span>Telegram</span>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION (Includes the single Accent Blush Peach Card) */}
        <AboutSection />

        {/* BENTO CAPABILITIES (24px Mist Gray cards) */}
        <div id="features">
          <BentoShowcase />
        </div>

        {/* INTEGRATIONS CATALOG */}
        <div id="integrations">
          <IntegrationGrid />
        </div>

        {/* PRICING PREVIEW */}
        <div id="pricing">
          <PricingPreview />
        </div>

        {/* EDITORIAL CALL TO ACTION */}
        <section className="py-24 sm:py-32 px-4 sm:px-6 bg-[#fafafb] border-t border-[#f2f2f3]">
          <div className="max-w-[1200px] mx-auto text-center">
            <h2 className="font-['var(--font-signifier)',Georgia,serif] text-4xl sm:text-5xl lg:text-6xl font-normal tracking-[-0.96px] text-[#17191c] max-w-2xl mx-auto leading-tight">
              Ready to orchestrate your <br className="hidden sm:inline" />
              <span className="italic">first autonomous pipeline?</span>
            </h2>

            <p className="mt-5 font-['var(--font-sohne)',sans-serif] text-[17px] text-[#777b86] max-w-xl mx-auto leading-relaxed">
              Start building in minutes. Includes 50 free execution credits, full access to flagship models, and zero credit card requirement.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 font-['var(--font-sohne)',sans-serif]">
              <Link
                href="/signup"
                onClick={handleStartBuildingClick}
                className="inline-flex items-center justify-center text-[15px] font-normal bg-[#17191c] text-[#ffffff] px-8 py-3 rounded-full hover:bg-black transition-all"
              >
                <span>Create free account</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

          </div>
        </section>
      </main>

      {/* Editorial Footer */}
      <LandingFooter />
    </div>
  );
}
