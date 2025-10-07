import { MyRequestContext } from './server'

declare module '@tanstack/react-start' {
    interface Register {
        server: {
            requestContext: MyRequestContext
        }
    }
}
