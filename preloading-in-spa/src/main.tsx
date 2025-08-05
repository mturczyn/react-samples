import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.ts'

const router = createRouter({ routeTree })

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
