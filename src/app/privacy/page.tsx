import React from "react";
import Link from "next/link";
import { LandingNavbar, LandingFooter } from "@/components/landing/landing-nav";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <LandingNavbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Last updated: September 24, 2026
        </p>

        <div className="prose dark:prose-invert max-w-none space-y-6 text-sm sm:text-base leading-relaxed text-muted-foreground">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">1. Data We Collect</h2>
            <p>
              We collect your account profile information (email address and name) when you sign in via Stack Auth or Better Auth. When creating pipelines, workflow canvas node configurations and execution metadata (timestamps, token usage, latency) are collected to power execution logs.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">2. Credential Encryption</h2>
            <p>
              External service API keys and webhook secrets stored in the Credential Vault are encrypted at rest using AES-256 encryption. Your credentials are only decrypted in ephemeral, isolated serverless runtime environments to fulfill your workflow tasks.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">3. Third-Party AI Processors</h2>
            <p>
              Prompts and files routed through AI nodes (OpenAI, Anthropic, Gemini, DeepSeek, ElevenLabs, Deepgram) are transmitted directly via secure HTTPS APIs to fulfill workflow executions. We do not use your proprietary pipeline inputs or vector embeddings to train public models.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">4. Storage & Retention</h2>
            <p>
              Execution history and log artifacts are retained for 30 days on Pro plans and 90 days on Enterprise plans. You can delete workflows, vector references, and associated run data at any time from your studio workspace.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">5. Contact Information</h2>
            <p>
              For privacy-related inquiries or data deletion requests, contact us at <a href="mailto:privacy@conduit.app" className="text-primary hover:underline">privacy@conduit.app</a>.
            </p>
          </section>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}
