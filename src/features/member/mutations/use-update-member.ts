import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { memberService } from "../services";
import { queryKeys } from "../queries/keys";

export const useUpdateMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name: string } }) =>
      memberService.updateMember(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
      toast.success("Member updated successfully!");
    },
    onError: (error) => {
      toast.error("Failed to update member. Please try again.");
      console.error("Error updating member:", error);
    },
  });
};
