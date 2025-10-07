import { createFileRoute } from '@tanstack/react-router'
import { createMiddleware } from '@tanstack/react-start'

export const Route = createFileRoute('/server-entry-point')({
    component: RouteComponent,
    server: {
        middleware: [
            createMiddleware().server(async ({ next, context }) => {
                console.log('context.foo', context.foo)
                console.log('context.hello', context.hello)

                return await next()
            }),
        ],
    },
})

function RouteComponent() {
    return (
        <div className="[&_pre]:bg-gray-200 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:m-5 p-10 [&_*]:p-2 [&_button]:border [&_button]:border-black [&_button]:cursor-pointer [&_button]:p-2 [&_button]:rounded-2xl [&_button]:active:scale-95 [&_h2]:text-2xl">
            <p>
                When your server needs to pass additional, typed data into
                request handlers (for example, authenticated user info, a
                database connection, or per-request flags), register a request
                context type via TypeScript module augmentation. The registered
                context is delivered as the second argument to the server fetch
                handler and is available throughout the server-side middleware
                chain — including global middleware, request/function
                middleware, server routes, server functions, and the router
                itself.
            </p>
            <p>
                To add types for your request context, augment the Register
                interface from @tanstack/react-start with a
                server.requestContext property. The runtime context you pass to
                handler.fetch will then match that type. Example:
            </p>
            <pre>{`import handler from '@tanstack/react-start/server-entry'

type MyRequestContext = {
  hello: string
  foo: number
}

declare module '@tanstack/react-start' {
  interface Register {
    server: {
      requestContext: MyRequestContext
    }
  }
}

export default {
  async fetch(request: Request): Promise<Response> {
    return handler.fetch(request, { context: { hello: 'world', foo: 123 } })
  },
}`}</pre>
            <p>
                This can be observed in this application. Check console logs
                (server) to see logs from this route middleware logging data
                from context.
            </p>
        </div>
    )
}
