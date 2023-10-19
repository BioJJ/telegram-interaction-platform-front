<template>
	<v-menu offset-y>
		<template v-slot:activator="{ props }">
			<v-btn icon="mdi-dots-vertical" small v-bind="props"></v-btn>
		</template>
		<v-list class="pa-0">
			<v-list-item class="pa-0">
				<v-btn
					prepend-icon="mdi-eye"
					elevation="0"
					color="#fff"
					:to="`/${route}/view/${item.id}`"
					block
					class="justify-start"
				>
					View
				</v-btn>
			</v-list-item>
			<v-list-item class="pa-0">
				<v-btn
					prepend-icon="mdi-pencil"
					elevation="0"
					color="#fff"
					:to="`/${route}/edit/${item.id}`"
					block
					class="justify-start"
				>
					Edit
				</v-btn>
			</v-list-item>
			<v-list-item class="pa-0">
				<v-btn
					prepend-icon="mdi-delete"
					elevation="0"
					color="#fff"
					@click="deleteModal"
					block
					class="justify-start red--text"
				>
					Delete
				</v-btn>
			</v-list-item>
		</v-list>
	</v-menu>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
	data: () => ({}),
	props: {
		item: {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			type: Object as PropType<{ type: any; required: true }>,
			required: true
		},
		route: {
			type: String,
			required: true
		}
	},

	methods: {
		deleteModal(): void {
			this.$emit('delete')
		}
	}
})
</script>
