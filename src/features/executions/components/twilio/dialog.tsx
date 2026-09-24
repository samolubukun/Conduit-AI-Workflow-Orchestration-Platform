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
import { MessageSquareIcon } from "lucide-react";

const formSchema = z.object({
  variableName: z
    .string()
    .min(1, { message: "Variable name is required" })
    .regex(/^[A-Za-z_$][A-Za-z0-9_$]*$/, {
      message:
        "Variable name must start with a letter or underscore and contain only letters, numbers, and underscores",
    }),
  credentialId: z.string().min(1, "Twilio Credential is required"),
  channel: z.enum(["SMS", "WHATSAPP"]),
  fromNumber: z.string().min(1, "Sender number is required"),
  toNumber: z.string().min(1, "Recipient number is required"),
  body: z.string().min(1, "Message content is required"),
});

export type TwilioFormValues = z.infer<typeof formSchema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: TwilioFormValues) => void;
  defaultValues?: Partial<TwilioFormValues>;
}

export const TwilioDialog = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues = {},
}: Props) => {
  const { data: credentials, isLoading: isLoadingCredentials } =
    useCredentialsByType(CredentialType.TWILIO);

  const form = useForm<TwilioFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      variableName: defaultValues.variableName || "twilio",
      credentialId: defaultValues.credentialId || "",
      channel: defaultValues.channel || "SMS",
      fromNumber: defaultValues.fromNumber || "",
      toNumber: defaultValues.toNumber || "",
      body: defaultValues.body || "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        variableName: defaultValues.variableName || "twilio",
        credentialId: defaultValues.credentialId || "",
        channel: defaultValues.channel || "SMS",
        fromNumber: defaultValues.fromNumber || "",
        toNumber: defaultValues.toNumber || "",
        body: defaultValues.body || "",
      });
    }
  }, [open, defaultValues, form]);

  const watchChannel = form.watch("channel");
  const watchVariableName = form.watch("variableName") || "twilio";

  const handleSubmit = (values: TwilioFormValues) => {
    onSubmit(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-red-500/10 text-red-600">
              <MessageSquareIcon className="size-5" />
            </div>
            <div>
              <DialogTitle>Twilio Messaging Configuration</DialogTitle>
              <DialogDescription>
                Send global SMS and automated WhatsApp notifications.
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
                    <Input placeholder="twilio" {...field} />
                  </FormControl>
                  <FormDescription>
                    Message SID: {`{{${watchVariableName}.sid}}`}
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
                  <FormLabel>Twilio Credential (SID:Token)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isLoadingCredentials}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Twilio Account" />
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
              name="channel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Channel" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="SMS">SMS Message</SelectItem>
                      <SelectItem value="WHATSAPP">WhatsApp Message</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="fromNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {watchChannel === "WHATSAPP" ? "Twilio WhatsApp #" : "Twilio Phone #"}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          watchChannel === "WHATSAPP"
                            ? "+14155238886"
                            : "+15551234567"
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="toNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient #</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+15559876543 or {{event.phone}}"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message Body</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Alert: {{event.message}} | Ref: {{stripeEvent.id}}"
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
