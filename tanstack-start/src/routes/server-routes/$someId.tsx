import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/server-routes/$someId')({
    server: {
        handlers: ({ createHandlers }) =>
            createHandlers({
                GET: {
                    handler: async ({ params }) => {
                        return new Response(
                            'Hello from /server-routes! Passed data is ' +
                                params.someId
                        )
                    },
                    middleware: [],
                },
            }),
    },
})
