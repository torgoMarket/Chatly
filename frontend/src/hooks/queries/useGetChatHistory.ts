import { useQuery } from '@tanstack/react-query'
import { $api } from '../../api'
import { keysToCamelCaseInObjectOfArray } from '../../utils/request'

export const useChatHistory = (chatId: number) => {
	const fetchChatHistory = async () => {
		const response = await $api.post('/ws/getchathistory', {
			chatId: Number(chatId),
			limit: -1,
			offset: -1,
		})

		if (response.status === 200) {
			return keysToCamelCaseInObjectOfArray(response.data)
		} else {
			return []
		}
	}

	const { data, refetch, isLoading, isError, error } = useQuery({
		queryKey: ['chatHistory', chatId],
		queryFn: fetchChatHistory,
		retry: false,
		refetchInterval: 1000 * 60,
	})

	return {
		chatHistory: data,
		refetchChatHistory: refetch,
		isLoading,
		isError,
		error,
	}
}
