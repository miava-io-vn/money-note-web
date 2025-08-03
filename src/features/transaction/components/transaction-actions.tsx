import { MoreHorizontal, Trash2, Power } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { TTransaction } from "../types/transaction.type";
import { UpdateTransactionDialog } from "./update-transaction-dialog";
import { useDeleteTransaction, useToggleTransactionStatus } from "../mutations";

interface TransactionActionsProps {
  transaction: TTransaction;
}

export function TransactionActions({ transaction }: TransactionActionsProps) {
  const isDraft = transaction.status === "draft";
  const canUpdate = isDraft;
  const canDelete = isDraft;

  const deleteTransactionMutation = useDeleteTransaction();
  const toggleStatusMutation = useToggleTransactionStatus();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      await deleteTransactionMutation.mutateAsync(transaction.id);
    }
  };

  const handleToggleStatus = async () => {
    await toggleStatusMutation.mutateAsync(transaction.id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {canUpdate && <UpdateTransactionDialog transaction={transaction} />}
        {canDelete && (
          <DropdownMenuItem onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={handleToggleStatus}>
          <Power className="mr-2 h-4 w-4" />
          {transaction.status === "noted" ? "Set to Draft" : "Set to Noted"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
