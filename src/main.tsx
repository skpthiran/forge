import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as Sentry from '@sentry/react'
import posthog from 'posthog-js'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { Toaster } from 'sonner'

if (import.meta.env.PROD && import.meta.env.VITE_POSTHOG_KEY) {
  posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
    api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com',
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true,
  })
}

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  tracesSampleRate: 0.2,
  enabled: import.meta.env.PROD,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Sentry.ErrorBoundary fallback={
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center gap-4 text-white">
        <p className="text-2xl font-bold">Something went wrong.</p>
        <p className="text-white/40 text-sm">Our team has been notified. Please refresh the page.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 rounded-lg bg-orange-500 text-black font-bold text-xs uppercase tracking-widest"
        >
          Refresh
        </button>
      </div>
    }>
      <AuthProvider>
        <App />
        <Toaster theme="dark" position="bottom-right" />
      </AuthProvider>
    </Sentry.ErrorBoundary>
  </StrictMode>
)
