import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Register from '../views/Register'
import NotFound from '../views/404'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		redirect: '/index',
	},
	{
		path: '/index',
		name: 'index',
		component: Index,
	},
	{
		path: '/register',
		name: 'register',
		component: Register,
	},
	{
		path: '*',
		name: 'NotFound',
		component: NotFound,
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

export default router
