import { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { ClockIcon } from "lucide-react";
import { BaseTriggerNode } from "../base-trigger-node";
import { ScheduleTriggerDialog } from "./dialog";
import { useNodeStatus } from "@/features/executions/hooks/use-node-status";
import { fetchScheduleTriggerRealtimeToken } from "./actions";
import { SCHEDULE_TRIGGER_CHANNEL_NAME } from "@/inngest/channels/schedule-trigger";

export const ScheduleTriggerNode = memo((props: NodeProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const nodeStatus = useNodeStatus({
    nodeId: props.id,
    channel: SCHEDULE_TRIGGER_CHANNEL_NAME,
    topic: "status",
    refreshToken: fetchScheduleTriggerRealtimeToken,
  });

  const handleOpenSettings = () => setDialogOpen(true);

  return (
    <>
      <ScheduleTriggerDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
      <BaseTriggerNode
        {...props}
        icon={ClockIcon}
        name="Schedule / Cron"
        description="Trigger on recurring schedule or interval"
        status={nodeStatus}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});

ScheduleTriggerNode.displayName = "ScheduleTriggerNode";
