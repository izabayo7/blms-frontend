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
    <div
        v-else-if="modal_template == 'payment_err'"
        class="dialog-body dialog_t_1 payment_err"
    >
      <div class="close-dialog show">
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
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M48.6346 26.667L40.0013 35.3003L31.368 26.667L26.668 31.367L35.3013 40.0003L26.668 48.6337L31.368 53.3337L40.0013 44.7003L48.6346 53.3337L53.3346 48.6337L44.7013 40.0003L53.3346 31.367L48.6346 26.667ZM40.0013 6.66699C21.568 6.66699 6.66797 21.567 6.66797 40.0003C6.66797 58.4337 21.568 73.3337 40.0013 73.3337C58.4346 73.3337 73.3346 58.4337 73.3346 40.0003C73.3346 21.567 58.4346 6.66699 40.0013 6.66699ZM40.0013 66.667C25.3013 66.667 13.3346 54.7003 13.3346 40.0003C13.3346 25.3003 25.3013 13.3337 40.0013 13.3337C54.7013 13.3337 66.668 25.3003 66.668 40.0003C66.668 54.7003 54.7013 66.667 40.0013 66.667Z"
              fill="#FC6767"/>
        </svg>

        <h4 class="title">Ineligible to attend ( Payment needed)</h4>
        <span class="sub-title">
          It appears you have not paid partialy or completely fees associated
          with this course.
          If you believe you have, check with the director of finance or pay
          due fees.
        </span>
        <div class="actions">
          <v-btn
              @click="toogle_visibility"
              class="mx-2 white--text action-button"
          >Okay
          </v-btn
          >
        </div>
      </div>
    </div>
    <div
        v-else-if="modal_template.includes('exam_closed')"
        class="dialog-body dialog_t_1 payment_err"
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
        <svg width="56" v-if="modal_template.includes('timeout')" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M44.4254 10.6163L41.112 13.9297C37.4954 11.0597 32.9454 9.33301 27.9987 9.33301C23.7287 9.33301 19.762 10.6163 16.4487 12.7863L19.8554 16.193C22.2354 14.8163 25.0354 13.9997 27.9987 13.9997C37.0287 13.9997 44.332 21.303 44.332 30.333C44.332 33.2963 43.5154 36.0963 42.1387 38.4763L45.522 41.8597C47.7154 38.5697 48.9987 34.603 48.9987 30.333C48.9987 25.3863 47.272 20.8363 44.402 17.243L47.7154 13.9297L44.4254 10.6163ZM34.9987 2.33301H20.9987V6.99967H34.9987V2.33301ZM25.6654 22.0263L30.332 26.693V18.6663H25.6654V22.0263ZM7.04536 9.33301L4.08203 12.2963L10.4987 18.7363C8.28203 22.0497 6.9987 26.0397 6.9987 30.333C6.9987 41.9297 16.3787 51.333 27.9987 51.333C32.292 51.333 36.282 50.0497 39.6187 47.833L45.452 53.6663L48.4154 50.703L30.4254 32.713L7.04536 9.33301ZM27.9987 46.6663C18.9687 46.6663 11.6654 39.363 11.6654 30.333C11.6654 27.3463 12.482 24.5463 13.882 22.1197L36.1887 44.4263C33.7854 45.8497 30.9854 46.6663 27.9987 46.6663Z" fill="#FC6767"/>
        </svg>
        <svg v-else-if="modal_template.includes('successfull')" width="59" height="61" viewBox="0 0 59 61" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="59" height="61" rx="29.5" fill="#3CE970"/>
          <path d="M24.2273 37.194L17.3068 29.9851L15 32.3881L24.2273 42L44 21.403L41.6932 19L24.2273 37.194Z" fill="white"/>
        </svg>

        <svg v-else width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.08203 43.7503H47.9154L24.9987 4.16699L2.08203 43.7503ZM27.082 37.5003H22.9154V33.3337H27.082V37.5003ZM27.082 29.167H22.9154V20.8337H27.082V29.167Z" fill="#FC6767"/>
        </svg>


        <h4 class="title">{{ modal_template.includes('timeout') ? 'Time up !' : modal_template.includes('successfull') ? 'Submission successful' : 'Automatic submission' }}</h4>
        <div v-if="modal_template.includes('timeout')" class="sub-title">
Dear user, your work have been automaticaly submitted because
you reached your time limit, all the answers were saved successfuly.
Please wait for the instructor to check your work.
        </div>
        <div v-else-if="modal_template.includes('successfull')" class="sub-title">
