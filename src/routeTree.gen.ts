import { lazyFn } from "@tanstack/react-router";

import { Route as rootRoute } from "./pages/__root";
import { Route as BearsRouteImport } from "./pages/bears/route";
import { Route as IndexImport } from "./pages/index";
import { Route as BearsIdRouteImport } from "./pages/bears/$id/route";
import { Route as AuthLoginRouteImport } from "./pages/auth/login/route";

const BearsRouteRoute = BearsRouteImport.update({
  path: "/bears",
  getParentRoute: () => rootRoute,
} as any).updateLoader({
  loader: lazyFn(() => import("./pages/bears/loader"), "loader"),
});

const IndexRoute = IndexImport.update({
  path: "/",
  getParentRoute: () => rootRoute,
} as any);

const BearsIdRouteRoute = BearsIdRouteImport.update({
  path: "/$id",
  getParentRoute: () => BearsRouteRoute,
} as any);

const AuthLoginRouteRoute = AuthLoginRouteImport.update({
  path: "/auth/login",
  getParentRoute: () => rootRoute,
} as any);
declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    "/bears": {
      preLoaderRoute: typeof BearsRouteImport;
      parentRoute: typeof rootRoute;
    };
    "/auth/login": {
      preLoaderRoute: typeof AuthLoginRouteImport;
      parentRoute: typeof rootRoute;
    };
    "/bears/$id": {
      preLoaderRoute: typeof BearsIdRouteImport;
      parentRoute: typeof BearsRouteImport;
    };
  }
}
export const routeTree = rootRoute.addChildren([
  IndexRoute,
  BearsRouteRoute.addChildren([BearsIdRouteRoute]),
  AuthLoginRouteRoute,
]);
