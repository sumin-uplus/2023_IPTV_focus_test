<template>
	<div ref="module" :class="['contents_module']">
		<div>{{ container_title }}</div>
		<div :class="['postion_check_container']">
			<span ref="first_position"></span>
			<span ref="last_position"></span>
		</div>
		<div :ref="'img_container_' + container_num" :class="['img_container']" :section="container_num">
			<div class="img_wrapper" v-for="(thumbnail, index) in thumbnails" :index="index + container_num"
				:key="index + container_num" :ref="'thumbnail-' + index"
				:class="{ active: this.activeIndex === index + container_num && this.activeSection === container_num }">
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
			activeSection: 0,
			keyPressed: "",
			firstPositionIndex: 0,
			lastPositionIndex: 0
		};
	},
	computed: {
		// computedClass() {
		// 	return [{ active: this.isActiveContainer }]
		// },
		// computedFirst() {
		// 	return [{ first: this.activeIndex == this.firstPositionIndex && this.activeSection === this.container_num }]
		// },
		isActiveContainer() {
			return this.container_num == this.activeIndex - (this.activeIndex % 10)
		},
		positionIndex() {
			return this.activeIndex % 10;
		},
		activeContainer() {
			return this.$refs[`img_container_${this.activeSection}`];
		},
	},
	methods: {
		handleArrowKey(e) {
			this.getFirstPosition(this.$refs.first_position);
			this.getFirstPosition(this.$refs.last_position);
			if (e.key === "ArrowRight") {
				if (
					this.activeIndex % 10 != 0
					&& this.activeIndex % 10 != 9
					&& this.activeIndex == this.lastPositionIndex) {
					this.rightMove();
				}
				if (this.activeIndex % 10 != 9) {
					this.activeIndex += 1;
				}
				this.keyPressed = "right";

			} else if (e.key === "ArrowLeft") {
				if (
					this.activeIndex % 10 != 0
					&& this.activeIndex == this.firstPositionIndex) {
					this.leftMove();
				}
				if (this.activeIndex % 10 != 0) {
					this.activeIndex -= 1;
				}
				this.keyPressed = "left";
			} else if (e.key === "ArrowDown") {
				// if(this.activeSection == 20 || this.activeSection == 50 || this.activeSection == 80) {
				// 	this.updownSection();
				// } 
				this.activeSection += 10;
				this.keyPressed = "down";
				this.updownMove();

			} else if (e.key === "ArrowUp") {
				this.activeSection -= 10;
				this.keyPressed = "up";
				this.updownMove();
			}
		},

		getFirstPosition(position) {
			const positionRect = position.getBoundingClientRect();
			const imgWrappers = this.$el.querySelectorAll('.img_wrapper');
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
			if (this.activeContainer) {
				this.activeContainer.style.transform = `translateX(-${(this.wrapperWidth + this.gap) * (this.positionIndex - 2)
					}px`;
			}
		},
		leftMove() {
			if (this.activeContainer) {
				//let currentPosition = this.activeContainer.getBoundingClientRect().left;
				this.activeContainer.style.transform = `translateX(-${(this.wrapperWidth + this.gap) * (this.positionIndex - 1)
					}px`;
			}
		},
		updownMove() {
			if (this.activeContainer) {
				this.getFirstPosition(this.$refs.first_position);
				this.activeIndex = this.firstPositionIndex;
			}
		},
		// updownSection() {
		// 	this.module.style.transform = `translateY(-${this.wrapperHeight*(this.activeSection/10+2)+(40*2)
		// 			}px`;
		// }
	},

	mounted() {
		window.addEventListener("keydown", this.handleArrowKey);
		this.imgContainer = this.$el.querySelector(".img_container");
		this.imgWrapper = this.$el.querySelector(".img_wrapper:not(.active)");
		this.gap = parseInt(getComputedStyle(this.imgContainer).gap);
		this.wrapperWidth = this.imgWrapper.offsetWidth;
		this.wrapperHeight = this.imgWrapper.offsetHeight;
		this.position = this.$el.querySelector(".postion_check_container");
		this.module = this.$refs.module;

		this.imgContainer.style.height = `${this.wrapperHeight}px`;
		this.position.style.width = `${this.wrapperWidth * 4 + this.gap * 3}px`;
		this.$refs.first_position.style.width = `${this.wrapperWidth}px`;
		this.$refs.last_position.style.width = `${this.wrapperWidth}px`;

		this.imgContainers = this.$el.querySelectorAll(".img_container");
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
	/*overflow-x: clip;*/
	transition-delay: 400ms;
	transition: 0.3s all ease-in-out;
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
	position: relative;
	transform: scale(1.1);
	visibility: visible;
	border: 4px solid #eeeeee;
	border-radius: 12px;
	transition: 0.3s all ease-in-out;
	box-shadow: 0px 0px 60px 4px rgba(238, 238, 238, 0.66);
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
