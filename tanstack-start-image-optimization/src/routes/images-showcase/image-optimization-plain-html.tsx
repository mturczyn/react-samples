import { createFileRoute } from '@tanstack/react-router'
import logoSmall from '@/images/logo-small.jpg'
import logo from '@/images/logo.jpg'

export const Route = createFileRoute(
    '/images-showcase/image-optimization-plain-html'
)({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div>
            <p>
                Below is responsive example of image, that loads different
                pictures based on the screen size (leverages `srcset`):
            </p>
            <img
                src={logoSmall} // fallback if browser doesn’t support srcset
                srcSet={`${logoSmall} 480w, ${logo} 1200w`}
                sizes="50vw"
                alt="Logo"
                style={{ width: '50vw', height: 'auto' }}
            />
        </div>
    )
}
