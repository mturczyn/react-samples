import { useState, useTransition } from 'react'
import { CounterOutOfSync } from './CounterOutOfSync'

export const UseTransitionExample = () => {
    const [input, setInput] = useState('')
    const [list, setList] = useState<any[]>([])
    const [isPending, startTransition] = useTransition()

    const handleChange = (shouldUseTransition: boolean) => (e: any) => {
        const value = e.target.value
        setInput(value)

        const action = () => {
            const items = []
            for (let i = 0; i < 20000; i++) {
                items.push(value)
            }
            setList(items)
        }

        if (shouldUseTransition)
            // mark this state update as "non-urgent"
            startTransition(action)
        else action()
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>useTransition example</h2>
            <p>
                By using transition (first input) we can still see updated value
                in input as we type (with minimal delay maybe), due to React
                using transition and not blocking update of input element.
            </p>
            <p>
                On second input however, where we don't use transition, input
                element is not updating if we keep typing.
            </p>
            <label>
                Generate items with text (using transition)
                <input
                    value={input}
                    onChange={handleChange(true)}
                    placeholder="Type something..."
                />
            </label>
            <br />
            <label>
                Generate items with text (<b>without transition</b>)
                <input
                    value={input}
                    onChange={handleChange(false)}
                    placeholder="Type something..."
                />
            </label>
            {isPending && <p>Loading...</p>}
            <ul>
                {list.map((item, i) => (
                    <li key={i}>{item}</li>
                ))}
            </ul>
        </div>
    )
}
