import { useState } from 'react'
import { UseTransitionExample } from './UseTransitionExample'
import { UseDefferredValueExample } from './UseDefferredValueExample'
import { CounterOutOfSync } from './CounterOutOfSync'

const deferredValueTitle = 'Deferred Value example'
const useTransitionExampleTitle = 'Use transition example'
const counterOutOfSyncTitle =
    'Counter example with concurrent updates to the same state'
const examples = [
    deferredValueTitle,
    useTransitionExampleTitle,
    counterOutOfSyncTitle,
]

function App() {
    const [example, setExample] = useState(deferredValueTitle)
    return (
        <>
            <h2>Examples:</h2>
            {examples.map((x) => (
                <>
                    <label>
                        <input
                            onChange={(e) => e.target.value && setExample(x)}
                            key={x}
                            type="radio"
                            name="example"
                            value={x}
                        />
                        {x}
                    </label>
                    <br />
                </>
            ))}
            <hr />
            {example === deferredValueTitle && <UseDefferredValueExample />}
            {example === useTransitionExampleTitle && <UseTransitionExample />}
            {example === counterOutOfSyncTitle && <CounterOutOfSync />}
        </>
    )
}

export default App
