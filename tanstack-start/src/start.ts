import { createStart } from '@tanstack/react-start'
import { myGlobalMiddleware } from './middleware'

export const startInstance = createStart(() => {
    return { functionMiddleware: [myGlobalMiddleware] }
})
