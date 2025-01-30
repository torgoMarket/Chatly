import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import clsx from 'clsx'
import { useEffect } from 'react'
import { useTheme } from './context/ThemeContext'
import AppRouter from './router/AppRouter'
import useCurrentChatStore from './store/currentChatStore'
import './styles/index.scss'
function App() {
	const { theme } = useTheme()
	const queryClient = new QueryClient()
	const socket = useCurrentChatStore(state => state.socket)

	useEffect(() => {
		window.addEventListener('beforeunload', () => socket?.close())

		return () => {
			window.removeEventListener('beforeunload', () => socket?.close())
		}
	}, [socket])

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
