<template>
	<div v-if="type=='moving'" class="contents_container">
		<MovingFocus
			v-for="(slice, index) in slices"
			:key="index"
			:thumbnails="slice"
			:container_num="index * 10"
			:container_title="'콘텐츠 모듈 ' + (index + 1)"
			:focus_type="type"
		>
		</MovingFocus>
	</div>
	<div v-if="type=='fixed'" class="contents_container">
		<FixedFocus
			v-for="(slice, index) in slices"
			:key="index"
			:thumbnails="slice"
			:container_num="index * 10"
			:container_title="'콘텐츠 모듈 ' + (index + 1)"
			:focus_type="type"
		>
		</FixedFocus>
	</div>	
</template>

<script>
import MovingFocus from "./MovingFocus.vue";
import FixedFocus from "./FixedFocus.vue";

export default {
	name: "ThumbnailContainer",
	props: {
		start: {type: Number, default: 1},
		type: {type: String, default: 'moving'}
	},
	components: {
		MovingFocus,
		FixedFocus
	},
	data() {
		return {
		thumbnails: [],
		slices: [],
		};
	},
	methods: {
		makeImgArray(startNum, array) {
		for (let i = 0; i < 100; i++) {
			const num = startNum + i;
			const src = require(`@/assets/img/thumbnail_${num}.jpeg`);
			array.push({ num, src });
		}
		},
		createSlices() {
		for (let i = 0; i < this.thumbnails.length; i += 10) {
			this.slices.push(this.thumbnails.slice(i, i + 10));
		}
		},
	},
	created() {
		this.makeImgArray(this.start, this.thumbnails);
		this.createSlices();
	},
};
</script>
