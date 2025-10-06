import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/selective-ssr/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="[&_pre]:bg-gray-200 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:m-5 p-10 [&_*]:p-2 [&_button]:border [&_button]:border-black [&_button]:cursor-pointer [&_button]:p-2 [&_button]:rounded-2xl [&_button]:active:scale-95 [&_h2]:text-2xl">
            <h1>Selective Server-Side Rendering</h1>
            <p>
                In TanStack Start, routes matching the initial request are
                rendered on the server by default. This means beforeLoad and
                loader are executed on the server, followed by rendering the
                route components. The resulting HTML is sent to the client,
                which hydrates the markup into a fully interactive application.
            </p>
            <h2>SPA mode</h2>
            <p>
                TanStack Start's SPA mode completely disables server-side
                execution of beforeLoad and loader, as well as server-side
                rendering of route components. Selective SSR allows you to
                configure server-side handling on a per-route basis, either
                statically or dynamically.
            </p>
            <p>We can disable SSR globally with</p>
            <pre>{`// src/start.ts
import { createStart } from '@tanstack/react-start'

export const startInstance = createStart(() => ({
  // Disable SSR by default
  defaultSsr: false,
}))`}</pre>
            <p>
                We can also disable SSR for particular route with ssr:false:{' '}
                <Link
                    to="/selective-ssr/client-side-render"
                    className="underline"
                >
                    Client Side Rendered Route
                </Link>
            </p>
            <p>
                We can also disable partially SSR with ssr:'data-only', which
                keeps loader and beforeLoad running on server, but component
                itself is rendered on the client:
                <Link
                    to="/selective-ssr/data-only-rendering"
                    className="underline"
                >
                    Data Only Rendered Route
                </Link>
            </p>
            <h2>Functional Form of SSR</h2>
            <p>
                We can also define funciton that returns if ssr should be
                false/true/data-only. Example below:
            </p>
            <pre>{`// src/routes/docs/$docType/$docId.tsx
export const Route = createFileRoute('/docs/$docType/$docId')({
  validateSearch: z.object({ details: z.boolean().optional() }),
  ssr: ({ params, search }) => {
    if (params.status === 'success' && params.value.docType === 'sheet') {
      return false
    }
    if (search.status === 'success' && search.value.details) {
      return 'data-only'
    }
  },
  beforeLoad: () => {
    console.log('Executes on the server depending on the result of ssr()')
  },
  loader: () => {
    console.log('Executes on the server depending on the result of ssr()')
  },
  component: () => <div>This component is rendered on the client</div>,
})`}</pre>
            <h2>How to disable SSR of the root route?</h2>
            <p>
                You can disable server side rendering of the root route
                component, however the &lt;html&gt; shell still needs to be
                rendered on the server. This shell is configured via the
                shellComponent property and takes a single property children.
                The shellComponent is always SSRed and is wrapping around the
                root component, the root errorComponent or the root notFound
                component respectively. A minimal setup of a root route with
                disabled SSR for the route component looks like this:
            </p>
            <pre>{`import * as React from 'react'

import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'

export const Route = createRootRoute({
  shellComponent: RootShell,
  component: RootComponent,
  errorComponent: () => <div>Error</div>,
  notFoundComponent: () => <div>Not found</div>,
  ssr: false, // or "defaultSsr: false" on the router
})

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function RootComponent() {
  return (
    <div>
      <h1>This component will be rendered on the client</h1>
      <Outlet />
    </div>
  )
}`}</pre>
        </div>
    )
}
