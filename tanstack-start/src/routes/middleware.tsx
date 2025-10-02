import {
    contextMiddlewareCrossEnvironment,
    endpointWithMiddlewareToTestContext,
    getSomeNiceData,
    outerMiddleware,
} from '@/middleware'
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'

const queryClient = new QueryClient()

export const Route = createFileRoute('/middleware')({
    component: () => (
        <QueryClientProvider client={queryClient}>
            <RouteComponent />
        </QueryClientProvider>
    ),
    server: {
        middleware: [outerMiddleware],
    },
})

function RouteComponent() {
    const getSomeNiceDataFn = useServerFn(getSomeNiceData)
    const { data } = useQuery({
        queryKey: ['someNiceData'],
        queryFn: () => getSomeNiceDataFn(),
    })

    const endpointWithMiddlewareToTestContextFn = useServerFn(
        endpointWithMiddlewareToTestContext
    )
    const { data: contextTestData } = useQuery({
        queryKey: ['contextTestData'],
        queryFn: () => endpointWithMiddlewareToTestContextFn(),
    })

    return (
        <div className="[&_pre]:inline [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:m-5 p-10 [&_*]:p-2 [&_button]:border [&_button]:border-black [&_button]:cursor-pointer [&_button]:p-2 [&_button]:rounded-2xl [&_button]:active:scale-95">
            <h1>Middleware Overview</h1>
            <p>There are two types of middleware:</p>
            <ul className="list-disc list-inside">
                <li>
                    request middleware and server function middleware. Request
                    middleware is used to customize the behavior of any server
                    request that passes through it, including server functions.
                </li>
                <li>
                    Server function middleware is used to customize the behavior
                    of server functions specifically.
                </li>
            </ul>
            <p>
                Server function middleware is a subset of request middleware
                that has extra functionality specifically for server functions
                like being able to validate input data or perform client-side
                logic both before and after the server function is executed.
            </p>
            <p>
                This page itself uses middleware in route definition, so the
                middleware is run on every navigation to this page.
            </p>
            <p>
                Also as a test, I created example server function that uses
                server function middleware. Below is result of the function, so
                middleware results could be seen in server and client consoles.
            </p>
            <p>The data: {data?.message}</p>
            <h1>Context passing</h1>
            <p>
                In order to test context passing between middlewares, endpoint
                was created that returns this data:{' '}
                <b>{contextTestData?.message}</b>. As always, some logs from
                middleware can be inspected on both, server and client.
            </p>
            <h1>Global Middleware</h1>
            <p>
                Global middleware runs automatically for every request in your
                application. This is useful for functionality like
                authentication, logging, and monitoring that should apply to all
                requests.
            </p>
            <p>
                It needs to be defined with <pre>createStart</pre> function in
                file <pre>src/start</pre>. As usual check server logs for logs
                from global middleware.
            </p>
            <p>
                As other middlewares, global middleware can access and modify
                context, but it won't be correctly types when using the context
                in other middlewares/server functions. In order to correct that,
                we need to add global middleware inside the middleware array for
                server function. This way correct types will be inferred.
                Middleware itself won't be functionally influenced by that.
            </p>
        </div>
    )
}
