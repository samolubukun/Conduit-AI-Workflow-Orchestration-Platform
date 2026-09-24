import React from "react";
import Link from "next/link";
import { LandingNavbar, LandingFooter } from "@/components/landing/landing-nav";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <LandingNavbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Terms of Service
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Last updated: September 24, 2026
        </p>

        <div className="prose dark:prose-invert max-w-none space-y-6 text-sm sm:text-base leading-relaxed text-muted-foreground">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">1. Agreement to Terms</h2>
            <p>
              By accessing or using Conduit (&quot;the Service&quot;), provided by Conduit, you agree to be bound by these Terms of Service. If you do not agree to all terms, do not access or use our services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">2. Account Registration & Security</h2>
            <p>
              To access workflow automation features, you must authenticate through supported OAuth providers (GitHub or Google) or email magic links via Stack Auth or Better Auth. You are responsible for safeguarding your credentials and third-party API keys provided in the Credential Vault.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">3. Usage Credits & Billing</h2>
            <p>
              New accounts receive complimentary starter credits. Continued execution of AI nodes, speech transcription, or voice synthesis consumes credits according to the pricing tier in effect at runtime. Subscription plans renew automatically until cancelled.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">4. Permissible Use & Safety</h2>
            <p>
              You agree not to use Conduit to orchestrate automated spam, distributed denial of service attacks, unauthorized data harvesting, or violate provider terms (including OpenAI, Anthropic, DeepSeek, Google, Telegram, Twilio, or Stripe API agreements).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">5. Limitation of Liability</h2>
            <p>
              In no event shall Conduit, its affiliates, or developers be liable for any indirect, incidental, or consequential damages resulting from third-party API downtime, external model rate limits, or network failures.
            </p>
          </section>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
