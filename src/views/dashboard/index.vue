<template>
  <v-app>
    <!-- inject the navbar -->
    <dashboard-dynamic-nav-bar />

    <!-- inject the sidebar -->
    <dashboard-dynamic-side-bar />

    <!-- display child components according to the current route -->
    <v-main :class="`bg-one ${contentClass}`">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Dashboard",
  components: {
    DashboardDynamicNavBar: () => import("@/components/navbar"),
    DashboardDynamicSideBar: () => import("@/components/sidebar"),
  },
  computed:{
    contentClass(){
      return ['xs', 'sm', 'md'].includes(this.$vuetify.breakpoint.name) ? '' : `sidebar-${this.$store.state.sidebar.minivariant ? 'collapsed' : 'expanded'}` 
    }
  }
};
</script>

<style lang="scss">
.sidebar-expanded {
  padding: 48px 0px 0px 202px !important;
}
.sidebar-collapsed {
  padding: 48px 0px 0px 99px !important;
}
</style>