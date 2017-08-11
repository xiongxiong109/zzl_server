<template>
	<div id="app" class="box">
		<p @click="evt_clientTrigger">click me: vue_ssr_server_bundle_render</p>
		<p>{{msg}}</p>
		<p v-if="hidden">{{hidden}}</p>
		<home></home>
	</div>
</template>
<style type="text/css">
	.box {
		background-color: #ccc;
	}
</style>
<script type="text/javascript">
	import Home from './pages/Home.vue'
	export default {
		data: () => {
			return {
				msg: 'hello vue_ssr',
				hidden: ''
			}
		},
		methods: {
			evt_clientTrigger() {
				this.msg = '服务端渲染了首屏内容, js交互在客户端同构页面完成后开始实现';
				this.hidden = `
					服务端渲染和客户端渲染共用了一套app.js,
					但是服务端只需要渲染静态页面的内容,
					复杂的交互仍然在客户端完成,
					两端对同一个virtual dom的输出需要保持一致,
					如果vue检测到服务端首屏渲染的dom与客户端渲染不一致, 也会抛出异常,
					需要保持服务端和客户端的同构
				`
			}
		},
		components: {
			Home
		}
	}
</script>