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
		<span ref="focus" class="focus_container_body"></span>
		<FixedFocus
			v-for="(slice, index) in slices"
			:key="index"
			:thumbnails="slice"
			:container_num="index * 10"
			:container_title="'콘텐츠 모듈 ' + (index + 1)"
			:focus_type="type"
			@set-focus = "focus_data = $event"
			@set-section = "active_section = $event"
			@set-module = "module_data = $event"
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
			focus_data: 0,
			module_data: 0,
			active_section: 0
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
		setFocusPosition() {
			if(this.$refs.focus) {
				let ref = this.$refs.focus;
				let translateY = `translateY(${(this.module.getBoundingClientRect().height + 40) * (this.activeSection/10)}px) scale(1.03)`
				ref.style.transform = translateY;
			}
		},
	},
	created() {
		this.makeImgArray(this.start, this.thumbnails);
		this.createSlices();
	},
	mounted() {
		if(this.$refs.focus) {
			// this.$refs.focus.style.width = `${this.focus_data.width}px`;
			// this.$refs.focus.style.height = `${this.focus_data.height}px`;
			// this.$refs.focus.style.top = `${this.focus_data.top}px`;
			// this.$refs.focus.style.left = `${this.focus_data.left}px`;
			// this.$refs.focus.style.transform = 'scale(1.03)';
			const { width, height, top, left } = this.focus_data;
			const { style } = this.$refs.focus || {};
			Object.assign(style, { width: `${width}px`, height: `${height}px`, top: `${top}px`, left: `${left}px`, transform: 'scale(1.03)' });
		}
		
	}
};
</script>
