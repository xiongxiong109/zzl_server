// 创建vue实例的方法
import Vue from 'vue'

const createApp = () => new Vue({
	data: () => {
		return {
			msg: 'hello vue ssr'
		}
	},
	beforeCreate() {
		console.log('before create')
	},
	created() {
		console.log('created')
	},
	// ssr中, 组件的生命周期只有beforeCreate和created可以被触发
	// 而且触发过程是在node端
	// mounted() {
	// 	console.log('mounted')
	// },
	template: '<div class="box">{{msg}}</div>'
})

export default createApp