import {
    getAlternativeGreeting,
    getGreeting,
} from '#/react-server-components/getGreeting'
import { createFileRoute } from '@tanstack/react-router'
import {
    CompositeComponent,
    createFromReadableStream,
} from '@tanstack/react-start/rsc'
import { useQuery } from '@tanstack/react-query'
import { getPersonalizedGreeting } from '#/react-server-components/getPersonalizedGreeting'
import type { PropsWithChildren } from 'react'

export const Route = createFileRoute('/rsc-showcase')({
    component: RscShowcase,
    loader: async () => {
        const { Renderable } = await getAlternativeGreeting()
        const PersonalizedGreeting = await getPersonalizedGreeting({
            data: { name: 'Michal' },
        })
        return {
            PersonalizedGreeting,
            AlternativeGreeting: Renderable,
        }
    },
})

function RscShowcase() {
    const { PersonalizedGreeting, AlternativeGreeting } = Route.useLoaderData()

    const query = useQuery({
        queryKey: ['greeting'],
        queryFn: async () => createFromReadableStream(await getGreeting()),
    })

    return (
        <div>
            <Example title="From readable stream">{query.data}</Example>

            <Example title="From renderable component">
                <>{AlternativeGreeting}</>
            </Example>

            <Example title="Composite Component">
                <CompositeComponent
                    src={PersonalizedGreeting.src}
                    renderAction={({ additionalInfo }: any) => (
                        <p style={{ border: '1px solid black' }}>
                            {' '}
                            {additionalInfo ?? 'NULL'}{' '}
                        </p>
                    )}
                >
                    <div>Some children from caller</div>
                </CompositeComponent>
            </Example>
        </div>
    )
}

function Example({ children, title }: PropsWithChildren & { title: string }) {
    return (
        <>
            <h1 className="display-title mb-3 text-4xl font-bold sm:text-5xl">
                {title}
            </h1>
            <div
                style={{
                    border: '5px solid #ccc',
                    padding: '8px',
                    margin: '8px',
                }}
            >
                {children}
            </div>
        </>
    )
}
