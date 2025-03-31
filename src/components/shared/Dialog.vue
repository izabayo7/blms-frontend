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
      <div class="content uploader">
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
          >Cancel
          </v-btn
          >
          <v-btn
              @click="
            performAction
            "
              outlined
              class="mx-2 action-button-outlined"
          >Yes
          </v-btn
          >
        </div>
      </div>
    </div>
    <!-- view for action confirmation -->
    <div
        v-else-if="modal_template.includes('live_related')"
        class="dialog-body live-check"
        :class="{ ended : modal_template.includes('ended')}"
    >
      <div class="title">{{ title }}</div>
      <div class="sub-title">{{ message }}</div>
      <div v-if="!modal_template.includes('ended')" class="code">{{ code }}</div>
      <div v-if="!modal_template.includes('ended')" class="">
        <input v-model="userCode" type="text">
      </div>
      <div class="action">
        <button v-if="modal_template.includes('ended')" @click="performAction">Go to course</button>
        <button v-else @click="handleSubmit">Submit</button>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import {mapGetters, mapMutations, mapState, mapActions} from "vuex";

export default {
  data: () => ({
    userCode: "",
    attendance: 100,
    interval: null
  }),
  computed: {
    ...mapState("modal", ["confirmed"]),
    ...mapGetters("courses", ["course"]),
    ...mapGetters("modal", [
      "visible",
      "title",
      "progress",
      "message",
      "code",
      "closable",
      "status",
      "modal_template",
      "confirmation_action",
      "confirmation_method",
      "title",
      "message",
    ]),
  },
  watch: {
    visible() {
      if (this.visible)
        if (this.modal_template === "live_related") {
          this.interval = setInterval(() => {
            this.attendance -= 20
            if (this.attendance < 0)
              this.performAction()
          }, 30000)
        } else if (this.interval)
          clearInterval(this.interval)

    }
  },
  methods: {
    ...mapMutations("modal", [
      "toogle_visibility",
      "update_confirmation"
    ]),
    handleSubmit() {
      if (this.code != this.userCode)
        this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: "please enter the given code",
          status: "info",
          uptime: 2000,
        })
      else
        this.performAction()
    },
    ...mapActions("modal", ['reset_modal']),
    performAction() {
      if (this.confirmation_method) {
        if (this.modal_template === "live_related") {
          this.confirmation_method.parameters.attendance = this.attendance > 0 ? this.attendance : 0
        }
        this.$store
            .dispatch(
                this.confirmation_method.action,
                this.confirmation_method.parameters
            )
            .then(() => {
              this.update_confirmation(true)
              this.reset_modal();
            })
      } else {
        const template = this.modal_template
        this.reset_modal();
        if (template.includes('ended')) {
          this.$router.push(`/courses${this.course ? '/' + this.course.name : ''}`)
        } else {
          this.$router.go(-1)
        }
      }
    }
  },
};
</script>
<style lang="scss">
// resize the modal
.v-dialog:not(.v-dialog--fullscreen) {
  height: fit-content !important;
  width: fit-content !important;
  max-width: fit-content !important;
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
  border-radius: 12px;

  .uploader {
    padding: 20px 50px 50px;
  }

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
    visibility: hidden;
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

.live-check {
  width: 651px;
  height: 315px !important;
  padding: 30px;

  &.ended {
    padding: 63px;

    .title {
      margin-bottom: 33px;
    }

    .sub-title {
      margin-bottom: 44px;
    }
  }

  background: #FFFFFF;
  border-radius: 5px;

  div {
    margin-bottom: 15px;
  }

  .title {
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 30px;
    line-height: 37px;
    text-align: center;

    color: #000000;
  }

  .sub-title {
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 18px;

    color: #000000;
  }

  .code {
    font-family: Montserrat;
    font-style: normal;
    font-weight: bold;
    font-size: 30px;
    line-height: 37px;
    text-align: center;

    color: #000000;

  }

  input {
    width: 251px;
    height: 44px;
    left: 557px;
    top: 421px;

    background: #E8E8E8;
    border-radius: 5px;
    padding: 10px 40px;
  }

  .action {
    button {
      width: 199px;
      height: 44px;
      font-family: Montserrat;
      font-style: normal;
      font-weight: 300;
      font-size: 20px;
      line-height: 24px;
      color: #FFFFFF;
      background: #193074;
      border-radius: 15px;
    }

  }

  #panel--btn {
    background-color: transparent !important;
    /* box-shadow: none; */
    /* color: dodgerblue; */
    border: 2px solid;
  }
}

/* Portrait phones and smaller */
@media (max-width: 700px) {
  .live-check {
    max-width: 342px;
    width: 100%;
    height: fit-content !important;
    padding: 19px 10px;

    div {
      margin-bottom: 10px;
    }

    .title {
      font-size: 15px;
    }

    .sub-title {
      font-size: 10px;
    }

    .code {
      font-size: 15px;
    }

    input {
      width: 140px;
      height: 25px;
    }

    .action {
      button {
        width: 122.77px;
        height: 27.15px;
        font-size: 12.34px;
      }
    }
  }
}
</style>
