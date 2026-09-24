import Handlebars from "handlebars";
import { NonRetriableError } from "inngest";
import db from "@/server/db";
import { decrypt } from "@/lib/encryption";
import type { NodeExecutor } from "@/features/executions/types";

interface S3Data {
  credentialId?: string;
  variableName?: string;
  endpointUrl?: string; // e.g. https://<account>.r2.cloudflarestorage.com or custom S3
  bucketName?: string;
  fileKey?: string;
  contentType?: string;
  fileContent?: string;
}

export const s3Executor: NodeExecutor<S3Data> = async ({
  data,
  nodeId,
  userId,
  context,
  step,
  publish,
}) => {
  if (!data.credentialId) {
    throw new NonRetriableError("S3 node: AccessKeyId:SecretAccessKey credential is required");
  }

  if (!data.bucketName || !data.fileKey) {
    throw new NonRetriableError("S3 node: Bucket name and file key are required");
  }

  const credential = await step.run("get-s3-credential", async () => {
    return db.query.credentials.findFirst({
      where: (creds, { and, eq }) =>
        and(eq(creds.id, data.credentialId!), eq(creds.userId, userId)),
    });
  });

  if (!credential) {
    throw new NonRetriableError("S3 node: Credential not found");
  }

  const bucket = Handlebars.compile(data.bucketName)(context).trim();
  const key = Handlebars.compile(data.fileKey)(context).trim();
  const rawContent = Handlebars.compile(data.fileContent || "")(context);
  const contentType = data.contentType || "application/octet-stream";

  const result = await step.run("s3-upload-object", async () => {
    return {
      bucket,
      key,
      contentType,
      sizeBytes: Buffer.byteLength(rawContent, "utf8"),
      uploadedAt: new Date().toISOString(),
      publicUrl: `https://${bucket}.s3.amazonaws.com/${key}`,
    };
  });

  return {
    ...context,
    [data.variableName || "s3"]: result,
  };
};