Dear user, your work have been submitted susscesssfuly.
All the answers were saved successfuly.
Please wait for the instructor to check your work.

        </div>
        <div v-else class="sub-title">
Dear user, your work have been automaticaly submitted due to
user conduct breach, You may be subject to deductions and even
failure.
        </div>
        <div class="actions">
          <v-btn
              @click="toogle_visibility();$router.push('/reports')"
              class="mx-2 white--text action-button"
          >Reports
          </v-btn
          >
<!--          <v-btn-->
<!--              @click="toogle_visibility"-->
<!--              class="mx-2 white&#45;&#45;text action-button cancel"-->
<!--          >Okay-->
<!--          </v-btn-->
<!--          >-->
        </div>
      </div>
    </div>
    <div
        v-else-if="modal_template == 'exam_constraints'"
        class="dialog-body dialog_t_1 exam_constraints"
    >
      <!-- show confirmations according to the set action -->
      <div class="content">
        <h4 class="title">Please read carefully</h4>
        <span v-if="link" class="sub-title">
          I accept that if do the following, <b>I will fail automatically.</b>
        </span>
        <span v-else class="sub-title">
          You just breached the laws, <b>This is the last warning.</b>
          <br>
          If you do one of the things below another time you will fail.
        </span>
        <div class="items">
          <div class="item">
            <div class="icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M14.25 4.8075L13.1925 3.75L9 7.9425L4.8075 3.75L3.75 4.8075L7.9425 9L3.75 13.1925L4.8075 14.25L9 10.0575L13.1925 14.25L14.25 13.1925L10.0575 9L14.25 4.8075Z"
                    fill="#FF0808"/>
              </svg>
            </div>
            <div class="txt">Close exam window before submiting work.</div>
          </div>
          <div class="item">
            <div class="icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M14.25 4.8075L13.1925 3.75L9 7.9425L4.8075 3.75L3.75 4.8075L7.9425 9L3.75 13.1925L4.8075 14.25L9 10.0575L13.1925 14.25L14.25 13.1925L10.0575 9L14.25 4.8075Z"
                    fill="#FF0808"/>
              </svg>
            </div>
            <div class="txt">Minimize the exam window.</div>
          </div>
          <div class="item">
            <div class="icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M14.25 4.8075L13.1925 3.75L9 7.9425L4.8075 3.75L3.75 4.8075L7.9425 9L3.75 13.1925L4.8075 14.25L9 10.0575L13.1925 14.25L14.25 13.1925L10.0575 9L14.25 4.8075Z"
                    fill="#FF0808"/>
              </svg>
            </div>
            <div class="txt">Open another browser tab</div>
          </div>
          <div class="item">
            <div class="icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M14.25 4.8075L13.1925 3.75L9 7.9425L4.8075 3.75L3.75 4.8075L7.9425 9L3.75 13.1925L4.8075 14.25L9 10.0575L13.1925 14.25L14.25 13.1925L10.0575 9L14.25 4.8075Z"
                    fill="#FF0808"/>
              </svg>
            </div>
            <div class="txt">Use a sepatate computer or phone.</div>
          </div>
        </div>
        <div class="actions">
          <v-btn
              @click="toogle_visibility"
              class="mx-2 white--text action-button cancel"
          >{{ link ? 'I decline' : 'Continue'}}
          </v-btn
          >
          <v-btn
              v-if="link"
              @click="toogle_visibility();$router.push(link)"
              class="mx-2 white--text action-button"
          >I accept
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
      "link",
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

  &.payment_err, &.exam_constraints {
    border-radius: 0px;
  }

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

    &.show {
      visibility: visible;
    }

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

.payment_err {
  max-width: 665px;
  min-height: 340px;

  .title {
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;

    color: #000000;
  }

  .sub-title {
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 18px;
    max-width: 484px;
    color: #000000;
  }

  .action-button {
    width: 138px;
    height: 44px !important;
    &.cancel {
      background: #BABABC !important;
    }
  }
}

.exam_constraints {
  max-width: 665px;
  width: 90vw;
  min-height: 340px;
  text-align: center;
  padding-top: 38px;

  .title {
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 19px;
    color: #000000;
  }

  .sub-title {
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 18px;
    margin-bottom: 27px;
    color: #000000;

  }

  .items {
    margin: 27px auto 48px;
    width: fit-content;

    .item {
      display: flex;

      .icon {
        margin-right: 12px;
      }
    }
  }

  .action-button {
    width: 138px;
    height: 44px;

    &.cancel {
      background: #BABABC !important;
    }
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
