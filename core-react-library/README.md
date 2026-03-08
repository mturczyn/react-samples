# Core React Library

A reusable **React component library** built with **TypeScript** and **Vite**.

---

## Features

- ⚡ **TypeScript support**: fully typed components with `.d.ts` files.
- 🔌 **Peer React dependencies**: compatible with React 18+.
- 🎯 **Vite library build**: outputs ES module (`.js`) and UMD (`.cjs`) bundles.
- 🛠️ **Easy local development**: can be used with `file:` dependencies or in monorepos.
- 💡 **Hot-reload ready**: works well with `tsc --watch` during development.

---

## Installation

**Via local file path (development)**

```bash
npm install file:../core-react-library
```

**Via npm (future release)**

```bash
npm install core-react-library
```

## Usage

```bash
import React from 'react';
import { Button } from 'core-react-library';

function App() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}

export default App;
```

## Development

1. Build TypeScript types:

    ```bash
    npm run build:types
    ```

2. Build JavaScript bundles:

    ```bash
    npm run build:js
    ```

3. Or run full build:

    ```bash
    npm run build
    ```

4. Watch for type changes:

    ```bash
    tsc --watch --preserveWatchOutput
    ```

    > Tip: If using in a Vite app via file:, make sure your app’s tsconfig.json paths point to the library’s dist/ folder for TypeScript support.

## Folder Structure

```
core-react-library/
├─ src/
│  ├─ Button.tsx
│  └─ index.ts
├─ dist/              # Generated JS + types
├─ package.json
├─ tsconfig.json
└─ vite.config.ts
```

## Build Notes

- ESM (dist/core-react-library.js) → used by Vite/Webpack
- UMD (dist/core-react-library.umd.cjs) → Node/CommonJS fallback
- Types (dist/index.d.ts) → TypeScript consumers
- Peer dependencies: react, react-dom
