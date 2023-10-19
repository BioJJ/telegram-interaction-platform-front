import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from './../stores/auth.store'
import { decodeToken } from './utils'

export function authGuard(
	to: RouteLocationNormalized,
	from: RouteLocationNormalized,
	next: NavigationGuardNext
) {
	const store = useAuthStore()
	if (store.user === null) {
		if (localStorage.getItem('accessToken')) {
			const token = JSON.stringify(localStorage.getItem('accessToken'))
			if (decodeToken(token).exp < Math.round(new Date().getTime() / 1000)) {
				localStorage.removeItem('accessToken')
				localStorage.removeItem('userName')
				if (to.path == '/login') return next()
				return next('/login')
			}
			return next()
		} else {
			if (to.path == '/login') return next()
			return next('/login')
		}
	} else {
		if (to.path == '/login') {
			return next(from.path)
		}
		return next()
	}
}

export function authGuardLayout(
	to: RouteLocationNormalized,
	from: RouteLocationNormalized,
	next: NavigationGuardNext
) {
	const store = useAuthStore()

	if (to.path === '/login') {
		if (store.isAuthenticated) {
			return next('/home')
		}
		return next()
	}

	if (!store.isAuthenticated) {
		return next('/login')
	}

	return next()
}
