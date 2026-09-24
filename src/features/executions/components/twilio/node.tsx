"use client";

import { useReactFlow, type Node, type NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { TwilioDialog, TwilioFormValues } from "./dialog";
import { MessageSquareIcon } from "lucide-react";

type TwilioNodeData = {
  variableName?: string;
  credentialId?: string;
  channel?: "SMS" | "WHATSAPP";
  fromNumber?: string;
  toNumber?: string;
  body?: string;
};

type TwilioNodeType = Node<TwilioNodeData>;

export const TwilioNode = memo((props: NodeProps<TwilioNodeType>) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { setNodes } = useReactFlow();

  const handleOpenSettings = () => setDialogOpen(true);

  const handleSubmit = (values: TwilioFormValues) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === props.id) {
          return {
            ...node,
            data: {
              ...node.data,
              ...values,
            },
          };
        }
        return node;
      })
    );
  };

  const nodeData = props.data;
  const description = nodeData?.toNumber
    ? `${nodeData.channel === "WHATSAPP" ? "WhatsApp" : "SMS"}: ${nodeData.toNumber}`
    : "Not configured";

  return (
    <>
      <TwilioDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={nodeData}
      />
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon="/logos/twilio.svg"
        name="Twilio"
        description={description}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});

TwilioNode.displayName = "TwilioNode";
