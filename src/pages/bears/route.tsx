import { FileRoute, lazyRouteComponent, lazyFn } from "@tanstack/react-router";

export const Route = new FileRoute("/bears").createRoute({
  component: lazyRouteComponent(() => import("./~page")),
});
