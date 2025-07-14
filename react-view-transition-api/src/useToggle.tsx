import { useState, startTransition } from 'react'

export function useToggle() {
    const [isOn, setIsOn] = useState(false)

    const toggleSwitch = () => startTransition(() => setIsOn(!isOn))

    return { isOn, toggleSwitch }
}
