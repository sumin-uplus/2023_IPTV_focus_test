<template>
	<div class="router_container" v-if="$route.path == '/'">
		<router-link class="option" v-if="$route.path == '/'" to="/moving"></router-link>
		<router-link class="option" v-if="$route.path == '/'" to="/fixed"></router-link>
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
		<div class="photo_select">
			Thumbnail Selection
			<label class="option" v-for="photo in 4" :key="photo" :for="'photo_'+photo">
				<input type="radio" :id="'photo_' + photo" :value="'photo_' + photo" name="photo" v-model="selectedPhoto">
				{{ "group_" + photo }}
			</label>			
		</div>
		</div>
		<button class="generate_btn">생성하기</button>
	</div>
	<router-view></router-view>
</template>

<script>
	export default {
		name: 'App',
		data() {
			return {
				selectedFocus: 'MF',
				selectedPhoto: 'photo_1',
			};
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
	.photo_select {
		width: fit-content;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		color: #1E93FF;
		font-weight: 700;
	}

	.generate_btn {
		height: 42px;
		background-color: #1E93FF;
		outline: none;
		border: 0px solid;
		color: white;
		border-radius: 6px;
		padding: 6px 20px;
		grid-column-start: 1;
		grid-column-end: 2;
		cursor: pointer;
	}
</style>
