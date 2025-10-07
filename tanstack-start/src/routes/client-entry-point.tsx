import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/client-entry-point')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="[&_pre]:bg-gray-200 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:m-5 p-10 [&_*]:p-2 [&_button]:border [&_button]:border-black [&_button]:cursor-pointer [&_button]:p-2 [&_button]:rounded-2xl [&_button]:active:scale-95 [&_h2]:text-2xl">
            <p>
                Client entry point is defined automatically in TanStack, however
                it can be defined in src/client.ts (src/client.tsx) file. There
                are couple of example of defining client entry point:
            </p>
            <pre>
                {`hydrateRoot(
    document,
    <StrictMode>
        <StartClient />
    </StrictMode>
)`}
            </pre>
            <p>or with ErrorBoundary</p>
            <pre>
                {`hydrateRoot(
    document,
    <StrictMode>
        <ErrorBoundary>
            <StartClient />
        </ErrorBoundary>
    </StrictMode>
)`}
            </pre>
            <p>
                We can handle client entry point differently depending on
                environment.
            </p>
            <pre>
                {`const App = (
    <>
        {import.meta.env.DEV && (
            <div className="text-center bg-green-400">Development Mode</div>
        )}
        <StartClient />
    </>
)

hydrateRoot(
    document,
    import.meta.env.DEV ? <StrictMode>{App}</StrictMode> : App
)`}
            </pre>
        </div>
    )
}
