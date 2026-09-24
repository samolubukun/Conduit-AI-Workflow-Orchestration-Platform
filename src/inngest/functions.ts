import { NonRetriableError } from "inngest";
import { inngest } from "./client";
import db from "@/server/db";
import {
  executions,
  workflows,
  ExecutionStatus,
  NodeType,
} from "@/server/db/schema";
import { eq, and } from "drizzle-orm";
import { topologicalSort } from "./utils";
import { getExecutor } from "@/features/executions/lib/executor-registry";
import { httpRequestChannel } from "./channels/http-request";
import { manualTriggerChannel } from "./channels/manual-trigger";
import { googleFormTriggerChannel } from "./channels/google-form-trigger";
import { stripeTriggerChannel } from "./channels/stripe-trigger";
import { webhookTriggerChannel } from "./channels/webhook-trigger";
import { scheduleTriggerChannel } from "./channels/schedule-trigger";
import { githubTriggerChannel } from "./channels/github-trigger";
import { geminiChannel } from "./channels/gemini";
import { openAiChannel } from "./channels/openai";
import { anthropicChannel } from "./channels/anthropic";
import { discordChannel } from "./channels/discord";
import { slackChannel } from "./channels/slack";

export const executeWorkflow = inngest.createFunction(
  { 
    id: "execute-workflow",
    retries: process.env.NODE_ENV === "production" ? 3 : 0,
    onFailure: async ({ event, step }) => {
      const eventId = event.data.event?.id;
      if (!eventId) return;

      const [updated] = await db
        .update(executions)
        .set({
          status: ExecutionStatus.FAILED,
          error: event.data.error.message,
          errorStack: event.data.error.stack,
        })
        .where(eq(executions.inngestEventId, eventId))
        .returning();
      return updated;
    },
  },
  { 
    event: "workflows/execute.workflow",
    channels: [
      httpRequestChannel(),
      manualTriggerChannel(),
      googleFormTriggerChannel(),
      stripeTriggerChannel(),
      webhookTriggerChannel(),
      scheduleTriggerChannel(),
      githubTriggerChannel(),
      geminiChannel(),
      openAiChannel(),
      anthropicChannel(),
      discordChannel(),
      slackChannel(),
    ],
  },
  async ({ event, step, publish }) => {
    const inngestEventId = event.id;
    const workflowId = event.data.workflowId;

    if (!inngestEventId || !workflowId) {
      throw new NonRetriableError("Event ID or workflow ID is missing");
    }

    await step.run("create-execution", async () => {
      const [newExecution] = await db
        .insert(executions)
        .values({
          workflowId,
          inngestEventId,
          status: ExecutionStatus.RUNNING,
        })
        .returning();
      return newExecution;
    });

    const sortedNodes = await step.run("prepare-workflow", async () => {
      const workflow = await db.query.workflows.findFirst({
        where: eq(workflows.id, workflowId),
        with: {
          nodes: true,
          connections: true,
        },
      });

      if (!workflow) {
        throw new NonRetriableError("Workflow not found");
      }

      return topologicalSort(workflow.nodes, workflow.connections);
    });

    const userId = await step.run("find-user-id", async () => {
      const workflow = await db.query.workflows.findFirst({
        where: eq(workflows.id, workflowId),
        columns: {
          userId: true,
        },
      });

      if (!workflow) {
        throw new NonRetriableError("Workflow not found");
      }

      return workflow.userId;
    });

    // Initialize context with any initial data from the trigger
    let context = event.data.initialData || {};

    // Execute each node
    for (const node of sortedNodes) {
      const executor = getExecutor(node.type as NodeType);
      context = await executor({
        data: node.data as Record<string, unknown>,
        nodeId: node.id,
        userId,
        context,
        step,
        publish,
      });
    }

    await step.run("update-execution", async () => {
      const [updated] = await db
        .update(executions)
        .set({
          status: ExecutionStatus.SUCCESS,
          completedAt: new Date(),
          output: context,
        })
        .where(
          and(
            eq(executions.inngestEventId, inngestEventId),
            eq(executions.workflowId, workflowId)
          )
        )
        .returning();
      return updated;
    });

    return {
      workflowId,
      result: context,
    };
  },
);
