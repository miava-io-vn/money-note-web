import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/summary")({
  component: SummaryPage,
});

function SummaryPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Summary</h1>
      </div>
      <div className="rounded-lg border p-4">
        {/* Content will be added later */}
      </div>
    </div>
  );
}
