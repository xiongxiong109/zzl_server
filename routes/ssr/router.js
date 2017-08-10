// vue router creator
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './vue_routes'

Vue.use(VueRouter)

export const createRouter = () => {
	return new VueRouter({
		mode: 'history',
		baseUrl: '/ssr',
		routes: routes
	})
}