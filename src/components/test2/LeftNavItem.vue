<template>
    <div class="nav_item_container">
        <div class="indicator"></div>
        <img class="icon" :src="{ icon }">
        <div class="text">{{ text }}</div>
    </div>
</template>
<script>
    export default {
        name: "LeftNavItem",
        props: {
            icon: { type: String },
            text: { type: Text }
        }
    }
</script>