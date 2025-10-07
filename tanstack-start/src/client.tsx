import { StartClient } from '@tanstack/react-start/client'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

// There are couple of example of defining client entry point:

// hydrateRoot(
//     document,
//     <StrictMode>
//         <StartClient />
//     </StrictMode>
// )

// hydrateRoot(
//     document,
//     <StrictMode>
//         <ErrorBoundary>
//             <StartClient />
//         </ErrorBoundary>
//     </StrictMode>
// )

// We can handle client entry point differently depending on environment.
const App = (
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
)
