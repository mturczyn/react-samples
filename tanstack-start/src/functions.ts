import { createServerFn, createServerOnlyFn } from '@tanstack/react-start'

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
export const getEnvVar = createServerOnlyFn(() => process.env.DATABASE_URL)
