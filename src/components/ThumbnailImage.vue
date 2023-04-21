<template>
  <div class="contents_module">
    <div>{{ container_title }}</div>
    <div class="img_container">
      <div class="img_wrapper"
      v-for="(thumbnail, index) in thumbnails"
      :index="index + container_num"
      :key="index + container_num" :ref="'thumbnail-' + index"
      >
        <img class="img" :src="thumbnail.src" />
      </div>
    </div>    
  </div>
</template>

<script>
export default {
  name: 'ThumbnailImage',
  props: {
    thumbnails : {type : Object},
    container_num : {type : Number},
    container_title: {type: String, default: '콘텐츠 모듈1'}
  },
  data() {
    return {
      activeIndex : 0,
    }
  }
}
</script>

<style>
  .contents_module {
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-weight: 500;
    font-size: 32px;
    line-height: 44px;
    color: #EEEEEE;
  }

  .img_container {
    width: 100%;
    display: grid;
    grid-auto-flow: column;
    /* overflow: hidden; */
    gap: 32px;
  }

  .img_wrapper {
    width: 388px;
    height: 218px;
    border: 1px solid rgba(238, 238, 238, 0.2);
    border-radius: 12px;
    overflow: hidden;
  }

  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>