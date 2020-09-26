import axios from 'axios'
import { Message, Loading } from 'element-ui'
import router from './router/index'

let loading

function startLoading() {
	loading = Loading.service({
		lock: true,
		text: '正在加载中...',
		background: 'rgba(0.0.0.7)',
	})
}

function endLoading() {
	loading.close()
}

// 请求拦截
axios.interceptors.request.use(
	(config) => {
		// 加载动画
		startLoading()
		// 判断 localStorage 中是否有 tokne
		if (localStorage.eleToken) {
			// 设置同意的请求头 请求 header
			config.headers.Authorization = localStorage.eleToken
		}
		return config
	},
	(err) => {
		return Promise.reject(err)
	}
)

// 响应拦截
axios.interceptors.response.use(
	(response) => {
		// 结束加载动画
		endLoading()
		return response
	},
	(err) => {
		// 错误提醒
		endLoading()
		Message.error(err.response.data)
		// 响应码 401 代表 token失效
		// 获取错误状态码
		const { status } = err.response
		if (status == 401) {
			Message.err('token 失效，请重新登录')
			// 清除 token
			localStorage.removeItem('eleToken')
			// 跳转到登录页面
			router.push('/login')
		}
		return Promise.reject(err)
	}
)

export default axios
