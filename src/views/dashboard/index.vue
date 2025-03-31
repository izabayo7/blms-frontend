<template>
  <v-app class="dashboard">
    <dashboard-dynamic-side-bar />

    <dashboard-dynamic-nav-bar />

    <v-main id="mainContent">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import jwt from "jsonwebtoken";
export default {
  name: "DashboardIndex",
  components: {
    DashboardDynamicNavBar: () => import("@/components/navbar"),
    DashboardDynamicSideBar: () => import("@/components/sidebar"),
  },
  beforeMount: async function () {
    if (!this.$session.exists()) {
      this.$router.push("/login");
    } else if (this.$store.state.user === null) {
      axios.defaults.headers.common.Authorization = `${this.$session.get(
        "jwt"
      )}`;
      this.$store.dispatch("setUser", jwt.decode(this.$session.get("jwt")));
      this.$store.state.isLoggedIn = true;
      // const response = await Services.otherGets('token')
      // if (response.data === 'Invalid Token') {
      //   this.$session.destroy()
      //   this.$router.push('/')
      // }
    }
  },
};
</script>

<style scoped>
.dashboard {
  background-color: #f8f8f8;
}
</style>