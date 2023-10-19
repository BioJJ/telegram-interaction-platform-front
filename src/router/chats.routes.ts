import { authGuard } from '../_helpers/navigationGuards'

const chatsRoutes = [
	{
		path: '/chats',
		name: 'Chats',
		beforeEnter: authGuard,
		meta: {
			title: 'Chats'
		},
		component: () =>
			import(/* webpackChunkName: "home" */ './../views/chats/Chats.vue')
	},
	{
		path: '/chats/create',
		name: 'ChatsForm',
		beforeEnter: authGuard,
		meta: {
			title: 'Chats'
		},
		component: () => import('../views/chats/ChatsForm.vue')
	},
	{
		path: '/chats/edit/:id',
		name: 'ChatsEdit',
		beforeEnter: authGuard,
		meta: {
			title: 'Chats'
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		props: (route: any) => ({ ...route.params }),
		component: () => import('../views/chats/ChatsForm.vue')
	},
	{
		path: '/chats/view/:id',
		name: 'ChatsView',
		beforeEnter: authGuard,
		meta: {
			title: 'Chats'
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		props: (route: any) => ({ ...route.params }),
		component: () => import('../views/chats/ChatsView.vue')
	}
]

export default chatsRoutes
