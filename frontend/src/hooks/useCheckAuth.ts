import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { $api } from '../api'

export const useCheckAuth = () => {
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const { status } = await $api.get('http://localhost:3000/getuserinfo', {
					withCredentials: true,
				})

				if (
					status === 200 &&
					(location.pathname.includes('register') ||
						location.pathname.includes('login'))
				) {
					navigate('/dashboard')
				}
			} catch (error) {
				if (!location.pathname.includes('register')) {
					navigate('/login')
				}
				throw error
			}
		}

		checkAuth()
	}, [navigate])
}
