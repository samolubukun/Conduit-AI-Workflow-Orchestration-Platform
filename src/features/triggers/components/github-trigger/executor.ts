import type { NodeExecutor } from "@/features/executions/types";
import { githubTriggerChannel } from "@/inngest/channels/github-trigger";

type GitHubTriggerData = Record<string, unknown>;

export const githubTriggerExecutor: NodeExecutor<GitHubTriggerData> = async ({
  nodeId,
  context,
  step,
  publish,
}) => {
  await publish(
    githubTriggerChannel().status({
      nodeId,
      status: "loading",
    }),
  );

  const result = await step.run("github-trigger", async () => context);

  await publish(
    githubTriggerChannel().status({
      nodeId,
      status: "success",
    }),
  );

  return result;
};
