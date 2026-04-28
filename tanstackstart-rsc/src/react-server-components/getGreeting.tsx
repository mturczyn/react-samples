import { createServerFn } from "@tanstack/react-start";
import {
  renderToReadableStream,
  renderServerComponent
} from '@tanstack/react-start/rsc'

export const getGreeting = createServerFn().handler(async () => {
    return renderToReadableStream(<h1>hello world</h1>);
})

function AlternativeGreeting() {
    return <h1>Alternative: Hello world!</h1>
}

export const getAlternativeGreeting = createServerFn().handler(
    async () => {
        const Renderable = renderServerComponent(<AlternativeGreeting/>)
        return { Renderable }
    }
)