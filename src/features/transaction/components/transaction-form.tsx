import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { activeMembersQueryOption } from "@/features/member/queries/options";
import { useQuery } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, type UseFormReturn } from "react-hook-form";
import type {
  TCreateTransactionFormData,
  TUpdateTransactionFormData,
} from "../schemas/transaction.schema";

type TransactionFormProps = {
  form: UseFormReturn<TCreateTransactionFormData | TUpdateTransactionFormData>;
  onSubmit: (
    data: TCreateTransactionFormData | TUpdateTransactionFormData
  ) => void;
  onCancel: () => void;
  isLoading: boolean;
};

export function TransactionForm({
  form,
  onSubmit,
  onCancel,
  isLoading,
}: TransactionFormProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "transactionMembers",
  });

  const { data: activeMembers } = useQuery(activeMembersQueryOption);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter note..."
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Transaction Members</h3>
            <Badge variant="secondary">
              {fields.length} member{fields.length !== 1 ? "s" : ""}
            </Badge>
          </div>
          <div className="space-y-2">
            {fields.map((field, index) => {
              const currentMemberId = form.watch(
                `transactionMembers.${index}.member_id`
              );
              const currentPaid =
                form.watch(`transactionMembers.${index}.paid`) || 0;

              return (
                <div
                  key={field.id}
                  className="flex items-center gap-3 p-3 border rounded-lg bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <Label
                      htmlFor={`member-${index}`}
                      className="text-sm font-medium"
                    >
                      Member
                    </Label>
                    <select
                      id={`member-${index}`}
                      value={currentMemberId}
                      onChange={(e) => {
                        form.setValue(
                          `transactionMembers.${index}.member_id`,
                          e.target.value
                        );
                      }}
                      disabled={isLoading}
                      className="w-full p-2 border rounded-md mt-1"
                    >
                      <option value="">Select a member</option>
                      {activeMembers?.map((member) => (
                        <option key={member.id} value={member.id}>
                          {member.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex-1">
                    <Label
                      htmlFor={`paid-${index}`}
                      className="text-sm font-medium"
                    >
                      Paid Amount
                    </Label>
                    <Input
                      id={`paid-${index}`}
                      value={currentPaid}
                      onChange={(e) => {
                        form.setValue(
                          `transactionMembers.${index}.paid`,
                          parseFloat(e.target.value) || 0
                        );
                      }}
                      placeholder="0"
                      disabled={isLoading}
                      className="mt-1"
                    />
                  </div>

                  <Button
                    type="button"
                    onClick={() => remove(index)}
                    disabled={isLoading}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>

          <Button
            type="button"
            onClick={() =>
              append({
                member_id: "",
                paid: 0,
              })
            }
            disabled={isLoading}
            variant="outline"
            className="w-full"
          >
            <Plus className="h-4 w-4" />
            Add Member
          </Button>
        </div>

        <div className="flex gap-2 pt-4">
          <Button
            type="submit"
            disabled={isLoading || !form.formState.isValid}
            className="flex-1"
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            variant="outline"
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
