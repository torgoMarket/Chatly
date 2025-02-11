import { create } from 'zustand'

interface IThemeStore {
	theme: 'light' | 'dark'

	setTheme: (theme: 'light' | 'dark') => void
}

const useThemeStore = create<IThemeStore>(set => ({
	theme: 'light',
	setTheme: theme => {
		set({ theme })
		localStorage.setItem('theme', theme)
	},
}))

export default useThemeStore
