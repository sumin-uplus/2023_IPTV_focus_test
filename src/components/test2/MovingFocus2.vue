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
import FocusFunction from '../../mixins/FocusFunction';
import UpdownFunction from '../../mixins/UpdownFunction';
import eventBus from './EventBus';

export default {
	name: "MovingFocus2",
	props: {
		thumbnail_quantity: { type: Number, default : 20},
		thumbnails: { type: Object },
		container_num: { type: Number },
		container_title: { type: String, default: "콘텐츠 모듈1" },
		focus_type: {type: String, default: 'moving'},
		updown_type: {type: String, default: 'A'},
	},
	mixins:[FocusFunction, UpdownFunction],
	data() {
		return {
			activeIndex: 0,
			activeSection: 0,
			keyPressed: "",
			firstPositionIndex: 0,
			secondPositionIndex: 0,
			thirdPositionIndex: 0,
			lastPositionIndex: 0,
			movingPosition: 'first'
		};
	},
	computed: {
		positionIndex() {
			return (this.activeIndex - this.container_num)%this.thumbnail_quantity;
		},
		activeContainer() {
			return this.$refs[`img_container_${this.activeSection}`];
		},
	},
	methods: {
		customKeyEvent(e) {
			const positions = ['first_position', 'second_position', 'third_position', 'last_position'];
			positions.forEach(position => {
				if (this.$refs[position]) {
					this.getClosestPosition(this.$refs[position]);
				}
			});

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
					this.controlKey();
					this.setTransition();
				} else {
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
					this.controlKey();
					this.setTransition();
				}
				this.keyPressed = "left";
			} else if (e.key === "ArrowDown") {
				if(this.activeSection > 0 && this.activeSection < 80) {
					this.downMove();
				}
				// if(this.activeSection != 90) {
				// 	this.activeSection += 10;
				// }
				this.keyPressed = "down";
				if(this.updown_type == 'A') {
					this.downA();
				} else if(this.updown_type == 'B') {
					this.downB();
				} else if(this.updown_type == 'C') {
					this.downC();
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
		getClosestPosition(position) {
		const positionRect = position.getBoundingClientRect();
		const imgWrappers = this.$el.querySelectorAll('.img_wrapper');
		let minDistance = Number.MAX_VALUE;
		let positionRefs = [this.$refs.first_position, this.$refs.second_position, this.$refs.third_position, this.$refs.last_position];
		let positionIndexes = ['firstPositionIndex', 'secondPositionIndex', 'thirdPositionIndex', 'lastPositionIndex'];

		imgWrappers.forEach((thumbnail) => {
			const rect = thumbnail.getBoundingClientRect();
			const distance = Math.abs(positionRect.left - rect.left);

				if (rect.left >= 0 && distance < minDistance) {
					minDistance = distance;
					const index = parseInt(thumbnail.getAttribute("index"));

					positionRefs.forEach((ref, i) => {
						if (position === ref) {
						this[positionIndexes[i]] = index;
						}
					});
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
		removeTransition() {
			this.activeContainer.style.transition = 'none';
			//this.imgWrapper.forEach((e)=>{e.style.transition = 'none';});
		},
		setTransition() {
			if(this.activeContainer) {
				this.activeContainer.style.transition = '0.2s all ease-in-out';
			}
			this.imgWrapper.forEach((e)=>{e.style.transition = '0.2s all ease-in-out';});
		},
		controlKey() {
			if (this.activeContainer) {
				window.removeEventListener('keydown', this.customKeyEvent);
				setTimeout(() => {
					window.addEventListener('keydown', this.customKeyEvent);
				}, 200);
			}
		}
	},
	watch: {
		activeIndex(newIndex) {
			const positions = [
				{ index: this.firstPositionIndex, position: 'first' },
				{ index: this.secondPositionIndex, position: 'second' },
				{ index: this.thirdPositionIndex, position: 'third' },
				{ index: this.lastPositionIndex, position: 'last' }
			];
			const matchingPosition = positions.find(position => newIndex === position.index);
			if (matchingPosition) {
				eventBus.emit('position', matchingPosition.position);
			}
		}
	},
	mounted() {
		this.imgWrapper = this.$el.querySelectorAll(".img_wrapper");
		const positions = ['first_position', 'second_position', 'third_position', 'last_position'];
		positions.forEach(position => {
			if (this.$refs[position]) {
				this.getClosestPosition(this.$refs[position]);
			}
		});

		eventBus.on('position', (e)=>{
			this.movingPosition = e;
		});
	},
	unmounted() {
		eventBus.off('position');
	}

};
</script>
