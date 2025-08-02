import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { memberService } from "../services";
import { queryKeys } from "../queries/keys";

export const useCreateMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { name: string }) => memberService.createMember(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.all });
      toast.success("Member created successfully!");
    },
    onError: (error) => {
      toast.error("Failed to create member. Please try again.");
      console.error("Error creating member:", error);
    },
  });
};
