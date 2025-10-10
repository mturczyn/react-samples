import { getCurrentUserFn } from '@/functions'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/protected-route')({
    component: RouteComponent,
    beforeLoad: async () => {
        const user = await getCurrentUserFn()
        if (!user) {
            throw redirect({ to: '/' })
        }

        return { user }
    },
})

function RouteComponent() {
    const { user } = Route.useRouteContext()
    return (
        <div>
            Hello authenticated user! userId = {user.userId} and email ={' '}
            {user.email}
        </div>
    )
}
