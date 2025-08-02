import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { memberService } from "../services";
import { queryKeys } from "../queries/keys";

export const useToggleActive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => memberService.toggleActive(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
      toast.success("Member status updated successfully!");
    },
    onError: (error) => {
      toast.error("Failed to update member status. Please try again.");
      console.error("Error toggling member status:", error);
    },
  });
};
