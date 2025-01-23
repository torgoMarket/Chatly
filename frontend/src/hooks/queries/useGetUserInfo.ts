import { useQuery } from '@tanstack/react-query'
import { getUserInfo } from '../../services/userService'
import { TUser } from '../../types/userTypes'

export const useGetUserInfo = () => {
	const { data: user = {} as TUser } = useQuery<TUser>({
		queryKey: ['userInfo'],
		queryFn: getUserInfo,
	})

	return { user }
}
