import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreditBalance = () => {
  const trpc = useTRPC();
  return useQuery(trpc.billing.getBalance.queryOptions());
};

export const useCreditHistory = (params = { page: 1, pageSize: 20 }) => {
  const trpc = useTRPC();
  return useQuery(trpc.billing.getHistory.queryOptions(params));
};

export const useCreateCheckout = () => {
  const trpc = useTRPC();
  return useMutation(trpc.billing.createCheckout.mutationOptions());
};

export const useCompleteCheckout = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.billing.completeCheckout.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.billing.getBalance.queryOptions());
        queryClient.invalidateQueries(trpc.billing.getHistory.queryOptions({}));
      },
    })
  );
};
