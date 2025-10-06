import {
    QueryClient,
    QueryClientProvider,
    useMutation,
    useQuery,
} from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import {
    setResponseHeader,
    setResponseStatus,
} from '@tanstack/react-start/server'
import { json, useServerFn } from '@tanstack/react-start'
import { exampleEndpont } from '@/functions'

const queryClient = new QueryClient()

// The most simple server route - returning a simple text response.
export const Route = createFileRoute('/server-routes/')({
    component: () => (
        <QueryClientProvider client={queryClient}>
            <RouteComponent />
        </QueryClientProvider>
    ),
    server: {
        handlers: {
            // Below, for PUT and POST we show two ways of returning JSON
            // and setting status codes.
            POST: async () => {
                return new Response(JSON.stringify({ hello: 'world' }), {
                    status: 201,
                    headers: { 'Content-Type': 'application/json' },
                })
            },
            PUT: async () => {
                // Below does not work as of time of writing
                setResponseStatus(201)
                // For setting headers
                setResponseHeader('my-header', 'test')
                return json({ hello: 'world' })
            },
        },
    },
})

function RouteComponent() {
    const [someId, setSomeId] = useState('1')
    const [pathData, setPathData] = useState({ someData: '', someMoreData: '' })
    const [postJson, setPostJson] = useState<any>()
    const [putJson, setPutJson] = useState<any>()
    const exampleEndpontFn = useServerFn(exampleEndpont)

    const { data: exampleEndpointData } = useQuery({
        queryKey: ['exampleEndpointData'],
        queryFn: async () => await exampleEndpontFn(),
    })

    console.log('exampleEndpointData', '=', exampleEndpointData)

    const post = useMutation({
        mutationKey: ['serverReoutesPost'],
        mutationFn: async () =>
            fetch('/server-routes', { method: 'POST' }).then((res) =>
                res.json()
            ),
        onSuccess: (data) => {
            setPostJson(data)
        },
    })

    const put = useMutation({
        mutationKey: ['serverReoutesPut'],
        mutationFn: async () =>
            fetch('/server-routes', { method: 'PUT' }).then((res) =>
                res.json()
            ),
        onSuccess: (data) => {
            setPutJson(data)
        },
    })

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
            <p>Below example implementation:</p>
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
            <h1>Dynamic Routes</h1>
            <form
                className="border"
                method="GET"
                action={`/server-routes/${someId}`}
            >
                <label>
                    Go To /server-routes/
                    <input
                        className="border-b"
                        value={someId}
                        onChange={(e) => setSomeId(e.target.value)}
                    />
                </label>
                <button type="submit">GoGoGo!</button>
            </form>
            <form
                className="border"
                method="GET"
                action={`/server-routes/${pathData.someData}/${pathData.someMoreData}`}
            >
                <label>
                    Go To /server-routes/
                    <input
                        className="border-b"
                        value={pathData.someData}
                        onChange={(e) =>
                            setPathData({
                                ...pathData,
                                someData: e.target.value,
                            })
                        }
                    />
                    /
                    <input
                        className="border-b"
                        value={pathData.someMoreData}
                        onChange={(e) =>
                            setPathData({
                                ...pathData,
                                someMoreData: e.target.value,
                            })
                        }
                    />
                </label>
                <button type="submit">GoGoGo!</button>
            </form>

            <h1>Splat pattern</h1>
            <p>
                $ is wildcard to catch all tokens in a route. It is "catch all
                handler". And it can be used with{' '}
            </p>
            <pre>
                const {'{'} _splat {'}'} = params
            </pre>
            <form method="GET" action={`/server-routes/splat/a/b/c/d/e/f`}>
                <button type="submit">
                    Go to /server-routes/splat/a/b/c/d/e/f
                </button>
            </form>

            <h1>Returning JSON and status codes from a handler</h1>
            <p>
                We can return status codes and JSON from server routes. Below
                are examples and requests can be inspected in dev tools.
            </p>
            <button onClick={() => post.mutate()}>POST</button>
            {JSON.stringify(postJson)}
            <button onClick={() => put.mutate()}>PUT</button>
            {JSON.stringify(putJson)}
        </div>
    )
}
