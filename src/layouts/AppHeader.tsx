import { Link } from 'react-router-dom'

export default function AppHeader() {
  return (
    <nav className="border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:py-6">
        <Link to="/" className="font-bold text-slate-900 dark:text-slate-100">
          React 19 POC
        </Link>
        <div className="flex gap-4">
          <Link
            to="/"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            Counter
          </Link>
          <Link
            to="/memo-mania"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            Memo Mania
          </Link>
          <Link
            to="/poka-moka"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            Poka Moka
          </Link>
          <Link
            to="/social-media"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            Social Media
          </Link>
          <Link
            to="/wrong-code"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            Wrong Code
          </Link>
        </div>
      </div>
    </nav>
  )
}