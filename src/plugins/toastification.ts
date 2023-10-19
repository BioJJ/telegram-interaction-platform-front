import Toast, { PluginOptions, POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export const options: PluginOptions = {
	position: POSITION.BOTTOM_CENTER,
	transition: 'Vue-Toastification__bounce',
	maxToasts: 20,
	newestOnTop: true,
	timeout: 5000,
	closeOnClick: true,
	pauseOnFocusLoss: true,
	pauseOnHover: true,
	draggable: true,
	draggablePercent: 0.6,
	showCloseButtonOnHover: false,
	hideProgressBar: true,
	closeButton: 'button',
	icon: true,
	rtl: false
}

export const toast = Toast
