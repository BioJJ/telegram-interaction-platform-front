import { defineStore } from 'pinia'

import { AuthService } from './../services/auth.service'
import { UserLogin } from '../models/userLogin'
import { AccessTokenResponse } from '../models/accessTokenResponse'
import { User } from '../models/User'
import { UserRegistry } from '../models/userRegistry'

const service = new AuthService()

export const useAuthStore = defineStore('auth', {
	state: () => ({
		user: null as unknown as User,
		token:
			localStorage.getItem('token') ?? (null as unknown as string | undefined),
		isAuthenticated: false,
		accessToken: null as AccessTokenResponse | null
	}),
	getters: {
		getIsAuthenticated: (state) => {
			return state.isAuthenticated
		},
		getUser: (state) => {
			return state.user
		}
	},
	actions: {
		async login(item: UserLogin) {
			try {
				const response = await service.login(item)
				this.accessToken = response.data
				this.token = response.data.access_token
				this.isAuthenticated = true

				localStorage.setItem('accessToken', JSON.stringify(this.token))
			} catch (error) {
				console.log('error', error)
			}
		},
		async registry(userRegistry: UserRegistry) {
			return await service.register(userRegistry)
		},
		async me() {
			return await service.userLogged()
		},
		checkToken() {
			return this.token !== null
		},
		setToken(token: string) {
			this.token = token
		},
		userChecked(payload: User) {
			this.user = payload
		}
	}
})
