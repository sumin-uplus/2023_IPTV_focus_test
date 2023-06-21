export default {
    methods: {
        downA() {
            //처음 아래로 내리는 컨테이너는 1로 처리
            this.nextSection();
            if(this.activeIndex / 10 == 0) {
                if (this.activeContainer) {
                    this.activeIndex = this.activeSection;
                }
            }
        },
        downB() {
            //항상 1로 처리
            this.nextSection();
            this.activeIndex = this.firstPositionIndex;
        },
        focusC(){
            //최단거리 이동
            const positionMap = {
                first: this.firstPositionIndex,
                second: this.secondPositionIndex,
                third: this.thirdPositionIndex,
                last: this.lastPositionIndex
            };
            this.activeIndex = positionMap[this.movingPosition];
        },
        downC() {
            this.nextSection();
            this.focusC();
        },
        upC() {
            this.prevSection();
            this.focusC();
        },
        nextSection() {
            if(this.activeSection != 90) {
                this.activeSection += 10;
            }
        },
        prevSection() {
            if(this.activeSection != 0) {
                this.activeSection -= 10;
            }
        }
    }
}