import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CoreButton } from 'core-react-library'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <p>
                Example of consuming a component from the local library package
                "core-react-library" (see package.json for details).
            </p>
            <CoreButton onClick={() => setCount(count + 1)}>
                Count is {count}
            </CoreButton>
        </>
    )
}

export default App
