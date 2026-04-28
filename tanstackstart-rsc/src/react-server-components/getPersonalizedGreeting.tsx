import { createServerFn } from '@tanstack/react-start'
import { createCompositeComponent } from '@tanstack/react-start/rsc'
import React from 'react'

export const getPersonalizedGreeting = createServerFn()
    .inputValidator((data: { name: string }) => data)
    .handler(async ({ data }) => {
        const name = data.name

        const src = await createCompositeComponent(
            (props: {
                children?: React.ReactNode
                renderAction?: (data: {
                    additionalInfo: string
                }) => React.ReactNode
            }) => (
                <div>
                    <h2 style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                        Very warm welcome, {name}!
                    </h2>

                    <h2 style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                        Children:
                    </h2>
                    <div>{props.children}</div>

                    <h2 style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                        Render Action:
                    </h2>
                    <div>
                        {props.renderAction?.({
                            additionalInfo: 'Additional info from server',
                        })}
                    </div>
                </div>
            )
        )
        return { src }
    })
