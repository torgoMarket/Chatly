import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { getUserInfo } from '../../services/userService'

export const useGetUserInfo = () => {
	const { data } = useQuery({
		queryKey: ['userInfo'],
		queryFn: getUserInfo,
	})

	const user = data?.msg

	useEffect(() => {
		if (user) {
			console.log('user', user)
			for (const key in user) {
				user[key.toLowerCase()] = user[key]
				delete user[key]
			}
		}
	}, [data, user])

	return { user }
}
