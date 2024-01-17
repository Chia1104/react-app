import { FileRoute, lazyRouteComponent, lazyFn } from "@tanstack/react-router";

export const Route = new FileRoute("/auth/login").createRoute({
  component: lazyRouteComponent(() => import("./~page")),
  errorComponent: lazyRouteComponent(() => import("./~error")),
});
