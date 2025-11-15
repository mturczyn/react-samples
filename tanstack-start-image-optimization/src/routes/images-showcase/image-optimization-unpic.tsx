import { createFileRoute } from '@tanstack/react-router'
import logo from '@/images/logo.jpg'
import logoSmall from '@/images/logo-small.jpg'
import { Image } from '@unpic/react'
// import logo400 from '@/images/logo.jpg?w=400&format=webp'
// import logo800 from '@/images/logo.jpg?w=800&format=webp'

import logo400 from '@/images/logo.jpg?small'
import logo800 from '@/images/logo.jpg?big'

export const Route = createFileRoute(
    '/images-showcase/image-optimization-unpic'
)({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div>
            Hello "/images-showcase/image-optimization-unpic"!
            <div style={{ width: '100%' }}>
                <Image
                    src={`${logo800}`}
                    srcSet={`${logo400} 400w, ${logo800} 800w`}
                    sizes="20vw"
                    width={800}
                    height={400}
                    alt="Logo"
                />
            </div>
        </div>
    )
}
