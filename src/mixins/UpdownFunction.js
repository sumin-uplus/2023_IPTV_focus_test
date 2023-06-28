export default {
    methods: {
        focusA() {
            //처음 아래로 내리는 컨테이너는 1로 처리
            if(this.activeIndex / 10 == 0) {
                if (this.activeContainer) {
                    this.activeIndex = this.activeSection;
                }
            }
        },
        focusB() {
            //항상 1로 처리
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
        downA() {
            this.nextSection();
            this.focusA();
        },
        downB() {
            this.nextSection();
            this.focusB();
        },
        downC() {
            this.nextSection();
            this.focusC();
        },
        upA() {
            this.prevSection();
            this.focusA();
        },
        upB() {
            this.prevSection();
            this.focusB();
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