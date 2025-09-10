import { startTransition, useState } from 'react'

export const CounterOutOfSync = () => {
    const [count, setCount] = useState(2)

    const handleClick = () => {
        startTransition(() => {
            const start = Date.now()
            // eslint-disable-next-line no-empty
            while (Date.now() - start < 5000) {}
            setCount((c) => c + 1)
        })
    }

    const doubleCount = () => setCount((c) => c * 2)

    return (
        <div style={{ padding: 20 }}>
            <h3>Consider the following series of events:</h3>
            <ol>
                <li>
                    <p>
                        You have a counter who’s value is currently{' '}
                        <strong>2</strong>
                    </p>
                </li>
                <li>
                    <p>
                        In a transition you <code>setState(c =&gt; c + 1)</code>
                    </p>
                </li>
                <li>
                    <p>
                        Before that transition completes and is shown to the
                        user, you synchronously{' '}
                        <code>setState(c =&gt; c * 2)</code>.
                    </p>
                </li>
                <li>
                    <p>The transition from step 2 completes.</p>
                </li>
            </ol>

            <h3>The series of events from above will play out like so:</h3>
            <ol>
                <li>
                    <p>
                        Show <strong>2</strong>
                    </p>
                </li>
                <li>
                    <p>
                        Start work to show <strong>3</strong> (
                        <code>2 + 1</code>)
                    </p>
                </li>
                <li>
                    <p>
                        Interrupt the pending work, and show <strong>4</strong>{' '}
                        (<code>2 * 2</code>)
                    </p>
                </li>
                <li>
                    <p>
                        Show <strong>6</strong> (<code>(2 + 1) * 2</code>)
                    </p>
                </li>
            </ol>

            <div style={{ border: '1px dotted white', padding: '1em' }}>
                <h3>Showcase</h3>
                Click increment button (it will perform slow update with
                transition), then quickly click double button. After some delay,
                there will be flash of intermediate state (doubling before
                increment) and then the correct result will be shown (double
                after increment).
                <button onClick={handleClick}>
                    Increment the count in transition
                </button>
                <button onClick={doubleCount}>Double the count</button>
                <div style={{ margin: '1em' }}>Current count is: {count}</div>
            </div>
        </div>
    )
}
