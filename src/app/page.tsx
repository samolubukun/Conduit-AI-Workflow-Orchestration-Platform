import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Layers, 
  Play, 
  CheckCircle2,
  Workflow,
  Cpu,
  ArrowUpRight,
  GitBranch,
  Lock,
  Github
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LandingNavbar, LandingFooter } from "@/components/landing/landing-nav";
import { HeroWorkflowSimulator } from "@/components/landing/hero-workflow-simulator";
import { AboutSection } from "@/components/landing/about-section";
import { BentoShowcase } from "@/components/landing/bento-showcase";
import { IntegrationGrid } from "@/components/landing/integration-grid";
import { PricingPreview } from "@/components/landing/pricing-preview";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      {/* Navbar */}
      <LandingNavbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-20 pb-20 px-4 sm:px-6 overflow-hidden">
          
          {/* Subtle background glow mesh */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-primary/15 via-sky-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />
          
          <div className="max-w-5xl mx-auto text-center relative z-10">
            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08]">
              The <span className="bg-gradient-to-r from-[#070b14] via-[#16213e] to-[#0f172a] dark:from-[#cbd5e1] dark:via-[#94a3b8] dark:to-[#64748b] bg-clip-text text-transparent underline decoration-indigo-500/40 decoration-wavy decoration-2 underline-offset-8">workflow automation</span> platform built for modern intelligence.
            </h1>

            {/* Sub-headline */}
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Design, orchestrate, and execute autonomous pipelines. Connect multi-modal LLMs, speech-to-text, vector search, and webhooks on a fast visual canvas.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="h-12 px-8 rounded-2xl text-sm font-semibold shadow-lg shadow-primary/20 hover:shadow-xl transition-all">
                <Link href="/signup">
                  <span>Start Building Free</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 rounded-2xl text-sm font-semibold bg-card/60 backdrop-blur-sm hover:bg-card">
                <Link href="/workflows">
                  <span>Open Studio Dashboard</span>
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-6 rounded-2xl text-sm font-semibold bg-card/40 backdrop-blur-sm hover:bg-card/80 border-border/80 gap-2">
                <a 
                  href="https://github.com/samolubukun/Conduit-AI-Workflow-Orchestration-Platform" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </Button>
            </div>

            {/* Micro badges below buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground font-mono">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>50 Complimentary Credits</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Dual Auth (Better & Stack)</span>
              </div>
            </div>

            {/* Dynamic Interactive Node Simulator */}
            <div id="workflow">
              <HeroWorkflowSimulator />
            </div>
          </div>
        </section>

        {/* LOGO MARQUEE / SOCIAL PROOF */}
        <section className="py-12 border-y border-border/40 bg-muted/10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <p className="text-center text-xs font-mono uppercase tracking-widest text-muted-foreground mb-8">
              Seamlessly orchestrates with world-class models & platforms
            </p>

            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Image src="/logos/openai.svg" alt="OpenAI" width={22} height={22} />
                <span>OpenAI</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Image src="/logos/anthropic.svg" alt="Anthropic" width={20} height={20} />
                <span>Anthropic</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Image src="/logos/deepseek.svg" alt="DeepSeek" width={22} height={22} />
                <span>DeepSeek</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Image src="/logos/stripe.svg" alt="Stripe" width={28} height={20} />
                <span>Stripe</span>
              </div>
              <a 
                href="https://github.com/samolubukun/Conduit-AI-Workflow-Orchestration-Platform" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-sm font-semibold hover:text-foreground transition-colors"
              >
                <Image src="/logos/github.svg" alt="GitHub" width={20} height={20} />
                <span>GitHub</span>
              </a>
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Image src="/logos/notion.svg" alt="Notion" width={20} height={20} />
                <span>Notion</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Image src="/logos/telegram.svg" alt="Telegram" width={20} height={20} />
                <span>Telegram</span>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <AboutSection />

        {/* BENTO CAPABILITIES */}
        <div id="features">
          <BentoShowcase />
        </div>

        {/* INTEGRATIONS CATALOG */}
        <div id="integrations">
          <IntegrationGrid />
        </div>

        {/* PRICING */}
        <div id="pricing">
          <PricingPreview />
        </div>

        {/* FINAL CALL TO ACTION */}
        <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
          <div className="max-w-5xl mx-auto rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-cyan-500/10 p-8 sm:p-14 relative overflow-hidden backdrop-blur-xl text-center">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20 mb-6">
              <Zap className="w-3.5 h-3.5" /> Instant Onboarding
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              Ready to automate your workflows?
            </h2>

            <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
              Start building autonomous pipelines in minutes. No credit card required. Free tier includes 50 credits.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="h-12 px-8 rounded-2xl text-sm font-semibold shadow-lg shadow-primary/25">
                <Link href="/signup">
                  <span>Create Free Account</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 rounded-2xl text-sm font-semibold bg-card/60">
                <Link href="/workflows">
                  <span>View Demo Workflows</span>
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-6 rounded-2xl text-sm font-semibold bg-card/40 hover:bg-card/80 border-border/80 gap-2">
                <a 
                  href="https://github.com/samolubukun/Conduit-AI-Workflow-Orchestration-Platform" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  <span>Star on GitHub</span>
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}
