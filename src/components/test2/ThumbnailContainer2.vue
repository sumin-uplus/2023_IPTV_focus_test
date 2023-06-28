<template>
	<div :class="['nav_container', {'active': nav_data_1.status}]">
		<LeftNavItem
			v-for="(icon, i) in nav_data"
			:key="i"
			:index="i"
			:src="icon.src"
			:text="icon.text"
			:type="i == 0 ? 'profile':'icon'" 
			:valid="nav_data_1"
			:group="group"
			:reset="reset"
			@nav-open="navOpen"
			@update:group="imgSet"
		>
		</LeftNavItem>
	</div>
	<div class="contents_container">
		<MovingFocus
			v-for="(slice, index) in slices"
			:key="index"
			:thumbnails="slice"
			:thumbnail_quantity = thumbnail_quantity
			:container_num="index * 10"
			:container_title="'콘텐츠 모듈 ' + (index + 1)"
			:focus_type="type"
			:updown_type="updown"
			:task_type="task"
			:nav_active="nav_data_2"
			@nav-open="navOpen"
			@update:index="updateIndex"
		>
		</MovingFocus>
	</div>
</template>

<script>
import MovingFocus from "./MovingFocus2.vue";
import BaseURL from "../../mixins/BaseURL";
import MakeLog from "../../mixins/MakeLog2";
import LeftNavItem from "./LeftNavItem.vue";

export default {
	name: "ThumbnailContainer2",
	props: {
		group: {type: String, default: 'imgset01'},
		type: {type: String, default: 'MF'},
		updown: {type: String, default: 'A'},
		task: {type: String, default: 'task1'}
	},
	components: {
		MovingFocus,
		LeftNavItem
	},
	mixins: [
		BaseURL,
		MakeLog,
	],
	data() {
		return {
			thumbnail_quantity: 20,
			thumbnails: [],
			slices: [],
			nav_data:[],
			// nav_text: ['마이메뉴', '검색', '홈', '나의 구독', '전체 메뉴 보기', '알림', '설정', '고객지원'],
			nav_text: ['프로필', '메뉴', '홈1', '메뉴', '홈2', '메뉴', '설정', '고객지원'],
			nav_data_1: { status: false , index: 2 },
			nav_data_2: { status: false , index: 2 },
			img_set: '',
			reset: false,
			active_index: 0,
			active_section: 0,
		};
	},
	methods: {
		makeImgArray(group, array) {
			for (let i = 1; i <= 200; i++) {
				const src = require(`@/assets/img/${group}/thumbnail_${i}.jpg`);
				array.push({ i, src });
			}
		},
		createSlices() {
			for (let i = 0; i < this.thumbnails.length; i += this.thumbnail_quantity) {
				this.slices.push(this.thumbnails.slice(i, i + this.thumbnail_quantity));
			}
		},
		handleEvent(e) {
			if (e.key === 'Backspace') {
				if (this.$route.path !== this.baseURL) {
					this.$router.push(this.baseURL);
				}
			}
			else if (e.key === 'Enter') {
				this.navOpen(false);
				this.nav_data_1.index = 2;
				this.$nextTick(() => {
					this.reset = !this.reset;
				});
			}
		},
		makeIconArray() {
			for (let i = 0; i < this.nav_text.length; i++) {
				let type = '';
				this.nav_data.push({ type: type, text: this.nav_text[i], src: i });
			}
		},
		navOpen(e) {
			this.nav_data_1.status = e;
			this.nav_data_2.status = e;
		},
		imgSet(e) {
			this.img_set = e[0];
			this.nav_data_2.index = e[1];
		},
		updateIndex(index, section) {
			this.active_index = index;
			this.active_section = section;
		},
		//자동 키 입력 기능
		// setFocusDown() {
		// 	const ref = this.$refs.focus;
		// 		if (ref && this.active_section/10 != 9) {
		// 			const translateY = `translateY(${(this.module_data.height + 40) * (this.active_section/10 == 8 ? 2 : 1)}px) scale(1.03)`;
		// 			this.setFocusAnimation(ref, translateY);
		// 		}
		// },
		// setFocusUp() {
		// 	const ref = this.$refs.focus;
		// 		if (ref && this.active_section/10 != 0) {
		// 			const translateY = `translateY(${(this.module_data.height + 40) * (this.active_section/10 == 1 ? 0 : 1)}px) scale(1.03)`;
		// 			this.setFocusAnimation(ref, translateY);
		// 		}
		// },
		// ffCustomKeyEvent(e) {
		// 	if (e.key === "ArrowDown") {
		// 		this.setFocusDown();
		// 	} else if (e.key === "ArrowUp") {
		// 		this.setFocusUp();
		// 	}
		// },
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
				//this.ffCustomKeyEvent(eventDown);
			},delay*9)
			setTimeout(()=>{window.dispatchEvent(eventRight);},delay*10)
			setTimeout(()=>{window.dispatchEvent(eventRight);},delay*11)
			setTimeout(()=>{window.dispatchEvent(eventRight);},delay*12)
			setTimeout(()=>{window.dispatchEvent(eventRight);},delay*13)
			// 10
			setTimeout(()=>{
				window.dispatchEvent(eventDown);
				//this.ffCustomKeyEvent(eventDown);
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
				//this.ffCustomKeyEvent(eventDown);
			},delay*24)
			setTimeout(()=>{window.dispatchEvent(eventRight);},delay*25)
			setTimeout(()=>{window.dispatchEvent(eventRight);},delay*26)
			//5
			setTimeout(()=>{
				window.dispatchEvent(eventDown);
				//this.ffCustomKeyEvent(eventDown);
			},delay*27)
			setTimeout(()=>{window.dispatchEvent(eventRight);},delay*28)
			setTimeout(()=>{window.dispatchEvent(eventRight);},delay*29)
			setTimeout(()=>{window.dispatchEvent(eventRight);},delay*30)
			setTimeout(()=>{window.dispatchEvent(eventRight);},delay*31)
			
		},
	},
	watch: {
		img_set(value) {
			this.thumbnails = [];
			this.slices = [];
			this.makeImgArray(value, this.thumbnails);
			this.createSlices();
		},
	},
	created() {
		this.makeImgArray(this.group, this.thumbnails);
		this.createSlices();
		this.makeIconArray();
	},
	mounted() {
		window.addEventListener("keydown", this.handleEvent);
	},
	unmounted() {
		window.removeEventListener("keydown", this.handleEvent);
	}
};
</script>
