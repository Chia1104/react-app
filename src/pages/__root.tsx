import { Outlet, rootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const Root = () => {
  return (
    <main>
      <Outlet />
      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools position="bottom-right" />
    </main>
  );
};

export const Route = rootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: Root,
  errorComponent: ({ error }) => {
    if (error instanceof Response) {
      return <p>{error.statusText}</p>;
    }
    return <p>Ooops!</p>;
  },
});
