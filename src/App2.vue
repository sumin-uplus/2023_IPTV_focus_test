<template>
	<div class="intro_bg">
		<div class="router_container">
			<div class="select_container">
				<div class="focus_select">
				Updown Selection
				<label class="option" for="A">
					<input type="radio" id="A" value="A" name="focus" v-model="selectedFocus">
					A
				</label>	
				<label class="option" for="B">
					<input type="radio" id="B" value="B" name="focus" v-model="selectedFocus">
					B
				</label>
				<label class="option" for="C">
					<input type="radio" id="C" value="C" name="focus" v-model="selectedFocus">
					C
				</label>	
				</div>
				<div class="group_select">
					Thumbnail Selection
					<label class="option" v-for="i in 6" :key="i" :for="'group_'+i">
						<input type="radio" :id="'group_' + i" :value="i" name="group" v-model="selectedGroup">
						{{ "group " + i }}
					</label>			
				</div>
			</div>
			<div class="btn_container">
				<router-link
				class="generate_btn test_btn"
				@click.prevent="isFullScreen == false ? goFullscreen() : ''"
				:to="baseURL + 'mf/' + selectedFocus.toLowerCase() + '/0/1'"
				>
				Simulation
				</router-link>
				<div class="btn_inner_container">
					<router-link
					class="generate_btn"
					@click.prevent="isFullScreen == false ? goFullscreen() : ''"
					:to="baseURL + 'mf/' + selectedFocus.toLowerCase() + '/' + selectedGroup + '/1'"
					>
					Task1
					</router-link>
					<router-link
					class="generate_btn"
					@click.prevent="isFullScreen == false ? goFullscreen() : ''"
					:to="baseURL + 'mf/' + selectedFocus.toLowerCase() + '/' + selectedGroup + '/2'"
					>
					Task2
					</router-link>
					<router-link
					class="generate_btn"
					@click.prevent="isFullScreen == false ? goFullscreen() : ''"
					:to="baseURL + 'mf/' + selectedFocus.toLowerCase() + '/' + selectedGroup + '/3'"
					>
					Task3
					</router-link>
				</div>
			</div>		
		</div>
	</div>
	<router-view></router-view>
</template>

<script>
import BaseURL from "./mixins/BaseURL";
	export default {
		name: 'App_2',
		mixins: [BaseURL],
		data() {
			return {
				selectedFocus: 'A',
				selectedGroup: '1',
				isFullScreen: false
			};
		},
		methods: {
			goFullscreen() {
			const container = document.documentElement;
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
		},
		
	}
</script>

<style>
	@import './assets/css/thumbnail.css';
	@import './assets/css/intro.css';
	@import './assets/css/nav.scss';

	/*실험 2번 CSS*/
	.btn_inner_container {
		display: flex;
		width: 100%;
		gap: 20px;
	}

	.btn_inner_container .generate_btn {
		width: 100%;
	}
</style>
