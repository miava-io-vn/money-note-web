import { memberQueryOption } from "@/features/member/queries/options";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(memberQueryOption);
  },
});

function RouteComponent() {
  const { data } = useSuspenseQuery(memberQueryOption);
  return <div>{JSON.stringify(data)}</div>;
}
