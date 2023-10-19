/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
import GenericService from '../services/generic.service'
import { Bot } from '../models/Bot'

const service = new GenericService<Bot>('bots')

export const useBotStore = defineStore('bots', {
	state: () => ({
		bots: [] as unknown as Bot,
		totalItens: 0
	}),
	getters: {
		getList: (state) => {
			return state.bots
		},
		getTotalItens: (state) => {
			return state.totalItens
		}
	},
	actions: {
		async fetchAll(params: any): Promise<void> {
			await service.list(params).then((res) => {
				this.bots = res.data
				// this.totalItens = res.data
			})
		},
		async fetchById(id: any): Promise<Bot> {
			return await service.findById(id).then((res) => {
				return res.data
			})
		},
		async fetchSave(bot: Bot): Promise<void> {
			await service.save(bot).then((res) => {
				return res.data
			})
		},
		async fetchUpdate(bot: Bot): Promise<void> {
			await service.update(bot).then((res) => {
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
