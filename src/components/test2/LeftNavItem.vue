<template>
    <div class="nav_item_container"
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
            // active: { type: Boolean, default: false },
            index: { type: Number },
            type: { type: String },
        },
        data() {
            return {
                activeIndex: false,
            }
        },
        computed: {
            // modifiedSrc() {
            //     let modifiedSrc = '';
            //     if (this.index == this.activeIndex) {
            //         modifiedSrc = require(`@/assets/svg/menu-${this.src}-active.svg`);
            //         return modifiedSrc;
            //     } else {
            //         modifiedSrc = require(`@/assets/svg/menu-${this.src}.svg`);
            //         return modifiedSrc;
            //     }
            // },
            normIcon () {
                return require(`@/assets/svg/menu-${this.src}.svg`);
            },
            actIcon () {
                return require(`@/assets/svg/menu-${this.src}-active.svg`);
            }
        },
    }
</script>