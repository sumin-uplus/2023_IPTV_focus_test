<template>
	<div class="intro_bg" v-if="$route.path == baseURL + 'test1'" ref="routerContainer">
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
	@import './assets/css/intro.css';
</style>
