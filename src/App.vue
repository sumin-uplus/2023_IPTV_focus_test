<template>
	<div class="router_container">
		<router-link v-if="$route.path == '/'" to="/moving">moving-1</router-link>
		<router-link v-if="$route.path == '/'" to="/fixed">fixed-1</router-link>		
	</div>
	<router-view></router-view>
</template>

<script>
	export default {
		name: 'App',
	}
</script>

<style>
	@import './assets/css/thumbnail.css';
	* {
		margin: 0;
		padding: 0;
	}

	#app {
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
		background: #000000;
		overflow-y: hidden;
	}

	.contents_container {
		display: flex;
		flex-direction: column;
		gap: 40px;
		overflow: hidden;
	}

	.router_container {
		position: absolute;
		display: flex;
		flex-direction: column;
		gap: 30px;
		justify-content: center;
		align-items: center;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	} 

	.router_container > * {
		color: black;
		width: 100px;
		height: 30px;
		background: white;
		padding: 6px 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		border-radius: 6px;
	}
</style>
