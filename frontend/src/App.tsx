import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import clsx from 'clsx'
import { useTheme } from './context/ThemeContext'
import AppRouter from './router/AppRouter'
import './styles/index.scss'
function App() {
	const { theme } = useTheme()
	const queryClient = new QueryClient()

	return (
		<div className={clsx('app', theme)}>
			<QueryClientProvider client={queryClient}>
				<AppRouter />
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</div>
	)
}

export default App
