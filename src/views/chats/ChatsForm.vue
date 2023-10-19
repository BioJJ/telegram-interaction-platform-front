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
							<h2>Chat</h2>
							<v-progress-linear
								value="8"
								color="primary"
								background-color="#DDD"
								height="2"
							/>
						</div>
						<v-row class="pgc-form-row">
							<v-col cols="3">
								<v-text-field
									v-model="form.chatId"
									readonly
									label="ChatId"
									dense
								></v-text-field>
							</v-col>

							<v-col cols="4">
								<v-text-field
									:rules="validators.username"
									v-model="form.username"
									label="Username"
									dense
								></v-text-field>
							</v-col>

							<v-col cols="4">
								<v-text-field
									:rules="validators.type"
									v-model="form.type"
									label="Type"
									dense
								></v-text-field>
							</v-col>
						</v-row>
					</v-form>
					<div class="d-flex justify-start mt-15">
						<v-btn to="/chats" color="red" outlined class="ml-5 pgc-btn-form">
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
import { useChatStore } from '../../stores/chat.store'
import { Chat } from '../../models/Chat'

export default defineComponent({
	name: 'ClientsForm',
	data: () => ({
		formLoading: false,
		validators: {
			username: [Validator.required()],
			type: [Validator.required()]
		},
		chat: null as unknown as Chat,
		form: new Chat(),
		toast: useToast(),
		store: useChatStore(),
		service: []
	}),

	mounted(): void {
		this.$route.params.id && this.getChats()
	},
	methods: {
		async getChats() {
			try {
				this.chat = await this.store.fetchClient(this.$route.params.id)
				this.form = this.chat
			} catch (error) {
				this.toast.error('Chats not found')
			}
		},
		async submitForm(): Promise<void> {
			this.formLoading = true
			try {
				if (this.$route.params.id) {
					await this.store.fetchUpdateClient(this.form)
					this.toast.info('Chat Updated successfully')
				} else {
					await this.store.fetchSaveClient(this.form)
					this.toast.success('Chat Saved successfully')
				}
				this.formLoading = false
				this.$router.push({ name: 'Chats' })

				this.formLoading = false
			} catch (error) {
				this.formLoading = false
			}
		},
		cancel(): void {
			this.resetForm()
			this.$router.push({ name: 'Chats' })
		},
		resetForm() {
			if (this.chat) {
				this.getChats()
			} else {
				this.form = {
					username: '',
					type: '',
					id: undefined
				}
			}
		}
	}
})
</script>
