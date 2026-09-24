"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCredentialsByType } from "@/features/credentials/hooks/use-credentials";
import { CredentialType } from "@/generated/prisma";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

const formSchema = z.object({
  variableName: z
    .string()
    .min(1, { message: "Variable name is required" })
    .regex(/^[A-Za-z_$][A-Za-z0-9_$]*$/, {
      message:
        "Variable name must start with a letter or underscore and contain only letters, numbers, and underscores",
    }),
  credentialId: z.string().min(1, "Pinecone API Key is required"),
  indexHost: z.string().min(1, "Pinecone Index Host URL is required"),
  action: z.enum(["QUERY", "UPSERT"]),
  vectorJson: z.string().min(1, "Vector array JSON is required"),
  topK: z.string().min(1, "Top K results is required"),
});

export type PineconeFormValues = z.infer<typeof formSchema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: PineconeFormValues) => void;
  defaultValues?: Partial<PineconeFormValues>;
}

export const PineconeDialog = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues = {},
}: Props) => {
  const { data: credentials, isLoading: isLoadingCredentials } =
    useCredentialsByType(CredentialType.PINECONE);

  const form = useForm<PineconeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      variableName: defaultValues.variableName || "pinecone",
      credentialId: defaultValues.credentialId || "",
      indexHost: defaultValues.indexHost || "",
      action: defaultValues.action || "QUERY",
      vectorJson: defaultValues.vectorJson || "[]",
      topK: defaultValues.topK || "5",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        variableName: defaultValues.variableName || "pinecone",
        credentialId: defaultValues.credentialId || "",
        indexHost: defaultValues.indexHost || "",
        action: defaultValues.action || "QUERY",
        vectorJson: defaultValues.vectorJson || "[]",
        topK: defaultValues.topK || "5",
      });
    }
  }, [open, defaultValues, form]);

  const watchVariableName = form.watch("variableName") || "pinecone";

  const handleSubmit = (values: PineconeFormValues) => {
    onSubmit(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-cyan-500/10">
              <Image src="/logos/pinecone.svg" alt="Pinecone" width={20} height={20} />
            </div>
            <div>
              <DialogTitle>Pinecone Vector Search</DialogTitle>
              <DialogDescription>
                Perform vector similarity search for semantic RAG pipelines.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4 mt-2"
          >
            <FormField
              control={form.control}
              name="variableName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variable Name</FormLabel>
                  <FormControl>
                    <Input placeholder="pinecone" {...field} />
                  </FormControl>
                  <FormDescription>
                    Best match: {`{{${watchVariableName}.matches.[0].metadata.text}}`}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="credentialId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pinecone Credential</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isLoadingCredentials}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Pinecone API Key" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {credentials?.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="indexHost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Index Host URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://my-index-xxx.svc.pinecone.io" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="action"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Action</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Action" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="QUERY">Query Top K</SelectItem>
                        <SelectItem value="UPSERT">Upsert Vector</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="topK"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Top K Results</FormLabel>
                    <FormControl>
                      <Input placeholder="5" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="vectorJson"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vector Array (JSON)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="[0.012, -0.043, 0.123, ...]"
                      className="min-h-[90px] font-mono text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4">
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
