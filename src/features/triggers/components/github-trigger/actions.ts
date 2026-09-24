"use server";

import { getSubscriptionToken, type Realtime } from "@inngest/realtime";
import { githubTriggerChannel } from "@/inngest/channels/github-trigger";
import { inngest } from "@/inngest/client";

export type GitHubTriggerToken = Realtime.Token<
  typeof githubTriggerChannel,
  ["status"]
>;

export async function fetchGitHubTriggerRealtimeToken(): Promise<GitHubTriggerToken> {
  const token = await getSubscriptionToken(inngest, {
    channel: githubTriggerChannel(),
    topics: ["status"],
  });

  return token;
}
