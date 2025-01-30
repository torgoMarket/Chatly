import { useQuery } from '@tanstack/react-query'
import { getUserInfo } from '../../services/userService'
import { TUser } from '../../types/userTypes'

export const useGetUserInfo = () => {
	const { data: user = {} as TUser, refetch: refetchUserInfo } =
		useQuery<TUser>({
			queryKey: ['userInfo'],
			queryFn: getUserInfo,
			staleTime: 10 * 60 * 1000,
		})

	return { user, refetchUserInfo }
}
