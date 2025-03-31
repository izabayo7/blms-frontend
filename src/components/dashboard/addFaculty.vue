<template>
  <v-dialog v-model="visible" id="faculty--dialog">
    <div class="dialog-body"></div>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    visible() {
      return 1;
    },
  },
};
</script>

<style>
</style>
<style lang="scss" scoped>
.v-dialog:not(.v-dialog--fullscreen) {
  height: 432px !important;
  width: 50% !important;
  max-width: 742px;
  border-radius: 0 !important;
  .dialog-body {
    height: 100%;
    padding: 30px;
    background-color: white;
    padding-top: 50px;
    text-align: left;
  }
}
</style>