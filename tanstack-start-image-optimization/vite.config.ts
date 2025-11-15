import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { nitroV2Plugin } from '@tanstack/nitro-v2-vite-plugin'
import { imagetools } from 'vite-imagetools'

const config = defineConfig({
    plugins: [
        nitroV2Plugin(),
        // this is the plugin that enables path aliases
        viteTsConfigPaths({
            projects: ['./tsconfig.json'],
        }),
        tailwindcss(),
        tanstackStart(),
        viteReact(),
        imagetools({
            defaultDirectives: (url) => {
                if (url.searchParams.has('small')) {
                    // return new URLSearchParams('width=400&jpg&metadata')
                    return new URLSearchParams('w=400&format=webp')
                }
                if (url.searchParams.has('big')) {
                    // return new URLSearchParams('width=800&jpg&metadata')
                    return new URLSearchParams('w=800&format=webp')
                }
                return new URLSearchParams()
            },
        }),
    ],
})

export default config
