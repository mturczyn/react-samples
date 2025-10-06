import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/selective-ssr/data-only-rendering')({
    ssr: 'data-only',
    beforeLoad: () => {
        console.log('Executes on the server during the initial request')
        console.log('Executes on the client for subsequent navigation')
    },
    loader: () => {
        console.log('Executes on the server during the initial request')
        console.log('Executes on the client for subsequent navigation')
    },
    component: () => <div>This component is rendered on the client</div>,
})
