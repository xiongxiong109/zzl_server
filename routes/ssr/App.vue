<template>
	<div id="app" class="box">
		<p>vue_ssr_server_bundle_render</p>
		<p>{{msg}}</p>
	</div>
</template>
<style type="text/css">
	.box {
		background-color: #ccc;
	}
</style>
<script type="text/javascript">
	export default {
		data: () => {
			return {
				msg: 'hello vue_ssr'
			}
		}
	}
</script>