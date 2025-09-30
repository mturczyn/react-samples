import { formatPrice, getEnvVar, updateUser } from '@/functions'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/playground')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <>
            <div>Hello "/playground"!</div>
            <br />
            <button
                style={{ border: '1px solid black', cursor: 'pointer' }}
                onClick={() => updateUser({ data: { name: 'Michal' } })}
            >
                Update user!
            </button>
            (server function exposed as endpoint)
            <br />
            <button
                style={{ border: '1px solid black', cursor: 'pointer' }}
                onClick={() => getEnvVar()}
            >
                get env variable
            </button>
            server only function, should crash in browser
            <br />
            <p style={{ border: '1px solid black', cursor: 'pointer' }}>
                {formatPrice(120)}- formatted price with isomorphic function
            </p>
        </>
    )
}
