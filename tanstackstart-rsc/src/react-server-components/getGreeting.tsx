import { createServerFn } from "@tanstack/react-start";
import {
  renderToReadableStream,
} from '@tanstack/react-start/rsc'

export const getGreeting = createServerFn().handler(async () => {
    return renderToReadableStream(
        <html>
            <body>
                <h1>hello world</h1>
            </body>
        </html>
    );
})