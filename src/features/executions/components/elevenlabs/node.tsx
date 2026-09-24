"use client";

import { useReactFlow, type Node, type NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { ElevenLabsDialog, ElevenLabsFormValues } from "./dialog";
import { Volume2Icon } from "lucide-react";

type ElevenLabsNodeData = {
  variableName?: string;
  credentialId?: string;
  voiceId?: string;
  text?: string;
};

type ElevenLabsNodeType = Node<ElevenLabsNodeData>;

export const ElevenLabsNode = memo((props: NodeProps<ElevenLabsNodeType>) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { setNodes } = useReactFlow();

  const handleOpenSettings = () => setDialogOpen(true);

  const handleSubmit = (values: ElevenLabsFormValues) => {
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
  const description = nodeData?.text
    ? `Voice TTS: "${nodeData.text.slice(0, 20)}..."`
    : "Not configured";

  return (
    <>
      <ElevenLabsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={nodeData}
      />
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon="/logos/elevenlabs.svg"
        name="ElevenLabs"
        description={description}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});

ElevenLabsNode.displayName = "ElevenLabsNode";
