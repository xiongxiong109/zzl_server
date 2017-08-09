// ssr router
import Vue from 'vue'

const App = new Vue({
	data: () => {
		return {
			msg: 'hello vue ssr'
		}
	},
	template: '<div class="box">{{msg}}</div>'
})

export default App