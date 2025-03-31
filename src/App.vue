<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
import axios from "axios";
import jwt from "jsonwebtoken";
export default {
  name: "App",
  beforeMount: async function () {
    if (!this.$session.exists()) {
      this.$router.push("/login");
      // keep the requested url then redirect after login
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
