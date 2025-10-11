import { sql } from '@/db'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/test-data-from-db')({
    component: RouteComponent,
    // Loaders run on server (unless defined otherwise with disabling SSR
    // or SPA mode). Database connections (queries) should always run on server
    // to not leak connection details to client.
    loader: async () => {
        const testData = await sql.query('select * from public.test_table')
        return testData
    },
})

function RouteComponent() {
    const data = Route.useLoaderData()
    return (
        <div className="[&_pre]:bg-gray-200 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:m-5 p-10 [&_*]:p-2 [&_button]:border [&_button]:border-black [&_button]:cursor-pointer [&_button]:p-2 [&_button]:rounded-2xl [&_button]:active:scale-95 [&_h2]:text-2xl">
            <h1>Hello "/test-data-from-db"!</h1>
            <p>
                Below is example data from test table from database created with{' '}
                <a
                    className="underline text-blue-600 hover:text-blue-800 transition-colors"
                    href="https://neon.com/"
                >
                    Neon
                </a>
            </p>
            {!data ? (
                <p>No data in db or some other error</p>
            ) : (
                <ul>
                    {data.map((x: any) => (
                        <li>
                            id = {x.id} | test_column = {x.test_column}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
