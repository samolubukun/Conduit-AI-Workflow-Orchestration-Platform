"use client";

import { useReactFlow, type Node, type NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { DeepSeekDialog, DeepSeekFormValues } from "./dialog";
import { BotIcon } from "lucide-react";

type DeepSeekNodeData = {
  variableName?: string;
  credentialId?: string;
  model?: "deepseek-chat" | "deepseek-reasoner";
  systemPrompt?: string;
  userPrompt?: string;
};

type DeepSeekNodeType = Node<DeepSeekNodeData>;

export const DeepSeekNode = memo((props: NodeProps<DeepSeekNodeType>) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { setNodes } = useReactFlow();

  const handleOpenSettings = () => setDialogOpen(true);

  const handleSubmit = (values: DeepSeekFormValues) => {
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
  const description = nodeData?.userPrompt
    ? `${nodeData.model === "deepseek-reasoner" ? "R1 (Reasoner)" : "V3 (Chat)"}: "${nodeData.userPrompt.slice(0, 20)}..."`
    : "Not configured";

  return (
    <>
      <DeepSeekDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={nodeData}
      />
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon="/logos/deepseek.svg"
        name="DeepSeek"
        description={description}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});

DeepSeekNode.displayName = "DeepSeekNode";
