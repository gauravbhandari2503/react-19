import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="w-full max-w-2xl text-center">
      <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
        404
      </h1>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
        Page not found
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-primary-600 px-6 py-2 font-medium text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
      >
        Go Home
      </Link>
    </div>
  )
}
