<template>
  <v-dialog id="kurious--dialog" v-model="visible" :persistent="closable">
    <div class="round">
      <v-card class="text-center pa-12">
        <v-avatar
          size="150"
          :color="color !== undefined ? color : status === 200 ? '#4592ee' :  'red'"
        >
          <slot name="icon" />
        </v-avatar>
        <v-card-text class="title">{{message}}</v-card-text>
        <v-card-actions>
          <slot name="actions" />
        </v-card-actions>
      </v-card>
    </div>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("modal", [
      "visible",
      "progress",
      "message",
      "closable",
      "status",
    ]),
  },
};
</script>
<style lang="scss">
.v-dialog:not(.v-dialog--fullscreen) {
  max-height: 260px !important;
  max-width: 36% !important;
  border-radius: 22px !important;
}
.v-dialog.v-dialog--active {
  border-radius: 56px;
}
.round {
  .v-card > *:first-child:not(.v-btn):not(.v-chip),
  .v-card > .v-card__progress + *:not(.v-btn):not(.v-chip) {
    border-top-left-radius: 50% !important;
    border-top-right-radius: 50% !important;
  }
}
#panel--btn {
  background-color: transparent !important;
  /* box-shadow: none; */
  /* color: dodgerblue; */
  border: 2px solid;
}
</style>