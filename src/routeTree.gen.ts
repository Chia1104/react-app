import { Route as rootRoute } from './pages/__root'
import { Route as IndexImport } from './pages/index'
import { Route as BearsIndexImport } from './pages/bears/index'
import { Route as AuthLoginIndexImport } from './pages/auth/login/index'

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const BearsIndexRoute = BearsIndexImport.update({
  path: '/bears/',
  getParentRoute: () => rootRoute,
} as any)

const AuthLoginIndexRoute = AuthLoginIndexImport.update({
  path: '/auth/login/',
  getParentRoute: () => rootRoute,
} as any)
declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/bears/': {
      preLoaderRoute: typeof BearsIndexImport
      parentRoute: typeof rootRoute
    }
    '/auth/login/': {
      preLoaderRoute: typeof AuthLoginIndexImport
      parentRoute: typeof rootRoute
    }
  }
}
export const routeTree = rootRoute.addChildren([
  IndexRoute,
  BearsIndexRoute,
  AuthLoginIndexRoute,
])
