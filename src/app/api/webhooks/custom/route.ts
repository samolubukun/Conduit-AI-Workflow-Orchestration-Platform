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

    let payload: Record<string, unknown> = {};
    try {
      payload = await request.json();
    } catch {
      // Body may not be valid JSON or empty
      payload = {};
    }

    const headers: Record<string, string> = {};
    request.headers.forEach((value, key) => {
      headers[key] = value;
    });

    const webhookData = {
      timestamp: new Date().toISOString(),
      headers,
      body: payload,
      raw: payload,
    };

    // Trigger Inngest workflow run
    await sendWorkflowExecution({
      workflowId,
      initialData: {
        webhook: webhookData,
      },
    });

    return NextResponse.json(
      { success: true, message: "Workflow triggered successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Custom webhook error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process webhook" },
      { status: 500 },
    );
  }
}
