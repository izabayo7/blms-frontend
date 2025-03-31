<template>
<div>
  <media-sources-selection />
</div>
</template>

<script>
import MediaSourcesSelection from "@/components/Live/MediaSourcesSelection";
export default {
name: "index.vue",
  components: {MediaSourcesSelection}
}
</script>

<style lang="scss" scoped>
div{
  height: 100%;
}
</style>