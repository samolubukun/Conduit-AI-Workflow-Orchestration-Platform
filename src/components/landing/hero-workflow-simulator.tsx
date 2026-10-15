"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { 
  CheckCircle2, 
  Zap, 
  Sparkles, 
  GitBranch, 
  Layers
} from "lucide-react";

export function HeroWorkflowSimulator() {
  const [activeStep, setActiveStep] = useState(0);
  const [tokensProcessed, setTokensProcessed] = useState(4829);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
      setTokensProcessed((prev) => prev + Math.floor(Math.random() * 28 + 12));
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-[1040px] mx-auto rounded-[24px] bg-[#ffffff] border border-[#ececec] p-3 sm:p-7 shadow-[0_0_0_1px_rgba(4,23,43,0.05),0_20px_25px_-5px_rgba(0,0,0,0.08),0_8px_10px_-6px_rgba(0,0,0,0.06)] overflow-hidden">
      {/* Decorative top bar: quiet editorial title and status */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f2f2f3] pb-3.5 mb-5 font-['var(--font-sohne)',sans-serif]">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ececec]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ececec]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#17191c]" />
          </div>
          <span className="text-[13px] text-[#777b86]">
            pipeline.conduit.run
          </span>
        </div>

        <div className="flex items-center gap-4 text-[13px]">
          <div className="flex items-center gap-1.5 text-[#17191c]">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#17191c] opacity-40" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#17191c]" />
            </span>
            <span className="font-normal">Execution active</span>
          </div>
          <div className="text-[#979799] hidden sm:block">
            {tokensProcessed.toLocaleString()} ops logged
          </div>
        </div>
      </div>

      {/* Visual Canvas Representation: Flat Mist Gray surface with hairline connector wires */}
      <div className="relative min-h-[360px] sm:min-h-[380px] flex items-center justify-center overflow-hidden rounded-[20px] bg-[#fafafb] border border-[#ececec] p-4 sm:p-8">
        
        {/* Subtle dot matrix grid */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #17191c 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}
        />

        {/* SVG Bezier Connecting Cables */}
        <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="arrow-steep" markerWidth="8" markerHeight="8" viewBox="-10 -10 20 20" orient="auto-start-reverse" refX="2" refY="0">
              <polyline points="-5,-4 0,0 -5,4" fill="#17191c" stroke="#17191c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
          </defs>

          {/* Edge 1: Trigger -> AI Reasoner */}
          <g>
            <path 
              d="M 180 190 C 240 190, 260 190, 325 190" 
              stroke="#ececec" 
              strokeWidth="2" 
              fill="none" 
            />
            <path 
              d="M 180 190 C 240 190, 260 190, 325 190" 
              stroke="#17191c" 
              strokeWidth="2" 
              strokeDasharray="4 4"
              markerEnd="url(#arrow-steep)"
              fill="none" 
            />
            <circle r="3.5" fill="#17191c">
              <animateMotion dur="2.4s" repeatCount="indefinite" path="M 180 190 C 240 190, 260 190, 325 190" />
            </circle>
          </g>

          {/* Edge 2: AI Reasoner -> Router */}
          <g>
            <path 
              d="M 445 190 C 505 190, 520 190, 580 190" 
              stroke="#ececec" 
              strokeWidth="2" 
              fill="none" 
            />
            <path 
              d="M 445 190 C 505 190, 520 190, 580 190" 
              stroke="#17191c" 
              strokeWidth="2" 
              strokeDasharray="4 4"
              markerEnd="url(#arrow-steep)"
              fill="none" 
            />
            <circle r="3.5" fill="#17191c">
              <animateMotion dur="2.4s" repeatCount="indefinite" path="M 445 190 C 505 190, 520 190, 580 190" />
            </circle>
          </g>

          {/* Edge 3A: Router -> Notion CRM (Top branch) */}
          <g>
            <path 
              d="M 700 190 C 740 190, 755 140, 815 140" 
              stroke="#ececec" 
              strokeWidth="2" 
              fill="none" 
            />
            <path 
              d="M 700 190 C 740 190, 755 140, 815 140" 
              stroke="#17191c" 
              strokeWidth="2" 
              strokeDasharray="4 4"
              markerEnd="url(#arrow-steep)"
              fill="none" 
            />
            <circle r="3.5" fill="#17191c">
              <animateMotion dur="2.2s" repeatCount="indefinite" path="M 700 190 C 740 190, 755 140, 815 140" />
            </circle>
          </g>

          {/* Edge 3B: Router -> Telegram Alert (Bottom branch) */}
          <g>
            <path 
              d="M 700 190 C 740 190, 755 240, 815 240" 
              stroke="#ececec" 
              strokeWidth="2" 
              fill="none" 
            />
            <path 
              d="M 700 190 C 740 190, 755 240, 815 240" 
              stroke="#17191c" 
              strokeWidth="2" 
              strokeDasharray="4 4"
              markerEnd="url(#arrow-steep)"
              fill="none" 
            />
            <circle r="3.5" fill="#17191c">
              <animateMotion dur="2.6s" repeatCount="indefinite" path="M 700 190 C 740 190, 755 240, 815 240" />
            </circle>
          </g>
        </svg>

        {/* Nodes Cluster */}
        <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 px-2 sm:px-6 font-['var(--font-sohne)',sans-serif]">
          
          {/* Node 1: Webhook Trigger */}
          <div 
            onClick={() => setActiveStep(0)}
            className={`relative group cursor-pointer flex flex-col items-center p-4 rounded-[20px] transition-all duration-300 w-full md:w-44 bg-[#ffffff] border ${
              activeStep === 0 
                ? "border-[#17191c] shadow-[0_0_0_1px_#17191c,0_12px_20px_-5px_rgba(0,0,0,0.08)] scale-102" 
                : "border-[#ececec] hover:border-[#17191c]"
            }`}
          >
            <div className="hidden md:block absolute -right-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#17191c] border-2 border-[#ffffff] shadow-sm z-20" />

            <div className="relative flex items-center justify-center w-12 h-12 rounded-[16px] bg-[#f2f2f3] mb-2.5">
              <Image src="/logos/stripe.svg" alt="Stripe" width={28} height={18} className="object-contain" />
              {activeStep === 0 && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#17191c] opacity-50" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#17191c]" />
                </span>
              )}
            </div>
            <div className="text-[12px] font-normal text-[#979799]">Trigger</div>
            <div className="text-[14px] font-medium text-[#17191c] mt-0.5">Stripe Webhook</div>
            <div className="text-[11px] text-[#777b86] mt-0.5 font-mono">payment_succeeded</div>
          </div>

          {/* Node 2: AI Intelligence Reasoning Node */}
          <div 
            onClick={() => setActiveStep(1)}
            className={`relative group cursor-pointer flex flex-col items-center p-4 rounded-[20px] transition-all duration-300 w-full md:w-44 bg-[#ffffff] border ${
              activeStep === 1 
                ? "border-[#17191c] shadow-[0_0_0_1px_#17191c,0_12px_20px_-5px_rgba(0,0,0,0.08)] scale-102" 
                : "border-[#ececec] hover:border-[#17191c]"
            }`}
          >
            <div className="hidden md:block absolute -left-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#979799] border-2 border-[#ffffff] z-20" />
            <div className="hidden md:block absolute -right-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#17191c] border-2 border-[#ffffff] z-20" />

            <div className="relative flex items-center justify-center w-12 h-12 rounded-[16px] bg-[#f2f2f3] mb-2.5">
              <Image src="/logos/anthropic.svg" alt="Claude 3.5 Sonnet" width={22} height={22} className="object-contain" />
              {activeStep === 1 && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#17191c] opacity-50" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#17191c]" />
                </span>
              )}
            </div>
            <div className="text-[12px] font-normal text-[#979799]">AI Ingest</div>
            <div className="text-[14px] font-medium text-[#17191c] mt-0.5">Claude 3.5 Sonnet</div>
            <div className="text-[11px] text-[#777b86] mt-0.5 font-mono">Entity Extraction</div>
          </div>

          {/* Node 3: Condition Router */}
          <div 
            onClick={() => setActiveStep(2)}
            className={`relative group cursor-pointer flex flex-col items-center p-4 rounded-[20px] transition-all duration-300 w-full md:w-44 bg-[#ffffff] border ${
              activeStep === 2 
                ? "border-[#17191c] shadow-[0_0_0_1px_#17191c,0_12px_20px_-5px_rgba(0,0,0,0.08)] scale-102" 
                : "border-[#ececec] hover:border-[#17191c]"
            }`}
          >
            <div className="hidden md:block absolute -left-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#979799] border-2 border-[#ffffff] z-20" />
            
            <div className="relative flex items-center justify-center w-12 h-12 rounded-[16px] bg-[#f2f2f3] mb-2.5">
              <GitBranch className="w-5 h-5 text-[#17191c]" />
              {activeStep === 2 && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#17191c] opacity-50" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#17191c]" />
                </span>
              )}
            </div>
            <div className="text-[12px] font-normal text-[#979799]">Logic Gate</div>
            <div className="text-[14px] font-medium text-[#17191c] mt-0.5">Smart Router</div>
            <div className="text-[11px] text-[#777b86] mt-0.5 font-mono">tier == &quot;PRO&quot;</div>
          </div>

          {/* Node 4 (Split Branches): Notion DB + Telegram Alert */}
          <div className="flex flex-col gap-3 w-full md:w-44">
            <div 
              onClick={() => setActiveStep(3)}
              className={`relative group cursor-pointer flex items-center gap-2.5 p-3 rounded-[16px] transition-all duration-300 bg-[#ffffff] border ${
                activeStep === 3 
                  ? "border-[#17191c] shadow-sm" 
                  : "border-[#ececec] hover:border-[#17191c]"
              }`}
            >
              <div className="relative flex items-center justify-center w-8 h-8 rounded-[12px] bg-[#f2f2f3] shrink-0">
                <Image src="/logos/notion.svg" alt="Notion" width={16} height={16} />
              </div>
              <div className="min-w-0">
                <div className="text-[13px] font-medium text-[#17191c] truncate">Sync Notion</div>
                <div className="text-[10px] text-[#777b86] font-mono">Record #401</div>
              </div>
            </div>

            <div 
              onClick={() => setActiveStep(3)}
              className={`relative group cursor-pointer flex items-center gap-2.5 p-3 rounded-[16px] transition-all duration-300 bg-[#ffffff] border ${
                activeStep === 3 
                  ? "border-[#17191c] shadow-sm" 
                  : "border-[#ececec] hover:border-[#17191c]"
              }`}
            >
              <div className="relative flex items-center justify-center w-8 h-8 rounded-[12px] bg-[#f2f2f3] shrink-0">
                <Image src="/logos/telegram.svg" alt="Telegram" width={16} height={16} />
              </div>
              <div className="min-w-0">
                <div className="text-[13px] font-medium text-[#17191c] truncate">Telegram Alert</div>
                <div className="text-[10px] text-[#777b86] font-mono">Channel Notified</div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Step description tracker ticker */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 font-['var(--font-sohne)',sans-serif]">
        <div className={`p-3 rounded-[16px] border transition-colors ${activeStep === 0 ? "border-[#17191c] bg-[#fafafb]" : "border-[#ececec] bg-transparent text-[#777b86]"}`}>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#17191c] shrink-0" />
            <span className="text-[13px] font-medium text-[#17191c]">1. Ingest</span>
          </div>
          <p className="text-[12px] text-[#777b86] leading-relaxed break-words">Webhook verified with cryptographic signature.</p>
        </div>

        <div className={`p-3 rounded-[16px] border transition-colors ${activeStep === 1 ? "border-[#17191c] bg-[#fafafb]" : "border-[#ececec] bg-transparent text-[#777b86]"}`}>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#17191c] shrink-0" />
            <span className="text-[13px] font-medium text-[#17191c]">2. Reasoning</span>
          </div>
          <p className="text-[12px] text-[#777b86] leading-relaxed break-words">Multi-model prompt evaluation with fallback.</p>
        </div>

        <div className={`p-3 rounded-[16px] border transition-colors ${activeStep === 2 ? "border-[#17191c] bg-[#fafafb]" : "border-[#ececec] bg-transparent text-[#777b86]"}`}>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#17191c] shrink-0" />
            <span className="text-[13px] font-medium text-[#17191c]">3. Router</span>
          </div>
          <p className="text-[12px] text-[#777b86] leading-relaxed break-words">Criteria evaluated instantaneously in memory.</p>
        </div>

        <div className={`p-3 rounded-[16px] border transition-colors ${activeStep === 3 ? "border-[#17191c] bg-[#fafafb]" : "border-[#ececec] bg-transparent text-[#777b86]"}`}>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#17191c] shrink-0" />
            <span className="text-[13px] font-medium text-[#17191c]">4. Dispatch</span>
          </div>
          <p className="text-[12px] text-[#777b86] leading-relaxed break-words">Simultaneous synchronization across databases & alerts.</p>
        </div>
      </div>
    </div>
  );
}
