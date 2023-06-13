import eventBus from '../components/test2/EventBus';
export default {
    methods: {
        downA() {
            //항상 1로 처리
            this.nextSection();
            this.activeIndex = this.firstPositionIndex;
        },
        downB() {
            //처음 아래로 내리는 컨테이너는 1로 처리
            this.nextSection();
            if(this.activeIndex / 10 == 0) {
                if (this.activeContainer) {
                    this.activeIndex = this.activeSection;
                }
            }
        },
        downC() {
            //최단거리 이동
            if(this.activeContainer) {
                if(this.activeIndex === this.firstPositionIndex) {
                    console.log(this.activeIndex);
                    eventBus.emit('section-changed', 'next-section');
                    eventBus.emit('index-changed', 'next-index');
                }
            }
        },
        nextSection() {
            if(this.activeSection != 90) {
                this.activeSection += 10;
            }
        },
    }
}