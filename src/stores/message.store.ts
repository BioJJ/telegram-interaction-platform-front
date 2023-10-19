/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
import GenericService from '../services/generic.service'
import { Message } from '../models/Message'

const service = new GenericService<Message>('message')

export const useMessageStore = defineStore('message', {
	state: () => ({
		messages: [] as unknown as Message,
		totalItens: 0
	}),
	getters: {
		getList: (state) => {
			return state.messages
		},
		getTotalItens: (state) => {
			return state.totalItens
		}
	},
	actions: {
		async fetchAll(params: any): Promise<void> {
			await service.list(params).then((res) => {
				this.messages = res.data
				// this.totalItens = res.data
			})
		},
		async fetchById(id: any): Promise<Message> {
			return await service.findById(id).then((res) => {
				return res.data
			})
		},
		async fetchSave(message: Message): Promise<void> {
			await service.save(message).then((res) => {
				return res.data
			})
		},
		async fetchUpdate(message: Message): Promise<void> {
			await service.update(message).then((res) => {
				return res.data
			})
		},
		async fetchDelete(id: any): Promise<void> {
			await service.delete(id).then((res) => {
				return res.data
			})
		}
	}
})
