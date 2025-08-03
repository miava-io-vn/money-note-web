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
import { useUpdateTransaction } from "../mutations";
import {
  updateTransactionSchema,
  type TUpdateTransactionFormData,
} from "../schemas/transaction.schema";
import { TransactionForm } from "./transaction-form";
import type { TTransaction } from "../types/transaction.type";
import { Edit } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function UpdateTransactionDialog({
  transaction,
}: {
  transaction: TTransaction;
}) {
  const form = useForm<TUpdateTransactionFormData>({
    resolver: zodResolver(updateTransactionSchema),
    defaultValues: {
      date: transaction.date,
      note: transaction.note,
      transactionMembers: transaction.transaction_members.map((member) => ({
        member_id: member.member_id,
        paid: member.paid,
      })),
    },
    mode: "onChange",
  });

  const [open, setOpen] = useState(false);

  const updateTransactionMutation = useUpdateTransaction();

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = async (data: TUpdateTransactionFormData) => {
    await updateTransactionMutation.mutateAsync({
      id: transaction.id,
      data,
    });
    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
        </DialogHeader>
        <TransactionForm
          form={form}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={updateTransactionMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
