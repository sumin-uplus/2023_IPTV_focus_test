<template>
	<div class="contents_module">
		<div>{{ container_title }}</div>
		<div class="postion_check_container">
			<span ref="first_position"></span>
			<span ref="last_position"></span>
		</div>
		<div class="img_container" :section="container_num">
			<div
				class="img_wrapper"
				v-for="(thumbnail, index) in thumbnails"
				:index="index + container_num"
				:key="index + container_num"
				:ref="'thumbnail-' + index"
				:class="{ active: this.activeIndex === index + container_num }"
			>
				<img class="img" :src="thumbnail.src" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "ThumbnailImage",
	props: {
		thumbnails: { type: Object },
		container_num: { type: Number },
		container_title: { type: String, default: "콘텐츠 모듈1" },
	},
	data() {
		return {
		activeIndex: 0,
		keyPressed: "",
		firstPositionIndex: [],
		lastPositionIndex: [],
		};
	},
	methods: {
		handleArrowKey(e) {
			this.getFirstPosition(this.$refs.first_position);
			this.getFirstPosition(this.$refs.last_position);

		if (e.key === "ArrowRight") {
			if(this.activeIndex % 10 != 0 && this.activeIndex == this.lastPositionIndex) {
				this.rightMove();
			}
			this.activeIndex += 1;
			this.keyPressed = "right";
		} else if (e.key === "ArrowLeft") {
			this.activeIndex -= 1;
			this.keyPressed = "left";
		} else if (e.key === "ArrowDown") {
			this.activeIndex += 10;
			this.keyPressed = "down";
		} else if (e.key === "ArrowUp") {
			this.activeIndex -= 10;
			this.keyPressed = "up";
		}
		},
		getFirstPosition(position) {
		const positionRect = position.getBoundingClientRect();
		const imgWrappers = position.nextElementSibling.querySelectorAll('.img_wrapper');
		let minDistance = Number.MAX_VALUE;

		imgWrappers.forEach((thumbnail) => {
			const rect = thumbnail.getBoundingClientRect();
			const distance = Math.abs(positionRect.left - rect.left);

			if (rect.left >= 0 && distance < minDistance) {
			minDistance = distance;
			const index = parseInt(thumbnail.getAttribute("index"));

			if (position === this.$refs.first_position) {
				this.firstPositionIndex = index;
			} else if (position === this.$refs.last_position) {
				this.lastPositionIndex = index;
			}
			}
		});
		},
		rightMove() {
			let containerNum = this.activeIndex % 10;
			const imgContainers = this.$el.querySelectorAll(".img_container");
			console.log('exectued', this.activeIndex, containerNum);
			imgContainers.forEach((container) => {
				if (container.getAttribute("section") == Math.floor(this.activeIndex / 10)) {
						// container.style.transform = `translateX(-${
						// (this.wrapperWidth + this.gap) * (containerNum - 3)
						// }px`;
						container.style.transform = `translateX(-${
							(this.wrapperWidth + this.gap) * (containerNum - 2)
						}px`;
					}
				});
			}
	},
	// watch: {
	// 	activeIndex() {
	// 		if (this.keyPressed === "right") {
	// 			this.rightMove();
	// 		}
	// 	},
	// },

	mounted() {
		window.addEventListener("keydown", this.handleArrowKey);
		this.imgContainer = this.$el.querySelector(".img_container");
		this.imgWrapper = this.$el.querySelector(".img_wrapper:not(.active)");
		this.gap = parseInt(getComputedStyle(this.imgContainer).gap);
		this.wrapperWidth = this.imgWrapper.offsetWidth;
		this.wrapperHeight = this.imgWrapper.offsetHeight;
		this.position = this.$el.querySelector(".postion_check_container");

		this.imgContainer.style.height = `${this.wrapperHeight}px`;
		this.position.style.width = `${this.wrapperWidth * 4 + this.gap * 3}px`;
		this.$refs.first_position.style.width = `${this.wrapperWidth}px`;
		this.$refs.last_position.style.width = `${this.wrapperWidth}px`;
	},

	beforeUnmount() {
		window.removeEventListener("keydown", this.handleArrowKey);
	},
};
</script>

<style>
.contents_module {
	display: flex;
	flex-direction: column;
	gap: 16px;
	font-weight: 500;
	font-size: 32px;
	line-height: 44px;
	color: #eeeeee;
	margin-left: 136px;
}

.contents_module:nth-of-type(1) {
	margin-top: 50px;
}

.img_container {
	display: grid;
	grid-auto-flow: column;
	gap: 32px;
	transition: 0.3s all ease-in-out;
}

.img_wrapper {
	position: relative;
	width: calc((100vw - (136px * 2) - (32px * 3)) / 4);
	height: 0;
	padding-top: 56.2%;
	border: 1px solid rgba(238, 238, 238, 0.2);
	border-radius: 12px;
	overflow: hidden;
	transition: 0.3s all ease-in-out;
}

.img_wrapper.active {
	transform: scale(1.1);
	border: 4px solid #eeeeee;
	box-shadow: 0px 0px 60px 4px rgba(238, 238, 238, 0.66);
	border-radius: 12px;
	transition: 0.3s all ease-in-out;
}

.img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	position: absolute;
	top: 0;
	left: 0;
}

.postion_check_container {
	position: absolute;
	width: 100%;
	display: flex;
	justify-content: space-between;
}
</style>
