import { unstable_ViewTransition as ViewTransition } from 'react'
import { useToggle } from './useToggle'

export function LayoutAnimation2() {
    const { toggleSwitch, isOn } = useToggle()

    return (
        <ViewTransition>
            <button onClick={toggleSwitch}>Switch Text</button>
            {isOn ? <MenuA /> : <MenuB />}
        </ViewTransition>
    )
}

function MenuA() {
    return <div>uuuuuuuuuuuuuuu</div>
}

function MenuB() {
    return <div>AAAAAAAAAAAAAAAAAAAA</div>
}
