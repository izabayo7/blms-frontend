<template>
  <div>
    <div class="text-h4">Submissions</div>
    <div class="links">
      <a v-for="(link, i) in links" :key="i" :href="link.link">
        <span class="simple_link">{{ link.text }}</span>
        {{ notLast(i) ? " / " : "" }}
      </a>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    links: [
      {
        text: "Artificial intelligence",
        link: "/reports",
      },
      {
        text: "Computer vision 6",
        link: "/reports",
      },
      {
        text: "Uwamariya Jeanette",
        link: "/reports",
      },
    ],
  }),
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