import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const useChatHistory = (chatId: number) => {
	const fetchChatHistory = async () => {
		const response = await axios.post(
			'http://localhost:3000/ws/getchathistory',
			{
				chatid: chatId,
				limit: -1,
				offset: -1,
			},
			{ withCredentials: false }
		)

		if (response.status === 200) {
			return response.data
		} else {
			return []
		}
	}

	const { data, refetch, isLoading, isError, error } = useQuery({
		queryKey: ['chatHistory', chatId],
		queryFn: fetchChatHistory,
	})

	return {
		chatHistory: data,
		refetchChatHistory: refetch,
		isLoading,
		isError,
		error,
	}
}
