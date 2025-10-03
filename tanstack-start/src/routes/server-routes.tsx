import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

const queryClient = new QueryClient()

// The most simple server route - returning a simple text response.
export const Route = createFileRoute('/server-routes')({
    component: () => (
        <QueryClientProvider client={queryClient}>
            <RouteComponent />
        </QueryClientProvider>
    ),
})

function RouteComponent() {
    const { data } = useQuery({
        queryKey: ['someData'],
        queryFn: async () =>
            fetch('/simple-server-route').then((res) => res.text()),
    })

    const { data: postData } = useQuery({
        queryKey: ['somePostData'],
        queryFn: async () =>
            fetch('/simple-server-route', { method: 'POST' }).then((res) =>
                res.text()
            ),
    })
    return (
        <div className="[&_pre]:bg-gray-200 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:m-5 p-10 [&_*]:p-2 [&_button]:border [&_button]:border-black [&_button]:cursor-pointer [&_button]:p-2 [&_button]:rounded-2xl [&_button]:active:scale-95">
            <h1>Server Routes</h1>
            <p>
                Most simple server route implement just GET handler and nothing
                else. Here's data from it(first GET, then POST):
            </p>
            <pre>{data}</pre>
            <pre>{postData}</pre>
            <p>
                Below example implementation:
                <pre>
                    {`export const Route = createFileRoute('/simple-server-route')({
    server: {
        handlers: {
            GET: async ({ request }) => {
                return new Response('Hello ' + request.url)
            },
        },
    },
})`}
                </pre>
            </p>
        </div>
    )
}
