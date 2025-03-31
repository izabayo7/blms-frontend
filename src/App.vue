<script src="main.js"></script>
<template>
  <v-app>
    <router-view />
    <kurious-dialog template="confirmation" :action="'delete_chapter'" />
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
