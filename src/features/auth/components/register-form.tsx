"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { getAuthProvider } from "@/lib/auth-config";
import { getStackClientApp } from "@/lib/stack-client";

const registerSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const provider = getAuthProvider();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const signInGithub = async () => {
    if (provider === "stack") {
      const stack = getStackClientApp();
      if (stack) {
        await stack.signInWithOAuth("github");
        return;
      }
    }

    await authClient.signIn.social({
      provider: "github",
    }, {
      onSuccess: () => {
        router.push("/");
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    });
  };

  const signInGoogle = async () => {
    if (provider === "stack") {
      const stack = getStackClientApp();
      if (stack) {
        await stack.signInWithOAuth("google");
        return;
      }
    }

    await authClient.signIn.social({
      provider: "google",
    }, {
      onSuccess: () => {
        router.push("/");
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    });
  };

  const onSubmit = async (values: RegisterFormValues) => {
    if (provider === "stack") {
      const stack = getStackClientApp();
      if (stack) {
        const result = await stack.signUpWithCredential({
          email: values.email,
          password: values.password,
        });
        if (result.status === "error") {
          toast.error(result.error.message || "Failed to create account with Stack Auth");
          return;
        }
        router.push("/");
        return;
      }
    }

    await authClient.signUp.email(
      {
        name: values.email,
        email: values.email,
        password: values.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx: any) => {
          toast.error(ctx?.error?.message || "Failed to create account");
        },
      }
    )
  };

  const isPending = form.formState.isSubmitting;

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>
            Get Started
          </CardTitle>
          <CardDescription className="flex items-center justify-center gap-1.5 pt-1">
            <span>Create your account to get started</span>
            {provider === "stack" && (
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-500 border border-emerald-500/20">
                Stack Auth
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <Button
                    onClick={signInGithub}
                    variant="outline"
                    className="w-full"
                    type="button"
                    disabled={isPending}
                  >
                    <Image alt="GitHub" src="/logos/github.svg" width={20} height={20} />
                    Continue with GitHub
                  </Button>
                  <Button
                    onClick={signInGoogle}
                    variant="outline"
                    className="w-full"
                    type="button"
                    disabled={isPending}
                  >
                    <Image alt="Google" src="/logos/google.svg" width={20} height={20} />
                    Continue with Google
                  </Button>
                </div>
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="m@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="*********"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="*********"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isPending}>
                    Sign up
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link href="/login" className="underline underline-offset-4">
                    Login
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
