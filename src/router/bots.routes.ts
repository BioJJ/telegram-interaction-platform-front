import { authGuard } from '../_helpers/navigationGuards'

const botsRoutes = [
	{
		path: '/bots',
		name: 'Bots',
		beforeEnter: authGuard,
		meta: {
			title: 'Bots'
		},
		component: () =>
			import(/* webpackChunkName: "home" */ './../views/bot/Bots.vue')
	},
	{
		path: '/bots/create',
		name: 'BotsForm',
		beforeEnter: authGuard,
		meta: {
			title: 'Bots'
		},
		component: () => import('../views/bot/BotsForm.vue')
	},
	{
		path: '/bots/edit/:id',
		name: 'BotsEdit',
		beforeEnter: authGuard,
		meta: {
			title: 'Bots'
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		props: (route: any) => ({ ...route.params }),
		component: () => import('../views/bot/BotsForm.vue')
	},
	{
		path: '/bots/view/:id',
		name: 'BotsView',
		beforeEnter: authGuard,
		meta: {
			title: 'Bots'
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		props: (route: any) => ({ ...route.params }),
		component: () => import('../views/bot/BotsView.vue')
	}
]

export default botsRoutes
