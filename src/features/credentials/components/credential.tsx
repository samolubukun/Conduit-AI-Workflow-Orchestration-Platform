"use client";

import { CredentialType } from "@/generated/prisma";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  useCreateCredential, 
  useUpdateCredential,
  useSuspenseCredential,
} from "../hooks/use-credentials";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  MailIcon,
  GitPullRequestIcon,
  BookOpenIcon,
  SearchIcon,
  BotIcon,
  Volume2Icon,
  MessageSquareIcon,
  MicIcon,
} from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(CredentialType),
  value: z.string().min(1, "API key / token is required"),
});

type FormValues = z.infer<typeof formSchema>;

const credentialTypeOptions: {
  value: CredentialType;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  logo?: string;
}[] = [
  {
    value: CredentialType.OPENAI,
    label: "OpenAI",
    logo: "/logos/openai.svg",
  },
  {
    value: CredentialType.ANTHROPIC,
    label: "Anthropic",
    logo: "/logos/anthropic.svg",
  },
  {
    value: CredentialType.GEMINI,
    label: "Gemini",
    logo: "/logos/gemini.svg",
  },
  {
    value: CredentialType.RESEND,
    label: "Resend",
    logo: "/logos/resend.svg",
  },
  {
    value: CredentialType.GITHUB,
    label: "GitHub PAT",
    logo: "/logos/github.svg",
  },
  {
    value: CredentialType.NOTION,
    label: "Notion Integration",
    logo: "/logos/notion.svg",
  },
  {
    value: CredentialType.TAVILY,
    label: "Tavily Web Search",
    logo: "/logos/tavily.svg",
  },
  {
    value: CredentialType.DEEPSEEK,
    label: "DeepSeek",
    logo: "/logos/deepseek.svg",
  },
  {
    value: CredentialType.ELEVENLABS,
    label: "ElevenLabs",
    logo: "/logos/elevenlabs.svg",
  },
  {
    value: CredentialType.TWILIO,
    label: "Twilio (AccountSID:AuthToken)",
    logo: "/logos/twilio.svg",
  },
  {
    value: CredentialType.DEEPGRAM,
    label: "Deepgram",
    logo: "/logos/deepgram.svg",
  },
  {
    value: CredentialType.TELEGRAM,
    label: "Telegram Bot Token",
    logo: "/logos/telegram.svg",
  },
  {
    value: CredentialType.AIRTABLE,
    label: "Airtable PAT",
    logo: "/logos/airtable.svg",
  },
  {
    value: CredentialType.S3,
    label: "S3 / R2 (Key:Secret)",
    logo: "/logos/s3.svg",
  },
  {
    value: CredentialType.PINECONE,
    label: "Pinecone API Key",
    logo: "/logos/pinecone.svg",
  },
  {
    value: CredentialType.LINEAR,
    label: "Linear API Key",
    logo: "/logos/linear.svg",
  },
];

interface CredentialFormProps {
  initialData?: {
    id?: string;
    name: string;
    type: CredentialType;
    value: string;
  };
}

export const CredentialForm = ({ initialData }: CredentialFormProps) => {
  const router = useRouter();
  const createCredential = useCreateCredential();
  const updateCredential = useUpdateCredential();
  const { handleError, modal } = useUpgradeModal();

  const isEdit = !initialData?.id;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      type: CredentialType.OPENAI,
      value: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (isEdit && initialData?.id) {
      await updateCredential.mutateAsync({
        id: initialData.id,
        ...values,
      });
    } else {
      await createCredential.mutateAsync(values, {
        onSuccess: (data) => {
          router.push(`/credentials/${data.id}`);
        },
        onError: (error) => {
          handleError(error);
        },
      });
    }
  };

  return (
    <>
      {modal}
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>
            {isEdit ? "Edit Credential" : "Create Credential"}
          </CardTitle>
          <CardDescription>
            {isEdit
              ? "Update your API key or credential details"
              : "Add a new API key or credential to your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Production Key" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {credentialTypeOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                          >
                            <div className="flex items-center gap-2">
                              {option.logo ? (
                                <Image
                                  src={option.logo}
                                  alt={option.label}
                                  width={16}
                                  height={16}
                                />
                              ) : option.icon ? (
                                <option.icon className="size-4 text-muted-foreground" />
                              ) : null}
                              {option.label}
                            </div>
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
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {form.watch("type") === CredentialType.TWILIO
                        ? "AccountSID:AuthToken"
                        : "API Key / Token"}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={
                          form.watch("type") === CredentialType.TWILIO
                            ? "ACxxxxxxxx:your_auth_token"
                            : "sk-... or ghp_..."
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={
                    createCredential.isPending || updateCredential.isPending
                  }
                  className="bg-[#070b14] text-white hover:bg-[#0f1624] shadow-sm font-medium"
                >
                  {createCredential.isPending || updateCredential.isPending
                    ? "Saving..."
                    : isEdit
                    ? "Update Credential"
                    : "Create Credential"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/credentials" prefetch>
                    Cancel
                  </Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export const CredentialView = ({
  credentialId,
}: {
  credentialId: string;
}) => {
  const { data: credential } = useSuspenseCredential(credentialId);

  return <CredentialForm initialData={credential} />;
};
