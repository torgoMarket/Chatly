import axios, { AxiosResponse } from 'axios'
import { $api } from '../api'
import { TChatList } from '../types/chatTypes'
import {
	TUser,
	TUserLogin,
	TUserRecover,
	TUserRegister,
} from '../types/userTypes'
import {
	keysToCamelCaseInObject,
	keysToCamelCaseInObjectOfArray,
} from '../utils/request'

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
			Password: userData.password,
			NickName: userData.nickName,
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

export const logoutUser = async (email: string) => {
	try {
		const response = await $api.post(
			'/logout',
			{
				Email: email,
			},
			{
				withCredentials: true,
			}
		)
		return response
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as unknown as IResponse
			return axiosError.response
		}
	}
}

export const getUserInfo = async (): Promise<TUser> => {
	try {
		const response = await $api.get('/getuserinfo')
		return keysToCamelCaseInObject(response.data.msg) as TUser
	} catch {
		return {} as TUser
	}
}

export const sendMail = async (email: string, subject: string) => {
	try {
		const response = await $api.post('/sendmail', {
			Email: email,
			Subject: subject,
		})
		return response as AxiosResponse
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as unknown as IResponse
			return axiosError.response
		}
	}
}

export const checkCodeFromMail = async (recoverData: TUserRecover) => {
	console.log(recoverData)
	try {
		const response = await $api.post('/recover', {
			Email: recoverData.email,
			Code: recoverData.code,
			NewPassword: recoverData.newPassword,
		})
		return response as AxiosResponse
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as unknown as IResponse
			return axiosError.response
		}
	}
}

export const getChatsOfUser = async (): Promise<TChatList[]> => {
	try {
		const response = await $api.get('/ws/getchatsofuser')
		return keysToCamelCaseInObjectOfArray(response.data) as TChatList[]
	} catch {
		return [] as TChatList[]
	}
}
