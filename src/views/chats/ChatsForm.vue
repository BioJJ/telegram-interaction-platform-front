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
							<h2>Client</h2>
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
									:rules="validators.name"
									v-model="form.name"
									label="Name"
									dense
								></v-text-field>
							</v-col>

							<v-col cols="4">
								<v-text-field
									:rules="validators.email"
									v-model="form.email"
									label="Email"
									dense
								></v-text-field>
							</v-col>
						</v-row>
					</v-form>
					<div class="d-flex justify-start mt-15">
						<v-btn to="/clients" color="red" outlined class="ml-5 pgc-btn-form">
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
import { Client } from '../../models/Client'
import { useToast } from 'vue-toastification'
import { useClientStore } from '../../stores/client.store'

export default defineComponent({
	name: 'ClientsForm',
	data: () => ({
		formLoading: false,
		validators: {
			name: [Validator.required(), Validator.max(100), Validator.min(4)],
			email: [Validator.required(), Validator.email()]
		},
		client: null as unknown as Client,
		form: new Client(),
		toast: useToast(),
		store: useClientStore(),
		service: []
	}),

	mounted(): void {
		this.$route.params.id && this.getClient()
	},
	methods: {
		async getClient() {
			try {
				this.client = await this.store.fetchClient(this.$route.params.id)
				this.form = this.client
			} catch (error) {
				this.toast.error('Client not found')
			}
		},
		async submitForm(): Promise<void> {
			this.formLoading = true
			try {
				if (this.$route.params.id) {
					await this.store.fetchUpdateClient(this.form)
					this.toast.info('Client Updated successfully')
				} else {
					await this.store.fetchSaveClient(this.form)
					this.toast.success('Client Saved successfully')
				}
				this.formLoading = false
				this.$router.push({ name: 'Clients' })

				this.formLoading = false
			} catch (error) {
				this.formLoading = false
			}
		},
		cancel(): void {
			this.resetForm()
			this.$router.push({ name: 'Clients' })
		},
		resetForm() {
			if (this.client) {
				this.getClient()
			} else {
				this.form = {
					name: '',
					email: '',
					id: undefined
				}
			}
		}
	}
})
</script>
../../models/Chat../../stores/chat.store
