import { createFileRoute } from '@tanstack/react-router'
import logo from '@/images/logo.jpg'
import { useState } from 'react'

export const Route = createFileRoute('/images-showcase/basic-examples')({
    component: RouteComponent,
})

function RouteComponent() {
    const [showRealSizePicture, setShowRealSizePicture] = useState(true)
    return (
        <div className="[&_h1]:text-xl [&_h1]:font-bold [&_img]:border [&_img]:m-2">
            <h1>Image optimization</h1>
            <p>
                Basic example{' '}
                <img
                    src={logo}
                    alt="First image"
                    width={60}
                    height={40}
                    style={{ display: 'inline' }}
                />
                This text should appear after the image.
            </p>
            <p>
                Previous picture was imported with `import` statement. This
                picture{' '}
                <img
                    src="tanstack-circle-logo.png"
                    width={60}
                    height={40}
                    style={{ display: 'inline' }}
                />{' '}
                is located in public folder and is referenced by it's name
                directly.
            </p>
            <p>
                Above examples had `width` and `height` specified in order to
                size their picture. However below we show just the image as is:
            </p>
            <button
                onClick={() => setShowRealSizePicture((v) => !v)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
                Toggle real size / scaled size
            </button>
            <br />
            <p>
                Showing{' '}
                {showRealSizePicture ? 'real size' : 'scaled down with CSS'}{' '}
                picture
            </p>
            {showRealSizePicture ? (
                <img
                    src={logo}
                    alt="Second image without width and height specified"
                />
            ) : (
                <img
                    style={{ width: '20%' }}
                    src={logo}
                    alt="Second image without width and height specified"
                />
            )}
        </div>
    )
}
