"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Menu, 
  X, 
  Layers, 
  Github, 
  Sparkles,
  Zap,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 transition-transform group-hover:scale-105 overflow-hidden shadow-sm p-1.5">
            <Image src="/logos/logo-light.svg" alt="Conduit Logo" width={32} height={32} className="object-contain w-full h-full" priority />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-foreground">Conduit</span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-muted-foreground">
          <a href="#about" className="hover:text-foreground transition-colors">Process</a>
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#workflow" className="hover:text-foreground transition-colors">Visual Simulator</a>
          <a href="#integrations" className="hover:text-foreground transition-colors">Integrations</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
        </nav>

        {/* Actions / Auth */}
        <div className="hidden sm:flex items-center gap-3">
          <Button asChild variant="ghost" size="sm" className="text-xs font-semibold">
            <Link href="/login">Sign in</Link>
          </Button>
          <Button asChild size="sm" className="text-xs font-semibold rounded-xl shadow-sm hover:shadow-md">
            <Link href="/signup">
              <span>Sign up</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border/80 bg-background/95 backdrop-blur-2xl px-4 py-6 space-y-4">
          <div className="flex flex-col space-y-3 text-sm font-medium">
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground py-1"
            >
              Process
            </a>
            <a 
              href="#features" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground py-1"
            >
              Features
            </a>
            <a 
              href="#workflow" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground py-1"
            >
              Visual Simulator
            </a>
            <a 
              href="#integrations" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground py-1"
            >
              Integrations
            </a>
            <a 
              href="#pricing" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted-foreground hover:text-foreground py-1"
            >
              Pricing
            </a>
          </div>

          <div className="pt-4 border-t border-border/40 flex flex-col gap-2">
            <Button asChild variant="outline" className="w-full justify-center text-xs font-semibold">
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild className="w-full justify-center text-xs font-semibold">
              <Link href="/signup">
                <span>Sign up</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

export function LandingFooter() {
  return (
    <footer className="border-t border-border/40 bg-[#070b14] text-white py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        
        {/* Centered Brand Emblem in framing box with accent shadow/border like reference */}
        <div className="relative mb-6 group">
          <div className="absolute -inset-1 rounded-2xl bg-indigo-500/20 blur-sm group-hover:bg-indigo-500/30 transition-all pointer-events-none" />
          <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-white border-2 border-indigo-400/80 shadow-2xl p-2.5 overflow-hidden">
            <Image 
              src="/logos/logo-light.svg" 
              alt="Conduit" 
              width={52} 
              height={52} 
              className="object-contain" 
            />
          </div>
        </div>

        {/* Brand Name Title */}
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-wider text-white uppercase mb-3">
          CONDUIT
        </h3>

        {/* Tagline */}
        <p className="text-xs sm:text-sm font-semibold tracking-widest text-slate-300/80 uppercase max-w-xl mx-auto mb-10 leading-relaxed">
          The unified workflow automation engine for data intelligence and AI execution.
        </p>

        {/* Centered Links Bar */}
        <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-medium text-slate-300/90 mb-12">
          <a href="#features" className="hover:text-indigo-400 transition-colors">Features</a>
          <a href="#workflow" className="hover:text-indigo-400 transition-colors">Visual Simulator</a>
          <a href="#integrations" className="hover:text-indigo-400 transition-colors">Integrations</a>
          <a href="#pricing" className="hover:text-indigo-400 transition-colors">Pricing</a>
          <Link href="/terms" className="hover:text-indigo-400 transition-colors">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link>
        </nav>

        {/* Copyright & Designed and developed attribution */}
        <div className="flex flex-col items-center gap-2 text-xs text-slate-400/80 font-normal">
          <div>© {new Date().getFullYear()} Conduit. All rights reserved.</div>
          <div className="text-[12px] text-slate-400">
            Designed and developed by{" "}
            <a 
              href="https://samuelolubukun.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4 transition-colors font-medium"
            >
              Samuel Olubukun
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
