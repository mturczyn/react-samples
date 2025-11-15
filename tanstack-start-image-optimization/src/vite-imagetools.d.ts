declare module '*.jpg?small' {
    const image: Record<string, any>
    export default image
}

declare module '*.jpg?big' {
    const image: Record<string, any>
    export default image
}

declare module '*.jpg?*' {
    const image: Record<string, any>
    export default image
}
// below is not working, ai generated, maybe
// useful in the future
// // vite-imagetools.d.ts
// declare module '*&imagetools' {
//     const out: string
//     export default out
// }

// declare module '*?imagetools' {
//     const out: string
//     export default out
// }

// declare module '*?*' {
//     const out: string
//     export default out
// }
