// ssr router
// import Vue from 'vue'
import createApp from './services/createApp'

// 使用一个工厂函数来为每一次的请求创建一个App实例
const App = createApp()

// 服务端的node 进程是会一直存在的, 创建的一个App实例, 会被多个请求所共享
// 所以有可能会造成交叉请求污染
// const App = new Vue({
// 	data: () => {
// 		return {
// 			msg: 'hello vue ssr'
// 		}
// 	},
// 	beforeCreate() {
// 		console.log('before create')
// 	},
// 	created() {
// 		console.log('created')
// 		setTimeout(() => {
// 			this.msg = `hello ${Math.random()}`
// 		}, 300)
// 	},
	// ssr中, 组件的生命周期只有beforeCreate和created可以被触发
	// 而且触发过程是在node端
	// mounted() {
	// 	console.log('mounted')
	// },
// 	template: '<div class="box">{{msg}}</div>'
// })

export default App