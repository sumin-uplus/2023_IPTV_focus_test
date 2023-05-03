<template>
	<div v-if="type=='moving'" class="contents_container">
		<MovingFocus
			v-for="(slice, index) in slices"
			:key="index"
			:thumbnails="slice"
			:container_num="index * 10"
			:container_title="'콘텐츠 모듈 ' + (index + 1)"
			:focus_type="type"
			:thumbnail_quantity = thumbnail_quantity
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
			:thumbnail_quantity = thumbnail_quantity
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
			thumbnail_quantity: 20,
			thumbnails: [],
			slices: [],
			focus_data: 0,
			module_data: 0,
			active_section: 0,
		};
	},
	methods: {
		makeImgArray(startNum, array) {
		for (let i = 0; i < 200; i++) {
			const num = startNum + i;
			const src = require(`@/assets/img/thumbnail_${num}.jpeg`);
			array.push({ num, src });
		}
		},
		createSlices() {
		for (let i = 0; i < this.thumbnails.length; i += this.thumbnail_quantity) {
			this.slices.push(this.thumbnails.slice(i, i + this.thumbnail_quantity));
		}
		},
		setFocusDown() {
			const ref = this.$refs.focus;
				if (ref && this.active_section/10 != 9) {
					const translateY = `translateY(${(this.module_data.height + 40) * (this.active_section/10 == 8 ? 2 : 1)}px) scale(1.03)`;
					ref.style.transform = translateY;
				}
		},
		setFocusUp() {
			const ref = this.$refs.focus;
				if (ref && this.active_section/10 != 0) {
					const translateY = `translateY(${(this.module_data.height + 40) * (this.active_section/10 == 1 ? 0 : 1)}px) scale(1.03)`;
					ref.style.transform = translateY;
				}
		},
		handleArrowKey(e) {
			if (e.key === "ArrowDown") {
				this.setFocusDown();
			} else if (e.key === "ArrowUp") {
				this.setFocusUp();
			}
		}
	},
	created() {
		this.makeImgArray(this.start, this.thumbnails);
		this.createSlices();
	},
	mounted() {
		window.addEventListener("keydown", this.handleArrowKey);
		if(this.$refs.focus) {
			const { width, height, top, left } = this.focus_data;
			const { style } = this.$refs.focus || {};
			Object.assign(style, { width: `${width}px`, height: `${height}px`, top: `${top}px`, left: `${left}px`, transform: 'scale(1.03)' });
		}
	}
};
</script>
