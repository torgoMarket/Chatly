import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import './styles/index.scss'

createRoot(document.getElementById('root')!).render(
	<ThemeProvider>
		<App />
	</ThemeProvider>
)
