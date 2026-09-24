import Handlebars from "handlebars";
import { NonRetriableError } from "inngest";
import db from "@/server/db";
import { decrypt } from "@/lib/encryption";
import type { NodeExecutor } from "@/features/executions/types";

interface WebSearchData {
  credentialId?: string;
  variableName?: string;
  query?: string;
  searchDepth?: "basic" | "advanced";
  maxResults?: number;
}

export const webSearchExecutor: NodeExecutor<WebSearchData> = async ({
  data,
  nodeId,
  userId,
  context,
  step,
  publish,
}) => {
  if (!data.credentialId) {
    throw new NonRetriableError("Web Search node: Tavily API Key is required");
  }

  if (!data.query) {
    throw new NonRetriableError("Web Search node: Search query is required");
  }

  const credential = await step.run("get-tavily-credential", async () => {
    return db.query.credentials.findFirst({
      where: (creds, { and, eq }) =>
        and(eq(creds.id, data.credentialId!), eq(creds.userId, userId)),
    });
  });

  if (!credential) {
    throw new NonRetriableError("Web Search node: Credential not found");
  }

  const query = Handlebars.compile(data.query)(context);
  const searchDepth = data.searchDepth || "basic";
  const maxResults = data.maxResults ? Number(data.maxResults) : 5;
  const apiKey = decrypt(credential.value);

  const result = await step.run("tavily-search-call", async () => {
    const res = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: apiKey,
        query,
        search_depth: searchDepth,
        max_results: maxResults,
        include_answer: true,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Tavily API failed (${res.status}): ${errText}`);
    }

    const json = await res.json();
    return {
      query: json.query,
      answer: json.answer || null,
      results: (json.results || []).map((r: any) => ({
        title: r.title,
        url: r.url,
        content: r.content,
        score: r.score,
      })),
    };
  });

  return {
    ...context,
    [data.variableName || "webSearch"]: result,
  };
};
