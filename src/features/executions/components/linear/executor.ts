import Handlebars from "handlebars";
import { NonRetriableError } from "inngest";
import db from "@/server/db";
import { decrypt } from "@/lib/encryption";
import type { NodeExecutor } from "@/features/executions/types";

interface LinearData {
  credentialId?: string;
  variableName?: string;
  teamId?: string;
  title?: string;
  description?: string;
  priority?: string;
}

export const linearExecutor: NodeExecutor<LinearData> = async ({
  data,
  nodeId,
  userId,
  context,
  step,
  publish,
}) => {
  if (!data.credentialId) {
    throw new NonRetriableError("Linear node: API key is required");
  }

  if (!data.teamId) {
    throw new NonRetriableError("Linear node: Team ID is required");
  }

  if (!data.title) {
    throw new NonRetriableError("Linear node: Issue title is required");
  }

  const credential = await step.run("get-linear-credential", async () => {
    return db.query.credentials.findFirst({
      where: (creds, { and, eq }) =>
        and(eq(creds.id, data.credentialId!), eq(creds.userId, userId)),
    });
  });

  if (!credential) {
    throw new NonRetriableError("Linear node: Credential not found");
  }

  const teamId = Handlebars.compile(data.teamId)(context).trim();
  const title = Handlebars.compile(data.title)(context);
  const description = Handlebars.compile(data.description || "")(context);
  const priority = data.priority ? Number(data.priority) : 0;
  const apiKey = decrypt(credential.value).trim();

  const result = await step.run("linear-create-issue", async () => {
    const mutation = `
      mutation CreateIssue($teamId: String!, $title: String!, $description: String, $priority: Int) {
        issueCreate(input: {
          teamId: $teamId,
          title: $title,
          description: $description,
          priority: $priority
        }) {
          success
          issue {
            id
            identifier
            title
            url
          }
        }
      }
    `;

    const res = await fetch("https://api.linear.app/graphql", {
      method: "POST",
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          teamId,
          title,
          description,
          priority,
        },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Linear API failed (${res.status}): ${err}`);
    }

    const json = await res.json();
    if (json.errors && json.errors.length > 0) {
      throw new Error(`Linear GraphQL Error: ${json.errors[0].message}`);
    }

    const issue = json.data?.issueCreate?.issue;
    return {
      id: issue?.id,
      identifier: issue?.identifier,
      title: issue?.title,
      url: issue?.url,
    };
  });

  return {
    ...context,
    [data.variableName || "linear"]: result,
  };
};
