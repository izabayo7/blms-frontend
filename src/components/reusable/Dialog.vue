<template>
  <v-dialog id="kurious--dialog" v-model="visible" :persistent="!closable">
    <div v-if="modal_template == 'information'" class="dialog-body dialog_t_1">
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
        <h4 class="title">{{title}}....</h4>
        <span class="sub-title">Please wait</span>
        <p class="unconfirmed">{{message}}</p>
        <v-progress-linear :value="progress" color="#ffc100" class="request-progress" />
      </div>
    </div>
    <div v-else-if="modal_template == 'action_confirmation'" class="dialog-body dialog_t_1">
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
      <div v-if="confirmation_action=='delete_chapter'" class="content">
        <h4 class="title">Delete Chapter</h4>
        <span class="sub-title">Are you sure you want to delete this chapter?</span>
        <p class="unconfirmed">{{message}}</p>
        <div class="actions">
          <v-btn @click="toogle_visibility" class="mx-2 white--text" color="#ffd248">Cancle</v-btn>
          <v-btn @click="update_confirmation(true); toogle_visibility(); " outlined class="mx-2" color="#ffd248">Delete</v-btn>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters("modal", [
      "visible",
      "title",
      "progress",
      "message",
      "closable",
      "status",
      "modal_template",
      "confirmation_action"
    ]),
  },
  methods: {
    ...mapMutations("modal", ["toogle_visibility", "update_confirmation"]),
  },
};
</script>
<style lang="scss">
// resize the modal
.v-dialog:not(.v-dialog--fullscreen) {
  height: 260px !important;
  width: 36% !important;
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
    margin-bottom: 45px;
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
  .content {
    margin-top: -35px;
    .actions{
      margin-top: 38px;
    }
  }
}
#panel--btn {
  background-color: transparent !important;
  /* box-shadow: none; */
  /* color: dodgerblue; */
  border: 2px solid;
}
</style>