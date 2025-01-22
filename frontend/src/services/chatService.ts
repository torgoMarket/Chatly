import axios, { AxiosResponse } from 'axios'
import { $api } from '../api'

interface IResponse extends AxiosResponse {
	response: {
		status: number
		data: {
			error?: {
				ConstraintName?: string
			}
		}
	}
}

export const getChats = async (nickName: string) => {
	try {
		const response = await $api.post('/getuser', {
			NickName: nickName,
		})

		return response
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as unknown as IResponse
			return axiosError.response
		}
	}
}
