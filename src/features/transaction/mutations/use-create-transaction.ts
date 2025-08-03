import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { transactionService } from "../services";
import { queryKeys } from "../queries/keys";
import type { TCreateTransactionRequest } from "../services/platform/mobile";

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TCreateTransactionRequest) =>
      transactionService.createTransaction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
      toast.success("Transaction created successfully!");
    },
    onError: (error) => {
      toast.error("Failed to create transaction. Please try again.");
      console.error("Error creating transaction:", error);
    },
  });
};
