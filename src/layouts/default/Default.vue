<template>
	<v-app>
		<DefaultBar />
		<MainView />
	</v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DefaultBar from './AppBar.vue'
import MainView from './View.vue'

export default defineComponent({
	name: 'DefaultView',
	components: {
		DefaultBar,
		MainView
	}
})
</script>
