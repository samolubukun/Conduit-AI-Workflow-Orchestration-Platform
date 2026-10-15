import Image from "next/image";
import Link from "next/link";
import { Github, Info } from "lucide-react";
import { IS_SHOWCASE_MODE } from "@/components/landing/showcase-modal";

export const AuthLayout = ({ children }: { children: React.ReactNode; }) => {
  return (
    <div className="bg-muted flex min-h-svh flex-col justify-center items-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2.5 self-center font-medium">
          <Image src="/logos/logo-light.svg" alt="Conduit" width={30} height={30} />
          Conduit
        </Link>

        {IS_SHOWCASE_MODE && (
          <div className="rounded-xl border border-[#e5e5e7] bg-white p-4 shadow-sm text-xs text-[#777b86] space-y-2">
            <div className="flex items-center gap-1.5 font-medium text-[#17191c]">
              <Info className="w-3.5 h-3.5 text-[#5d2a1a]" />
              <span>Open-Source Showcase Mode</span>
            </div>
            <p className="leading-relaxed">
              Live database & auth servers are not provisioned on this hosted showcase preview. To run auth, persistent pipelines, and studio runners, self-host Conduit with your own configuration.
            </p>
            <a
              href="https://github.com/samolubukun/Conduit-AI-Workflow-Orchestration-Platform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#17191c] font-medium hover:underline pt-1"
            >
              <Github className="w-3 h-3" />
              <span>Clone & view docs on GitHub</span>
            </a>
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

