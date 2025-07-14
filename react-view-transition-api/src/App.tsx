import './App.css'
import { LayoutAnimation2 } from './LayoutAnimation2'
import { LayoutAnimation } from './LayoutAnimation'
import { withDivWithMargin } from './withDivWithMargin'
import { LayoutAnimationWithSuspense } from './LayoutAnimationWithSuspense'

const LayoutAnimationWithMargin = withDivWithMargin(LayoutAnimation)
const LayoutAnimation2WithMargin = withDivWithMargin(LayoutAnimation2)
const LayoutAnimationWithSuspenseWithMargin = withDivWithMargin(
    LayoutAnimationWithSuspense
)

function App() {
    return (
        <>
            <LayoutAnimationWithMargin />
            <LayoutAnimation2WithMargin />
            <LayoutAnimationWithSuspenseWithMargin />
        </>
    )
}

export default App
