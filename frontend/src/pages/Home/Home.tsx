import clsx from 'clsx'
import { useTheme } from '../../context/ThemeContext'
import styles from './Home.module.scss'
export const Home = () => {
	const { isDarkMode, toggleDarkMode } = useTheme()
	return (
		<div className={clsx('m-48 text-lg font-bold', styles.div)}>
			{' '}
			<button onClick={toggleDarkMode}>
				Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
			</button>
		</div>
	)
}
