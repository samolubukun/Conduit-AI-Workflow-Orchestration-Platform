"use client";

import { useReactFlow, type Node, type NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { DeepgramDialog, DeepgramFormValues } from "./dialog";
import { MicIcon } from "lucide-react";

type DeepgramNodeData = Partial<DeepgramFormValues>;

type DeepgramNodeType = Node<DeepgramNodeData>;

export const DeepgramNode = memo((props: NodeProps<DeepgramNodeType>) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { setNodes } = useReactFlow();

  const handleOpenSettings = () => setDialogOpen(true);

  const handleSubmit = (values: DeepgramFormValues) => {
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
  const description = nodeData?.audioUrl
    ? `Transcribe (${nodeData.model || "nova-3"})`
    : "Not configured";

  return (
    <>
      <DeepgramDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={nodeData}
      />
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon="/logos/deepgram.svg"
        name="Deepgram Audio"
        description={description}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});

DeepgramNode.displayName = "DeepgramNode";
