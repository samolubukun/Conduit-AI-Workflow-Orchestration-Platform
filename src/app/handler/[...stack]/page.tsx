import { StackHandler } from "@stackframe/stack";
import { stackServerApp } from "@/lib/stack-auth";

export default function Handler(props: { params: Promise<{ [key: string]: string | string[] }> }) {
  return <StackHandler fullPage app={stackServerApp} routeProps={props} />;
}
