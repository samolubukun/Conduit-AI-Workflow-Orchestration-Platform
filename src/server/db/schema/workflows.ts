import {
  pgTable,
  text,
  timestamp,
  jsonb,
  unique,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { users } from "./auth";

// Enums
export const credentialTypeEnum = pgEnum("CredentialType", [
  "OPENAI",
  "ANTHROPIC",
  "GEMINI",
  "RESEND",
  "GITHUB",
  "NOTION",
  "TAVILY",
  "DEEPSEEK",
  "ELEVENLABS",
  "TWILIO",
  "DEEPGRAM",
  "TELEGRAM",
  "AIRTABLE",
  "S3",
  "PINECONE",
  "LINEAR",
]);

export const nodeTypeEnum = pgEnum("NodeType", [
  "INITIAL",
  "MANUAL_TRIGGER",
  "HTTP_REQUEST",
  "GOOGLE_FORM_TRIGGER",
  "STRIPE_TRIGGER",
  "ANTHROPIC",
  "GEMINI",
  "OPENAI",
  "DISCORD",
  "SLACK",
  "RESEND",
  "GITHUB",
  "NOTION",
  "WEB_SEARCH",
  "DEEPSEEK",
  "ELEVENLABS",
  "CONDITION",
  "TWILIO",
  "DEEPGRAM",
  "TELEGRAM",
  "AIRTABLE",
  "S3",
  "PINECONE",
  "LINEAR",
  "WEBHOOK_TRIGGER",
  "SCHEDULE_TRIGGER",
  "GITHUB_TRIGGER",
]);

export const executionStatusEnum = pgEnum("ExecutionStatus", [
  "RUNNING",
  "SUCCESS",
  "FAILED",
]);

// Types derived from Enums for application convenience
export type CredentialType = (typeof credentialTypeEnum.enumValues)[number];
export const CredentialType = {
  OPENAI: "OPENAI" as const,
  ANTHROPIC: "ANTHROPIC" as const,
  GEMINI: "GEMINI" as const,
  RESEND: "RESEND" as const,
  GITHUB: "GITHUB" as const,
  NOTION: "NOTION" as const,
  TAVILY: "TAVILY" as const,
  DEEPSEEK: "DEEPSEEK" as const,
  ELEVENLABS: "ELEVENLABS" as const,
  TWILIO: "TWILIO" as const,
  DEEPGRAM: "DEEPGRAM" as const,
  TELEGRAM: "TELEGRAM" as const,
  AIRTABLE: "AIRTABLE" as const,
  S3: "S3" as const,
  PINECONE: "PINECONE" as const,
  LINEAR: "LINEAR" as const,
};

export type NodeType = (typeof nodeTypeEnum.enumValues)[number];
export const NodeType = {
  INITIAL: "INITIAL" as const,
  MANUAL_TRIGGER: "MANUAL_TRIGGER" as const,
  HTTP_REQUEST: "HTTP_REQUEST" as const,
  GOOGLE_FORM_TRIGGER: "GOOGLE_FORM_TRIGGER" as const,
  STRIPE_TRIGGER: "STRIPE_TRIGGER" as const,
  WEBHOOK_TRIGGER: "WEBHOOK_TRIGGER" as const,
  SCHEDULE_TRIGGER: "SCHEDULE_TRIGGER" as const,
  GITHUB_TRIGGER: "GITHUB_TRIGGER" as const,
  ANTHROPIC: "ANTHROPIC" as const,
  GEMINI: "GEMINI" as const,
  OPENAI: "OPENAI" as const,
  DISCORD: "DISCORD" as const,
  SLACK: "SLACK" as const,
  RESEND: "RESEND" as const,
  GITHUB: "GITHUB" as const,
  NOTION: "NOTION" as const,
  WEB_SEARCH: "WEB_SEARCH" as const,
  DEEPSEEK: "DEEPSEEK" as const,
  ELEVENLABS: "ELEVENLABS" as const,
  CONDITION: "CONDITION" as const,
  TWILIO: "TWILIO" as const,
  DEEPGRAM: "DEEPGRAM" as const,
  TELEGRAM: "TELEGRAM" as const,
  AIRTABLE: "AIRTABLE" as const,
  S3: "S3" as const,
  PINECONE: "PINECONE" as const,
  LINEAR: "LINEAR" as const,
};

export type ExecutionStatus = (typeof executionStatusEnum.enumValues)[number];
export const ExecutionStatus = {
  RUNNING: "RUNNING" as const,
  SUCCESS: "SUCCESS" as const,
  FAILED: "FAILED" as const,
};

// Credentials
export const credentials = pgTable("Credential", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  value: text("value").notNull(),
  type: credentialTypeEnum("type").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

// Workflows
export const workflows = pgTable("Workflow", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

// Workflow Nodes
export const nodes = pgTable("Node", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  workflowId: text("workflowId")
    .notNull()
    .references(() => workflows.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  type: nodeTypeEnum("type").notNull(),
  position: jsonb("position").notNull(),
  data: jsonb("data").default({}).notNull(),
  credentialId: text("credentialId").references(() => credentials.id),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
});

// Node Connections
export const connections = pgTable(
  "Connection",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    workflowId: text("workflowId")
      .notNull()
      .references(() => workflows.id, { onDelete: "cascade" }),
    fromNodeId: text("fromNodeId")
      .notNull()
      .references(() => nodes.id, { onDelete: "cascade" }),
    toNodeId: text("toNodeId")
      .notNull()
      .references(() => nodes.id, { onDelete: "cascade" }),
    fromOutput: text("fromOutput").default("main").notNull(),
    toInput: text("toInput").default("main").notNull(),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => [
    unique("Connection_unique").on(
      table.fromNodeId,
      table.toNodeId,
      table.fromOutput,
      table.toInput
    ),
  ]
);

// Workflow Executions
export const executions = pgTable("Execution", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  workflowId: text("workflowId")
    .notNull()
    .references(() => workflows.id, { onDelete: "cascade" }),
  status: executionStatusEnum("status").default("RUNNING").notNull(),
  error: text("error"),
  errorStack: text("errorStack"),
  startedAt: timestamp("startedAt", { mode: "date" }).defaultNow().notNull(),
  completedAt: timestamp("completedAt", { mode: "date" }),
  inngestEventId: text("inngestEventId").unique().notNull(),
  output: jsonb("output"),
});

// Relations
export const credentialsRelations = relations(credentials, ({ one, many }) => ({
  user: one(users, {
    fields: [credentials.userId],
    references: [users.id],
  }),
  nodes: many(nodes),
}));

export const workflowsRelations = relations(workflows, ({ one, many }) => ({
  user: one(users, {
    fields: [workflows.userId],
    references: [users.id],
  }),
  nodes: many(nodes),
  connections: many(connections),
  executions: many(executions),
}));

export const nodesRelations = relations(nodes, ({ one, many }) => ({
  workflow: one(workflows, {
    fields: [nodes.workflowId],
    references: [workflows.id],
  }),
  credential: one(credentials, {
    fields: [nodes.credentialId],
    references: [credentials.id],
  }),
  outputConnections: many(connections, { relationName: "FromNode" }),
  inputConnections: many(connections, { relationName: "ToNode" }),
}));

export const connectionsRelations = relations(connections, ({ one }) => ({
  workflow: one(workflows, {
    fields: [connections.workflowId],
    references: [workflows.id],
  }),
  fromNode: one(nodes, {
    fields: [connections.fromNodeId],
    references: [nodes.id],
    relationName: "FromNode",
  }),
  toNode: one(nodes, {
    fields: [connections.toNodeId],
    references: [nodes.id],
    relationName: "ToNode",
  }),
}));

export const executionsRelations = relations(executions, ({ one }) => ({
  workflow: one(workflows, {
    fields: [executions.workflowId],
    references: [workflows.id],
  }),
}));

export type Workflow = typeof workflows.$inferSelect;
export type NewWorkflow = typeof workflows.$inferInsert;
export type Node = typeof nodes.$inferSelect;
export type NewNode = typeof nodes.$inferInsert;
export type Connection = typeof connections.$inferSelect;
export type NewConnection = typeof connections.$inferInsert;
export type Execution = typeof executions.$inferSelect;
export type NewExecution = typeof executions.$inferInsert;
export type Credential = typeof credentials.$inferSelect;
export type NewCredential = typeof credentials.$inferInsert;
