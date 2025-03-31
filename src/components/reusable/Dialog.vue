<template>
  <v-dialog id="kurious--dialog" v-model="show" persistent max-width="70%">
    <div class="round">
      <v-card class="text-center pa-12">
        <v-avatar size="150" color="#4592ee">
          <v-icon size="55" dark>mdi-clipboard-text-multiple-outline</v-icon>
        </v-avatar>
        <v-card-text>{{message}}</v-card-text>
        <v-card-actions>
          <v-row>
            <v-col class="col-6 mx-auto">
              <v-btn color="mx-2" @click="show = false">Disagree</v-btn>
              <v-btn color="mx-2" @click="show = false">Agree</v-btn>
            </v-col>
          </v-row>
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
  },
};
</script>
<style lang="scss">
.v-dialog.v-dialog--active.v-dialog--persistent {
  border-radius: 56px;
}
</style>