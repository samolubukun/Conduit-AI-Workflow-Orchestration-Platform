"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, Zap, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PricingPreview() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      name: "Starter",
      badge: "Free Forever",
      price: "$0",
      description: "Everything you need to automate personal pipelines and explore Conduit.",
      credits: "50 Free Credits on sign-up",
      features: [
        "Up to 3 active workflows",
        "OpenAI & Gemini access",
        "Standard execution latency",
        "Community Discord support",
        "Encrypted credential vault"
      ],
      cta: "Get Started Free",
      href: "/signup",
      popular: false,
    },
    {
      name: "Pro Builder",
      badge: "Most Popular",
      price: billingCycle === "monthly" ? "$29" : "$24",
      period: "/month",
      description: "For creators, developers and startups shipping high-velocity automations.",
      credits: "500 Credits / month included",
      features: [
        "Unlimited workflows & executions",
        "DeepSeek R1, Claude 3.5 Sonnet & GPT-4o",
        "ElevenLabs Voice & Deepgram STT",
        "Telegram & Twilio SMS/WhatsApp",
        "Pinecone Vector RAG & S3 Storage",
        "Priority queue processing & webhooks"
      ],
      cta: "Upgrade to Pro",
      href: "/signup",
      popular: true,
    },
    {
      name: "Enterprise",
      badge: "Custom Scale",
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
    <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto border-t border-border/60">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
          Transparent Credit-Based Pricing
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground mt-4">
          Pay for what you execute. Zero lock-in.
        </h2>
        <p className="mt-4 text-sm sm:text-base text-muted-foreground">
          Every new account receives 50 free credits instantly. Top up anytime using mock tokens or Stripe.
        </p>

        {/* Toggle */}
        <div className="mt-8 inline-flex items-center gap-3 p-1 rounded-full bg-muted/60 border border-border/60">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              billingCycle === "monthly"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              billingCycle === "yearly"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>Annual</span>
            <span className="text-[10px] font-semibold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.2 rounded-full">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-200 ${
              plan.popular
                ? "border-2 border-primary bg-gradient-to-b from-card via-card to-primary/5 shadow-2xl shadow-primary/10 scale-102"
                : "border border-border/80 bg-card/60 hover:bg-card hover:shadow-lg"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> {plan.badge}
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                {!plan.popular && (
                  <span className="text-[11px] font-mono font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
                    {plan.badge}
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                {plan.period && (
                  <span className="text-xs font-mono text-muted-foreground">{plan.period}</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-4">{plan.description}</p>

              <div className="p-3 rounded-xl bg-muted/60 border border-border/40 text-xs font-medium text-foreground mb-6 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{plan.credits}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-xs text-foreground/90">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              asChild
              variant={plan.popular ? "default" : "outline"}
              className="w-full h-11 text-xs font-semibold rounded-xl"
            >
              <Link href={plan.href}>
                <span>{plan.cta}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
