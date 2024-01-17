import { LoaderFnContext, redirect } from "@tanstack/react-router";
import { useBears } from "@/stores/bears.store";

export const loader = (ctx: LoaderFnContext<{ id?: string | null }>) => {
  if (
    useBears.getState().bears < Number(ctx.params.id ?? 0) ||
    !useBears.getState().bears
  ) {
    throw redirect({
      to: "/",
    });
  }
};
