import { useTheme } from './context/ThemeContext'
import AppRouter from './router/AppRouter'
import './styles/index.scss'

function App() {
	const { theme } = useTheme()

	return (
		<div className={'light'}>
			<AppRouter />
		</div>
	)
}

export default App
