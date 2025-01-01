import { ThemeProvider } from './context/ThemeContext'
import AppRouter from './router/AppRouter'
import './styles/index.scss'

function App() {
	return (
		<ThemeProvider>
			<div>
				<AppRouter />
			</div>
		</ThemeProvider>
	)
}

export default App
