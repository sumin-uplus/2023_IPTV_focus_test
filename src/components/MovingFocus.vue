<template>
	<div ref="module" :class="['contents_module']">
		<div>{{ container_title }}</div>
		<div :class="['postion_check_container']">
			<span ref="first_position"></span>
			<span ref="second_position"></span>
			<span ref="third_position"></span>
			<span ref="last_position">
				<div class="index_container" :class="{active: this.activeSection == container_num}">
					<div>{{ (this.activeIndex - container_num)%thumbnail_quantity + 1}}</div>
					<div class="whole_number">|</div>
					<div class="whole_number">{{thumbnail_quantity}}</div>
				</div>
			</span>
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
		thumbnail_quantity: { type: Number, default : 20},
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
		positionIndex() {
			// return this.activeIndex % 10;
			return (this.activeIndex - this.container_num)%this.thumbnail_quantity;
		},
		activeContainer() {
			return this.$refs[`img_container_${this.activeSection}`];
		},
	},
	methods: {
		customKeyEvent(e) {
			if(this.$refs.first_position && this.$refs.last_position) {
				this.getFirstPosition(this.$refs.first_position);
				this.getFirstPosition(this.$refs.last_position);				
			}
			let index = this.activeIndex - this.container_num;
			if (e.key === "ArrowRight") {
				if (index != this.thumbnail_quantity - 1
					&& this.activeIndex == this.lastPositionIndex) {
					this.rightMove();
				} 
				if (index != this.thumbnail_quantity - 1) {
					if (this.activeContainer) {
						this.activeIndex += 1;
					}
					this.setTransition();
				}
				else {
					if (this.activeContainer) {
						this.activeIndex = this.activeSection;
					}
					this.goFirst();
				}
				
				this.keyPressed = "right";

			} else if (e.key === "ArrowLeft") {
				if (index != 0
					&& this.activeIndex == this.firstPositionIndex) {
					this.leftMove();
				}
				if (index != 0) {
					if (this.activeContainer) {
						this.activeIndex -= 1;
					}
					this.setTransition();
				}
				// else {
				// 	if (this.activeContainer) {
				// 		this.activeIndex = this.activeSection + this.thumbnail_quantity - 1;
				// 	}
				// 	this.goLast();
				// }
				this.keyPressed = "left";
			} else if (e.key === "ArrowDown") {
				if(this.activeSection > 0 && this.activeSection < 80) {
					this.downMove();
				}
				if(this.activeSection != 90) {
					this.activeSection += 10;
				}
				this.keyPressed = "down";
				//처음 로드 후 아래로 내릴때 처리
				if(this.activeIndex / 10 == 0) {
					if (this.activeContainer) {
						this.activeIndex = this.activeSection;
					}
				}
				this.setTransition();

			} else if (e.key === "ArrowUp") {
				if(this.activeSection > 10 && this.activeSection < 90) {
					this.upMove();
				}
				if(this.activeSection != 0) {
					this.activeSection -= 10;
				}
				this.keyPressed = "up";
				this.setTransition();
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
				window.removeEventListener('keydown', this.customKeyEvent);
				this.activeContainer.style.transform = `translateX(-${(this.wrapperWidth + this.gap) * (this.positionIndex - 2)
					}px`;
				setTimeout(() => {
					window.addEventListener('keydown', this.customKeyEvent);
				}, 200);
			}
		},
		leftMove() {
			if (this.activeContainer) {
				window.removeEventListener('keydown', this.customKeyEvent);
				this.activeContainer.style.transform = `translateX(-${(this.wrapperWidth + this.gap) * (this.positionIndex - 1)
					}px`;
				setTimeout(() => {
					window.addEventListener('keydown', this.customKeyEvent);
				}, 200);
			}
		},
		goFirst() {
			if (this.activeContainer) {
				this.activeContainer.style.transform = `translateX(0px)`;
				this.removeTransition();
			}
		},
		goLast() {
			if (this.activeContainer) {
				this.activeContainer.style.transform = `translateX(-${(this.wrapperWidth + this.gap) * (this.thumbnail_quantity - 4)
					}px`;
				this.removeTransition();
			}
		},
		removeTransition(){
			this.activeContainer.style.transition = 'none';
			//this.imgWrapper.forEach((e)=>{e.style.transition = 'none';});
		},
		setTransition() {
			if(this.activeContainer) {
				this.activeContainer.style.transition = '0.2s all ease-in-out';
			}
			this.imgWrapper.forEach((e)=>{e.style.transition = '0.2s all ease-in-out';});
		}	
	},
	mounted() {
		this.imgWrapper = this.$el.querySelectorAll(".img_wrapper");
	}

};
</script>
