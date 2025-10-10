# Strange Rollup/Vite error during build

When added auth I started getting following error when running `npm run build`

```
error during build:
error during build:
[vite]: Rollup failed to resolve import "tanstack-start-injected-head-scripts:v" from "C:/Users/MT/source/repos/react-samples/tanstack-start/node_modules/@tanstack/start-server-core/dist/esm/loadVirtualModule.js".
This is most likely unintended because it can break your application at runtime.
If you do want to externalize this module explicitly add it to
`build.rollupOptions.external`
    at viteLog (file:///C:/Users/MT/source/repos/react-samples/tanstack-start/node_modules/vite/dist/node/chunks/dep-Bm2ujbhY.js:33954:57)
    at file:///C:/Users/MT/source/repos/react-samples/tanstack-start/node_modules/vite/dist/node/chunks/dep-Bm2ujbhY.js:33990:73
    at onwarn (file:///C:/Users/MT/source/repos/react-samples/tanstack-start/node_modules/@vitejs/plugin-react/dist/index.js:90:7)
    at file:///C:/Users/MT/source/repos/react-samples/tanstack-start/node_modules/vite/dist/node/chunks/dep-Bm2ujbhY.js:33990:28
    at onRollupLog (file:///C:/Users/MT/source/repos/react-samples/tanstack-start/node_modules/vite/dist/node/chunks/dep-Bm2ujbhY.js:33985:63)
    at onLog (file:///C:/Users/MT/source/repos/react-samples/tanstack-start/node_modules/vite/dist/node/chunks/dep-Bm2ujbhY.js:33786:4)
    at file:///C:/Users/MT/source/repos/react-samples/tanstack-start/node_modules/rollup/dist/es/shared/node-entry.js:20937:32
    at Object.logger [as onLog] (file:///C:/Users/MT/source/repos/react-samples/tanstack-start/node_modules/rollup/dist/es/shared/node-entry.js:22823:9)
    at ModuleLoader.handleInvalidResolvedId (file:///C:/Users/MT/source/repos/react-samples/tanstack-start/node_modules/rollup/dist/es/shared/node-entry.js:21567:26)
    at ModuleLoader.resolveDynamicImport (file:///C:/Users/MT/source/repos/react-samples/tanstack-start/node_modules/rollup/dist/es/shared/node-entry.js:21625:58)
```

It turned out that was because

> in this case, in src/functions.ts exports both server functions (created via createServerFn) as well as export const useAppSession =... which made use of a server only functionality coming from @tanstack/react-start/server  
> since that function was exported, it cannot be removed when compiling the server functions.
> removing export from that function makes it work
> we will make this better discoverable soon during dev and prod build

In my case I just moved the exported `useAppSession` out of the file, and that solved the error.
