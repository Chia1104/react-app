import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

export const Route = createFileRoute("/bears")({
  component: lazyRouteComponent(() => import("./~page")),
});
