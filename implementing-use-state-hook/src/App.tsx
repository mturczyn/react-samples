import { useState } from 'react'
import './App.css'

function App() {
    const [count, setCount] = useState(0)
    const [countB, setCountB] = useState(0)

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>A : {count}</button>
            <button onClick={() => setCountB(countB + 1)}>B : {countB}</button>
        </div>
    )
}

export default App
