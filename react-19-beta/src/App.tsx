import { Suspense, use } from 'react'
import './App.css'

function App() {
    return (
        <Suspense fallback="Is loading...">
            <AsyncComponent />
        </Suspense>
    )
}

export default App

function AsyncComponent() {
    const data = use<string>(
        new Promise((resolve) => {
            setTimeout(() => {
                resolve('foo')
            }, 3000)
        })
    )
    return <div>Asyn data: {data}</div>
}
