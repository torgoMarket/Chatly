import { Moon, Sun } from 'lucide-react'
import useThemeStore from '../../../store/themeStore'
import styles from './ThemeSelector.module.scss'
export const ThemeSelector = () => {
	const theme = useThemeStore(state => state.theme)
	const setTheme = useThemeStore(state => state.setTheme)

	return theme === 'light' ? (
		<Sun className={styles.themeIcon} onClick={() => setTheme('dark')} />
	) : (
		<Moon className={styles.themeIcon} onClick={() => setTheme('light')} />
	)
}
