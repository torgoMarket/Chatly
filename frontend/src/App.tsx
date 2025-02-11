import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import clsx from 'clsx'
import { useEffect } from 'react'

import AppRouter from './router/AppRouter'
import useCurrentChatStore from './store/currentChatStore'
import useThemeStore from './store/themeStore'
import './styles/index.scss'
function App() {
	const queryClient = new QueryClient()
	const socket = useCurrentChatStore(state => state.socket)
	const setTheme = useThemeStore(state => state.setTheme)
	const theme = useThemeStore(state => state.theme)

	useEffect(() => {
		window.addEventListener('beforeunload', () => socket?.close())

		return () => {
			window.removeEventListener('beforeunload', () => socket?.close())
		}
	}, [socket])

	useEffect(() => {
		const theme: 'light' | 'dark' = localStorage.getItem('theme') as
			| 'light'
			| 'dark'

		if (theme) {
			setTheme(theme)
			return
		}

		setTheme('light')
	}, [])

	return (
		<div className={clsx('app', theme)}>
			<QueryClientProvider client={queryClient}>
				<AppRouter />
				{/* <ReactQueryDevtools initialIsOpen={false} /> */}
			</QueryClientProvider>
		</div>
	)
}

export default App
