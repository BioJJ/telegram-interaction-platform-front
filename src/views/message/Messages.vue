<template>
	<v-container id="Messages" class="pa-6" fluid>
		<delete-modal @delete="Delete" ref="DeleteModal" :table="'chat'" />

		<v-row class="mb-3">
			<v-col cols="6">
				<v-breadcrumbs divider="|" class="pa-0 breadcrumbs-title">
					{{ $route.meta.title }}
				</v-breadcrumbs>
			</v-col>
			<!-- <v-col cols="6">
				<v-btn to="/chats/create" elevation="1" class="btn-create-title">
					<v-icon class="mr-1">mdi-plus</v-icon>
					Create Chats
				</v-btn>
			</v-col> -->

			<v-col cols="12">
				<v-card class="pt-10 pb-7 px-6 pgc-card-box">
					<v-row>
						<v-col cols="6">
							<v-text-field
								v-model="search"
								append-icon="mdi-magnify"
								label="Search"
								single-line
								hide-details
							></v-text-field>
						</v-col>

						<v-col cols="3">
							<v-btn
								elevation="1"
								color="bluesky"
								style="color: #000; transform: translateY(6px)"
								large
								@click="performSearch"
							>
								Search
							</v-btn>
						</v-col>
					</v-row>
				</v-card>
			</v-col>

			<v-col cols="12">
				<v-card class="py-3 px-6 pgc-card-box">
					<v-data-table
						:headers="headers"
						:items="messages"
						class="pgc-table"
						:search="search"
						v-model:page="page"
						:items-per-page="itemsPerPage"
						:total-items="pageCount * itemsPerPage"
					>
						<template v-slot:item.actions="{ item }">
							<table-action
								@delete="deleteModal(item.columns.name, item.columns.id)"
								route="message"
								:item="item.columns"
							/>
						</template>
					</v-data-table>
					<v-spacer></v-spacer>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import TableAction from '../../components/TableAction.vue'
import DeleteModal from '../../components/DeleteModal.vue'

import { VDataTable } from 'vuetify/labs/VDataTable'
import { useToast } from 'vue-toastification'

import Pagination from '../../models/Pagination'
import { useMessageStore } from '../../stores/message.store'
import { Message } from '../../models/Message'

export default defineComponent({
	// eslint-disable-next-line vue/multi-word-component-names
	name: 'Messages',
	components: {
		TableAction,
		DeleteModal,
		VDataTable
	},
	data() {
		return {
			toast: useToast(),
			store: useMessageStore(),
			pagination: Pagination.build(),
			search: '',
			page: 1,
			pageCount: 0,
			itemsPerPage: 10,
			messages: [] as unknown as Message,
			headers: [
				{ title: 'Id', align: 'start', value: 'id', key: 'id' },
				{
					title: 'messageId',
					align: 'start',
					value: 'messageId',
					key: 'messageId'
				},
				{
					title: 'sender',
					align: 'start',
					value: 'sender',
					key: 'sender'
				},
				{
					title: 'senderUsername',
					align: 'start',
					value: 'senderUsername',
					key: 'senderUsername'
				},
				{
					title: 'timestamp',
					align: 'start',
					value: 'timestamp',
					key: 'timestamp'
				},
				{ title: 'Actions', key: 'actions', sortable: false }
			]
		}
	},
	mounted() {
		this.getAll()
	},
	methods: {
		async getAll() {
			await this.store.fetchAll(this.pagination)
			this.messages = this.store.getList

			this.itemsPerPage = this.store.getTotalItens
		},
		deleteModal(name: string, id: string) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const deleteModal = this.$refs.DeleteModal as any
			deleteModal.showModal(name, id)
		},
		Delete() {
			this.toast.success('Deleted successfully')
			this.getAll()
		},
		performSearch() {}
	}
})
</script>
