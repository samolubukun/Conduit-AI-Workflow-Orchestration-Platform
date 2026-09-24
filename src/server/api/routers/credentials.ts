import db from "@/server/db";
import {
  credentials,
  CredentialType,
  credentialTypeEnum,
} from "@/server/db/schema";
import { createTRPCRouter, premiumProcedure, protectedProcedure } from "@/trpc/init";
import z from "zod";
import { PAGINATION } from "@/config/constants";
import { encrypt } from "@/lib/encryption";
import { eq, and, ilike, desc, count } from "drizzle-orm";

export const credentialsRouter = createTRPCRouter({
  create: premiumProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        type: z.enum(credentialTypeEnum.enumValues),
        value: z.string().min(1, "Value is required"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, value, type } = input;

      const [created] = await db
        .insert(credentials)
        .values({
          name,
          userId: ctx.auth.user.id,
          type,
          value: encrypt(value),
        })
        .returning();

      return created;
    }),

  remove: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const [deleted] = await db
        .delete(credentials)
        .where(
          and(
            eq(credentials.id, input.id),
            eq(credentials.userId, ctx.auth.user.id)
          )
        )
        .returning();

      return deleted;
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1, "Name is required"),
        type: z.enum(credentialTypeEnum.enumValues),
        value: z.string().min(1, "Value is required"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, name, type, value } = input;

      const [updated] = await db
        .update(credentials)
        .set({
          name,
          type,
          value: encrypt(value),
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(credentials.id, id),
            eq(credentials.userId, ctx.auth.user.id)
          )
        )
        .returning();

      return updated;
    }),

  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const item = await db.query.credentials.findFirst({
        where: and(
          eq(credentials.id, input.id),
          eq(credentials.userId, ctx.auth.user.id)
        ),
      });

      if (!item) {
        throw new Error("Credential not found");
      }

      return item;
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
            eq(credentials.userId, ctx.auth.user.id),
            ilike(credentials.name, `%${search}%`)
          )
        : eq(credentials.userId, ctx.auth.user.id);

      const [items, [countResult]] = await Promise.all([
        db.query.credentials.findMany({
          where: whereClause,
          orderBy: [desc(credentials.updatedAt)],
          limit: pageSize,
          offset,
        }),
        db
          .select({ value: count() })
          .from(credentials)
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

  getByType: protectedProcedure
    .input(
      z.object({
        type: z.enum(credentialTypeEnum.enumValues),
      })
    )
    .query(async ({ input, ctx }) => {
      return db.query.credentials.findMany({
        where: and(
          eq(credentials.type, input.type),
          eq(credentials.userId, ctx.auth.user.id)
        ),
        orderBy: [desc(credentials.updatedAt)],
      });
    }),
});
