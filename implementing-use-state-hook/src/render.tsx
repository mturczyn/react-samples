import { createRoot, type Root } from "react-dom/client"
import App from "./App"

let root: Root

export const appRootId = 'root'

// This is used in useState hook to reflect React rerendering component on state change.
export const render = () => {
    if (!root) {
        root = createRoot(document.getElementById(appRootId)!)
    }
    root.render(<App />)
}