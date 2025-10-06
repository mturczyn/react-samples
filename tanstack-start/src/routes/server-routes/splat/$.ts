import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/server-routes/splat/$')({
    server: {
        handlers: {
            GET: async ({ params }) => {
                const { _splat } = params
                return new Response(
                    "Hello from wildcard route to catch all, 'splat' is " +
                        _splat
                )
            },
        },
    },
})
