import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/hydration-mismatches')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:m-5 p-10 [&_*]:p-2 [&_button]:border [&_button]:border-black [&_button]:cursor-pointer [&_button]:p-2 [&_button]:rounded-2xl [&_button]:active:scale-95">
            <h1>Hydration mismatches</h1>
            <p>
                Hydration mismatches can happen if there's different content
                rendered on server and the client.
            </p>
            <p>Error can be seen in the console (may require page reload).</p>
            <CurrentDateTime />
            <p>Below is correct example of getting current time</p>
            <CurrentDateTimeCorrect />
        </div>
    )
}

// This will cause hydration mismatchs, as the content
// is different on server and client
function CurrentDateTime() {
    const now = new Date().toLocaleString()
    return <div>Current date and time: {now}</div>
}

// ✅ Consistent rendering and will prevent hydration mismatches
// In the dev tools, when inspected HTML initially fetched,
// there will be "Loading..." text, and then it will be replaced
// with it's run on the client.
function CurrentDateTimeCorrect() {
    const [time, setTime] = useState<string>()

    useEffect(() => {
        setTime(new Date().toLocaleString())
    }, [])

    return <div>{time || 'Loading...'}</div>
}
