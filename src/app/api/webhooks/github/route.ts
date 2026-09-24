import { sendWorkflowExecution } from "@/inngest/utils";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const workflowId = url.searchParams.get("workflowId");

    if (!workflowId) {
      return NextResponse.json(
        { success: false, error: "Missing required query parameter: workflowId" },
        { status: 400 },
      );
    }

    const eventType = request.headers.get("x-github-event") || "unknown";
    const deliveryId = request.headers.get("x-github-delivery") || "";
    const body = await request.json();

    const githubData = {
      event: eventType,
      deliveryId,
      repository: body.repository?.full_name,
      sender: body.sender?.login,
      action: body.action,
      issue: body.issue,
      pull_request: body.pull_request,
      comment: body.comment,
      raw: body,
    };

    // Trigger an Inngest job
    await sendWorkflowExecution({
      workflowId,
      initialData: {
        github: githubData,
      },
    });

    return NextResponse.json(
      { success: true, message: "GitHub webhook processed" },
      { status: 200 },
    );
  } catch (error) {
    console.error("GitHub webhook error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process GitHub webhook" },
      { status: 500 },
    );
  }
}
