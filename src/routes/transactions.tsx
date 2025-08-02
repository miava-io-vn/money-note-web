import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/transactions")({
  component: TransactionsPage,
});

function TransactionsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Transactions</h1>
      </div>
      <div className="rounded-lg border p-4">
        <p className="text-muted-foreground">
          Your transaction history will appear here.
        </p>
      </div>
    </div>
  );
}
