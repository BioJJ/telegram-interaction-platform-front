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
							<h2>Chat View</h2>
							<v-progress-linear
								value="8"
								color="primary"
								background-color="#DDD"
								height="2"
							/>
						</div>
						<v-row class="pgc-form-row">
							<v-col cols="1">
								<v-text-field
									v-model="chat.id"
									label="ID"
									readonly
									dense
								></v-text-field>
							</v-col>
							<v-col cols="4">
								<v-text-field
									v-model="chat.chatId"
									label="chatId"
									readonly
									dense
								></v-text-field>
							</v-col>
							<v-col cols="4">
								<v-text-field
									v-model="chat.username"
									label="Username"
									readonly
									dense
								></v-text-field>
							</v-col>

							<v-col cols="3">
								<v-text-field
									v-model="chat.type"
									readonly
									label="Type"
									dense
								></v-text-field>
							</v-col>
						</v-row>
					</v-form>
					<div class="d-flex justify-start mt-10">
						<v-btn to="/chats" color="red" outlined class="ml-5 pgc-btn-form">
							Voltar
						</v-btn>
					</div>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { Chat } from '../../models/Chat'
import { useToast } from 'vue-toastification'
import { useChatStore } from '../../stores/chat.store'

export default defineComponent({
	name: 'ChatsView',
	data: () => ({
		chat: new Chat(),
		toast: useToast(),
		store: useChatStore()
	}),

	mounted(): void {
		this.$route.params.id && this.getChats()
	},
	methods: {
		async getChats() {
			try {
				this.chat = await this.store.fetchClient(this.$route.params.id)
			} catch (error) {
				this.toast.error('Client not found')
			}
		}
	}
})
</script>
