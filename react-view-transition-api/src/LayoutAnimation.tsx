import { unstable_ViewTransition as ViewTransition } from 'react'
import { useToggle } from './useToggle'

export function LayoutAnimation() {
    const { toggleSwitch, isOn } = useToggle()

    return (
        <button
            className="toggle-container"
            style={{
                justifyContent: 'flex-' + (isOn ? 'end' : 'start'),
            }}
            onClick={toggleSwitch}
        >
            <ViewTransition name="buttonTransition">
                <div className="toggle-handle" />
            </ViewTransition>
            <style>
                {`
                ::view-transition-group(buttonTransition),
                ::view-transition-new(buttonTransition),
                ::view-transition-old(buttonTransition) {
                  animation-duration: 5s;
                }
                `}
            </style>
        </button>
    )
}
