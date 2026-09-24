"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClockIcon, CalendarIcon } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ScheduleTriggerDialog = ({
  open,
  onOpenChange,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ClockIcon className="size-5 text-primary" />
            Schedule Trigger Configuration
          </DialogTitle>
          <DialogDescription>
            Automatically trigger this workflow on a recurring schedule or fixed interval.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="frequency">Interval / Frequency</Label>
            <Select defaultValue="hourly">
              <SelectTrigger id="frequency">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15min">Every 15 minutes</SelectItem>
                <SelectItem value="hourly">Every hour</SelectItem>
                <SelectItem value="daily">Every day (at midnight UTC)</SelectItem>
                <SelectItem value="weekly">Every Monday at 9:00 AM</SelectItem>
                <SelectItem value="monthly">First day of every month</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="rounded-md bg-muted/60 p-3 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-medium text-foreground">
              <CalendarIcon className="size-3.5" />
              <span>Cron Expression Supported</span>
            </div>
            <p className="text-muted-foreground text-[11px]">
              Workflows run in the background via Inngest cron worker. When triggered, the current timestamp is passed into the workflow output.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
