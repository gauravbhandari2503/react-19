import { Outlet } from 'react-router-dom'
import AppHeader from './layouts/AppHeader'

function App() {
	return (
		<div className="min-h-screen bg-slate-50 dark:bg-slate-950">
			<AppHeader />

			<main className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 py-10 sm:py-14">
				<Outlet />
			</main>
		</div>
	)
}

export default App
