import CounterWidget from '../components/CounterWidget'

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-full max-w-2xl text-center">
      <p className="text-sm font-medium uppercase tracking-wide text-primary-700 dark:text-primary-300">
        React 19 POC
      </p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl dark:text-slate-100">
        Counter Widget Demo
      </h1>
      <p className="mt-3 text-sm text-slate-600 sm:text-base dark:text-slate-400">
        A small playground to test component rendering behavior and state updates.
      </p>

      <CounterWidget />
    </div>
  )
}
