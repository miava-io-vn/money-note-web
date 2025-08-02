import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { memberService } from "../services";
import { queryKeys } from "../queries/keys";

export const useToggleAutoGen = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => memberService.toggleAutoGen(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
      toast.success("Auto generation setting updated successfully!");
    },
    onError: (error) => {
      toast.error(
        "Failed to update auto generation setting. Please try again."
      );
      console.error("Error toggling auto generation:", error);
    },
  });
};
