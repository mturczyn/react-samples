import { Suspense, use, useState, unstable_Activity as Activity } from 'react'
import './App.css'

function App() {
    return (
        <>
            <Suspense fallback="Is loading...">
                <AsyncComponent title="Main app async component" />
            </Suspense>
            {/* <ActivityExample /> */}
        </>
    )
}

export default App

function AsyncComponent({ title }: { title: string }) {
    const data = use<string>(
        new Promise((resolve) => {
            console.log(title, 'Starting the promise in async component')
            setTimeout(() => {
                resolve('foo')
            }, 1000)
        })
    )
    return (
        <>
            <h1>{title} (check logs related to this)</h1>
            <div>Async data: {data}</div>
        </>
    )
}

function ActivityExample() {
    const [visible, setVisible] = useState(false)

    return (
        <>
            <button onClick={() => setVisible(!visible)}>
                Toggle Visibility
            </button>
            {visible && (
                <AsyncComponent title="Async Component without activity" />
            )}
            <Activity mode={visible ? 'visible' : 'hidden'}>
                <AsyncComponent title="Async Component WITH activity" />
            </Activity>
        </>
    )
}
