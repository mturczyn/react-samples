import { getGreeting } from '#/react-server-components/getGreeting'
import { createFileRoute } from '@tanstack/react-router'
import { CompositeComponent, createFromReadableStream } from '@tanstack/react-start/rsc'
import { useQuery } from '@tanstack/react-query'
import { getPersonalizedGreeting } from '#/react-server-components/getPersonalizedGreeting'

export const Route = createFileRoute('/rsc-showcase')({
  component: RscShowcase,
  loader: async () => ({
    PersonalizedGreeting: await getPersonalizedGreeting({data:{name: 'Michal'}}),
  }),
})

function RscShowcase() {
  const { PersonalizedGreeting } = Route.useLoaderData()

  const query = useQuery({
    queryKey: ['greeting'],
    queryFn: async () => createFromReadableStream(await getGreeting())
  })

  return <div>
    <h1 className="display-title mb-3 text-4xl font-bold sm:text-5xl">From readable stream</h1>
    <div style={{border: '5px solid #ccc', padding: '8px', margin: '8px'}}>
      {query.data}
    </div>

    <h1 className="display-title mb-3 text-4xl font-bold sm:text-5xl">Composite Component</h1>
    <div style={{border: '5px solid #ccc', padding: '8px', margin: '8px'}}>
      <CompositeComponent 
        src={PersonalizedGreeting.src} 
        renderActions={({additionalInfo}: any)=><p style={{border: '1px solid black'}}> {additionalInfo ?? 'NULL'} </p>}>
        <div>Some children from caller</div>
      </CompositeComponent>
    </div>
  </div>
}
