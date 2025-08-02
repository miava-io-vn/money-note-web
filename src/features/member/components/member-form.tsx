import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { TMember } from "../types/member.type";
import {
  createMemberSchema,
  updateMemberSchema,
  type CreateMemberFormData,
  type UpdateMemberFormData,
} from "../schemas/member.schema";

interface MemberFormProps {
  mode: "create" | "edit";
  member?: TMember;
  onSubmit: (
    data: CreateMemberFormData | UpdateMemberFormData
  ) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function MemberForm({
  mode,
  member,
  onSubmit,
  onCancel,
  isLoading = false,
}: MemberFormProps) {
  const schema = mode === "create" ? createMemberSchema : updateMemberSchema;

  const form = useForm<CreateMemberFormData | UpdateMemberFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: member?.name || "",
      ...(mode === "edit" && member ? { id: member.id } : {}),
    },
    mode: "onChange",
  });

  const handleSubmit = async (
    data: CreateMemberFormData | UpdateMemberFormData
  ) => {
    await onSubmit(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter member name"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button type="submit" disabled={isLoading || !form.formState.isValid}>
            {isLoading ? "Saving..." : mode === "create" ? "Create" : "Update"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
