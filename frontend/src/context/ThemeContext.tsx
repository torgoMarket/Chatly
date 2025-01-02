import { createContext, ReactNode, useContext, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextProps {
	theme: Theme
	setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setThemeState] = useState<Theme>('light')

	const setTheme = (newTheme: Theme) => {
		setThemeState(newTheme)
	}

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
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
