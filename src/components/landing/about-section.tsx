"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Globe2 } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 max-w-[1200px] mx-auto border-t border-[#f2f2f3]">
      
      {/* Editorial Spread Headline & Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16 sm:mb-20">
        
        {/* Left Column: 64px Signifier Headline */}
        <div className="lg:col-span-6">
          <span className="font-['var(--font-sohne)',sans-serif] text-[14px] text-[#979799] uppercase tracking-wider block mb-3">
            System Architecture
          </span>
          <h2 className="font-['var(--font-signifier)',Georgia,serif] text-4xl sm:text-5xl lg:text-[56px] font-normal tracking-[-0.96px] text-[#17191c] leading-[1.12]">
            Visual AI orchestration <br />
            <span className="italic">engineered for total clarity.</span>
          </h2>
        </div>

        {/* Right Column: Sohne body copy with ghost link */}
        <div className="lg:col-span-6 space-y-5 font-['var(--font-sohne)',sans-serif] text-[17px] text-[#777b86] leading-relaxed lg:pt-8">
          <p>
            Traditional automation engines trap multi-turn agent logic inside rigid dropdowns and hidden scripts. Conduit gives engineering teams an infinite visual canvas where every step, token stream, and API payload is immediately inspectable in real time.
          </p>
          <p>
            Connect state-of-the-art LLMs, multi-modal audio transcription, vector indices, and instant webhooks with hardware-encrypted secrets and deterministic step retries.
          </p>
          <div className="pt-2">
            <Link 
              href="/workflows" 
              className="inline-flex items-center text-[#17191c] font-normal text-[16px] hover:underline underline-offset-4 transition-all"
            >
              <span>Explore canvas architecture</span>
              <span className="ml-1.5">→</span>
            </Link>
          </div>
        </div>

      </div>

      {/* THE ACCENT BLUSH PEACH CARD (Strictly one instance on page for editorial warmth) */}
      <div className="rounded-[24px] bg-[#fbe1d1] p-8 sm:p-12 text-[#5d2a1a] mb-16 sm:mb-20">
        <div className="max-w-3xl">
          <span className="font-['var(--font-sohne)',sans-serif] text-[13px] uppercase tracking-wider text-[#5d2a1a]/70 font-medium block mb-3">
            Execution Performance
          </span>
          <h3 className="font-['var(--font-sohne)',sans-serif] text-2xl sm:text-3xl font-medium tracking-tight text-[#5d2a1a] mb-4 leading-snug">
            &ldquo;Deterministic graph resolution with sub-40ms edge traversal, zero-overhead node hydration, and durable step-level recovery across multi-model inference pipelines.&rdquo;
          </h3>
          <p className="font-['var(--font-sohne)',sans-serif] text-[15px] text-[#5d2a1a]/80">
            Topological DAG ordering · Inngest durable step-level retries · AES-256 encrypted credential hydration
          </p>
        </div>
      </div>

      {/* 3-Column Engineering Pillars: Flat Mist Gray Cards with 24px radius, no drop shadows */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Pillar 1 */}
        <div className="rounded-[24px] bg-[#f2f2f3] p-7 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="font-['var(--font-sohne)',sans-serif] text-[13px] text-[#979799] mb-3">
              Intelligence
            </div>
            <h4 className="font-['var(--font-sohne)',sans-serif] text-[20px] font-medium text-[#17191c] mb-2 leading-snug">
              Dynamic Model Arbitration
            </h4>
            <p className="font-['var(--font-sohne)',sans-serif] text-[15px] text-[#777b86] leading-relaxed">
              Route reasoning jobs across DeepSeek R1, Claude 3.5 Sonnet, and GPT-4o based on live latency, token expenditure, and error thresholds.
            </p>
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="rounded-[24px] bg-[#f2f2f3] p-7 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="font-['var(--font-sohne)',sans-serif] text-[13px] text-[#979799] mb-3">
              Infrastructure
            </div>
            <h4 className="font-['var(--font-sohne)',sans-serif] text-[20px] font-medium text-[#17191c] mb-2 leading-snug">
              Edge Execution Runners
            </h4>
            <p className="font-['var(--font-sohne)',sans-serif] text-[15px] text-[#777b86] leading-relaxed">
              Trigger instantaneous webhooks from Stripe, GitHub, or Telegram anywhere globally with sub-100ms guarantees and zero server warmup penalties.
            </p>
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="rounded-[24px] bg-[#f2f2f3] p-7 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="font-['var(--font-sohne)',sans-serif] text-[13px] text-[#979799] mb-3">
              Security
            </div>
            <h4 className="font-['var(--font-sohne)',sans-serif] text-[20px] font-medium text-[#17191c] mb-2 leading-snug">
              Zero-Trust Credential Vault
            </h4>
            <p className="font-['var(--font-sohne)',sans-serif] text-[15px] text-[#777b86] leading-relaxed">
              Store production API keys and OAuth secrets with AES-256 GCM hardware encryption. Decrypted strictly in ephemeral sandbox memory.
            </p>
          </div>
        </div>

      </div>

    </section>
  );
}
