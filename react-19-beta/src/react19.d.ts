/// <reference types="react" />

declare namespace React {
    export function use<T>(promise: Promise<T>): T
}
