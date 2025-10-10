import { loginFn } from '@/functions'
import {
    QueryClient,
    QueryClientProvider,
    useMutation,
} from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { FormEvent, useState } from 'react'

const queryClient = new QueryClient()

export const Route = createFileRoute('/auth/')({
    component: () => (
        <QueryClientProvider client={queryClient}>
            <RouteComponent />
        </QueryClientProvider>
    ),
})

function RouteComponent() {
    const [logging, setLogging] = useState(false)

    const login = useMutation({
        mutationKey: ['serverReoutesPost'],
        mutationFn: useServerFn(loginFn),
    })

    const handleSubmit = async (data: FormEvent<HTMLFormElement>) => {
        data.preventDefault()
        setLogging(true)
        const formData = new FormData(data.currentTarget)
        await login.mutate({
            data: {
                email: formData.get('email')?.toString() ?? '',
                password: formData.get('password')?.toString() ?? '',
            },
        })
        setLogging(false)
    }

    return (
        <div className="[&_pre]:bg-gray-200 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:m-5 p-10 [&_*]:p-2 [&_button]:border [&_button]:border-black [&_button]:cursor-pointer [&_button]:p-2 [&_button]:rounded-2xl [&_button]:active:scale-95 [&_h2]:text-2xl">
            <h1>Login Form</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    User: <input id="email" name="email" />
                </label>
                <label>
                    Password: <input id="password" name="password" />
                </label>

                <button type="submit">
                    {logging ? 'Logging...' : 'Log In'}
                </button>
            </form>
            <Link to="/auth/protected-route">Only for logged in user</Link>
        </div>
    )
}
