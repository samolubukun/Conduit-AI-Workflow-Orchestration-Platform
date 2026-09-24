import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Provider } from 'jotai'
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Conduit | AI Workflow Automation",
  description: "Build, automate, and orchestrate event-driven intelligence pipelines with Conduit.",
  icons: {
    icon: "/logos/logo-light.svg",
    shortcut: "/logos/logo-light.svg",
    apple: "/logos/logo-light.svg",
  },
};

import { StackProvider } from "@stackframe/stack";
import { stackServerApp } from "@/lib/stack-auth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StackProvider app={stackServerApp}>
            <TRPCReactProvider>
              <NuqsAdapter>
                <Provider>
                  {children}
                  <Toaster />
                </Provider>
              </NuqsAdapter>
            </TRPCReactProvider>
        </StackProvider>
      </body>
    </html>
  );
}
