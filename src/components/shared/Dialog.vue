<template>
  <v-dialog id="kurious--dialog" v-model="visible" :persistent="!closable">
    <!-- view for information display ex(showing progress or a message) -->
    <div
      v-if="modal_template == 'display_information'"
      class="dialog-body dialog_t_1"
    >
      <div class="close-dialog">
        <svg
          v-if="closable"
          @click="toogle_visibility"
          xmlns="http://www.w3.org/2000/svg"
          width="19.805"
          height="19.8"
          viewBox="0 0 19.805 19.8"
        >
          <path
            id="Icon_ionic-ios-close"
            data-name="Icon ionic-ios-close"
            d="M23.534,21.189l7.074-7.074a1.657,1.657,0,0,0-2.344-2.344L21.19,18.845l-7.074-7.074a1.657,1.657,0,1,0-2.344,2.344l7.074,7.074-7.074,7.074a1.657,1.657,0,0,0,2.344,2.344l7.074-7.074,7.074,7.074a1.657,1.657,0,1,0,2.344-2.344Z"
            transform="translate(-11.285 -11.289)"
          />
        </svg>
      </div>
      <div class="content">
        <h4 v-if="title" class="title">{{ title }}....</h4>
        <span v-if="title" class="sub-title">Please wait</span>
        <p class="unconfirmed">{{ message }}</p>
        <v-progress-linear
          v-if="title"
          :value="progress"
          color="#ffc100"
          class="request-progress"
        />
      </div>
    </div>
    <!-- view for action confirmation -->
    <div
      v-else-if="modal_template == 'action_confirmation'"
      class="dialog-body dialog_t_1"
    >
      <div class="close-dialog">
        <svg
          @click="toogle_visibility"
          xmlns="http://www.w3.org/2000/svg"
          width="19.805"
          height="19.8"
          viewBox="0 0 19.805 19.8"
        >
          <path
            id="Icon_ionic-ios-close"
            data-name="Icon ionic-ios-close"
            d="M23.534,21.189l7.074-7.074a1.657,1.657,0,0,0-2.344-2.344L21.19,18.845l-7.074-7.074a1.657,1.657,0,1,0-2.344,2.344l7.074,7.074-7.074,7.074a1.657,1.657,0,0,0,2.344,2.344l7.074-7.074,7.074,7.074a1.657,1.657,0,1,0,2.344-2.344Z"
            transform="translate(-11.285 -11.289)"
          />
        </svg>
      </div>
      <!-- show confirmations according to the set action -->
      <div class="content confirmation-dialog">
        <h4 class="title">{{ title }}</h4>
        <span class="sub-title">{{ message }}</span>
        <div class="actions">
          <v-btn
            @click="toogle_visibility"
            class="mx-2 white--text action-button"
            >Cancel</v-btn
          >
          <v-btn
            @click="
              $store
                .dispatch(
                  confirmation_method.action,
                  confirmation_method.parameters
                )
                .then(() => {
                  update_confirmation(true)
                  reset_modal();
                })
            "
            outlined
            class="mx-2 action-button-outlined"
            >Continue</v-btn
          >
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { mapGetters, mapMutations, mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("modal", ["confirmed"]),
    ...mapGetters("modal", [
      "visible",
      "title",
      "progress",
      "message",
      "closable",
      "status",
      "modal_template",
      "confirmation_action",
      "confirmation_method",
      "title",
      "message",
    ]),
  },
  methods: {
    ...mapMutations("modal", [
      "toogle_visibility",
      "update_confirmation"
    ]),
    ...mapActions("modal", ['reset_modal'])
  },
};
</script>
<style lang="scss">
// resize the modal
.v-dialog:not(.v-dialog--fullscreen) {
  height: fit-content !important;
  width: fit-content !important;
  max-width: 100% !important;
  border-radius: 22px !important;
  .dialog-body {
    height: 100%;
    background-color: white;
    text-align: center;
  }
}
// round the modal
.v-dialog.v-dialog--active {
  border-radius: 56px;
}
.dialog_t_1 {
  padding: 18px;
  h4.title {
    font-weight: 600;
    color: #0f0f0f;
    font-size: 18px !important;
  }
  .subtitle {
    color: #545454;
    font-size: 25px;
  }
  .unconfirmed {
    color: #0f0f0f;
    margin-top: 19px;
    font-size: 18px;
  }
  .request-progress {
    height: 8px;
    border-radius: 12px;
    width: 67%;
    margin: auto;
  }
  .close-dialog {
    text-align: right;
    padding: 11px;
    svg {
      cursor: pointer;
    }
  }
  .content.confirmation-dialog {
    margin-top: -35px;
    .actions {
      margin-top: 38px;
    }
    h4.title {
      margin-bottom: 45px;
    }
  }
  .action-button-outlined {
    color: $primary !important;
    caret-color: $primary;
  }
  .action-button {
    background-color: $primary !important;
    border-color: $primary;
  }
}
#panel--btn {
  background-color: transparent !important;
  /* box-shadow: none; */
  /* color: dodgerblue; */
  border: 2px solid;
}
</style>
