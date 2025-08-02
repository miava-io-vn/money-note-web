import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>
      <div className="rounded-lg border p-4">
        <p className="text-muted-foreground">
          Application settings and preferences will appear here.
        </p>
      </div>
    </div>
  );
}
