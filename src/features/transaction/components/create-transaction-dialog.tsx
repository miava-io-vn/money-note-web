import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCreateTransaction } from "../mutations";
import {
  createTransactionSchema,
  type TCreateTransactionFormData,
} from "../schemas/transaction.schema";
import { TransactionForm } from "./transaction-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { autoGenMembersQueryOption } from "@/features/member/queries/options";

export function CreateTransactionDialog() {
  const [open, setOpen] = useState(false);

  const { data: autoGenMembers = [] } = useSuspenseQuery(
    autoGenMembersQueryOption
  );

  const form = useForm<TCreateTransactionFormData>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      note: "",
      transactionMembers: autoGenMembers.map((member) => ({
        member_id: member.id,
        paid: 0,
      })),
    },
    mode: "onChange",
  });

  const createTransactionMutation = useCreateTransaction();

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = async (data: TCreateTransactionFormData) => {
    await createTransactionMutation.mutateAsync(data);
    setOpen(false);
  };

  useEffect(() => {
    if (autoGenMembers.length > 0) {
      form.reset({
        date: new Date().toISOString().split("T")[0],
        note: "",
        transactionMembers: autoGenMembers.map((member) => ({
          member_id: member.id,
          paid: 0,
        })),
      });
    }
  }, [autoGenMembers, form]);

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form, autoGenMembers]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Transaction</DialogTitle>
        </DialogHeader>
        <TransactionForm
          form={form}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={createTransactionMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
