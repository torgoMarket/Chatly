import { useEffect, useState } from 'react'
import { getChats } from '../services/chatService'
import { TChatList } from '../types/chatTypes'
import { useDebounce } from './useDebounce'

export const useSearchChat = (delay: number = 1000) => {
	const [search, setSearch] = useState<string>('')
	const [results, setResults] = useState<TChatList[] | null>(null)
	const debouncedSearch = useDebounce(search, delay)

	useEffect(() => {
		const fetchChats = async () => {
			if (debouncedSearch.trim() === '') {
				setResults(null)
				return
			}

			const searchedChatList = await getChats(debouncedSearch)
			setResults(searchedChatList)
		}

		fetchChats()
	}, [debouncedSearch])

	return { search, setSearch, results }
}
