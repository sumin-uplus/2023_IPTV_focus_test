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
			nav_text: ['프로필', '메뉴', '홈1', '메뉴', '홈2', '메뉴', '설정', '고객지원'],
			nav_data_1: { status: false , index: 2 },
			nav_data_2: { status: false , index: 2 },
			img_set: '',
			reset: false,
			active_index: 0,
			active_section: 0,
			active_position: 0,
			active_moving: 'first'
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
			} else if (e.key === '1' && this.task === 'task3') {
				this.autoKeyEvent();
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
		updateIndex(index, section, position, moving) {
			this.active_index = index;
			this.active_section = section;
			this.active_position = position;
			this.active_moving = moving;
		},
		//자동 키 입력 기능
		makeKeyEvent(start, count, key) {
			const delay = 400;
			for (let i = start; i <= count; i++) {
				setTimeout(() => {
					window.dispatchEvent(key);
				}, delay * i);
			}
		},
		autoKeyEvent() {
			const eventUp = new KeyboardEvent('keydown', {key: 'ArrowUp'});
			const eventRight = new KeyboardEvent('keydown', {key: 'ArrowRight'});
			const eventDown = new KeyboardEvent('keydown', {key: 'ArrowDown'});
			if(this.updown === 'A') {
				this.makeKeyEvent(1, 9, eventRight);
				this.makeKeyEvent(10, 10, eventDown);
				this.makeKeyEvent(11, 19, eventRight);
				this.makeKeyEvent(20, 20, eventDown);
				this.makeKeyEvent(21, 29, eventRight);
				this.makeKeyEvent(30, 30, eventUp);
			} else if (this.updown === 'B') {
				this.makeKeyEvent(1, 9, eventRight);
				this.makeKeyEvent(10, 10, eventDown);
				this.makeKeyEvent(11, 19, eventRight);
				this.makeKeyEvent(20, 20, eventDown);
				this.makeKeyEvent(21, 29, eventRight);
				this.makeKeyEvent(30, 30, eventUp);
				this.makeKeyEvent(31, 33, eventRight);
			} else if (this.updown === 'C') {
				this.makeKeyEvent(1, 9, eventRight);
				this.makeKeyEvent(10, 10, eventDown);
				this.makeKeyEvent(11, 16, eventRight);
				this.makeKeyEvent(17, 17, eventDown);
				this.makeKeyEvent(18, 23, eventRight);
				this.makeKeyEvent(24, 24, eventUp);
			}
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
