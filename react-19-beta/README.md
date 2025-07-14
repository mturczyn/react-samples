# Basic information

This app was created with `npm create vite@latest` and template is React with TypeScript.

# React 19 notes

## Using new hooks - `use`

In React 19 there's a new `use` hook. In this repo there are examples of it. But before I made it work, there were some findings to do:

-   `use` was defined in Canary releaste of React, so we needed to get canary versions (`19.0.0-canary-cb151849e1-20240424` as of time of writing) of `react` and `react-dom` npm packages. With that the hook started to work in this application,
-   we had to add **module augmentation**, i.e. add `*.d.ts` (in our case `src/react19.d.ts`) file to extend types for `react` module, as it did have exported types for `use` hook.

References

-   [React 19 upgrade guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)
-   [my SO post about using new React hooks](https://stackoverflow.com/questions/79046729/cannot-use-react-19-new-use-hook/79047006#79047006)
