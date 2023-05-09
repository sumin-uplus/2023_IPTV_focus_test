<template>
	<div v-if="type=='MF'" class="contents_container">
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
	<div v-else-if="type=='FF'" class="contents_container">
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
import BaseURL from "../mixins/BaseURL";
import MakeLog from "../mixins/MakeLog";

export default {
	name: "ThumbnailContainer",
	props: {
		group: {type: String, default: 'imgset01'},
		type: {type: String, default: 'MF'}
	},
	components: {
		MovingFocus,
		FixedFocus
	},
	mixins: [
		BaseURL,
		MakeLog
	],
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
		makeImgArray(group, array) {
		for (let i = 1; i <= 200; i++) {
			// const num = 1 + i;
			const src = require(`@/assets/img/${group}/thumbnail_${i}.jpg`);
			array.push({ i, src });
		}
		},
		createSlices() {
		for (let i = 0; i < this.thumbnails.length; i += this.thumbnail_quantity) {
			this.slices.push(this.thumbnails.slice(i, i + this.thumbnail_quantity));
		}
		},
		setFocusAnimation(target, value) {
			target.style.transition = '0.2s all ease-in-out';
			target.style.transform = value;
		},
		setFocusDown() {
			const ref = this.$refs.focus;
				if (ref && this.active_section/10 != 9) {
					const translateY = `translateY(${(this.module_data.height + 40) * (this.active_section/10 == 8 ? 2 : 1)}px) scale(1.03)`;
					this.setFocusAnimation(ref, translateY);
				}
		},
		setFocusUp() {
			const ref = this.$refs.focus;
				if (ref && this.active_section/10 != 0) {
					const translateY = `translateY(${(this.module_data.height + 40) * (this.active_section/10 == 1 ? 0 : 1)}px) scale(1.03)`;
					this.setFocusAnimation(ref, translateY);
				}
		},
		ffCustomKeyEvent(e) {
			if (e.key === "ArrowDown") {
				this.setFocusDown();
			} else if (e.key === "ArrowUp") {
				this.setFocusUp();
			}
		},
		autoKeyEvent() {
			// const eventLeft = new KeyboardEvent('keydown', {keyCode: 37});
			// const eventUp = new KeyboardEvent('keydown', {keyCode: 38});
			const eventRight = new KeyboardEvent('keydown', {key: 'ArrowRight'});
			const eventDown = new KeyboardEvent('keydown', {key: 'ArrowDown'});
			const delay = 1500;
			// 7
			setTimeout(()=>{window.dispatchEvent(eventRight);},delay*2)
			setTimeout(()=>{window.dispatchEvent(eventRight);},delay*3)
			setTimeout(()=>{window.dispatchEvent(eventRight);},delay*4)
			setTimeout(()=>{window.dispatchEvent(eventRight);},delay*5)
			setTimeout(()=>{window.dispatchEvent(eventRight);},delay*6)
			setTimeout(()=>{window.dispatchEvent(eventRight);},delay*7)
			setTimeout(()=>{window.dispatchEvent(eventRight);},delay*8)
			// 5
			setTimeout(()=>{
				window.dispatchEvent(eventDown);
				this.ffCustomKeyEvent(eventDown);
			},delay*9)
			setTimeout(()=>{window.dispatchEvent(eventRight);},delay*10)
			setTimeout(()=>{window.dispatchEvent(eventRight);},delay*11)
			setTimeout(()=>{window.dispatchEvent(eventRight);},delay*12)
			setTimeout(()=>{window.dispatchEvent(eventRight);},delay*13)
			// 10
			setTimeout(()=>{
				window.dispatchEvent(eventDown);
				this.ffCustomKeyEvent(eventDown);
			},delay*14)
			setTimeout(()=>{window.dispatchEvent(eventRight);},delay*15)
			setTimeout(()=>{window.dispatchEvent(eventRight);},delay*16)
			setTimeout(()=>{window.dispatchEvent(eventRight);},delay*17)
			setTimeout(()=>{window.dispatchEvent(eventRight);},delay*18)
			setTimeout(()=>{window.dispatchEvent(eventRight);},delay*19)
			setTimeout(()=>{window.dispatchEvent(eventRight);},delay*20)
			setTimeout(()=>{window.dispatchEvent(eventRight);},delay*21)
			setTimeout(()=>{window.dispatchEvent(eventRight);},delay*22)
			setTimeout(()=>{window.dispatchEvent(eventRight);},delay*23)
			// 3
			setTimeout(()=>{
				window.dispatchEvent(eventDown);
				this.ffCustomKeyEvent(eventDown);
			},delay*24)
			setTimeout(()=>{window.dispatchEvent(eventRight);},delay*25)
			setTimeout(()=>{window.dispatchEvent(eventRight);},delay*26)
			//5
			setTimeout(()=>{
				window.dispatchEvent(eventDown);
				this.ffCustomKeyEvent(eventDown);
			},delay*27)
			setTimeout(()=>{window.dispatchEvent(eventRight);},delay*28)
			setTimeout(()=>{window.dispatchEvent(eventRight);},delay*29)
			setTimeout(()=>{window.dispatchEvent(eventRight);},delay*30)
			setTimeout(()=>{window.dispatchEvent(eventRight);},delay*31)
			
		},
		handleEvent(e) {
		if (e.key === 'Backspace') {
			if (this.$route.path !== this.baseURL) {
				this.$router.push(this.baseURL);
			}
		}
		// else if (e.key === 'Enter') {
		// 	this.autoKeyEvent();
		// }
		else {
			this.ffCustomKeyEvent(e);
		}
		}
	},
	created() {
		this.makeImgArray(this.group, this.thumbnails);
		this.createSlices();
	},
	mounted() {
		window.addEventListener("keydown", this.handleEvent);
		if(this.$refs.focus) {
			const { width, height, top, left } = this.focus_data;
			const { style } = this.$refs.focus || {};
			Object.assign(style, {
				transition: '0s',
				paddingLeft: '130px',
				marginLeft: '6px',
				width: `${width}px`,
				height: `${height}px`,
				top: `${top}px`,
				left: `${left}px`,
				transform: 'scale(1.03)'
			});
		}
	},
	unmounted() {
		window.removeEventListener("keydown", this.handleEvent);
	}
};
</script>
