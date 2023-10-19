import { authGuard } from '../_helpers/navigationGuards'

const messagesRoutes = [
	{
		path: '/message',
		name: 'Messages',
		beforeEnter: authGuard,
		meta: {
			title: 'Messages'
		},
		component: () =>
			import(/* webpackChunkName: "home" */ './../views/message/Messages.vue')
	},
	{
		path: '/message/create',
		name: 'MessagesForm',
		beforeEnter: authGuard,
		meta: {
			title: 'Messages'
		},
		component: () => import('../views/message/MessagesForm.vue')
	},
	{
		path: '/message/edit/:id',
		name: 'MessagesEdit',
		beforeEnter: authGuard,
		meta: {
			title: 'Messages'
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		props: (route: any) => ({ ...route.params }),
		component: () => import('../views/message/MessagesForm.vue')
	},
	{
		path: '/message/view/:id',
		name: 'MessagesView',
		beforeEnter: authGuard,
		meta: {
			title: 'Messages'
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		props: (route: any) => ({ ...route.params }),
		component: () => import('../views/message/MessagesView.vue')
	}
]

export default messagesRoutes
