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
            valid: { type: Boolean, default: false },
            index: { type: Number },
            type: { type: String },
        },
        data() {
            return {
                activeIndex: 2,
                isEventHandling: false,
                isNavOpen: false
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
                if (this.isEventHandling || !this.isNavOpen) {
                    return;
                }

                if (e.key === "ArrowDown" && this.activeIndex !== 7) {
                    this.activeIndex += 1;
                } else if (e.key === "ArrowUp" && this.activeIndex !== 0) {
                    this.activeIndex -= 1;
                } else if (e.key === "ArrowRight") {
                    this.isNavClose = true;
                    this.$emit('nav-open', false);
                }

                setTimeout(() => {
                    this.isEventHandling = false;
                }, 200);
            }
        },
        watch: {
            valid(valid) {
                this.isNavOpen = valid;
                if(valid) {
                    window.addEventListener("keydown", this.customKeyEvent);
                }
            }
        },
    }
</script>