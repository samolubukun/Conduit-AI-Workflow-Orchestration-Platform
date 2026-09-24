"use client";

import { useReactFlow, type Node, type NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { WebSearchDialog, WebSearchFormValues } from "./dialog";
import { SearchIcon } from "lucide-react";

type WebSearchNodeData = {
  variableName?: string;
  credentialId?: string;
  query?: string;
  searchDepth?: "basic" | "advanced";
  maxResults?: string;
};

type WebSearchNodeType = Node<WebSearchNodeData>;

export const WebSearchNode = memo((props: NodeProps<WebSearchNodeType>) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { setNodes } = useReactFlow();

  const handleOpenSettings = () => setDialogOpen(true);

  const handleSubmit = (values: WebSearchFormValues) => {
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
  const description = nodeData?.query
    ? `Query: "${nodeData.query.slice(0, 24)}${nodeData.query.length > 24 ? "..." : ""}"`
    : "Not configured";

  return (
    <>
      <WebSearchDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={nodeData}
      />
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon="/logos/tavily.svg"
        name="Web Search"
        description={description}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});

WebSearchNode.displayName = "WebSearchNode";
