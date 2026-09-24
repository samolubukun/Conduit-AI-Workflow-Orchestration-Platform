"use client";

import { useReactFlow, type Node, type NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { S3Dialog, S3FormValues } from "./dialog";

type S3NodeData = Partial<S3FormValues>;

type S3NodeType = Node<S3NodeData>;

export const S3Node = memo((props: NodeProps<S3NodeType>) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { setNodes } = useReactFlow();

  const handleOpenSettings = () => setDialogOpen(true);

  const handleSubmit = (values: S3FormValues) => {
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
    nodeData?.bucketName && nodeData?.fileKey
      ? `${nodeData.bucketName}/${nodeData.fileKey}`
      : "Not configured";

  return (
    <>
      <S3Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        defaultValues={nodeData}
      />
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon="/logos/s3.svg"
        name="S3 / R2 Storage"
        description={description}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  );
});

S3Node.displayName = "S3Node";
