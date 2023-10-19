<template>
	<v-container id="home" class="pa-6" fluid>
		<v-row class="mb-3">
			<v-col cols="6">
				<v-breadcrumbs divider="|" class="pa-0 breadcrumbs-title">
					{{ $route.meta.title }}
				</v-breadcrumbs>
			</v-col>
			<v-col cols="6"> HOME</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	// eslint-disable-next-line vue/multi-word-component-names
	name: 'Home',
	components: {}
})
</script>

<style></style>
