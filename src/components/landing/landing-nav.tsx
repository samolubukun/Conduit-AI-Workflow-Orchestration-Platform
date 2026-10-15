"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Github, ArrowRight } from "lucide-react";

export function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#ffffff]/90 backdrop-blur-md transition-all border-b border-[#f2f2f3]">
      <div className="max-w-[1200px] mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        
        {/* Brand Logo & Editorial Wordmark */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-6 h-6 text-[#17191c] transition-transform group-hover:scale-105">
            <svg viewBox="0 0 48 48" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <path d="M 10 24 C 16 24, 18 12, 34 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              <path d="M 10 24 C 18 24, 24 24, 38 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              <path d="M 10 24 C 16 24, 18 36, 34 36" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="10" cy="24" r="4.5" fill="none" stroke="currentColor" strokeWidth="2.5"/>
              <circle cx="10" cy="24" r="2" fill="currentColor"/>
              <circle cx="34" cy="12" r="3.8" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="34" cy="12" r="1.6" fill="currentColor"/>
              <circle cx="38" cy="24" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="38" cy="24" r="1.8" fill="currentColor"/>
              <circle cx="34" cy="36" r="3.8" fill="none" stroke="currentColor" strokeWidth="2"/>
              <circle cx="34" cy="36" r="1.6" fill="currentColor"/>
            </svg>
          </div>
          <span className="font-['var(--font-signifier)',Georgia,serif] text-xl font-normal tracking-[-0.66px] text-[#17191c]">
            Conduit
          </span>
        </Link>

        {/* Navigation Links (Whisper-quiet sans-serif, weight 400, no background) */}
        <nav className="hidden md:flex items-center gap-8 font-['var(--font-sohne)',sans-serif] text-[15px] font-normal text-[#17191c]">
          <a href="#about" className="hover:text-[#777b86] transition-colors py-0.5">Process</a>
          <a href="#features" className="hover:text-[#777b86] transition-colors py-0.5">Features</a>
          <a href="#workflow" className="hover:text-[#777b86] transition-colors py-0.5">Simulator</a>
          <a href="#integrations" className="hover:text-[#777b86] transition-colors py-0.5">Integrations</a>
          <a href="#pricing" className="hover:text-[#777b86] transition-colors py-0.5">Pricing</a>
        </nav>

        {/* Action Pair: Text Link + Filled Pill lozenge */}
        <div className="hidden sm:flex items-center gap-5">
          <a 
            href="https://github.com/samolubukun/Conduit-AI-Workflow-Orchestration-Platform" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-['var(--font-sohne)',sans-serif] text-[15px] font-normal text-[#17191c] hover:text-[#777b86] flex items-center gap-1.5 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <Link 
            href="/login" 
            className="font-['var(--font-sohne)',sans-serif] text-[15px] font-normal text-[#17191c] hover:text-[#777b86] transition-colors"
          >
            Sign in
          </Link>
          <Link 
            href="/signup" 
            className="inline-flex items-center justify-center font-['var(--font-sohne)',sans-serif] text-[15px] font-normal bg-[#17191c] text-[#ffffff] px-5 py-2 rounded-full hover:bg-black transition-all"
          >
            Get started
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#17191c] focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#ececec] bg-[#ffffff] px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3 font-['var(--font-sohne)',sans-serif] text-[15px] text-[#17191c]">
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#777b86]"
            >
              Process
            </a>
            <a 
              href="#features" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#777b86]"
            >
              Features
            </a>
            <a 
              href="#workflow" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#777b86]"
            >
              Visual Simulator
            </a>
            <a 
              href="#integrations" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#777b86]"
            >
              Integrations
            </a>
            <a 
              href="#pricing" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#777b86]"
            >
              Pricing
            </a>
          </div>

          <div className="pt-4 border-t border-[#f2f2f3] flex flex-col gap-3">
            <Link 
              href="/login" 
              className="w-full text-center py-2.5 font-['var(--font-sohne)',sans-serif] text-[15px] text-[#17191c] border border-[#17191c] rounded-full"
            >
              Sign in
            </Link>
            <Link 
              href="/signup" 
              className="w-full text-center py-2.5 font-['var(--font-sohne)',sans-serif] text-[15px] bg-[#17191c] text-[#ffffff] rounded-full"
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function LandingFooter() {
  return (
    <footer className="border-t border-[#f2f2f3] bg-[#ffffff] text-[#17191c] py-20 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-[#f2f2f3]">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-6 h-6 text-[#17191c]">
                <svg viewBox="0 0 48 48" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 10 24 C 16 24, 18 12, 34 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M 10 24 C 18 24, 24 24, 38 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M 10 24 C 16 24, 18 36, 34 36" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                  <circle cx="10" cy="24" r="4.5" fill="none" stroke="currentColor" strokeWidth="2.5"/>
                  <circle cx="10" cy="24" r="2" fill="currentColor"/>
                  <circle cx="34" cy="12" r="3.8" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="34" cy="12" r="1.6" fill="currentColor"/>
                  <circle cx="38" cy="24" r="4" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="38" cy="24" r="1.8" fill="currentColor"/>
                  <circle cx="34" cy="36" r="3.8" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="34" cy="36" r="1.6" fill="currentColor"/>
                </svg>
              </div>
              <span className="font-['var(--font-signifier)',Georgia,serif] text-xl font-normal tracking-tight text-[#17191c]">
                Conduit
              </span>
            </Link>
            <p className="font-['var(--font-sohne)',sans-serif] text-[15px] text-[#777b86] max-w-sm leading-relaxed">
              The workflow automation platform built for modern intelligence. Connect LLMs, voice, vector storage, and webhooks on a quiet canvas.
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-2">
            <h4 className="font-['var(--font-sohne)',sans-serif] text-[14px] text-[#979799] mb-4">
              Platform
            </h4>
            <ul className="space-y-3 font-['var(--font-sohne)',sans-serif] text-[15px] text-[#17191c]">
              <li><a href="#about" className="hover:text-[#777b86] transition-colors">Process</a></li>
              <li><a href="#features" className="hover:text-[#777b86] transition-colors">Features</a></li>
              <li><a href="#workflow" className="hover:text-[#777b86] transition-colors">Simulator</a></li>
              <li><a href="#integrations" className="hover:text-[#777b86] transition-colors">Integrations</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-['var(--font-sohne)',sans-serif] text-[14px] text-[#979799] mb-4">
              Resources
            </h4>
            <ul className="space-y-3 font-['var(--font-sohne)',sans-serif] text-[15px] text-[#17191c]">
              <li><a href="#pricing" className="hover:text-[#777b86] transition-colors">Pricing</a></li>
              <li><Link href="/workflows" className="hover:text-[#777b86] transition-colors">Studio</Link></li>
              <li>
                <a 
                  href="https://github.com/samolubukun/Conduit-AI-Workflow-Orchestration-Platform" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#777b86] transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-['var(--font-sohne)',sans-serif] text-[14px] text-[#979799] mb-4">
              Legal
            </h4>
            <ul className="space-y-3 font-['var(--font-sohne)',sans-serif] text-[15px] text-[#777b86]">
              <li><Link href="/terms" className="hover:text-[#17191c] transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-[#17191c] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Editorial Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-['var(--font-sohne)',sans-serif] text-[14px] text-[#777b86]">
          <div>
            © {new Date().getFullYear()} Conduit. All rights reserved.
          </div>
          <div>
            Built by{" "}
            <a 
              href="https://samuelolubukun.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#17191c] hover:underline underline-offset-4"
            >
              Samuel Olubukun
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
