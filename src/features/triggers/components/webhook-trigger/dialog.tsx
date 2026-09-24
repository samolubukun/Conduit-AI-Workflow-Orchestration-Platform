"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CopyIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const WebhookTriggerDialog = ({
  open,
  onOpenChange,
}: Props) => {
  const params = useParams();
  const workflowId = params.workflowId as string;

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const webhookUrl = `${baseUrl}/api/webhooks/custom?workflowId=${workflowId}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(webhookUrl);
      toast.success("Webhook URL copied to clipboard");
    } catch {
      toast.error("Failed to copy URL");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Generic Webhook Trigger</DialogTitle>
          <DialogDescription>
            Send any HTTP POST request with a JSON body to this endpoint to start this workflow.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <div className="flex gap-2">
              <Input
                id="webhook-url"
                value={webhookUrl}
                readOnly
                className="font-mono text-xs"
              />
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={copyToClipboard}
              >
                <CopyIcon className="size-4" />
              </Button>
            </div>
          </div>
          <div className="rounded-md bg-muted/60 p-3 text-xs space-y-1.5 font-mono">
            <p className="font-semibold text-foreground font-sans text-xs">Example cURL Request:</p>
            <pre className="overflow-x-auto text-[11px] leading-relaxed text-muted-foreground p-2 rounded bg-background/50 border">
{`curl -X POST "${webhookUrl}" \\
  -H "Content-Type: application/json" \\
  -d '{"event": "user.signup", "email": "user@example.com"}'`}
            </pre>
            <p className="text-[11px] text-muted-foreground font-sans">
              Payload data is passed directly into the workflow context under <code className="bg-background px-1 py-0.5 rounded font-mono">webhook</code>.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
