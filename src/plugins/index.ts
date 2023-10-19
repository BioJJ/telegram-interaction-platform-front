import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import { setupPinia } from '../stores'
import router from '../router'
import type { App } from 'vue'
import { options, toast } from './toastification'

const pinia = setupPinia()

export function registerPlugins(app: App) {
	loadFonts()
	app.use(vuetify).use(router).use(pinia).use(toast, options)
}
