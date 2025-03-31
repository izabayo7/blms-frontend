<template>
  <div>
    <div class="text-h4 font-weight-bold">{{ title }}</div>
    <div class="links">
      <a
        v-for="(link, i) in links"
        :key="i"
        @click="$route.path == link.link ? undefined : $router.push(link.link)"
      >
        <span :class="$route.path == link.link ? '' : 'simple_link'">{{
          link.text
        }}</span>
        {{ notLast(i) ? " / " : "" }}
      </a>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    links: {
      type: Array,
      required: true,
    },
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
    cursor: default;
  }
  .simple_link {
    cursor: pointer;
  }
  .simple_link:hover {
    color: $primary;
  }
}
</style>