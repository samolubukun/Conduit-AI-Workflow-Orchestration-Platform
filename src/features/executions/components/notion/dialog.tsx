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
import { BookOpenIcon } from "lucide-react";

const formSchema = z.object({
  variableName: z
    .string()
    .min(1, { message: "Variable name is required" })
    .regex(/^[A-Za-z_$][A-Za-z0-9_$]*$/, {
      message:
        "Variable name must start with a letter or underscore and contain only letters, numbers, and underscores",
    }),
  credentialId: z.string().min(1, "Notion Integration Token is required"),
  action: z.enum(["CREATE_PAGE", "QUERY_DATABASE"]),
  databaseId: z.string().min(1, "Database ID is required"),
  title: z.string().optional(),
  content: z.string().optional(),
});

export type NotionFormValues = z.infer<typeof formSchema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: NotionFormValues) => void;
  defaultValues?: Partial<NotionFormValues>;
}

export const NotionDialog = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues = {},
}: Props) => {
  const { data: credentials, isLoading: isLoadingCredentials } =
    useCredentialsByType(CredentialType.NOTION);

  const form = useForm<NotionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      variableName: defaultValues.variableName || "notion",
      credentialId: defaultValues.credentialId || "",
      action: defaultValues.action || "CREATE_PAGE",
      databaseId: defaultValues.databaseId || "",
      title: defaultValues.title || "",
      content: defaultValues.content || "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        variableName: defaultValues.variableName || "notion",
        credentialId: defaultValues.credentialId || "",
        action: defaultValues.action || "CREATE_PAGE",
        databaseId: defaultValues.databaseId || "",
        title: defaultValues.title || "",
        content: defaultValues.content || "",
      });
    }
  }, [open, defaultValues, form]);

  const watchAction = form.watch("action");
  const watchVariableName = form.watch("variableName") || "notion";

  const handleSubmit = (values: NotionFormValues) => {
    onSubmit(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
              <BookOpenIcon className="size-5" />
            </div>
            <div>
              <DialogTitle>Notion Configuration</DialogTitle>
              <DialogDescription>
                Create pages or query databases in your Notion workspace.
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
                    <Input placeholder="notion" {...field} />
                  </FormControl>
                  <FormDescription>
                    Reference outputs: {`{{${watchVariableName}.url}}`}
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
                  <FormLabel>Notion Token</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isLoadingCredentials}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Notion Token" />
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
                        <SelectValue placeholder="Select Action" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="CREATE_PAGE">Create Database Page</SelectItem>
                      <SelectItem value="QUERY_DATABASE">Query Database Records</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="databaseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Database ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. 1a2b3c4d5e6f... or {{event.databaseId}}"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Found in your Notion database share link.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {watchAction === "CREATE_PAGE" && (
              <>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Page Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Lead: {{stripeEvent.customerEmail}}"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Page Content</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Details: {{aiSummary.text}}"
                          className="min-h-[100px] font-mono text-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <DialogFooter className="mt-4">
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
