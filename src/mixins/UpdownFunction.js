export default {
    methods: {
        downA() {
            //항상 1로 처리
            this.activeIndex = this.firstPositionIndex;
        },
        downB() {
            //처음 아래로 내리는 컨테이너는 1로 처리
            if(this.activeIndex / 10 == 0) {
                if (this.activeContainer) {
                    this.activeIndex = this.activeSection;
                }
            }
        },
        downC() {
            //최단거리 이동
            if(this.activeIndex / 10 == 0) {
                if (this.activeContainer) {
                    this.activeIndex = this.activeSection;
                }
            }
        }
    }
}