import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/members")({
  component: MembersPage,
});

function MembersPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Members</h1>
      </div>
      <div className="rounded-lg border p-4">
        <p className="text-muted-foreground">
          Your team members and collaborators will appear here.
        </p>
      </div>
    </div>
  );
}
