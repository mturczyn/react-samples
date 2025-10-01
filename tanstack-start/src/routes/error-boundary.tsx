import {
    CatchBoundary,
    createFileRoute,
    ErrorComponent,
} from '@tanstack/react-router'

export const Route = createFileRoute('/error-boundary')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <>
            <div>
                CatchBoundary is the way to handle error thrown inside the
                components.
            </div>

            <CatchBoundary
                getResetKey={() => 0}
                onCatch={(error, errorInfo) => {
                    console.log('error', error)
                    console.log('errorInfo', errorInfo)
                }}
                errorComponent={ErrorComponent}
            >
                <ThrowingComponent />
            </CatchBoundary>
        </>
    )
}

function ThrowingComponent() {
    throw new Error('Error thrown from ThrowingComponent')
    return <div>This will never be rendered</div>
}
