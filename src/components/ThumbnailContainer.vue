<template>
    <ThumbnailImage
        v-for="(slice, index) in slices"
        :key="index"
        :thumbnails="slice"
        :container_num="index * 10"
        :container_title="'콘텐츠 모듈 ' + (index + 1)">
    </ThumbnailImage>
</template>

<script>
import ThumbnailImage from './ThumbnailImage.vue'

export default {
    name: 'ThumbnailContainer',
    props: {
    },
    components:{
        ThumbnailImage
    },
    data() {
        return {
            thumbnails:[],
            slices: []
        }
    },
    methods: {
        makeImgArray(startNum, array) {
            for (let i = 0; i < 100; i++) {
                const num = startNum + i;
                const src = require(`@/assets/img/thumbnail_${num}.jpeg`);
                array.push({ num, src });
            }
        },
        createSlices() {
            for (let i = 0; i < this.thumbnails.length; i += 10) {
                this.slices.push(this.thumbnails.slice(i, i + 10));
            }
        }
    },
    created() {
        this.makeImgArray(1, this.thumbnails);
        this.createSlices();
    }
}
</script>