import { notFound, redirect } from '@tanstack/react-router'
import {
    createClientOnlyFn,
    createIsomorphicFn,
    createServerFn,
    createServerOnlyFn,
} from '@tanstack/react-start'
import { staticFunctionMiddleware } from '@tanstack/start-static-server-functions'

// ✅ This runs on BOTH server and client
export function formatPrice(price: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(price)
}

// RPC: Server execution, callable from client
export const updateUser = createServerFn({ method: 'POST' })
    .inputValidator((data: { name: string }) => data)
    .handler(async ({ data }) => {
        // Only runs on server, but client can call it
        console.log('Updating user:', data)
    })

// Utility: Server-only, client crashes if called
export const getEnvVar = createServerOnlyFn(() => {
    return process.env.DATABASE_URL // or other secrets
})

export const getEnvVarSafe = () =>
    createIsomorphicFn()
        .server(() => {
            return process.env.DATABASE_URL // or other secrets
        })
        .client(() => 'Env vars unavailable on client')

export const getWindowLocation = createClientOnlyFn(() => window.location.href)

export const getWindowLocationFromServer = createServerFn({
    method: 'GET',
}).handler(() => {
    // This will crash the server, as getWindowLocation is client-only
    return getWindowLocation()
})

export const getDeviceInfo = createIsomorphicFn()
    .server(() => ({
        type: 'server',
        platform: process.platform,
    }))
    .client(() => ({
        type: 'client',
        userAgent: navigator.userAgent,
    }))

// This alternative way of writing isomorphic function
// that runs differently on server and client.
// Note: This is just for demonstration, prefer createIsomorphicFn.
export const getDeviceInfoAlt = () => {
    if (typeof window === 'undefined') {
        return {
            type: 'server',
            platform: process.platform,
        }
    } else {
        return {
            type: 'client',
            userAgent: navigator.userAgent,
        }
    }
}

// Pretend this connects to a database
export const getServerUsers = createServerFn().handler(async () => {
    return [
        {
            id: '1',
            name: 'Michal',
        },
        {
            id: '2',
            name: 'Anna',
        },
        {
            id: '3',
            name: 'John',
        },
    ]
})

export const throwRedirect = createServerFn().handler(() => {
    throw redirect({ to: '/', statusCode: 302 })
})

export const throwNotFound = createServerFn().handler(() => {
    throw notFound()
})

// This is the way to create static function (it is
// caluclated once during build, and stored as JSON of
// associated params and result).
export const staticServerFunction = createServerFn()
    // For now it does not work
    // @ts-ignore
    // .middleware([staticFunctionMiddleware])
    .handler(
        () =>
            // GUID just used to inspect bundles, where this code ends up
            "Hello, World! And here's some GUID: e1cdaf45-1416-486f-8a37-cb2d52067145"
    )
