import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/analytics")({
  component: AnalyticsPage,
});

function AnalyticsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Analytics</h1>
      </div>
      <div className="rounded-lg border p-4">
        <p className="text-muted-foreground">
          Your financial analytics and charts will appear here.
        </p>
      </div>
    </div>
  );
}
