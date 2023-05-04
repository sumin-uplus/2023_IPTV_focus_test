<template>
	<div ref="module" :class="['contents_module', 'fixed_focus']">
		<div>{{ container_title }}</div>
		<div :class="['postion_check_container']">
			<span ref="first_position"></span>
			<span ref="last_position">
				<div class="index_container" :class="{active: this.activeSection == container_num}">
					<div>{{ (this.activeIndex - container_num)%thumbnail_quantity + 1}}</div>
					<div class="whole_number">|</div>
					<div class="whole_number">{{thumbnail_quantity}}</div>
				</div>
			</span>
		</div>
		<div :ref="'focus_' + container_num" class="focus_container" :section="container_num"></div>
		<div :ref="'img_container_' + container_num" :class="['img_container']" :section="container_num">
			<div class="img_wrapper" v-for="(thumbnail, index) in thumbnails"
				:index="index + container_num"
				:key="index + container_num"
				ref="thumbnail"
				>
				<img class="img" :src="thumbnail.src" />
			</div>
		</div>
	</div>
</template>

<script>
import FocusFunction from '../mixins/FocusFunction';
export default {
	name: "FixedFocus",
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
			return this.activeIndex - this.container_num;
		},
		activeContainer() {
			return this.$refs[`img_container_${this.activeSection}`];
		},
	},
	methods: {
		handleArrowKey(e) {
			this.getFirstPosition(this.$refs.first_position);
			this.getFirstPosition(this.$refs.last_position);
			this.$emit('set-section', this.activeSection);
			let index = (this.activeIndex - this.container_num)%this.thumbnail_quantity;	
			if (e.key === "ArrowRight") {
				this.rightMove();
				this.activeIndex += 1;
				this.keyPressed = "right";

			} else if (e.key === "ArrowLeft") {
				if(index != 0) {
					this.activeIndex -= 1;
					this.leftMove();
				}
				this.keyPressed = "left";
			} else if (e.key === "ArrowDown") {
				if(this.activeSection > 0 && this.activeSection < 80) {
					this.downMove();
				}
				if(this.activeSection != 90) {
					this.activeSection += 10;
				}
				this.keyPressed = "down";
				this.updownMove();
				this.setFocusPosition();

			} else if (e.key === "ArrowUp") {
				if(this.activeSection > 10 && this.activeSection < 90) {
					this.upMove();
				}
				if(this.activeSection != 0) {
					this.activeSection -= 10;
				}
				this.keyPressed = "up";
				this.updownMove();
				this.setFocusPosition()
			}
			this.setActiveClass();
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
				this.activeContainer.style.transform = `translateX(-${(this.wrapperWidth + this.gap) * (this.positionIndex + 1)
					}px`;
				if(this.activeIndex % 10 == 2) {
					const imgWrappers = this.activeContainer.querySelectorAll('.img_wrapper');
					const lastWrapperIndex = parseInt(imgWrappers[imgWrappers.length - 1].getAttribute('index'));
					console.log(lastWrapperIndex);
					imgWrappers.forEach((wrapper, i) => {
						wrapper.classList.remove('active');
						const clonedWrapper = wrapper.cloneNode(true);
						clonedWrapper.setAttribute('index', lastWrapperIndex + i + 1);
						if(this.activeContainer) {
							this.activeContainer.appendChild(clonedWrapper);
						}
				});
				}
			}
		},
		leftMove() {
			if (this.activeContainer) {
				this.activeContainer.style.transform = `translateX(-${(this.wrapperWidth + this.gap) * (this.positionIndex)
					}px`;
			}
		},
		setActiveClass() {
			const imgSections = this.$el.querySelectorAll('.img_container');
			imgSections.forEach((e)=>{
				const imgWrappers = e.querySelectorAll('.img_wrapper');
				if(e.getAttribute('section') == this.activeSection) {
					imgWrappers.forEach((x)=>{
						if(x.getAttribute('index') == this.activeIndex) {
							x.classList.add('active');
						} else {
							x.classList.remove('active');
						}
					})
				} else {
					imgWrappers.forEach((x)=> {
						x.classList.remove('active');
					})
				}
			})
		},
		setFocusPosition() {
			if(this.$refs["focus_0"]) {
				let ref = this.$refs["focus_0"];
				let translateY = `translateY(${(this.module.getBoundingClientRect().height + 40) * (this.activeSection/10)}px) scale(1.03)`
				ref.style.transform = translateY;
			}
		},
	},
	mounted() {
		this.setActiveClass();
		if(this.$refs["focus_0"]) {
			let ref = this.$refs["focus_0"];
			ref.style.width = `${this.imgWrapper.getBoundingClientRect().width}px`;
			ref.style.height = `${this.imgWrapper.getBoundingClientRect().height}px`;
			this.$emit('set-focus', {
				width: ref.getBoundingClientRect().width,
				height: ref.getBoundingClientRect().height,
				top: ref.getBoundingClientRect().top,
				left: ref.getBoundingClientRect().left
			});
		}

		if(this.$refs.module) {
			let module = this.$refs.module;
			this.$emit('set-module', {
				width: module.getBoundingClientRect().width,
				height: module.getBoundingClientRect().height,
				top: module.getBoundingClientRect().top,
				left: module.getBoundingClientRect().left
			});
		}
	}
};
</script>
