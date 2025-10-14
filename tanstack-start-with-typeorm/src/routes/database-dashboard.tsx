import { createNewUser, getUsers } from '@/db/userOperations'
import { createFileRoute } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useQuery } from '@tanstack/react-query'
import { queryClient } from './__root'
import { FormEvent } from 'react'

export const Route = createFileRoute('/database-dashboard')({
    component: RouteComponent,
})

function RouteComponent() {
    const getUsersFn = useServerFn(getUsers)
    const createUserFn = useServerFn(createNewUser)

    const { data, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => getUsersFn(),
    })

    const handleAddUser = async (e: FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget)

        await createUserFn({
            data: {
                firstName: formData.get('firstName')?.toString() ?? '',
                lastName: formData.get('lastName')?.toString() ?? '',
            },
        })

        queryClient.invalidateQueries({
            queryKey: ['users'],
        })
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            {/* --- FORM --- */}
            <form
                className="space-y-3
                   [&_label]:block [&_label]:text-sm [&_label]:font-medium [&_label]:text-gray-700
                   [&_input]:w-full [&_input]:px-3 [&_input]:py-1.5 [&_input]:border [&_input]:border-gray-300 [&_input]:rounded-md
                   [&_input]:focus:ring-1 [&_input]:focus:ring-blue-500
                   [&_button]:px-4 [&_button]:py-1.5 [&_button]:rounded-md [&_button]:bg-blue-600 [&_button]:text-white
                   [&_button:hover]:bg-blue-700 [&_button]:transition"
                onSubmit={handleAddUser}
            >
                <label>
                    First name
                    <input name="firstName" />
                </label>

                <label>
                    Last name
                    <input name="lastName" />
                </label>

                <button type="submit">Create User</button>
            </form>

            {/* --- USERS GRID --- */}
            <div className="mt-8">
                {isLoading ? (
                    <p className="text-gray-500">Loading users...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {data?.map((x) => (
                            <div
                                key={x.id}
                                className="border border-gray-200 rounded-lg p-3 hover:shadow-sm transition bg-white"
                            >
                                <p className="text-sm text-gray-500">
                                    ID {x.id}
                                </p>
                                <p className="font-medium text-gray-800">
                                    {x.firstName} {x.lastName}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
