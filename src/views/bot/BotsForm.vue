<template>
	<v-container id="client" class="pa-6" fluid>
		<v-row>
			<v-col cols="6">
				<v-breadcrumbs divider="|" class="pa-0 breadcrumbs-title">
					{{ $route.meta.title }}
				</v-breadcrumbs>
			</v-col>
			<v-col cols="6"></v-col>
			<v-col cols="12">
				<v-card class="pa-10 pgc-card-box pgc-card-crud">
					<v-form ref="form" lazy-validation>
						<div class="pgc-crud-header">
							<h2>{{ $route.meta.title }}</h2>
							<v-progress-linear
								value="8"
								color="primary"
								background-color="#DDD"
								height="2"
							/>
						</div>
						<v-row class="pgc-form-row">
							<v-col cols="5">
								<v-text-field
									:rules="validators.id"
									v-model="form.id"
									label="id"
									readonly
									dense
								></v-text-field>
							</v-col>
							<v-col cols="5">
								<v-text-field
									:rules="validators.telegramId"
									v-model="form.telegramId"
									label="telegramId"
									readonly
									dense
								></v-text-field>
							</v-col>
							<v-col cols="5">
								<v-text-field
									:rules="validators.username"
									v-model="form.username"
									label="Username"
									dense
								></v-text-field>
							</v-col>
							<v-col cols="5">
								<v-text-field
									:rules="validators.name"
									v-model="form.name"
									label="Name"
									dense
								></v-text-field>
							</v-col>
						</v-row>
					</v-form>
					<div class="d-flex justify-start mt-15">
						<v-btn to="/bots" color="red" outlined class="ml-5 pgc-btn-form">
							Cancel
						</v-btn>
						<v-btn
							@click="resetForm"
							color="warning"
							outlined
							class="ml-5 pgc-btn-form"
						>
							Clean
						</v-btn>
						<v-btn
							@click="submitForm"
							:loading="formLoading"
							color="primary"
							class="ml-5 pgc-btn-form"
						>
							<v-icon small class="mr-1">mdi-content-save</v-icon> Save
						</v-btn>
					</div>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { Validator } from '../../_helpers/validators'
import { useToast } from 'vue-toastification'
import { Bot } from '../../models/Bot'
import { useBotStore } from '../../stores/bot.store'

export default defineComponent({
	name: 'BotsForm',
	data: () => ({
		formLoading: false,
		validators: {
			name: [Validator.required(), Validator.max(100), Validator.min(4)],
			email: [Validator.required(), Validator.email()]
		},
		client: null as unknown as Bot,
		form: new Bot(),
		toast: useToast(),
		store: useBotStore(),
		service: []
	}),

	mounted(): void {
		this.$route.params.id && this.getAll()
	},
	methods: {
		async getAll() {
			try {
				this.client = await this.store.fetchById(this.$route.params.id)
				this.form = this.client
			} catch (error) {
				this.toast.error('Not found')
			}
		},
		async submitForm(): Promise<void> {
			this.formLoading = true
			try {
				if (this.$route.params.id) {
					await this.store.fetchUpdate(this.form)
					this.toast.info('Updated successfully')
				} else {
					await this.store.fetchSave(this.form)
					this.toast.success('Saved successfully')
				}
				this.formLoading = false
				this.$router.push({ name: 'Bots' })

				this.formLoading = false
			} catch (error) {
				this.formLoading = false
			}
		},
		cancel(): void {
			this.resetForm()
			this.$router.push({ name: 'Bots' })
		},
		resetForm() {
			if (this.client) {
				this.getAll()
			} else {
				this.form = {
					name: '',
					username: '',
					id: undefined
				}
			}
		}
	}
})
</script>
