<template>
	<v-main class="main">
		<div class="container">
			<v-form @submit.prevent="register" v-model="formIsValid">
				<h2 class="mb-5">Register</h2>
				<div class="input">
					<v-text-field
						v-model="userRegistry.email"
						label="Email"
						:rules="validators.email"
						type="email"
					></v-text-field>
				</div>

				<div class="input">
					<v-text-field
						v-model="userRegistry.name"
						label="Name"
						:rules="validators.name"
						type="txt"
					></v-text-field>
				</div>
				<div class="input">
					<v-text-field
						v-model="userRegistry.password"
						label="Senha"
						:rules="validators.password"
						type="password"
					></v-text-field>
				</div>

				<div class="alternative-option mt-4">
					Already have an account? <span @click="moveToLogin">Login</span>
				</div>

				<v-btn
					:disabled="!formIsValid"
					type="submit"
					id="register_button"
					class="mt-4 btn-pers"
				>
					Register
				</v-btn>
			</v-form>
		</div>
	</v-main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { UserRegistry } from '../../models/userRegistry'
import { Validator } from '../../_helpers/validators'
import { useAuthStore } from './../../stores/auth.store'

export default defineComponent({
	// eslint-disable-next-line vue/multi-word-component-names
	name: 'Register',

	data() {
		return {
			store: useAuthStore(),
			userRegistry: new UserRegistry(),
			formIsValid: false,
			validators: {
				email: [Validator.required(), Validator.email()],
				password: [Validator.required()],
				name: [Validator.required()]
			}
		}
	},
	methods: {
		async register() {
			await this.store.registry(this.userRegistry)

			this.$router.push('/login')
		},
		moveToLogin() {
			this.$router.push('/login')
		}
	}
})
</script>

<style lang="css">
.main {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border: 1px solid lightgray;
	padding: 4rem 4rem;
	border-radius: 5px;
	background: #fefefe;
}
.container {
	width: 400px;
	max-width: 95%;
}
</style>
