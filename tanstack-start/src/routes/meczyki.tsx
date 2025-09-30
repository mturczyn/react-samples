import { createFileRoute } from '@tanstack/react-router'

// ✅ Route loaders are ISOMORPHIC
export const Route = createFileRoute('/meczyki')({
    loader: async () => {
        // This runs on server during SSR AND on client during navigation
        const response = await fetch('https://meczyki.pl/')
        return response.text()
    },
    component: Meczyki,
})

function Meczyki() {
    const data = Route.useLoaderData()
    return <div dangerouslySetInnerHTML={{ __html: data }}></div>
}
