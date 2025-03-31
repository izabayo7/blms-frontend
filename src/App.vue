<script src="main.js"></script>
<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
import axios from 'axios'
import jwt from 'jsonwebtoken'

export default {
  name: "App",
  beforeCreate: async function () {

    if (!this.$session.exists()) {
      this.$router.push("/login");
      // keep the requested url then redirect after login
    } else if (this.$store.state.user.user === null) {
      axios.defaults.headers.common.Authorization = `${this.$session.get(
        "jwt"
      )}`;
      this.$store.dispatch("user/setUser", jwt.decode(this.$session.get("jwt")));
      this.$store.state.user.isLoggedIn = true;
      // const response = await Services.otherGets('token')
      // if (response.data === 'Invalid Token') {
      //   this.$session.destroy()
      //   this.$router.push('/')
      // }
    }
  },
};
</script>
<style lang="scss">
  html,body{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  *{
    padding: 0;
    margin: 0;
    color:$font;

  }

  input:focus, textarea:focus{
      outline: none;
  }
</style>
