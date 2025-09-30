import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/posts')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div id="posts-container">
            Hello "/posts"!
            <Outlet />
        </div>
    )
}
