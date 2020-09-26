import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Register from '../views/Register'
import Login from '../views/Login'
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
		path: '/login',
		name: 'login',
		component: Login,
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

// 路由守卫 || 导航守卫
router.beforeEach((to, from, next) => {
	const isLogin = localStorage.eleToken ? true : false
	if (to.path == '/login' || to.path == '/register') {
		next()
	} else {
		isLogin ? next() : next('/login')
	}
})

export default router
