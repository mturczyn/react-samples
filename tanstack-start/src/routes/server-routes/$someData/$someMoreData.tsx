import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/server-routes/$someData/$someMoreData')({
    server: {
        handlers: ({ createHandlers }) =>
            createHandlers({
                GET: {
                    handler: async ({ params }) => {
                        return new Response(
                            `Hello! someData: ${params.someData}, someMoreData: ${params.someMoreData}`
                        )
                    },
                    middleware: [],
                },
            }),
    },
})
