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
			:container_num="index * 10"
			:container_title="'콘텐츠 모듈 ' + (index + 1)"
			:focus_type="type"
			:thumbnail_quantity = thumbnail_quantity
			:updown_type="updown"
			:nav_active="nav_data_2"
			@nav-open="navOpen"
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
		updown: {type: String, default: 'A'}
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
			focus_data: 0,
			module_data: 0,
			nav_data:[],
			nav_text: ['마이메뉴', '검색', '홈', '나의 구독', '전체 메뉴 보기', '알림', '설정', '고객지원'],
			nav_data_1: { status: false , index: 2 },
			nav_data_2: { status: false , index: 2 },
			img_set: '',
			reset: false
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
