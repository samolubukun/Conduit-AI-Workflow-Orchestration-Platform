"use client";

import { useReactFlow, type Node, type NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { NotionDialog, NotionFormValues } from "./dialog";
import { BookOpenIcon } from "lucide-react";

type NotionNodeData = {
  variableName?: string;
  credentialId?: string;
  action?: "CREATE_PAGE" | "QUERY_DATABASE";
  databaseId?: string;
  title?: string;
  content?: string;
};

type NotionNodeType = Node<NotionNodeData>;

export const NotionNode = memo((props: NodeProps<NotionNodeType>) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { setNodes } = useReactFlow();

  const handleOpenSettings = () => setDialogOpen(true);

  const handleSubmit = (values: NotionFormValues) => {
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
  const description = nodeData?.databaseId
    ? `${nodeData.action === "QUERY_DATABASE" ? "Query" : "Insert"} DB: ${nodeData.databaseId.slice(0, 8)}...`
    : "Not configured";

  return (
    <>
      <NotionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={nodeData}
      />
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon="/logos/notion.svg"
        name="Notion"
        description={description}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});

NotionNode.displayName = "NotionNode";
