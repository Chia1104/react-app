import { FileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = new FileRoute("/bears/$id").createRoute({
  component: lazyRouteComponent(() => import("./~page")),
});
