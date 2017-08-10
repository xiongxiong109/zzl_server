// vue router creator
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './vue_routes'
Vue.use(Router)

export const createRouter = () => {
	return new Router({
		mode: 'history',
		baseUrl: '/ssr',
		routes: routes
	})
}