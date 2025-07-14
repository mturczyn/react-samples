export function withDivWithMargin(Component) {
    return (props) => {
        return (
            <div style={{ margin: '2rem' }}>
                <Component {...props} />
            </div>
        )
    }
}
