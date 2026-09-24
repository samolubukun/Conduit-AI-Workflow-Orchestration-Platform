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

export const GitHubTriggerDialog = ({
  open,
  onOpenChange,
}: Props) => {
  const params = useParams();
  const workflowId = params.workflowId as string;

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const webhookUrl = `${baseUrl}/api/webhooks/github?workflowId=${workflowId}`;

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
          <DialogTitle>GitHub Webhook Trigger Configuration</DialogTitle>
          <DialogDescription>
            Add this webhook URL to your GitHub Repository Settings to trigger this workflow on push, issue, pull request, and star events.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhook-url">Payload URL</Label>
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
          <div className="rounded-md bg-muted/60 p-3 text-xs space-y-1.5">
            <p className="font-semibold text-foreground">GitHub Webhook Setup:</p>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground text-[11px]">
              <li>Go to your GitHub repo → <strong>Settings</strong> → <strong>Webhooks</strong> → <strong>Add webhook</strong></li>
              <li>Paste the URL above into <strong>Payload URL</strong></li>
              <li>Set Content type to <strong>application/json</strong></li>
              <li>Select which events trigger this webhook (e.g. Issues, Pull requests, Pushes)</li>
            </ol>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
