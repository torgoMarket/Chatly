import { useTheme } from '../../context/ThemeContext'

const ThemeToggle = () => {
	const { isDarkMode, toggleDarkMode } = useTheme()

	return (
		<button onClick={toggleDarkMode}>
			Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
		</button>
	)
}

export default ThemeToggle
