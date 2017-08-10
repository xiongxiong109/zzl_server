// app, 负责创建app实例
import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'

// 同理保持避免单例, 使用函数工厂为每次的请求创建新的实例
export const createApp = () => {
	// 新的app实例
	const app = new Vue({
		render: r => r(App)
	})
	// 新的router实例
	const router = createRouter();
	return { app, router }
}