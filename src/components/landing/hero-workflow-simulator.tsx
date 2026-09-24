"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Play, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Layers,
  Cpu,
  GitBranch,
  Send
} from "lucide-react";

export function HeroWorkflowSimulator() {
  const [activeStep, setActiveStep] = useState(0);
  const [tokensProcessed, setTokensProcessed] = useState(4829);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
      setTokensProcessed((prev) => prev + Math.floor(Math.random() * 28 + 12));
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-12 rounded-3xl border border-border/80 bg-gradient-to-b from-card/90 via-card/70 to-card/40 p-4 sm:p-8 backdrop-blur-xl shadow-2xl shadow-primary/5">
      {/* Decorative top bar imitating modern studio UI */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-border/60 pb-3 sm:pb-4 mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="flex gap-1.5 shrink-0">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-destructive/60" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/60" />
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/60" />
          </div>
          <span className="text-[11px] sm:text-xs font-mono text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-md border border-border/40 whitespace-nowrap truncate max-w-[140px] sm:max-w-none">
            conduit-flow.agent
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs ml-auto shrink-0">
          <div className="flex items-center gap-1.5 text-muted-foreground font-mono text-[11px] sm:text-xs">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Live Pipeline</span>
          </div>
          <div className="font-mono text-xs text-muted-foreground hidden md:block">
            {tokensProcessed.toLocaleString()} ops executed
          </div>
        </div>
      </div>

      {/* Visual Canvas Representation with animated SVG connectors and flow particles */}
      <div className="relative min-h-[380px] sm:min-h-[420px] flex items-center justify-center overflow-hidden rounded-2xl bg-muted/20 border border-border/40 p-4 sm:p-8">
        
        {/* Subtle grid background */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Ambient background glow orb */}
        <div className="absolute w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none -top-12 -left-12" />
        <div className="absolute w-72 h-72 rounded-full bg-sky-500/10 blur-3xl pointer-events-none -bottom-12 -right-12" />

        {/* Desktop/Tablet SVG Bezier Connecting Cables with animateMotion particles and arrowheads */}
        <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="flowGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="flowGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="flowGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
            </linearGradient>

            {/* React Flow styled arrow markers */}
            <marker id="arrow1" markerWidth="10" markerHeight="10" viewBox="-10 -10 20 20" orient="auto-start-reverse" refX="2" refY="0">
              <polyline points="-5,-4 0,0 -5,4" fill="#8b5cf6" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
            <marker id="arrow2" markerWidth="10" markerHeight="10" viewBox="-10 -10 20 20" orient="auto-start-reverse" refX="2" refY="0">
              <polyline points="-5,-4 0,0 -5,4" fill="#a855f7" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
            <marker id="arrow3" markerWidth="10" markerHeight="10" viewBox="-10 -10 20 20" orient="auto-start-reverse" refX="2" refY="0">
              <polyline points="-5,-4 0,0 -5,4" fill="#10b981" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
          </defs>

          {/* Edge 1: Trigger -> LLM Reasoner */}
          <g>
            <path 
              d="M 170 210 C 240 210, 260 210, 335 210" 
              stroke="currentColor" 
              strokeOpacity="0.15" 
              strokeWidth="2.5" 
              fill="none" 
            />
            <path 
              id="path-edge-1"
              d="M 170 210 C 240 210, 260 210, 335 210" 
              stroke="url(#flowGrad1)" 
              strokeWidth="2.5" 
              strokeDasharray="6 6"
              className="animate-flow-dash" 
              markerEnd="url(#arrow1)"
              fill="none" 
            />
            <circle r="4" fill="#818cf8" className="shadow-lg">
              <animateMotion dur="2.2s" repeatCount="indefinite" path="M 170 210 C 240 210, 260 210, 335 210" />
            </circle>
          </g>

          {/* Edge 2: LLM Reasoner -> Condition Router */}
          <g>
            <path 
              d="M 450 210 C 520 210, 535 210, 605 210" 
              stroke="currentColor" 
              strokeOpacity="0.15" 
              strokeWidth="2.5" 
              fill="none" 
            />
            <path 
              id="path-edge-2"
              d="M 450 210 C 520 210, 535 210, 605 210" 
              stroke="url(#flowGrad2)" 
              strokeWidth="2.5" 
              strokeDasharray="6 6"
              className="animate-flow-dash" 
              markerEnd="url(#arrow2)"
              fill="none" 
            />
            <circle r="4" fill="#a855f7">
              <animateMotion dur="2.4s" repeatCount="indefinite" path="M 450 210 C 520 210, 535 210, 605 210" />
            </circle>
          </g>

          {/* Edge 3A: Router -> Notion CRM (Top branch) */}
          <g>
            <path 
              d="M 720 210 C 770 210, 780 155, 845 155" 
              stroke="currentColor" 
              strokeOpacity="0.15" 
              strokeWidth="2.5" 
              fill="none" 
            />
            <path 
              id="path-edge-3a"
              d="M 720 210 C 770 210, 780 155, 845 155" 
              stroke="url(#flowGrad3)" 
              strokeWidth="2.5" 
              strokeDasharray="6 6"
              className="animate-flow-dash" 
              markerEnd="url(#arrow3)"
              fill="none" 
            />
            <circle r="4" fill="#10b981">
              <animateMotion dur="2.1s" repeatCount="indefinite" path="M 720 210 C 770 210, 780 155, 845 155" />
            </circle>
          </g>

          {/* Edge 3B: Router -> Telegram Alert (Bottom branch) */}
          <g>
            <path 
              d="M 720 210 C 770 210, 780 265, 845 265" 
              stroke="currentColor" 
              strokeOpacity="0.15" 
              strokeWidth="2.5" 
              fill="none" 
            />
            <path 
              id="path-edge-3b"
              d="M 720 210 C 770 210, 780 265, 845 265" 
              stroke="url(#flowGrad3)" 
              strokeWidth="2.5" 
              strokeDasharray="6 6"
              className="animate-flow-dash" 
              markerEnd="url(#arrow3)"
              fill="none" 
            />
            <circle r="4" fill="#10b981">
              <animateMotion dur="2.6s" repeatCount="indefinite" path="M 720 210 C 770 210, 780 265, 845 265" />
            </circle>
          </g>
        </svg>

        {/* Nodes Cluster */}
        <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 px-2 sm:px-6">
          
          {/* Node 1: Webhook Trigger (Stripe / GitHub / Google Form) */}
          <div 
            onClick={() => setActiveStep(0)}
            className={`relative group cursor-pointer flex flex-col items-center p-4 rounded-2xl border transition-all duration-300 w-full md:w-48 bg-card/95 backdrop-blur-md shadow-md hover:shadow-xl ${
              activeStep === 0 
                ? "border-primary ring-2 ring-primary/30 scale-105 shadow-primary/10" 
                : "border-border/80 hover:border-primary/50"
            }`}
          >
            {/* React Flow output handle */}
            <div className="hidden md:block absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-indigo-500 border-2 border-white dark:border-background shadow-sm z-20" />
            <div className="md:hidden absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-indigo-500 border-2 border-white dark:border-background shadow-sm z-20" />

            <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mb-3 group-hover:scale-110 transition-transform">
              <Image src="/logos/stripe.svg" alt="Stripe" width={32} height={20} className="object-contain" />
              {activeStep === 0 && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-indigo-500" />
                </span>
              )}
              {/* Reference Checkmark Badge */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white dark:border-card shadow-sm">
                <CheckCircle2 className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
              <Zap className="w-3 h-3 text-indigo-500" /> Trigger
            </div>
            <div className="text-sm font-semibold text-foreground mt-0.5">Stripe Webhook</div>
            <div className="text-[11px] text-muted-foreground mt-1 text-center font-mono">invoice.payment_succeeded</div>
          </div>

          {/* Mobile connecting arrow between Node 1 & Node 2 */}
          <div className="md:hidden flex flex-col items-center -my-3 text-indigo-500/70">
            <div className="w-0.5 h-6 bg-gradient-to-b from-indigo-500 to-sky-500 relative">
              <div className="w-2 h-2 rounded-full bg-indigo-400 absolute left-1/2 -translate-x-1/2 animate-bounce" />
            </div>
          </div>

          {/* Node 2: AI Intelligence Reasoning Node */}
          <div 
            onClick={() => setActiveStep(1)}
            className={`relative group cursor-pointer flex flex-col items-center p-4 rounded-2xl border transition-all duration-300 w-full md:w-48 bg-card/95 backdrop-blur-md shadow-md hover:shadow-xl ${
              activeStep === 1 
                ? "border-sky-500 ring-2 ring-sky-500/30 scale-105 shadow-sky-500/10" 
                : "border-border/80 hover:border-sky-500/50"
            }`}
          >
            {/* React Flow input and output handles */}
            <div className="hidden md:block absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600 border-2 border-white dark:border-background shadow-sm z-20" />
            <div className="hidden md:block absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-sky-500 border-2 border-white dark:border-background shadow-sm z-20" />
            <div className="md:hidden absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600 border-2 border-white dark:border-background shadow-sm z-20" />
            <div className="md:hidden absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-sky-500 border-2 border-white dark:border-background shadow-sm z-20" />

            <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 mb-3 group-hover:scale-110 transition-transform">
              <Image src="/logos/anthropic.svg" alt="Claude 3.5 Sonnet" width={26} height={26} className="object-contain" />
              {activeStep === 1 && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-sky-500" />
                </span>
              )}
              {/* Reference Checkmark Badge */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white dark:border-card shadow-sm">
                <CheckCircle2 className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-sky-500" /> LLM Reasoner
            </div>
            <div className="text-sm font-semibold text-foreground mt-0.5">Anthropic Claude</div>
            <div className="text-[11px] text-muted-foreground mt-1 text-center font-mono">Customer Tier Analysis</div>
          </div>

          {/* Mobile connecting arrow between Node 2 & Node 3 */}
          <div className="md:hidden flex flex-col items-center -my-3 text-sky-500/70">
            <div className="w-0.5 h-6 bg-gradient-to-b from-sky-500 to-purple-500 relative">
              <div className="w-2 h-2 rounded-full bg-sky-400 absolute left-1/2 -translate-x-1/2 animate-bounce" />
            </div>
          </div>

          {/* Node 3: Condition Router */}
          <div 
            onClick={() => setActiveStep(2)}
            className={`relative group cursor-pointer flex flex-col items-center p-4 rounded-2xl border transition-all duration-300 w-full md:w-48 bg-card/95 backdrop-blur-md shadow-md hover:shadow-xl ${
              activeStep === 2 
                ? "border-purple-500 ring-2 ring-purple-500/30 scale-105 shadow-purple-500/10" 
                : "border-border/80 hover:border-purple-500/50"
            }`}
          >
            {/* React Flow input and output handles */}
            <div className="hidden md:block absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600 border-2 border-white dark:border-background shadow-sm z-20" />
            
            {/* Yes / No source handles on right edge like reference */}
            <div className="hidden md:flex absolute -right-2 top-[32%] items-center z-20">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-background shadow-sm" />
              <span className="ml-1 text-[9px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">Yes</span>
            </div>
            <div className="hidden md:flex absolute -right-2 top-[68%] items-center z-20">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500 border-2 border-white dark:border-background shadow-sm" />
              <span className="ml-1 text-[9px] font-mono text-rose-500 font-bold">No</span>
            </div>

            <div className="md:hidden absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600 border-2 border-white dark:border-background shadow-sm z-20" />
            <div className="md:hidden absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-purple-500 border-2 border-white dark:border-background shadow-sm z-20" />

            <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 mb-3 group-hover:scale-110 transition-transform">
              <GitBranch className="w-6 h-6 text-purple-500" />
              {activeStep === 2 && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-purple-500" />
                </span>
              )}
              {/* Reference Checkmark Badge */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white dark:border-card shadow-sm">
                <CheckCircle2 className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
              <Layers className="w-3 h-3 text-purple-500" /> Logic Branch
            </div>
            <div className="text-sm font-semibold text-foreground mt-0.5">Smart Router</div>
            <div className="text-[11px] text-muted-foreground mt-1 text-center font-mono">tier == &quot;ENTERPRISE&quot;</div>
          </div>

          {/* Mobile connecting arrow between Node 3 & Branch */}
          <div className="md:hidden flex flex-col items-center -my-3 text-purple-500/70">
            <div className="w-0.5 h-6 bg-gradient-to-b from-purple-500 to-emerald-500 relative">
              <div className="w-2 h-2 rounded-full bg-emerald-400 absolute left-1/2 -translate-x-1/2 animate-bounce" />
            </div>
          </div>

          {/* Node 4 (Split Branches): Notion DB + Telegram Alert / Resend */}
          <div className="flex flex-col gap-4 w-full md:w-48">
            <div 
              onClick={() => setActiveStep(3)}
              className={`relative group cursor-pointer flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 bg-card/95 backdrop-blur-md shadow-sm hover:shadow-md ${
                activeStep === 3 
                  ? "border-emerald-500 ring-2 ring-emerald-500/30 scale-102 shadow-emerald-500/10" 
                  : "border-border/80 hover:border-emerald-500/50"
              }`}
            >
              {/* React Flow target handle */}
              <div className="hidden md:block absolute -left-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600 border-2 border-white dark:border-background shadow-sm z-20" />

              <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 shrink-0">
                <Image src="/logos/notion.svg" alt="Notion" width={18} height={18} />
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white dark:border-card shadow-sm">
                  <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-foreground truncate">Sync Notion CRM</div>
                <div className="text-[10px] text-muted-foreground font-mono truncate">Created Record #401</div>
              </div>
            </div>

            <div 
              onClick={() => setActiveStep(3)}
              className={`relative group cursor-pointer flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 bg-card/95 backdrop-blur-md shadow-sm hover:shadow-md ${
                activeStep === 3 
                  ? "border-emerald-500 ring-2 ring-emerald-500/30 scale-102 shadow-emerald-500/10" 
                  : "border-border/80 hover:border-emerald-500/50"
              }`}
            >
              {/* React Flow target handle */}
              <div className="hidden md:block absolute -left-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600 border-2 border-white dark:border-background shadow-sm z-20" />

              <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 shrink-0">
                <Image src="/logos/telegram.svg" alt="Telegram" width={18} height={18} />
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white dark:border-card shadow-sm">
                  <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-foreground truncate">Telegram Alert</div>
                <div className="text-[10px] text-muted-foreground font-mono truncate">VIP Channel Notified</div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Step description tracker ticker */}
      <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div className={`p-3 rounded-xl border transition-colors ${activeStep === 0 ? "border-primary/50 bg-primary/5 font-medium" : "border-border/40 text-muted-foreground"}`}>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span className="font-semibold text-foreground">1. Ingest Event</span>
          </div>
          <p className="text-[11px] leading-relaxed">Instant webhook payload received and verified securely.</p>
        </div>

        <div className={`p-3 rounded-xl border transition-colors ${activeStep === 1 ? "border-sky-500/50 bg-sky-500/5 font-medium" : "border-border/40 text-muted-foreground"}`}>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
            <span className="font-semibold text-foreground">2. AI Inference</span>
          </div>
          <p className="text-[11px] leading-relaxed">Claude or GPT evaluates customer profile with zero prompt lag.</p>
        </div>

        <div className={`p-3 rounded-xl border transition-colors ${activeStep === 2 ? "border-purple-500/50 bg-purple-500/5 font-medium" : "border-border/40 text-muted-foreground"}`}>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            <span className="font-semibold text-foreground">3. Condition Route</span>
          </div>
          <p className="text-[11px] leading-relaxed">Dynamic multi-branch routing checks criteria in real-time.</p>
        </div>

        <div className={`p-3 rounded-xl border transition-colors ${activeStep === 3 ? "border-emerald-500/50 bg-emerald-500/5 font-medium" : "border-border/40 text-muted-foreground"}`}>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="font-semibold text-foreground">4. Multi-Dispatch</span>
          </div>
          <p className="text-[11px] leading-relaxed">Simultaneously updates Notion, fires Telegram alerts, and sends emails.</p>
        </div>
      </div>
    </div>
  );
}
