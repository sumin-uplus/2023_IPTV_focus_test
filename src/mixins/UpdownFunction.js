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
            if (this.activeContainer) {
                this.activeIndex = this.firstPositionIndex;
            }
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
        nextSection() {
            this.activeSection += 10;
        },
        prevSection() {
            this.activeSection -= 10;
        },
        updownIndex(direction, section) {
            const activateAction = direction === 'down' ? this.activeSection != 90 : this.activeSection != 0;
            const updownAction = direction === 'down' ? this.nextSection : this.prevSection;
            const focusAction = this[`focus${section}`];
            if(activateAction) {
                updownAction();
                focusAction();
            }
        },
    }
}