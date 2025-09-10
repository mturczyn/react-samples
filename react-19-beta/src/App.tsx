import {
    Suspense,
    use,
    useState,
    unstable_Activity as Activity,
    useRef,
} from 'react'
import './App.css'

function App() {
    const promise = useRef(
        new Promise<string>((resolve) => {
            console.log('APP COMPONENT:Starting the promise in async component')
            setTimeout(() => {
                resolve('foo')
            }, 3000)
        })
    )
    return (
        <>
            <Suspense fallback="Is loading...">
                <AsyncComponent promise={promise.current} />
            </Suspense>
            <ActivityExample />
        </>
    )
}

export default App

function AsyncComponent<T>({ promise }: { promise: Promise<T> }) {
    const data = use<T>(promise)
    console.log('rendering async component for title', data)
    return (
        <div style={{ border: '1px solid black' }}>
            Async data: {JSON.stringify(data)}
        </div>
    )
}

function ActivityExample() {
    const [visible, setVisible] = useState(false)
    const withoutActivity = useRef(
        new Promise<string>((resolve) => {
            console.log(
                'ActivityExample COMPONENT without activity:Starting the promise in async component'
            )
            setTimeout(() => {
                resolve('withoutActivity')
            }, 3000)
        })
    )
    const withActivity = useRef(
        new Promise<string>((resolve) => {
            console.log(
                'ActivityExample COMPONENT with activity:Starting the promise in async component'
            )
            setTimeout(() => {
                resolve('withActivity')
            }, 3000)
        })
    )
    return (
        <>
            <button onClick={() => setVisible(!visible)}>
                Toggle Visibility
            </button>
            {visible && <AsyncComponent promise={withoutActivity.current} />}
            <Activity mode={visible ? 'visible' : 'hidden'}>
                <AsyncComponent promise={withActivity.current} />
            </Activity>
        </>
    )
}
