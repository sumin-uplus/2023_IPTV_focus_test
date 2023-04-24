export default {
	methods:{
		updownMove() {
			if (this.activeContainer) {
				this.getFirstPosition(this.$refs.first_position);
				this.activeIndex = this.firstPositionIndex;
			}
		},
		downMove() {
			this.module.style.transform = `translateY(-${(this.module.offsetHeight + 40) * (this.activeSection/10)
					}px`;
		},	
		upMove() {
			this.module.style.transform = `translateY(-${(this.module.offsetHeight + 40) * ((this.activeSection/10) -2)
					}px`;
		},	
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
}