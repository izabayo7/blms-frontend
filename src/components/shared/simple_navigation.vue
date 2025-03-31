<template>
  <div>
    <div class="text-h4 font-weight-bold">{{title}}</div>
    <div class="links">
      <a v-for="(link, i) in links" :key="i" :href="$route.path == link.link ? undefined : link.link">
        <span class="simple_link">{{ link.text }}</span>
        {{ notLast(i) ? " / " : "" }}
      </a>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    title:{
      type: String,
      required: true
    },
    links:{
      type: Array,
      required: true
    }
  },
  methods: {
    notLast(index) {
      return parseInt(index) < this.links.length - 1;
    },
  },
};
</script>
<style lang="scss" scoped>
.links {
  a {
    text-decoration: none;
  }
  .simple_link {
    cursor: pointer;
  }
  .simple_link:hover {
    color: $primary;
  }
}
</style>