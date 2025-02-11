import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { getUserInfo } from '../../services/userService'
import useThemeStore from '../../store/themeStore'
import { TUser } from '../../types/userTypes'

export const useGetUserInfo = () => {
	const setTheme = useThemeStore(state => state.setTheme)
	const { data: user = {} as TUser, refetch: refetchUserInfo } =
		useQuery<TUser>({
			queryKey: ['userInfo'],
			queryFn: getUserInfo,
			staleTime: 10 * 60 * 1000,
		})

	useEffect(() => {
		if (user?.theme) {
			setTheme(!user.theme ? 'light' : user.theme)
			localStorage.setItem('color', !user.theme ? 'light' : user.theme)
		}
	}, [user])

	return { user, refetchUserInfo }
}
