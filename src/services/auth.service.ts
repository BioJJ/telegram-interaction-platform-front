import api from '../_helpers/axios'
import { User } from '../models/User'
import { AccessTokenResponse } from '../models/accessTokenResponse'
import { UserLogin } from '../models/userLogin'
import { UserRegistry } from '../models/userRegistry'

export class AuthService {
	login(body: UserLogin) {
		return api.post<AccessTokenResponse>(`/login`, body)
	}

	register(item: UserRegistry) {
		return api.post<User>(`/users`, item)
	}

	userLogged() {
		return api.get<User>(`/me`)
	}
}
