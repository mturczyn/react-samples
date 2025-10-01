import {
    getEnvVarFromCorrectEnvironment,
    getEnvVarFromIncorrectEnvironment,
} from '@/environmentVariables'
import {
    formatPrice,
    getDeviceInfo,
    getDeviceInfoAlt,
    getEnvVar,
    getEnvVarSafe,
    getServerUsers,
    getWindowLocation,
    getWindowLocationFromServer,
    staticServerFunction,
    throwNotFound,
    throwRedirect,
    updateUser,
} from '@/functions'
import { ClientOnly, createFileRoute } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export const Route = createFileRoute('/playground')({
    component: RouteComponent,
})

function RouteComponent() {
    // This can will be logged on both - server and client
    console.log('Rendering palyground component')

    // On server it prints
    // getDeviceInfo { type: 'server', platform: 'win32' }
    // getDeviceInfoAlt { type: 'server', platform: 'win32' }
    // On client (browser dev tools console) it prints
    // getDeviceInfo { type: 'client', userAgent: {...} }
    // getDeviceInfoAlt { type: 'client', userAgent: {...} }
    console.log('getDeviceInfo', getDeviceInfo())
    console.log('getDeviceInfoAlt', getDeviceInfoAlt())
    // should print env variable on server, crashes on client
    console.log('getEnvVar', getEnvVarSafe())

    envVariablesTest()

    return (
        <QueryClientProvider client={queryClient}>
            <div className="[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:m-5 p-10 [&_*]:p-2 [&_button]:border [&_button]:border-black [&_button]:cursor-pointer [&_button]:p-2 [&_button]:rounded-2xl [&_button]:active:scale-95">
                <h1>Hello "/playground"!</h1>
                <ServerFunctions />
                <ClientFunctions />
            </div>
        </QueryClientProvider>
    )
}

function envVariablesTest() {
    /*
    This prints on client
    getEnvVarFromCorrectEnvironment Test env var that should be visible only on client
    getEnvVarFromIncorrectEnvironment undefined

    This prints on server
    getEnvVarFromCorrectEnvironment Test env var that should be visible only on server  
    getEnvVarFromIncorrectEnvironment Test env var that should be visible only on client
    */
    console.log(
        'getEnvVarFromCorrectEnvironment',
        getEnvVarFromCorrectEnvironment()
    )
    console.log(
        'getEnvVarFromIncorrectEnvironment',
        getEnvVarFromIncorrectEnvironment()
    )
}

function ClientFunctions() {
    return (
        <>
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
        </>
    )
}

function ServerFunctions() {
    // Open question - why useServerFn is needed, why not just call getServerUsers directly?
    const getUsers = useServerFn(getServerUsers)
    const { data } = useQuery({
        queryKey: ['users'],
        queryFn: () => getUsers(),
    })

    const getDataFromStatiFunc = useServerFn(staticServerFunction)
    const { data: dataFromStaticFunc } = useQuery({
        queryKey: ['staticServerFunction'],
        queryFn: () => getDataFromStatiFunc(),
    })

    const redirectFn = useServerFn(throwRedirect)
    const notFoundFn = useServerFn(throwNotFound)

    return (
        <>
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
            <br />
            <h1>Query Data From Endpoint</h1>
            <p>Below list was fetched using server side function.</p>
            <ul>
                {data?.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
            <h1>Redirect, not found..</h1>
            <button onClick={() => notFoundFn()}>
                Trigger Not Found (from server) wrapped in useServerFn
            </button>{' '}
            <button onClick={() => throwNotFound()}>
                Trigger Not Found (from server)
            </button>{' '}
            - will be shown in console with 404 code, seems that not to matter
            whether wrapped in useServerFn or not
            <br />
            <button onClick={() => redirectFn()}>
                Trigger Redirect To Main Page (from server)
            </button>
            - this redirect, but there's a catch - we can't use server function
            throwing redirect directly, it has to be wrapped in useServerFn
            <h1>Static Server Function</h1>
            <p>
                Static Server Function are caluclated once during build and then
                stored as JSON of associated params and result.
            </p>
            <div>{dataFromStaticFunc}</div>
        </>
    )
}

function ClientOnlyComponent() {
    // This will log only in the browser :)
    console.log('Rendering client only component')
    return <div>Window location: {getWindowLocation()}</div>
}
