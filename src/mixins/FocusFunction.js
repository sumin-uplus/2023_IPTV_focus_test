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
		autoKeyEvent() {
			// const eventLeft = new KeyboardEvent('keydown', {keyCode: 37});
			// const eventUp = new KeyboardEvent('keydown', {keyCode: 38});
			const eventRight = new KeyboardEvent('keydown', {key: 'ArrowRight'});
			const eventDown = new KeyboardEvent('keydown', {key: 'ArrowDown'});
			const delay = 1500;
			// 7
			setTimeout(()=>{this.customKeyEvent(eventRight);},delay*0)
			setTimeout(()=>{this.customKeyEvent(eventRight);},delay*1)
			setTimeout(()=>{this.customKeyEvent(eventRight);},delay*2)
			setTimeout(()=>{this.customKeyEvent(eventRight);},delay*3)
			setTimeout(()=>{this.customKeyEvent(eventRight);},delay*4)
			setTimeout(()=>{this.customKeyEvent(eventRight);},delay*5)
			setTimeout(()=>{this.customKeyEvent(eventRight);},delay*6)
			// 5
			setTimeout(()=>{this.customKeyEvent(eventDown);},delay*7)
			setTimeout(()=>{this.customKeyEvent(eventRight);},delay*8)
			setTimeout(()=>{this.customKeyEvent(eventRight);},delay*9)
			setTimeout(()=>{this.customKeyEvent(eventRight);},delay*10)
			setTimeout(()=>{this.customKeyEvent(eventRight);},delay*11)
			// 10
			setTimeout(()=>{this.customKeyEvent(eventDown);},delay*12)
			setTimeout(()=>{this.customKeyEvent(eventRight);},delay*13)
			setTimeout(()=>{this.customKeyEvent(eventRight);},delay*14)
			setTimeout(()=>{this.customKeyEvent(eventRight);},delay*15)
			setTimeout(()=>{this.customKeyEvent(eventRight);},delay*16)
			setTimeout(()=>{this.customKeyEvent(eventRight);},delay*17)
			setTimeout(()=>{this.customKeyEvent(eventRight);},delay*18)
			setTimeout(()=>{this.customKeyEvent(eventRight);},delay*19)
			setTimeout(()=>{this.customKeyEvent(eventRight);},delay*20)
			setTimeout(()=>{this.customKeyEvent(eventRight);},delay*21)
			// 3
			setTimeout(()=>{this.customKeyEvent(eventDown);},delay*22)
			setTimeout(()=>{this.customKeyEvent(eventRight);},delay*23)
			setTimeout(()=>{this.customKeyEvent(eventRight);},delay*24)
			//5
			setTimeout(()=>{this.customKeyEvent(eventDown);},delay*25)
			setTimeout(()=>{this.customKeyEvent(eventRight);},delay*26)
			setTimeout(()=>{this.customKeyEvent(eventRight);},delay*27)
			setTimeout(()=>{this.customKeyEvent(eventRight);},delay*28)
			setTimeout(()=>{this.customKeyEvent(eventRight);},delay*29)
			
		},
		handleEvent(e) {
			if(e.key === "Enter") {
				this.autoKeyEvent();
			} else {
				this.customKeyEvent(e);
			}
		}
	},
	mounted() {
		window.addEventListener("keydown", this.customKeyEvent);
		this.imgContainer = this.$el.querySelector(".img_container");
		this.imgWrapper = this.$el.querySelector(".img_wrapper:not(.active)");
		this.gap = parseInt(getComputedStyle(this.imgContainer).gap);
		this.wrapperWidth = this.imgWrapper.getBoundingClientRect().width;
		this.wrapperHeight = this.imgWrapper.getBoundingClientRect().height;
		this.position = this.$el.querySelector(".postion_check_container");
		this.module = this.$refs.module;

		this.imgContainer.style.height = `${this.wrapperHeight}px`;
		this.position.style.width = `${this.wrapperWidth * 4 + this.gap * 3}px`;
		this.$refs.first_position.style.width = `${this.wrapperWidth}px`;
		this.$refs.last_position.style.width = `${this.wrapperWidth}px`;

		this.imgContainers = this.$el.querySelectorAll(".img_container");
	},
}