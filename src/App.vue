<script setup lang="ts"></script>

<template>
	<v-app>
		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<style>
.breadcrumbs-title {
	color: #1a2a51;
	font-weight: 600;
	font-size: 20px;
	transform: translateY(2px);
}
.btn-create-title {
	background-color: #f0582e !important;
	color: #fff !important;
	float: right !important;
}
.pgc-card-box {
	box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1) !important;
}
.pgc-table th {
	color: #1a2a51 !important;
	font-size: 14px !important;
	font-weight: 500 !important;
}
.theme--light.v-data-table
	> .v-data-table__wrapper
	> table
	> thead
	> tr:last-child
	> th {
	border-bottom: 2px solid rgba(0, 0, 0, 0.15) !important;
}
.pgc-crud-header {
	margin-bottom: 40px;
}
.pgc-crud-header h2 {
	font-size: 18px;
	font-weight: 300;
	color: #0177fb;
	text-transform: uppercase;
	margin-bottom: 10px;
}
</style>
