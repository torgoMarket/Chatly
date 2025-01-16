import axios, { AxiosResponse } from 'axios'
import { $api } from '../api'
import { TUserLogin, TUserRegister } from '../types/userTypes'

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

export const registerUser = async (userData: TUserRegister) => {
	try {
		const response = await $api.post('/signup', {
			Name: userData.name,
			Email: userData.email,
			password: userData.password,
		})

		return response
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as unknown as IResponse
			return axiosError.response
		}
	}
}

export const loginUser = async (userData: TUserLogin) => {
	try {
		const response = await $api.post('/login', {
			Email: userData.email,
			Password: userData.password,
		})
		return response as AxiosResponse
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as unknown as IResponse
			return axiosError.response
		}
	}
}

export const getUserInfo = async () => {
	try {
		const response = await $api.get('/val')
		return response.data
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as unknown as IResponse
			return axiosError.response
		}
	}
}
