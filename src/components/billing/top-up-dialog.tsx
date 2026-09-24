"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  useCreditBalance,
  useCreateCheckout,
  useCompleteCheckout,
} from "@/features/billing/hooks/use-billing";
import { CoinsIcon, Loader2Icon, SparklesIcon } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import type { CreditPackage } from "@/server/billing/types";

interface TopUpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TopUpDialog = ({ open, onOpenChange }: TopUpDialogProps) => {
  const [selectedPkgId, setSelectedPkgId] = useState<string | null>(null);

  const { data: balanceData, refetch } = useCreditBalance();
  const createCheckoutMutation = useCreateCheckout();
  const completeCheckoutMutation = useCompleteCheckout();

  const handleBuy = async (packageId: string) => {
    setSelectedPkgId(packageId);
    try {
      const session = await createCheckoutMutation.mutateAsync({
        packageId,
        returnUrl: window.location.pathname,
      });

      // If mock gateway, complete immediately for smooth local developer experience
      if (session.provider === "mock") {
        await completeCheckoutMutation.mutateAsync({
          intentId: session.intentId,
        });
        toast.success("Credits added successfully!");
        await refetch();
        onOpenChange(false);
      } else {
        // Redirect to external gateway (Stripe, LemonSqueezy, etc.)
        window.location.href = session.checkoutUrl;
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to initiate top-up");
    } finally {
      setSelectedPkgId(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <CoinsIcon className="size-5" />
            </div>
            <div>
              <DialogTitle>Top Up Credits</DialogTitle>
              <DialogDescription>
                Current Balance:{" "}
                <span className="font-semibold text-foreground">
                  {balanceData?.credits ?? 0} Credits
                </span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="grid gap-3 py-2">
          {balanceData?.packages.map((pkg: CreditPackage) => {
            const isLoading =
              selectedPkgId === pkg.id &&
              (createCheckoutMutation.isPending ||
                completeCheckoutMutation.isPending);

            return (
              <div
                key={pkg.id}
                className="relative flex items-center justify-between p-4 rounded-xl border bg-card hover:border-primary/50 transition-colors shadow-sm"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{pkg.name}</span>
                    {pkg.badge && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/15 text-primary">
                        <SparklesIcon className="size-2.5" />
                        {pkg.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {pkg.description}
                  </p>
                  <p className="text-xs font-medium text-foreground">
                    +{pkg.credits} Credits
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="font-bold text-base">
                      ${(pkg.priceInCents / 100).toFixed(2)}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    disabled={createCheckoutMutation.isPending}
                    onClick={() => handleBuy(pkg.id)}
                    className="bg-[#070b14] text-white hover:bg-[#0f1624] shadow-sm font-medium px-4"
                  >
                    {isLoading ? (
                      <Loader2Icon className="size-4 animate-spin" />
                    ) : (
                      "Add Credits"
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};
