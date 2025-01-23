import { $api } from '../api'
import { TChatList } from '../types/chatTypes'
import { keysToCamelCaseInObjectOfArray } from '../utils/request'

export const getChats = async (nickName: string): Promise<TChatList[]> => {
	try {
		const response = await $api.post('/getuser', {
			NickName: nickName,
		})
		return keysToCamelCaseInObjectOfArray(response.data) as TChatList[]
	} catch {
		return [] as TChatList[]
	}
}
