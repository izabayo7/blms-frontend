<template>
  <v-navigation-drawer
    v-model="showActions"
    absolute
    mobile-breakpoint="960"
    id="sidebar"
    color="red"
    height="60%"
    fixed
  >
    <slot />
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      items: [
        { finished: true, title: "Photos" },
        { title: "Recipes" },
        { title: "Work" },
        { finished: true, title: "Photos" },
        { title: "Recipes" },
        { title: "Work" },
      ],
    };
  },
  computed: {
    breakPoint() {
      return this.$vuetify.breakpoint.name;
    },
    showActions() {
      return this.visible;
    },
  },
  watch: {
    showActions() {
      if (this.visible === false) {
        this.$emit("hideActions");
      }
    },
  },
  methods: {
    changeStyles(state) {
      if (state === "expand") {
        document.getElementById(
          "mainContent"
        ).style = `padding: 48px 0px 0px 16%;`;
        document.getElementById(
          "navbar"
        ).style = `height: 48px; margin-top: 0px; transform: translateY(0px); left: 15%; right: 0px;`;
      } else {
        document.getElementById("mainContent").style =
          "padding: 48px 0px 0px 78px;";
        document.getElementById("navbar").style =
          "height: 48px; margin-top: 0px; transform: translateY(0px); left: 78px; right: 0px;";
      }
    },
  },
};
</script>