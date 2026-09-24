import db from "@/server/db";
import { executions, workflows } from "@/server/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import z from "zod";
import { PAGINATION } from "@/config/constants";
import { eq, desc, count } from "drizzle-orm";

export const executionsRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const item = await db.query.executions.findFirst({
        where: eq(executions.id, input.id),
        with: {
          workflow: {
            columns: {
              id: true,
              name: true,
              userId: true,
            },
          },
        },
      });

      if (!item || item.workflow.userId !== ctx.auth.user.id) {
        throw new Error("Execution not found");
      }

      return {
        ...item,
        workflow: {
          id: item.workflow.id,
          name: item.workflow.name,
        },
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
      })
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize } = input;
      const offset = (page - 1) * pageSize;

      // Executions belonging to current user workflows
      const [items, [countResult]] = await Promise.all([
        db
          .select({
            id: executions.id,
            workflowId: executions.workflowId,
            status: executions.status,
            error: executions.error,
            errorStack: executions.errorStack,
            startedAt: executions.startedAt,
            completedAt: executions.completedAt,
            inngestEventId: executions.inngestEventId,
            output: executions.output,
            workflow: {
              id: workflows.id,
              name: workflows.name,
            },
          })
          .from(executions)
          .innerJoin(workflows, eq(executions.workflowId, workflows.id))
          .where(eq(workflows.userId, ctx.auth.user.id))
          .orderBy(desc(executions.startedAt))
          .limit(pageSize)
          .offset(offset),
        db
          .select({ value: count() })
          .from(executions)
          .innerJoin(workflows, eq(executions.workflowId, workflows.id))
          .where(eq(workflows.userId, ctx.auth.user.id)),
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
