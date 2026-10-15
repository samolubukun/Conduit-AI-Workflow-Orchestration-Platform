"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import Link from "next/link";
import { Github, ExternalLink, Terminal, Sparkles, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ShowcaseContextType {
  isOpenSourceMode: boolean;
  openShowcaseModal: (featureName?: string) => void;
  closeShowcaseModal: () => void;
}

const ShowcaseContext = createContext<ShowcaseContextType | undefined>(undefined);

// Defaults to TRUE (showcase mode) unless explicitly enabled via NEXT_PUBLIC_ENABLE_LIVE_AUTH="true"
const isLiveAuthExplicitlyEnabled = 
  typeof process !== "undefined" && 
  process.env.NEXT_PUBLIC_ENABLE_LIVE_AUTH === "true";

export const IS_SHOWCASE_MODE = !isLiveAuthExplicitlyEnabled;

export function ShowcaseProvider({ children }: { children: ReactNode }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentFeature, setCurrentFeature] = useState<string>("Studio & Authentication");

  const openShowcaseModal = (featureName = "Studio & Authentication") => {
    setCurrentFeature(featureName);
    setModalOpen(true);
  };

  const closeShowcaseModal = () => {
    setModalOpen(false);
  };

  return (
    <ShowcaseContext.Provider
      value={{
        isOpenSourceMode: IS_SHOWCASE_MODE,
        openShowcaseModal,
        closeShowcaseModal,
      }}
    >
      {children}

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent 
          showCloseButton={true}
          className="w-[92vw] max-w-[500px] p-0 overflow-hidden border border-[#e5e5e7] bg-[#ffffff] text-[#17191c] shadow-2xl rounded-2xl sm:rounded-2xl gap-0 max-h-[92vh] flex flex-col"
        >
          {/* Subtle Top Header Strip */}
          <div className="bg-[#fafafb] border-b border-[#f2f2f3] px-5 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between shrink-0 pr-12">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#fbe1d1] text-[#5d2a1a] tracking-wide uppercase">
                <Sparkles className="w-3 h-3" />
                Showcase Preview
              </span>
            </div>
            <span className="text-[12px] font-mono text-[#979799] hidden xs:inline">v0.1 · open source</span>
          </div>

          <div className="p-4 sm:p-6 space-y-3.5 sm:space-y-4 overflow-y-auto no-scrollbar">
            <div className="space-y-1.5">
              <DialogTitle className="font-['var(--font-signifier)',Georgia,serif] text-xl sm:text-2xl font-normal tracking-tight text-[#17191c] leading-snug">
                Open-Source Architecture Demo
              </DialogTitle>
              <DialogDescription className="font-['var(--font-sohne)',sans-serif] text-[13px] sm:text-[14px] text-[#777b86] leading-relaxed break-words">
                <span className="font-medium text-[#17191c]">{currentFeature}</span> is disabled on this hosted static preview because live database instances, background worker runners (Inngest), and OAuth keys are not attached here.
              </DialogDescription>
            </div>

            {/* Terminal snippet to clone & run */}
            <div className="rounded-xl bg-[#17191c] p-3 sm:p-4 text-[#f5f5f7] font-mono text-[11.5px] sm:text-[12px] space-y-2 shadow-inner">
              <div className="flex items-center justify-between text-[#979799] text-[11px] border-b border-[#2a2c32] pb-1.5">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#e0e2ec]" />
                  <span>Self-host with your own environment</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#777b86]">bash</span>
              </div>
              <pre className="text-[11.5px] sm:text-[12px] text-[#e0e2ec] overflow-x-auto py-1 leading-relaxed sleek-dark-scrollbar pb-1.5">
                <code>
{`git clone https://github.com/samolubukun/Conduit-AI-Workflow-Orchestration-Platform.git
cd Conduit-AI-Workflow-Orchestration-Platform
cp .env.example .env
pnpm install && pnpm dev`}
                </code>
              </pre>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 pt-1 font-['var(--font-sohne)',sans-serif]">
              <a
                href="https://github.com/samolubukun/Conduit-AI-Workflow-Orchestration-Platform"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-[#17191c] text-[#ffffff] px-5 py-2.5 rounded-full text-[13px] sm:text-[14px] font-normal hover:bg-black transition-all"
              >
                <Github className="w-4 h-4" />
                <span>View on GitHub</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
              <button
                type="button"
                onClick={closeShowcaseModal}
                className="w-full sm:w-auto px-5 py-2.5 text-[13px] sm:text-[14px] text-[#777b86] hover:text-[#17191c] transition-colors rounded-full border border-[#ececec]"
              >
                Close Preview
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </ShowcaseContext.Provider>
  );
}

export function useShowcase() {
  const context = useContext(ShowcaseContext);
  if (!context) {
    return {
      isOpenSourceMode: IS_SHOWCASE_MODE,
      openShowcaseModal: () => {},
      closeShowcaseModal: () => {},
    };
  }
  return context;
}
