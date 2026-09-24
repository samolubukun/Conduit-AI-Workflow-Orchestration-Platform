"use client";

import { useReactFlow, type Node, type NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { PineconeDialog, PineconeFormValues } from "./dialog";

type PineconeNodeData = Partial<PineconeFormValues>;

type PineconeNodeType = Node<PineconeNodeData>;

export const PineconeNode = memo((props: NodeProps<PineconeNodeType>) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { setNodes } = useReactFlow();

  const handleOpenSettings = () => setDialogOpen(true);

  const handleSubmit = (values: PineconeFormValues) => {
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
  const description = nodeData?.indexHost
    ? `${nodeData.action || "QUERY"} (Top ${nodeData.topK || "5"})`
    : "Not configured";

  return (
    <>
      <PineconeDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={nodeData}
      />
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon="/logos/pinecone.svg"
        name="Pinecone"
        description={description}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});

PineconeNode.displayName = "PineconeNode";
