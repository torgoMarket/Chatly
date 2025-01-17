import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { $api } from '../api'

export const useCheckAuth = () => {
	const navigate = useNavigate()

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const { status } = await $api.get('http://localhost:3000/val', {
					withCredentials: true,
				})

				if (status === 200) {
					return
				}
			} catch (error) {
				console.log('error', error)
				navigate('/login')
			}
		}

		checkAuth()
	}, [navigate])
}
