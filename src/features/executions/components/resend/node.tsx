"use client";

import { useReactFlow, type Node, type NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { ResendDialog, ResendFormValues } from "./dialog";
import { MailIcon } from "lucide-react";

type ResendNodeData = {
  variableName?: string;
  credentialId?: string;
  toEmail?: string;
  subject?: string;
  body?: string;
};

type ResendNodeType = Node<ResendNodeData>;

export const ResendNode = memo((props: NodeProps<ResendNodeType>) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { setNodes } = useReactFlow();

  const handleOpenSettings = () => setDialogOpen(true);

  const handleSubmit = (values: ResendFormValues) => {
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
  const description = nodeData?.toEmail
    ? `To: ${nodeData.toEmail}`
    : "Not configured";

  return (
    <>
      <ResendDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={nodeData}
      />
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon="/logos/resend.svg"
        name="Resend Email"
        description={description}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});

ResendNode.displayName = "ResendNode";
