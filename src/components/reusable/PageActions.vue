<template>
  <v-navigation-drawer
    ref="pageActions"
    v-model="visible"
    app
    :right="true"
    mobile-breakpoint="960"
    id="sidebar"
    :width="breakPoint === 'xs' ? '70%' : breakPoint === 'sm' ? '50%' : '15%'"
    height="100%"
    fixed
  >
    <slot />
  </v-navigation-drawer>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data: ()=>({
    visible: true
  }),
  computed: {
    ...mapState("sidebar_navbar", { state: "page_actions_visible" }),
    breakPoint() {
      return this.$vuetify.breakpoint.name;
    },
  },
  methods: {
    ...mapMutations("sidebar_navbar", {
      toggle: "TOGGLE_PAGE_ACTIONS_VISIBILITY",
    }),
  },
  watch: {
    state() {
      this.visible = this.state
    },
    visible(){
      if(!this.visible){
        this.toggle()
      }
    }
  },
};
</script>