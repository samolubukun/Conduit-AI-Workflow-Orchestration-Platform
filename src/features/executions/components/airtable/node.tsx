"use client";

import { useReactFlow, type Node, type NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { AirtableDialog, AirtableFormValues } from "./dialog";

type AirtableNodeData = Partial<AirtableFormValues>;

type AirtableNodeType = Node<AirtableNodeData>;

export const AirtableNode = memo((props: NodeProps<AirtableNodeType>) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { setNodes } = useReactFlow();

  const handleOpenSettings = () => setDialogOpen(true);

  const handleSubmit = (values: AirtableFormValues) => {
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
  const description =
    nodeData?.tableName && nodeData?.baseId
      ? `${nodeData.tableName} (${nodeData.baseId.slice(0, 7)}...)`
      : "Not configured";

  return (
    <>
      <AirtableDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={nodeData}
      />
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon="/logos/airtable.svg"
        name="Airtable"
        description={description}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});

AirtableNode.displayName = "AirtableNode";
