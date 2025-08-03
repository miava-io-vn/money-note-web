import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  activeMembersQueryOption,
  autoGenMembersQueryOption,
} from "@/features/member/queries/options";
import { CreateTransactionDialog } from "@/features/transaction/components/create-transaction-dialog";
import { TransactionActions } from "@/features/transaction/components/transaction-actions";
import { allTransactionQueryOptions } from "@/features/transaction/queries/options";
import type { TTransaction } from "@/features/transaction/types/transaction.type";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: TransactionsPage,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(allTransactionQueryOptions);
    await context.queryClient.ensureQueryData(activeMembersQueryOption);
    await context.queryClient.ensureQueryData(autoGenMembersQueryOption);
  },
});

function TransactionsPage() {
  const { data: transactions } = useSuspenseQuery(allTransactionQueryOptions);

  const getStatusBadgeVariant = (status: TTransaction["status"]) => {
    switch (status) {
      case "draft":
        return "secondary";
      case "noted":
        return "default";
      case "locked":
        return "destructive";
      default:
        return "outline";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const calculateTotalAmount = (transaction: TTransaction) => {
    return transaction.transaction_members.reduce((total, member) => {
      return total + member.paid;
    }, 0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="container mx-auto py-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <CreateTransactionDialog />
      </div>

      {transactions.length === 0 ? (
        <div className="text-center p-8 text-muted-foreground">
          No transactions found. Create your first transaction!
        </div>
      ) : (
        <div className="grid gap-4">
          {transactions.map((transaction: TTransaction) => (
            <Card
              key={transaction.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <CardTitle className="text-lg">
                        {transaction.note || "Empty"} -{" "}
                        {formatDate(transaction.date)}
                      </CardTitle>
                      <div className="flex gap-2 mt-2">
                        <Badge
                          variant={getStatusBadgeVariant(transaction.status)}
                        >
                          {transaction.status.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="font-medium">
                          {formatCurrency(calculateTotalAmount(transaction))}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <TransactionActions transaction={transaction} />
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
