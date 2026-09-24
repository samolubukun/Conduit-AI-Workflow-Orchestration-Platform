import { Octokit } from "@octokit/rest";
import Handlebars from "handlebars";
import { NonRetriableError } from "inngest";
import db from "@/server/db";
import { decrypt } from "@/lib/encryption";
import type { NodeExecutor } from "@/features/executions/types";

interface GitHubData {
  credentialId?: string;
  variableName?: string;
  action?: "CREATE_ISSUE" | "CREATE_COMMENT";
  owner?: string;
  repo?: string;
  issueNumber?: string;
  title?: string;
  body?: string;
}

export const githubExecutor: NodeExecutor<GitHubData> = async ({
  data,
  nodeId,
  userId,
  context,
  step,
  publish,
}) => {
  if (!data.credentialId) {
    throw new NonRetriableError("GitHub node: Personal Access Token is required");
  }

  if (!data.owner || !data.repo) {
    throw new NonRetriableError("GitHub node: Repository owner and name are required");
  }

  const credential = await step.run("get-github-credential", async () => {
    return db.query.credentials.findFirst({
      where: (creds, { and, eq }) =>
        and(eq(creds.id, data.credentialId!), eq(creds.userId, userId)),
    });
  });

  if (!credential) {
    throw new NonRetriableError("GitHub node: Credential not found");
  }

  const owner = Handlebars.compile(data.owner)(context);
  const repo = Handlebars.compile(data.repo)(context);
  const body = Handlebars.compile(data.body || "")(context);
  const title = Handlebars.compile(data.title || "Automated Issue from Conduit")(context);
  const action = data.action || "CREATE_ISSUE";

  const octokit = new Octokit({ auth: decrypt(credential.value) });

  const result = await step.run("github-api-call", async () => {
    if (action === "CREATE_COMMENT") {
      const issueNum = Number(Handlebars.compile(data.issueNumber || "1")(context));
      const res = await octokit.issues.createComment({
        owner,
        repo,
        issue_number: issueNum,
        body,
      });
      return {
        id: res.data.id,
        html_url: res.data.html_url,
      };
    }

    const res = await octokit.issues.create({
      owner,
      repo,
      title,
      body,
    });
    return {
      id: res.data.id,
      number: res.data.number,
      html_url: res.data.html_url,
    };
  });

  return {
    ...context,
    [data.variableName || "github"]: result,
  };
};
