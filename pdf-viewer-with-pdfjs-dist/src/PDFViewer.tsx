import React, { useRef } from 'react'
import * as pdfjs from 'pdfjs-dist'

// Set worker
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`

const PDFViewer: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const fileReader = new FileReader()
        fileReader.onload = async () => {
            const typedarray = new Uint8Array(fileReader.result as ArrayBuffer)
            const loadedPdf = await pdfjs.getDocument({ data: typedarray })
                .promise

            const page = await loadedPdf.getPage(1)
            const viewport = page.getViewport({ scale: 1.5 })
            const canvas = canvasRef.current!
            const context = canvas.getContext('2d')!
            canvas.width = viewport.width
            canvas.height = viewport.height
            await page.render({ canvasContext: context, viewport }).promise
        }
        fileReader.readAsArrayBuffer(file)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <input
                style={{ margin: '1rem' }}
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
            />
            <h1>PDF view</h1>
            <canvas ref={canvasRef} />
        </div>
    )
}

export default PDFViewer
