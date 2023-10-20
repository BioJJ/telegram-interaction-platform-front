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

					<v-main>
						<div class="chat-container">
							<div class="chat-messages">
								<div
									v-for="(message, index) in messagesChat"
									:key="index"
									:class="{ sent: message.isBot }"
								>
									{{ message.text }}
								</div>
							</div>
							<input
								v-model="newMessage"
								@keyup.enter="sendMessage"
								placeholder="Digite sua mensagem"
							/>
						</div>
					</v-main>

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
import { Message } from '../../models/Message'
import { useMessageStore } from '../../stores/message.store'
import { MessageSend } from '../../models/MessageSend'

export default defineComponent({
	name: 'ChatsForm',
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
		storeMessage: useMessageStore(),
		newMessage: '',
		messagesChat: [] as unknown as Message[]
	}),

	mounted(): void {
		this.$route.params.id && this.getChats()
	},
	methods: {
		async getChats() {
			try {
				this.chat = await this.store.fetchClient(this.$route.params.id)
				this.form = this.chat

				this.getMessageByChatId()
			} catch (error) {
				this.toast.error('Chats not found')
			}
		},
		async getMessageByChatId() {
			try {
				const url = 'chat'
				this.messagesChat = await this.storeMessage.fetchBy(
					url,
					this.chat.chatId as number
				)
			} catch (error) {
				this.toast.error('Message for ChatId not found')
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
		},
		async sendMessage() {
			if (this.newMessage.trim() === '') return

			const messagetoSend: MessageSend = {
				chatId: this.chat.chatId,
				messageText: this.newMessage,
				id: undefined
			}
			const messageSend = await this.storeMessage.fetchPost(
				'send-message',
				messagetoSend
			)

			this.messagesChat.push(messageSend)
			this.newMessage = ''
		}
	}
})
</script>

<style scoped>
.chat-container {
	width: 100%;
	border: 1px solid #ccc;
	padding: 10px;
}

.chat-messages {
	min-height: 200px;
	padding: 10px;
	overflow-y: scroll;
}

.sent {
	text-align: right;
	background-color: #e6f7ff;
	margin: 5px 0;
}
</style>
