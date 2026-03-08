import { ReactNode } from 'react'

export function CoreButton({
    children,
    onClick,
}: {
    children: ReactNode
    onClick?: () => void
}) {
    return (
        <button
            onClick={onClick}
            data-source="my-react-corelib"
            style={{ padding: 10, background: 'black', color: 'white' }}
        >
            {children}
        </button>
    )
}
