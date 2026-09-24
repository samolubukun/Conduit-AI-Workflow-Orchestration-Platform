"use client";

import { useReactFlow, type Node, type NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { GitHubDialog, GitHubFormValues } from "./dialog";
import { GitPullRequestIcon } from "lucide-react";

type GitHubNodeData = {
  variableName?: string;
  credentialId?: string;
  action?: "CREATE_ISSUE" | "CREATE_COMMENT";
  owner?: string;
  repo?: string;
  issueNumber?: string;
  title?: string;
  body?: string;
};

type GitHubNodeType = Node<GitHubNodeData>;

export const GitHubNode = memo((props: NodeProps<GitHubNodeType>) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { setNodes } = useReactFlow();

  const handleOpenSettings = () => setDialogOpen(true);

  const handleSubmit = (values: GitHubFormValues) => {
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
    nodeData?.owner && nodeData?.repo
      ? `${nodeData.action === "CREATE_COMMENT" ? "Comment" : "Issue"}: ${nodeData.owner}/${nodeData.repo}`
      : "Not configured";

  return (
    <>
      <GitHubDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={nodeData}
      />
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon="/logos/github.svg"
        name="GitHub"
        description={description}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});

GitHubNode.displayName = "GitHubNode";
