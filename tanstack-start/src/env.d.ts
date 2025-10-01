/// <reference types="vite/client" />

interface ImportMetaEnv {
    // Client-side environment variables
    readonly VITE_ENVVAR?: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

// Server-side environment variables
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            readonly ENVVAR: string
        }
    }
}

export {}
