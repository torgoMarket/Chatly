import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { $api } from '../../api'
import { getUserInfo } from '../../services/userService'

export const useGetUserInfo = () => {
	const { data } = useQuery({
		queryKey: ['userInfo'],
		queryFn: getUserInfo,
	})

	const user = data?.msg

	const getUserChats = async () => {
		const response = await $api.get('/ws/getchatsofuser')
		console.log('response', response)
	}

	useEffect(() => {
		if (user) {
			console.log('user', user)
			for (const key in user) {
				user[key.toLowerCase()] = user[key]
				delete user[key]
			}

			getUserChats()
		}
	}, [data, user])

	return { user }
}
