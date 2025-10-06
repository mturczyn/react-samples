import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/selective-ssr/client-side-render')({
    component: RouteComponent,
    ssr: false,
    beforeLoad: () => {
        console.log('Executes only on the client.')
        console.log(
            'If SSR would be enabled, this would execute on server during first navigation and on client during next navigations.'
        )
    },
    loader: () => {
        console.log('Executes only on the client.')
        console.log(
            'If SSR would be enabled, this would execute on server during first navigation and on client during next navigations.'
        )
    },
    // When component is rendered on the client (so ssr is data-only or false),
    // we can define component to show during the load of actual component.
    pendingComponent: () => <div>LOADING...</div>,
    // pendingMinMs: 1000, // how long to display pendingComponent
    // pendingMs: 100,
})

function RouteComponent() {
    return (
        <div>
            Hello "/selective-ssr/client-side-render"! Inspect server and
            browser logs to see what's happening.
        </div>
    )
}
