<template>
	<v-container id="Messages" class="pa-6" fluid>
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
							<v-col cols="2">
								<v-text-field
									:rules="validators.id"
									v-model="form.id"
									label="id"
									readonly
									dense
								></v-text-field>
							</v-col>
							<v-col cols="2">
								<v-text-field
									:rules="validators.messageId"
									v-model="form.messageId"
									label="messageId"
									readonly
									dense
								></v-text-field>
							</v-col>
							<v-col cols="8">
								<v-text-field
									:rules="validators.sender"
									v-model="form.sender"
									label="sender"
									dense
								></v-text-field>
							</v-col>
							<v-col cols="6">
								<v-text-field
									:rules="validators.senderUsername"
									v-model="form.senderUsername"
									label="senderUsername"
									dense
								></v-text-field>
							</v-col>
							<v-col cols="6">
								<v-text-field
									:rules="validators.text"
									v-model="form.text"
									label="text"
									dense
								></v-text-field>
							</v-col>
						</v-row>
					</v-form>
					<div class="d-flex justify-start mt-15">
						<v-btn to="/message" color="red" outlined class="ml-5 pgc-btn-form">
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
import { Message } from '../../models/Message'
import { useMessageStore } from '../../stores/message.store'

export default defineComponent({
	name: 'MessagesForm',
	data: () => ({
		formLoading: false,
		validators: {
			messageId: [Validator.required()],
			sender: [Validator.required()],
			senderUsername: [Validator.required()],
			text: [Validator.required()]
		},
		message: null as unknown as Message,
		form: new Message(),
		toast: useToast(),
		store: useMessageStore(),
		service: []
	}),

	mounted(): void {
		this.$route.params.id && this.getAll()
	},
	methods: {
		async getAll() {
			try {
				this.message = await this.store.fetchById(this.$route.params.id)
				this.form = this.message
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
				this.$router.push({ name: 'Messages' })

				this.formLoading = false
			} catch (error) {
				this.formLoading = false
			}
		},
		cancel(): void {
			this.resetForm()
			this.$router.push({ name: 'Messages' })
		},
		resetForm() {
			if (this.message) {
				this.getAll()
			} else {
				this.form = {
					sender: '',
					senderUsername: '',
					id: undefined
				}
			}
		}
	}
})
</script>
