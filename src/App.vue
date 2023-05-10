<template>
	<div class="intro_bg" v-if="$route.path == baseURL" ref="routerContainer">
		<div class="router_container">
			<div class="select_container">
				<div class="focus_select">
				Focus Selection
				<label class="option" for="MF">
					<input type="radio" id="MF" value="MF" name="focus" v-model="selectedFocus">
					MF
				</label>	
				<label class="option" for="FF">
					<input type="radio" id="FF" value="FF" name="focus" v-model="selectedFocus">
					FF
				</label>	
			</div>
			<div class="group_select">
				Thumbnail Selection
				<label class="option" v-for="i in 4" :key="i" :for="'group_'+i">
					<input type="radio" :id="'group_' + i" :value="i" name="group" v-model="selectedGroup">
					{{ "group " + i }}
				</label>			
			</div>
			</div>
			<div class="btn_container">
				<router-link
				class="generate_btn test_btn"
				@click.prevent="isFullScreen == false ? goFullscreen() : ''"
				to="mf"
				>
				Simulation
				</router-link>
				<router-link
				class="generate_btn"
				@click.prevent="isFullScreen == false ? goFullscreen() : ''"
				:to="baseURL + selectedFocus.toLowerCase() + '/' + selectedGroup"
				>
				생성하기
				</router-link>
			<!-- <button class="generate_btn" @click="goLink">생성하기</button> -->
			</div>		
		</div>
	</div>
	<router-view></router-view>
</template>

<script>
import BaseURL from "./mixins/BaseURL";
	export default {
		name: 'App',
		mixins: [BaseURL],
		data() {
			return {
				selectedFocus: 'MF',
				selectedGroup: '1',
				isFullScreen: false
			};
		},
		methods: {
			goFullscreen() {
				const container = this.$refs.routerContainer;
				if (container.requestFullscreen) {
					container.requestFullscreen();
					this.isFullScreen = true;
				} else if (container.webkitRequestFullscreen) {
					container.webkitRequestFullscreen();
					this.isFullScreen = true;
				} else if (container.msRequestFullscreen) {
					container.msRequestFullscreen();
					this.isFullScreen = true;
				}
			},
			// goLink() {
			// 	let path = this.baseURL + this.selectedFocus.toLowerCase() + '/' + this.selectedGroup
			// 	this.$router.push(path);
			// 	if(this.isFullScreen == false) {
			// 		this.goFullscreen();
			// 	}
			// }

		},
		
	}
</script>

<style>
	@import './assets/css/thumbnail.css';
	* {
		margin: 0;
		padding: 0;
	}

	body {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	#app {
		width: 100vw;
		height: 100vh;
		position: relative;
		box-sizing: border-box;
		background: #000000;
		overflow-y: hidden;
		overflow-x: hidden;
	}
	
	.intro_bg {
		width: 100%;
		height: 100%;
	}

	.contents_container {
		width: 1920px;
		height: 1080px;
		display: flex;
		flex-direction: column;
		gap: 40px;
		overflow: hidden;
	}

	.router_container {
		max-width: max-content;
		height: fit-content;
		position: absolute;
		display: grid;
		grid-auto-flow: column;
		grid-template-columns: 1fr;
		gap: 30px;
		justify-content: center;
		align-items: flex-start;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		font-size: 22px;
	}

	.option {
		color: white;
		width: 100px;
		height: 40px;
		/* background: white; */
		border: 1px solid gray;
		padding: 6px 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		border-radius: 6px;
		gap: 7px;
		cursor: pointer;
		font-weight: 500;
	}

	.select_container {
		display: flex;
		gap: 20px;
		grid-column-start: 1;
	}

	.focus_select,
	.group_select {
		width: fit-content;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		color: #1E93FF;
		font-weight: 700;
	}

	.btn_container {
		width: 100%;
		height: 100%;
		grid-column-start: 1;
		grid-column-end: 2;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.generate_btn {
		box-sizing: border-box;
		height: 60px;
		background-color: #1E93FF;
		outline: none;
		border: 0px solid;
		color: white;
		border-radius: 6px;
		padding: 6px 20px;
		font-size: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
	}

	.generate_btn.test_btn {
		background-color: #9e9e9e;
	}

</style>
