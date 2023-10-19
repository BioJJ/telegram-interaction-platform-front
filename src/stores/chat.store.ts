/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
import { Chat } from '../models/Chat'
import GenericService from '../services/generic.service'

const service = new GenericService<Chat>('chats')

export const useChatStore = defineStore('chats', {
	state: () => ({
		chats: [] as unknown as Chat,
		totalItens: 0
	}),
	getters: {
		getChatsList: (state) => {
			return state.chats
		},
		getTotalItens: (state) => {
			return state.totalItens
		}
	},
	actions: {
		async fetchClients(params: any): Promise<void> {
			await service.list(params).then((res) => {
				this.chats = res.data
				// this.totalItens = res.data
			})
		},
		async fetchClient(id: any): Promise<Chat> {
			return await service.findById(id).then((res) => {
				return res.data
			})
		},
		async fetchSaveClient(client: Chat): Promise<void> {
			await service.save(client).then((res) => {
				return res.data
			})
		},
		async fetchUpdateClient(client: Chat): Promise<void> {
			await service.update(client).then((res) => {
				return res.data
			})
		},
		async fetchDeleteClient(id: any): Promise<void> {
			await service.delete(id).then((res) => {
				return res.data
			})
		}
	}
})
