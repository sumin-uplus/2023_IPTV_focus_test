<template>
    <div
    class="nav_item_container"
    :class="{active: index == this.activeIndex}"
    :index="index"
    :type="type">
        <div class="indicator"></div>
        <div class="icon_container">
            <img class="icon_active" :src="this.actIcon">
            <img class="icon" :src="this.normIcon">
        </div>
        <div class="text">{{ text }}</div>
    </div>
</template>
<script>
    export default {
        name: "LeftNavItem",
        props: {
            src: { type: Number },
            text: { type: String },
            valid: { type: Object },
            index: { type: Number },
            type: { type: String },
            group: {type: String},
            reset: { type: Boolean }
        },
        data() {
            return {
                activeIndex: 2,
                isEventHandling: false,
                isNavOpen: { status: false, index: 2 }
            }
        },
        computed: {
            normIcon () {
                return require(`@/assets/svg/menu-${this.src}.svg`);
            },
            actIcon () {
                return require(`@/assets/svg/menu-${this.src}-active.svg`);
            },
        },
        methods: {
            customKeyEvent(e) {
                if (this.isEventHandling || !this.isNavOpen.status) {
                    return;
                }

                if (e.key === "ArrowDown" && this.activeIndex !== 7) {
                    this.activeIndex += 1;
                } else if (e.key === "ArrowUp" && this.activeIndex !== 0) {
                    this.activeIndex -= 1;
                } else if (e.key === "ArrowRight" || e.key === '2') {
                    this.$emit('nav-open', false);
                }

                setTimeout(() => {
                    this.isEventHandling = false;
                }, 200);
            }
        },
        watch: {
            valid: {
                handler(data) {
                    this.isNavOpen.status = data.status;
                    data.index = this.activeIndex;
                    if (data.status) {
                        window.addEventListener("keydown", this.customKeyEvent);
                    }
                },
                deep: true
            },
            activeIndex(index) {
                this.isNavOpen.index = this.activeIndex;
                let group_index = this.group.replace('imgset', '')*1;
                let group_next = `imgset${String(group_index+6).padStart(2, '0')}`;
                if(index === 2) {
                    this.$emit('update:group', [this.group, index]);
                } else if (index === 4) {
                    if(group_index === 0) {
                        this.$emit('update:group', ['imgset00', index]);
                    } else {
                        this.$emit('update:group', [group_next, index]);
                    }
                } else {
                    this.$emit('update:group', ['imgset00', index]);
                } 
            },
            reset() {
                this.activeIndex = 2;
            }
        },
    }
</script>