// routeTree.ts
import { lazyRouteComponent, createRootRoute, createRoute } from '@tanstack/react-router'
import App from './App'

const rootRoute = createRootRoute({
  component: App,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: lazyRouteComponent(() => import('./Home')),
})

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: lazyRouteComponent(() => import('./About')),
})

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: lazyRouteComponent(() => import('./Contact')),
})

export const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  contactRoute,
])
