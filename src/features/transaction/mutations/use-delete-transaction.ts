import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { transactionService } from "../services";
import { queryKeys } from "../queries/keys";

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => transactionService.deleteTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
      toast.success("Transaction deleted successfully!");
    },
    onError: (error) => {
      toast.error("Failed to delete transaction. Please try again.");
      console.error("Error deleting transaction:", error);
    },
  });
};
