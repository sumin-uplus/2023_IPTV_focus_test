<template>
	<div class="intro_bg" v-if="$route.path == '/'">
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
				<label class="option" v-for="group in 4" :key="group" :for="'group_'+group">
					<input type="radio" :id="'group_' + group" :value="group" name="group" v-model="selectedGroup">
					{{ "group_" + group }}
				</label>			
			</div>
			</div>
			<router-link :to="'/' + selectedFocus.toLowerCase() + '/' + selectedGroup">
				<button class="generate_btn" @click="generateCase">생성하기</button>
			</router-link>
		</div>
	</div>
	<router-view></router-view>
</template>

<script>
	export default {
		name: 'App',
		data() {
			return {
				selectedFocus: 'MF',
				selectedGroup: '1',
			};
		},
		methods: {
			generateCase() {
			this.$emit('generate-thumbnails', {
				type: this.selectedFocus,
				start: this.selectedGroup,
			});
		},
		}
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
		/* width: 100vw;
		height: 100vh; */
		position: relative;
		width: 1920px;
		height: 1080px;
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
		height: 30px;
		/* background: white; */
		/* border: 1px solid white; */
		padding: 6px 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		border-radius: 6px;
		gap: 5px;
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
		gap: 10px;
		color: #1E93FF;
		font-weight: 700;
	}

	.generate_btn {
		height: 50px;
		background-color: #1E93FF;
		outline: none;
		border: 0px solid;
		color: white;
		border-radius: 6px;
		padding: 6px 20px;
		grid-column-start: 1;
		grid-column-end: 2;
		font-size: 20px;
		cursor: pointer;
	}
</style>
