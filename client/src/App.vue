<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
import jwt_code from 'jwt-decode'

export default {
	name: 'app',
	components: {},
	methods: {
		// 判断 token 是否存有内容，是否为空
		isEmpty(value) {
			return (
				value === undefined ||
				value === null ||
				(typeof value === 'object' && Object.keys(value).length === 0) ||
				(typeof value === 'string' && value.trim().length === 0)
			)
		},
	},
	created() {
		if (localStorage.eleToken) {
			const decoded = jwt_code(localStorage.eleToken)
			// 将解析的 token 存储到 Vuex 中
			this.$store.dispatch('setAuthenticated', !this.isEmpty(decoded))
			this.$store.dispatch('setUser', decoded)
		}
	},
}
</script>

<style>
html,
body,
#app {
	width: 100%;
	height: 100%;
}
</style>
