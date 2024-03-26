import {
  createFileRoute,
  lazyRouteComponent,
  notFound,
} from "@tanstack/react-router";
import { useBears } from "@/stores/bears.store";

export const Route = createFileRoute("/bears/$id")({
  component: lazyRouteComponent(() => import("./~page")),
  loader: (ctx) => {
    if (
      useBears.getState().bears < Number(ctx.params.id) ||
      !useBears.getState().bears
    ) {
      throw notFound();
    }
  },
  notFoundComponent: () => <h1>404 !!</h1>,
});
