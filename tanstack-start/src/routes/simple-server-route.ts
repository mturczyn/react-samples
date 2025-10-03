import { createFileRoute } from '@tanstack/react-router'

// The most simple server route - returning a simple text response.
export const Route = createFileRoute('/simple-server-route')({
    server: {
        handlers: {
            GET: async ({ request }) => {
                return new Response('Hello GET ' + request.url)
            },
            POST: async ({ request }) => {
                return new Response('Hello POST ' + request.url)
            },
        },
    },
})
