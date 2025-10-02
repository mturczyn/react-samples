import { createMiddleware, createServerFn } from '@tanstack/react-start'

// Middlewares created with server() function are
// request middleware.
export const innerMiddleware = createMiddleware().server(
    async ({ request, next }) => {
        console.log(
            'innerMiddleware: Request received:',
            request.method,
            request.url
        )
        return await next()
    }
)

// We can compose multiple middlewares together
export const outerMiddleware = createMiddleware()
    .middleware([innerMiddleware])
    .server(async ({ next }) => {
        console.log('outerMiddleware processing request')
        return await next()
    })

// Middleware spanning across client and server is server middleware.
export const serverFunctionMiddleware = createMiddleware({
    type: 'function',
})
    .client(async ({ next }) => {
        console.log('serverFunctionMiddleware (client): Before function call')
        const result = await next()
        console.log('serverFunctionMiddleware (client): After function call')
        return result
    })
    .server(async ({ next }) => {
        console.log('serverFunctionMiddleware (server): Before function call')
        const result = await next()
        console.log('serverFunctionMiddleware (server): After function call')
        return result
    })

export const getSomeNiceData = createServerFn({
    method: 'GET',
})
    .middleware([serverFunctionMiddleware])
    .handler(() => {
        return { message: 'Here is some nice data!' }
    })

// Context passing
export const contextMiddleware = createMiddleware().server(async ({ next }) => {
    return await next({
        context: { testProperty: 'test' },
    })
})

export const wrapperContextMiddleware = createMiddleware()
    .middleware([contextMiddleware])
    .server(async ({ next, context }) => {
        console.log(
            'Accessing context from previous middleware: ',
            context.testProperty
        )
        return await next()
    })

export const contextMiddlewareCrossEnvironment = createMiddleware({
    type: 'function',
}).server(async ({ next }) => {
    return await next({
        sendContext: { testProperty: 'test' },
    })
})

export const clientMiddlewareWithContext = createMiddleware({
    type: 'function',
})
    .middleware([contextMiddlewareCrossEnvironment])
    .client(async ({ next }) => {
        const result = await next()
        console.log(
            'clientMiddlewareWithContext with context from server:',
            result.context.testProperty
        )
        return result
    })

export const endpointWithMiddlewareToTestContext = createServerFn({
    method: 'GET',
})
    .middleware([wrapperContextMiddleware, clientMiddlewareWithContext])
    .handler(() => {
        return { message: 'Here is some nice data!' }
    })

export const myGlobalMiddleware = createMiddleware({ type: 'function' }).server(
    async ({ next }) => {
        console.log('Global middleware: Request received')
        return await next()
    }
)
