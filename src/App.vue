<template>
	<div class="contents_container">
		<ThumbnailContainer></ThumbnailContainer>    
	</div>
</template>

<script>
import ThumbnailContainer from './components/ThumbnailContainer.vue';

export default {
	name: 'App',
	components: {
		ThumbnailContainer
	}
}
</script>

<style>
	* {
		margin: 0;
		padding: 0;
	}

	#app {
		width: 100vw;
		height: 100vh;
		/* padding-top: 50px; */
		/* padding-left: 130px; */
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
</style>
