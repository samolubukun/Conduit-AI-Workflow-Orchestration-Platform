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
  credentialId: z.string().min(1, "Telegram Bot Token is required"),
  chatId: z.string().min(1, "Chat ID or @channel is required"),
  message: z.string().min(1, "Message text is required"),
  parseMode: z.enum(["Markdown", "HTML"]),
});

export type TelegramFormValues = z.infer<typeof formSchema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: TelegramFormValues) => void;
  defaultValues?: Partial<TelegramFormValues>;
}

export const TelegramDialog = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues = {},
}: Props) => {
  const { data: credentials, isLoading: isLoadingCredentials } =
    useCredentialsByType(CredentialType.TELEGRAM);

  const form = useForm<TelegramFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      variableName: defaultValues.variableName || "telegram",
      credentialId: defaultValues.credentialId || "",
      chatId: defaultValues.chatId || "",
      message: defaultValues.message || "",
      parseMode: defaultValues.parseMode || "Markdown",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        variableName: defaultValues.variableName || "telegram",
        credentialId: defaultValues.credentialId || "",
        chatId: defaultValues.chatId || "",
        message: defaultValues.message || "",
        parseMode: defaultValues.parseMode || "Markdown",
      });
    }
  }, [open, defaultValues, form]);

  const watchVariableName = form.watch("variableName") || "telegram";

  const handleSubmit = (values: TelegramFormValues) => {
    onSubmit(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-sky-500/10">
              <Image src="/logos/telegram.svg" alt="Telegram" width={20} height={20} />
            </div>
            <div>
              <DialogTitle>Telegram Bot Configuration</DialogTitle>
              <DialogDescription>
                Dispatch instant notifications to Telegram chats or public channels.
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
                    <Input placeholder="telegram" {...field} />
                  </FormControl>
                  <FormDescription>
                    Message ID: {`{{${watchVariableName}.messageId}}`}
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
                  <FormLabel>Telegram Bot Token</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isLoadingCredentials}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Telegram Bot Token" />
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

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="chatId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chat ID / Channel</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 12345678 or @mychannel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="parseMode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Formatting</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Format" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Markdown">Markdown</SelectItem>
                        <SelectItem value="HTML">HTML</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Alert: {{event.summary}}&#10;DeepSeek Insight: {{deepseek.text}}"
                      className="min-h-[100px] font-mono text-sm"
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
