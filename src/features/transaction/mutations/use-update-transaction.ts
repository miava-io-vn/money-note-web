import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { transactionService } from "../services";
import { queryKeys } from "../queries/keys";
import type { TUpdateTransactionFormData } from "../schemas/transaction.schema";

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: TUpdateTransactionFormData;
    }) => transactionService.updateTransaction(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
      toast.success("Transaction updated successfully!");
    },
    onError: (error) => {
      toast.error("Failed to update transaction. Please try again.");
      console.error("Error updating transaction:", error);
    },
  });
};
