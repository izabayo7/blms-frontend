<template>
  <v-dialog id="kurious--dialog" v-model="show" :persistent="modal" max-width="70%">
    <div class="round">
      <v-card class="text-center pa-12">
        <v-avatar size="150" :color="status === 200 ? '#4592ee' :  'red'">
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
export default {
  props: {
    show: {
      type: Boolean,
      requierd: true,
    },
    message: {
      type: String,
      requierd: true,
    },
    modal: {
      type: Boolean,
      default: true,
    },
    status: {
      type: Number,
      default: 200,
    },
  },
};
</script>
<style lang="scss">
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
</style>