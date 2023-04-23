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
import FocusFunction from '../mixins/FocusFunction';
export default {
	name: "MovingFocus",
	props: {
		thumbnails: { type: Object },
		container_num: { type: Number },
		container_title: { type: String, default: "콘텐츠 모듈1" },
		focus_type: {type: String, default: 'moving'}
	},
	mixins:[FocusFunction],
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
	},

};
</script>
