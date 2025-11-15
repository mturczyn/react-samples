import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
    component: RouteComponent,
    validateSearch: (search: Record<string, unknown>): { debug: boolean } => {
        // validate and parse the search params into a typed state
        return {
            debug: Boolean(search.debug ?? false),
        }
    },
    params: {
        parse: (params) => ({
            postId: String(params.postId),
        }),
    },
})

function RouteComponent() {
    const { postId } = Route.useParams()
    const search = Route.useSearch()
    console.log('Debug mode is ', search.debug ? 'ON' : 'OFF')
    return <div id="post">Post #{postId}</div>
}
