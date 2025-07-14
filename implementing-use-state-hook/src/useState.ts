import { render } from "./render"

// Stores all state values
// eslint-disable-next-line prefer-const, @typescript-eslint/no-explicit-any
export let stateValues: any[] = []

// Tracks which useState call we're on during render
// This mimics how React identifies each state by its call order
export let callIndex = -1

// Called after a state update to simulate re-rendering
// Also resets callIndex to ensure useState calls match state slots
export const renderAndResetIndex = () => {
    // Triggers a "re-render"
    render()
    // Reset to start tracking useState calls from the top
    callIndex = -1
}

export const useState = <T>(initialValue: T) => {
    // Move to the next hook "slot"
    callIndex++

    const currentIndex = callIndex

    // Only initialize the state value once
    // Ensures initialValue is not re-applied on every render
    if (stateValues[currentIndex] === undefined) {
        stateValues[currentIndex] = initialValue
    }

    // Setter function updates the value and re-renders
    // Uses a closure to capture the correct index for this state
    const setValue = (newValue: T) => {
        // Optional: for debugging
        console.log(newValue)
        stateValues[currentIndex] = newValue
        // Rerender to reflect the new state
        renderAndResetIndex()
    }

    // Returns the current value and its setter
    return [stateValues[currentIndex], setValue]
}
