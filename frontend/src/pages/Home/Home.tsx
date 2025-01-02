import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

type Theme = 'light' | 'dark'

export const Home = () => {
	const { setTheme } = useTheme()
	return (
		<>
			<select
				onChange={e => setTheme(e.target.value as Theme)}
				className='text-black'
			>
				<option value='light'>Light</option>
				<option value='dark'>Dark</option>
			</select>
			<Link to='/login'>Login</Link>
		</>
	)
}
