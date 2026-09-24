import { createTRPCRouter } from '../init';
import {
  workflowsRouter,
  credentialsRouter,
  executionsRouter,
  billingRouter,
} from '@/server/api/routers';

export const appRouter = createTRPCRouter({
  workflows: workflowsRouter,
  credentials: credentialsRouter,
  executions: executionsRouter,
  billing: billingRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
