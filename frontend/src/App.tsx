import clsx from 'clsx'
import { useTheme } from './context/ThemeContext'
import AppRouter from './router/AppRouter'
import './styles/index.scss'

function App() {
	const { theme } = useTheme()

	return (
		<div className={clsx(theme)}>
			<AppRouter />
		</div>
	)
}

export default App
