"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

export function PricingPreview() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      name: "Starter",
      badge: "Free tier",
      price: "$0",
      description: "Everything you need to automate personal pipelines and explore Conduit.",
      credits: "50 Free Credits on sign-up",
      features: [
        "Up to 3 active workflows",
        "OpenAI & Gemini model access",
        "Standard execution latency",
        "Community Discord support",
        "Encrypted credential vault"
      ],
      cta: "Get started free",
      href: "/signup",
      popular: false,
    },
    {
      name: "Pro Builder",
      badge: "Most selected",
      price: billingCycle === "monthly" ? "$29" : "$24",
      period: "/month",
      description: "For creators, developers and teams running production automations.",
      credits: "500 Credits / month included",
      features: [
        "Unlimited workflows & executions",
        "DeepSeek R1, Claude 3.5 Sonnet & GPT-4o",
        "ElevenLabs Voice & Deepgram STT",
        "Telegram & Twilio SMS/WhatsApp dispatch",
        "Pinecone Vector RAG & S3 Storage",
        "Priority queue processing & webhooks"
      ],
      cta: "Start with Pro",
      href: "/signup",
      popular: true,
    },
    {
      name: "Enterprise",
      badge: "Custom scale",
      price: "$99",
      period: "/month",
      description: "Dedicated infrastructure, custom SLAs, and high-concurrency throughput.",
      credits: "2,500 Credits / month included",
      features: [
        "Dedicated Inngest workflow runners",
        "Sub-100ms cold start latency",
        "Custom OAuth application credentials",
        "Multi-seat team workspace",
        "Dedicated engineer onboarding",
        "Custom volume discounts"
      ],
      cta: "Contact Enterprise",
      href: "/signup",
      popular: false,
    }
  ];

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 max-w-[1200px] mx-auto border-t border-[#f2f2f3]">
      <div className="max-w-2xl mb-16">
        <span className="font-['var(--font-sohne)',sans-serif] text-[14px] text-[#979799] uppercase tracking-wider block mb-3">
          Pricing
        </span>
        <h2 className="font-['var(--font-signifier)',Georgia,serif] text-4xl sm:text-5xl font-normal tracking-[-0.96px] text-[#17191c]">
          Transparent credit economics.
        </h2>
        <p className="mt-3 font-['var(--font-sohne)',sans-serif] text-[17px] text-[#777b86]">
          Every account receives 50 free credits instantly. Upgrade as your automation scale expands.
        </p>

        {/* Minimal pill toggle */}
        <div className="mt-6 inline-flex items-center gap-1 p-1 rounded-full bg-[#f2f2f3] font-['var(--font-sohne)',sans-serif] text-[14px]">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 py-1.5 rounded-full transition-all ${
              billingCycle === "monthly"
                ? "bg-[#17191c] text-[#ffffff]"
                : "text-[#777b86] hover:text-[#17191c]"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              billingCycle === "yearly"
                ? "bg-[#17191c] text-[#ffffff]"
                : "text-[#777b86] hover:text-[#17191c]"
            }`}
          >
            <span>Annual</span>
            <span className="text-[11px] text-[#979799]">(-20%)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch font-['var(--font-sohne)',sans-serif]">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col justify-between rounded-[24px] p-8 transition-all ${
              plan.popular
                ? "bg-[#ffffff] border-2 border-[#17191c] shadow-[0_0_0_1px_rgba(4,23,43,0.05),0_20px_25px_-5px_rgba(0,0,0,0.08)]"
                : "bg-[#f2f2f3] border border-transparent"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[20px] font-medium text-[#17191c]">{plan.name}</h3>
                <span className="text-[12px] text-[#979799]">
                  {plan.badge}
                </span>
              </div>

              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-normal text-[#17191c] font-['var(--font-signifier)',Georgia,serif]">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-[13px] text-[#777b86]">{plan.period}</span>
                )}
              </div>
              <p className="text-[14px] text-[#777b86] mb-6 leading-relaxed">{plan.description}</p>

              <div className="p-3.5 rounded-[16px] bg-[#ffffff] border border-[#ececec] text-[13px] text-[#17191c] mb-6 font-mono">
                {plan.credits}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-[14px] text-[#17191c]">
                    <Check className="w-4 h-4 text-[#17191c] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href={plan.href}
              className={`w-full py-2.5 rounded-full text-center text-[15px] font-normal transition-all ${
                plan.popular
                  ? "bg-[#17191c] text-[#ffffff] hover:bg-black"
                  : "bg-transparent text-[#17191c] border border-[#17191c] hover:bg-[#17191c] hover:text-[#ffffff]"
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
