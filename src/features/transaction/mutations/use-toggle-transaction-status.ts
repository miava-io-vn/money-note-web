import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { transactionService } from "../services";
import { queryKeys } from "../queries/keys";

export const useToggleTransactionStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => transactionService.toggleTransactionStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
      toast.success("Transaction status updated successfully!");
    },
    onError: (error) => {
      toast.error("Failed to update transaction status. Please try again.");
      console.error("Error updating transaction status:", error);
    },
  });
};
