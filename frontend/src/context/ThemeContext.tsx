import { createContext, ReactNode, useContext, useState } from 'react'

interface ThemeContextProps {
	isDarkMode: boolean
	toggleDarkMode: () => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [isDarkMode, setIsDarkMode] = useState(true)

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode)
		if (isDarkMode) {
			document.documentElement.classList.remove('dark')
		} else {
			document.documentElement.classList.add('dark')
		}
	}

	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
			{children}
		</ThemeContext.Provider>
	)
}

export const useTheme = () => {
	const context = useContext(ThemeContext)
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider')
	}
	return context
}
