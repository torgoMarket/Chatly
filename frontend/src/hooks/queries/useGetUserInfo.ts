import { useQuery } from '@tanstack/react-query'
import { getUserInfo } from '../../services/userService'

export const useGetUserInfo = () => {
	const { data } = useQuery({
		queryKey: ['userInfo'],
		queryFn: getUserInfo,
	})

	return { user: data?.msg || {} }
}
