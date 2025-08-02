import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-4">
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <p className="text-sm font-medium">Total Balance</p>
          </div>
          <p className="text-2xl font-bold">$12,345.67</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            <p className="text-sm font-medium">This Month</p>
          </div>
          <p className="text-2xl font-bold">$2,345.67</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
            <p className="text-sm font-medium">Transactions</p>
          </div>
          <p className="text-2xl font-bold">156</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-purple-500"></div>
            <p className="text-sm font-medium">Members</p>
          </div>
          <p className="text-2xl font-bold">8</p>
        </div>
      </div>
      <div className="rounded-lg border p-4">
        <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
        <p className="text-muted-foreground">
          Your recent financial activities will appear here.
        </p>
      </div>
    </div>
  );
}
