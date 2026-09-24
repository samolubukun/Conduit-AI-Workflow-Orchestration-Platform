"use client";

import { TopUpDialog } from "@/components/billing/top-up-dialog";

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UpgradeModal = ({ open, onOpenChange }: UpgradeModalProps) => {
  return <TopUpDialog open={open} onOpenChange={onOpenChange} />;
};
