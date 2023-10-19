<template>
	<v-container id="bot" class="pa-6" fluid>
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
									v-model="bot.id"
									label="ID"
									readonly
									dense
								></v-text-field>
							</v-col>
							<v-col cols="4">
								<v-text-field
									v-model="bot.telegramId"
									label="telegramId"
									readonly
									dense
								></v-text-field>
							</v-col>
							<v-col cols="4">
								<v-text-field
									v-model="bot.username"
									label="Username"
									readonly
									dense
								></v-text-field>
							</v-col>

							<v-col cols="3">
								<v-text-field
									v-model="bot.name"
									readonly
									label="name"
									dense
								></v-text-field>
							</v-col>
						</v-row>
					</v-form>
					<div class="d-flex justify-start mt-10">
						<v-btn to="/bots" color="red" outlined class="ml-5 pgc-btn-form">
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

import { Bot } from '../../models/Bot'
import { useToast } from 'vue-toastification'
import { useBotStore } from '../../stores/bot.store'

export default defineComponent({
	name: 'ChatsView',
	data: () => ({
		bot: new Bot(),
		toast: useToast(),
		store: useBotStore()
	}),

	mounted(): void {
		this.$route.params.id && this.getAll()
	},
	methods: {
		async getAll() {
			try {
				this.bot = await this.store.fetchById(this.$route.params.id)
			} catch (error) {
				this.toast.error('Not found')
			}
		}
	}
})
</script>
