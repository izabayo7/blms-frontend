<script src="main.js"></script>
<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>
<style lang="scss">
  html,body{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    color:$font;
  }
  *{
    padding: 0;
    margin: 0;
  }

  input:focus, textarea:focus{
      outline: none;
  }
</style>
