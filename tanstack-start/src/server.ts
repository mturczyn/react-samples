import handler from '@tanstack/react-start/server-entry'

export type MyRequestContext = {
    hello: string
    foo: number
}

// This is autmatically implemented in TanStack query.
// Code just for presenting server entry point.
// export default {
//     fetch(request: Request) {
//         console.log(
//             'Processing request from handler defined in server entry point.'
//         )
//         return handler.fetch(request)
//     },
// }

export default {
    fetch(request: Request) {
        console.log(
            'Processing request from handler defined in server entry point.'
        )
        // We need to define module augmentation to allow passing context.
        return handler.fetch(request, { context: { hello: 'world', foo: 123 } })
    },
}
