import { lazy, Suspense } from 'react'

const VeryLazyComponent = lazy(() => import('./LazyComponent'))

export const LayoutAnimationWithSuspense = () => {
    return (
        <Suspense
            fallback={<div style={{ background: 'black' }}>Waiting...</div>}
        >
            <VeryLazyComponent />
        </Suspense>
    )
}
