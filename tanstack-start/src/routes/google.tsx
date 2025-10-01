import { createFileRoute } from '@tanstack/react-router'

// ✅ Route loaders are ISOMORPHIC
export const Route = createFileRoute('/google')({
    loader: async () => {
        // This runs on server during SSR AND on client during navigation
        const response = await fetch('https://google.com/')
        return response.text()
    },
    component: Google,
})

function Google() {
    const data = Route.useLoaderData()
    return <div dangerouslySetInnerHTML={{ __html: data }}></div>
}
