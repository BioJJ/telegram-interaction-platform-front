import axios from 'axios'

const api = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:3000' // TODO: Trocar para .env
})

api.interceptors.request.use(
	function (config) {
		const token = JSON.parse(localStorage.getItem('accessToken') as string)
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	function (err) {
		return Promise.reject(err)
	}
)

export default api
