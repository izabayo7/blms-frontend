<template>
  <v-dialog v-model="visible" :persistent="!closable" id="faculty--dialog">
    <div class="dialog-body">
      <div class="close">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          @click="$emit('closeModal')"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-11.414L9.172 7.757 7.757 9.172 10.586 12l-2.829 2.828 1.415 1.415L12 13.414l2.828 2.829 1.415-1.415L13.414 12l2.829-2.828-1.415-1.415L12 10.586z"
          />
        </svg>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    closable: false,
  }),
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
  width: 100% !important;
  max-width: 742px;
  border-radius: 0 !important;
  .dialog-body {
    height: 100%;
    padding: 30px;
    background-color: white;
    padding-top: 50px;
    text-align: left;

    .close {
      /* position: relative; */
      float: right;
      margin-top: -20px;
    }
  }
}
</style>