import { Client } from "@notionhq/client";
import Handlebars from "handlebars";
import { NonRetriableError } from "inngest";
import db from "@/server/db";
import { decrypt } from "@/lib/encryption";
import type { NodeExecutor } from "@/features/executions/types";

interface NotionData {
  credentialId?: string;
  variableName?: string;
  action?: "CREATE_PAGE" | "QUERY_DATABASE";
  databaseId?: string;
  title?: string;
  content?: string;
}

export const notionExecutor: NodeExecutor<NotionData> = async ({
  data,
  nodeId,
  userId,
  context,
  step,
  publish,
}) => {
  if (!data.credentialId) {
    throw new NonRetriableError("Notion node: Internal Integration Token is required");
  }

  if (!data.databaseId) {
    throw new NonRetriableError("Notion node: Database ID is required");
  }

  const credential = await step.run("get-notion-credential", async () => {
    return db.query.credentials.findFirst({
      where: (creds, { and, eq }) =>
        and(eq(creds.id, data.credentialId!), eq(creds.userId, userId)),
    });
  });

  if (!credential) {
    throw new NonRetriableError("Notion node: Credential not found");
  }

  const databaseId = Handlebars.compile(data.databaseId)(context).trim();
  const title = Handlebars.compile(data.title || "New Entry from Conduit")(context);
  const content = Handlebars.compile(data.content || "")(context);
  const action = data.action || "CREATE_PAGE";

  const notion = new Client({ auth: decrypt(credential.value) });

  const result = await step.run("notion-api-call", async () => {
    if (action === "QUERY_DATABASE") {
      // Query the database using Notion API endpoint
      const response = await notion.request<any>({
        path: `databases/${databaseId}/query`,
        method: "post",
        body: {
          page_size: 10,
        },
      });

      return {
        resultsCount: response.results.length,
        results: response.results.map((page: any) => ({
          id: page.id,
          url: page.url,
          created_time: page.created_time,
        })),
      };
    }

    // Default action: CREATE_PAGE in database
    const children: any[] = [];
    if (content) {
      children.push({
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: { content },
            },
          ],
        },
      });
    }

    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: {
          title: [
            {
              text: {
                content: title,
              },
            },
          ],
        },
      },
      children: children.length > 0 ? children : undefined,
    });

    return {
      id: response.id,
      url: (response as any).url || null,
    };
  });

  return {
    ...context,
    [data.variableName || "notion"]: result,
  };
};
