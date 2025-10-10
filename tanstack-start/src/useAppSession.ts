import { useSession } from '@tanstack/react-start/server'

export const useAppSession = () =>
    useSession<{
        userId?: string
        email?: string
    }>({
        // Session configuration
        name: 'app-session',
        password:
            'process.env.SESSION_SECRET! - best practice to define in env file', // At least 32 characters

        // Optional: customize cookie settings
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            httpOnly: true,
        },
    })
