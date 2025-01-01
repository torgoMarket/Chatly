import clsx from 'clsx'
import { Link } from 'react-router-dom'
import styles from './Home.module.scss'
export const Home = () => {
	// const { isDarkMode, toggleDarkMode } = useTheme()
	return (
		<div className={clsx('m-48 text-lg font-bold', styles.div)}>
			{/* <button onClick={toggleDarkMode}>
				Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
			</button> */}
			<Link to='/login'>Login</Link>
		</div>
	)
}
