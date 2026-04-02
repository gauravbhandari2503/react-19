import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Spinner } from '../common/components/spinner'

const App = lazy(() => import('../App.tsx'))
const Counter = lazy(() => import('../pages/CounterPage.tsx'))
const MemoMania = lazy(() => import('../pages/MemoMania.tsx'))
const PokaMokaPage = lazy(() => import('../pages/PokaMokaPage.tsx'))
const SocialMedia = lazy(() => import('../pages/SocialMedia.tsx'))
const NotFound = lazy(() => import('../pages/NotFound.tsx'))
const WrongCode = lazy(() => import('../pages/WrongCode.tsx'))

const routeFallback = (
  <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
    <Spinner size="lg" label="Loading page" />
  </div>
)

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={routeFallback}>
        <Routes>
          <Route element={<App />}>
            <Route path="/" element={<Counter />} />
            <Route path="/memo-mania" element={<MemoMania />} />
            <Route path="/poka-moka" element={<PokaMokaPage />} />
            <Route path="/social-media" element={<SocialMedia />} />
            <Route path="/wrong-code" element={<WrongCode />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
