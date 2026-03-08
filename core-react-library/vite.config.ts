import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'core-react-library',
            fileName: 'core-react-library',
            formats: ['es', 'umd'],
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
        },
        emptyOutDir: false, // ✅ do NOT delete dist folder
    },
})
