<script src="main.js"></script>
<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: "App",
  mounted() {
    console.log(this.$el.style.height)

  },
  beforeMount: async function () {
    let innerHeight = window.innerHeight
    let app = document.getElementById('app')
    app.style.height = innerHeight;

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
