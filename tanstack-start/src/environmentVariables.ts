import { createIsomorphicFn } from '@tanstack/react-start'

// Those env vars are defined in .env file
export const getEnvVarFromCorrectEnvironment = createIsomorphicFn()
    .server(() => process.env.ENVVAR) // ✅ Server-only
    .client(() => import.meta.env.VITE_ENVVAR) // import.meta.env.ENVVAR would return udnefined on client, as security measure

// Those env vars are defined in .env file
export const getEnvVarFromIncorrectEnvironment = createIsomorphicFn()
    .client(() => process.env.ENVVAR)
    // server has access to client env vars
    .server(() => import.meta.env.VITE_ENVVAR)
