import * as React from "react";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { QueryClient } from "@tanstack/react-query";
import MobileSidebarLayout from "@/components/layout/mobile-sidebar";

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <MobileSidebarLayout>
        <Outlet />
      </MobileSidebarLayout>
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </React.Fragment>
  );
}
