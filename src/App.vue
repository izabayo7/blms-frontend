<template>
  <v-app class="home">
    <router-view/>
    <app-dialog/>
    <new-group/>
    <internet-checker @status="status"/>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {
    appDialog: () => import("@/components/shared/Dialog"),
    NewGroup: () => import("@/components/messages/NewGroup"),
    InternetChecker: () => import("vue-internet-checker"),
  },
  methods: {
    status(ele) {
      this.$store.commit("network/changeNetworkStatus", ele);
    },
  },
  // created(){
  //   this.$store.dispatch("app_notification/SET_NOTIFICATION", {
  //     message: "Welcome msz ...",
  //     status: "info",
  //     uptime: 10000,
  //   });
  // }
};
</script>
<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

* {
  padding: 0;
  margin: 0;
  // color: $font;
  color: black;
}

input:focus,
textarea:focus {
  outline: none;
}
</style>
