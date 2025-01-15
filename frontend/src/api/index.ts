import axios from 'axios'

export const $api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
})

export const $apiNoInterceptor = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: false,
})

$api.interceptors.response.use(
	response => {
		return response
	},
	error => {
		if (
			error.response.status === 401 &&
			window.location.href.split('/').at(-1) !== 'register' &&
			window.location.href.split('/').at(-1) !== 'login'
		) {
			window.location.href = '/login'
		}
		return Promise.reject(error)
	}
)
