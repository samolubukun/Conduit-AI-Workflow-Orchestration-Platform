import { generateSlug } from "random-word-slugs";
import db from "@/server/db";
import {
  workflows,
  nodes,
  connections,
  nodeTypeEnum,
  NodeType,
  users,
  creditTransactions,
  CreditTransactionType,
} from "@/server/db/schema";
import type { Node as XyNode, Edge } from "@xyflow/react";
import { createTRPCRouter, premiumProcedure, protectedProcedure } from "@/trpc/init";
import z from "zod";
import { PAGINATION } from "@/config/constants";
import { sendWorkflowExecution } from "@/inngest/utils";
import { eq, and, ilike, desc, count, sql } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

export const workflowsRouter = createTRPCRouter({
  execute: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const workflow = await db.query.workflows.findFirst({
        where: and(
          eq(workflows.id, input.id),
          eq(workflows.userId, ctx.auth.user.id)
        ),
      });

      if (!workflow) {
        throw new Error("Workflow not found");
      }

      await sendWorkflowExecution({
        workflowId: input.id,
      });

      return workflow;
    }),

  create: premiumProcedure.mutation(async ({ ctx }) => {
    return await db.transaction(async (tx) => {
      const workflowId = createId();
      const [newWorkflow] = await tx
        .insert(workflows)
        .values({
          id: workflowId,
          name: generateSlug(3),
          userId: ctx.auth.user.id,
        })
        .returning();

      await tx.insert(nodes).values({
        workflowId: newWorkflow.id,
        name: NodeType.INITIAL,
        type: NodeType.INITIAL,
        position: { x: 0, y: 0 },
      });

      // Deduct 1 credit for workflow creation
      await tx
        .update(users)
        .set({
          credits: sql`${users.credits} - 1`,
          updatedAt: new Date(),
        })
        .where(eq(users.id, ctx.auth.user.id));

      await tx.insert(creditTransactions).values({
        userId: ctx.auth.user.id,
        amount: -1,
        type: CreditTransactionType.WORKFLOW_CREATION,
        description: `Created workflow: ${newWorkflow.name}`,
        referenceId: newWorkflow.id,
      });

      return newWorkflow;
    });
  }),

  remove: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const [deleted] = await db
        .delete(workflows)
        .where(
          and(
            eq(workflows.id, input.id),
            eq(workflows.userId, ctx.auth.user.id)
          )
        )
        .returning();

      return deleted;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        nodes: z.array(
          z.object({
            id: z.string(),
            type: z.string().nullish(),
            position: z.object({ x: z.number(), y: z.number() }),
            data: z.record(z.string(), z.any()).optional(),
          })
        ),
        edges: z.array(
          z.object({
            source: z.string(),
            target: z.string(),
            sourceHandle: z.string().nullish(),
            targetHandle: z.string().nullish(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, nodes: inputNodes, edges } = input;

      const workflow = await db.query.workflows.findFirst({
        where: and(
          eq(workflows.id, id),
          eq(workflows.userId, ctx.auth.user.id)
        ),
      });

      if (!workflow) {
        throw new Error("Workflow not found");
      }

      return await db.transaction(async (tx) => {
        // Delete existing nodes and connections
        await tx.delete(connections).where(eq(connections.workflowId, id));
        await tx.delete(nodes).where(eq(nodes.workflowId, id));

        // Insert new nodes if any
        if (inputNodes.length > 0) {
          await tx.insert(nodes).values(
            inputNodes.map((n) => ({
              id: n.id,
              workflowId: id,
              name: n.type || "unknown",
              type: (n.type as NodeType) || NodeType.INITIAL,
              position: n.position,
              data: n.data || {},
            }))
          );
        }

        // Insert new edges if any
        if (edges.length > 0) {
          await tx.insert(connections).values(
            edges.map((edge) => ({
              workflowId: id,
              fromNodeId: edge.source,
              toNodeId: edge.target,
              fromOutput: edge.sourceHandle || "main",
              toInput: edge.targetHandle || "main",
            }))
          );
        }

        // Update workflow updatedAt
        const [updatedWorkflow] = await tx
          .update(workflows)
          .set({ updatedAt: new Date() })
          .where(eq(workflows.id, id))
          .returning();

        return updatedWorkflow;
      });
    }),

  updateName: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const [updated] = await db
        .update(workflows)
        .set({ name: input.name, updatedAt: new Date() })
        .where(
          and(
            eq(workflows.id, input.id),
            eq(workflows.userId, ctx.auth.user.id)
          )
        )
        .returning();

      return updated;
    }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const workflow = await db.query.workflows.findFirst({
        where: and(
          eq(workflows.id, input.id),
          eq(workflows.userId, ctx.auth.user.id)
        ),
        with: {
          nodes: true,
          connections: true,
        },
      });

      if (!workflow) {
        throw new Error("Workflow not found");
      }

      // Transform server nodes to react-flow compatible nodes
      const flowNodes: XyNode[] = workflow.nodes.map((node) => ({
        id: node.id,
        type: node.type,
        position: node.position as { x: number; y: number },
        data: (node.data as Record<string, unknown>) || {},
      }));

      // Transform server connections to react-flow compatible edges
      const flowEdges: Edge[] = workflow.connections.map((connection) => ({
        id: connection.id,
        source: connection.fromNodeId,
        target: connection.toNodeId,
        sourceHandle: connection.fromOutput,
        targetHandle: connection.toInput,
      }));

      return {
        id: workflow.id,
        name: workflow.name,
        nodes: flowNodes,
        edges: flowEdges,
      };
    }),

  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().default(PAGINATION.DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(PAGINATION.MIN_PAGE_SIZE)
          .max(PAGINATION.MAX_PAGE_SIZE)
          .default(PAGINATION.DEFAULT_PAGE_SIZE),
        search: z.string().default(""),
      })
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize, search } = input;
      const offset = (page - 1) * pageSize;

      const whereClause = search
        ? and(
            eq(workflows.userId, ctx.auth.user.id),
            ilike(workflows.name, `%${search}%`)
          )
        : eq(workflows.userId, ctx.auth.user.id);

      const [items, [countResult]] = await Promise.all([
        db.query.workflows.findMany({
          where: whereClause,
          orderBy: [desc(workflows.updatedAt)],
          limit: pageSize,
          offset,
        }),
        db
          .select({ value: count() })
          .from(workflows)
          .where(whereClause),
      ]);

      const totalCount = Number(countResult?.value ?? 0);
      const totalPages = Math.ceil(totalCount / pageSize);
      const hasNextPage = page < totalPages;
      const hasPreviousPage = page > 1;

      return {
        items,
        page,
        pageSize,
        totalCount,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      };
    }),
});
