<template>
    <div class="nav_item_container" :class="{active: active}" :index="index">
        <div class="indicator"></div>
        <img class="icon" :src="src">
        <div class="text">{{ text }}</div>
    </div>
</template>
<script>
    export default {
        name: "LeftNavItem",
        props: {
            src: { type: String },
            text: { type: String },
            active: { type: Boolean, default: false },
            index: { type: Number }
        }
    }
</script>