import {
    formatPrice,
    getEnvVar,
    getWindowLocation,
    getWindowLocationFromServer,
    updateUser,
} from '@/functions'
import { ClientOnly, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/playground')({
    component: RouteComponent,
})

function RouteComponent() {
    // This can will be logged on both - server and client
    console.log('Rendering palyground component')
    return (
        <div className="[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:m-5 p-10 [&_*]:p-2 [&_button]:border [&_button]:border-black [&_button]:cursor-pointer [&_button]:p-2 [&_button]:rounded-2xl [&_button]:active:scale-95">
            <h1>Hello "/playground"!</h1>
            <h1>Server Functions</h1>
            <br />
            <button onClick={() => updateUser({ data: { name: 'Michal' } })}>
                Update user!
            </button>
            (server function exposed as endpoint)
            <br />
            <button onClick={() => getEnvVar()}>get env variable</button>
            server only function, should crash in browser
            <br />
            <div className="border-b">
                {formatPrice(120)} - formatted price with isomorphic function
            </div>
            <h1>Client Functions</h1>
            <div>
                Client only function, showing current window's location, that
                throws during SSR (should be logged to console):
                {getWindowLocation()}
            </div>
            <div>
                <button onClick={() => getWindowLocationFromServer()}>
                    Try Invoke Client Function On Server
                </button>
            </div>
            {/*This component is only rendered on the client*/}
            <ClientOnly>
                <h1>Client Only Part</h1>
                <ClientOnlyComponent />
            </ClientOnly>
        </div>
    )
}

function ClientOnlyComponent() {
    // This will log only in the browser :)
    console.log('Rendering client only component')
    return <div>Window location: {getWindowLocation()}</div>
}
