<template>
  <v-app class="home">
    <router-view />
    <app-dialog />
    <new-group />
    <notification-tooltip />
  </v-app>
</template>

<script>
// import axios from "axios";
// import jwt from "jsonwebtoken";

import NotificationTooltip from "./components/reusable/NotificationTooltip";
export default {
  name: "App",
  components: {
    NotificationTooltip,
    appDialog: () => import("@/components/shared/Dialog"),
    NewGroup : () => import('@/components/messages/NewGroup')
  },
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
  color: $font;
}

input:focus,
textarea:focus {
  outline: none;
}
</style>
