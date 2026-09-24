import { Button } from "@/components/ui/button";
import { useExecuteWorkflow } from "@/features/workflows/hooks/use-workflows";
import { FlaskConicalIcon } from "lucide-react";

export const ExecuteWorkflowButton = ({
  workflowId,
}: {
  workflowId: string;
}) => {
  const executeWorkflow = useExecuteWorkflow();

  const handleExecute = () => {
    executeWorkflow.mutate({ id: workflowId });
  };

  return (
    <Button
      size="lg"
      onClick={handleExecute}
      disabled={executeWorkflow.isPending}
      className="bg-[#070b14] text-white hover:bg-[#0f1624] shadow-sm font-medium gap-x-2"
    >
      <FlaskConicalIcon className="size-4" />
      {executeWorkflow.isPending ? "Executing..." : "Execute workflow"}
    </Button>
  );
};
