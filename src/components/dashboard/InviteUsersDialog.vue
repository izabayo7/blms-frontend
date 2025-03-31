<template>
  <v-dialog id="kurious--dialog" v-model="visible" :persistent="!closable">
    <div class="dialog-body invite-users">
<!--      <div class="close">-->
<!--        <svg-->
<!--          xmlns="http://www.w3.org/2000/svg"-->
<!--          viewBox="0 0 24 24"-->
<!--          width="24"-->
<!--          height="24"-->
<!--          @click="$emit('closeModal')"-->
<!--        >-->
<!--          <path fill="none" d="M0 0h24v24H0z" />-->
<!--          <path-->
<!--            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-11.414L9.172 7.757 7.757 9.172 10.586 12l-2.829 2.828 1.415 1.415L12 13.414l2.828 2.829 1.415-1.415L13.414 12l2.829-2.828-1.415-1.415L12 10.586z"-->
<!--          />-->
<!--        </svg>-->
<!--      </div>-->
      <div v-show="sent_emails.length == 0" class="pre-send">
        <div class="mx-auto centered">
          <div class="title">Send user Invitations</div>
          <div class="role my-2">
            <select-ui
              label="Select user category"
              name="role"
              id="user_category"
              :options="user_categories"
              @input="
                (e) => {
                  selected_user_category = e;
                }
              "
            />
          </div>
          <div class="role my-2">
            <select-ui
              label="Select user group"
              name="role"
              id="user_group"
              :options="user_group_names"
              @input="
                (e) => {
                  selected_user_group = e;
                }
              "
            />
          </div>
          <div class="d-flex my-1">
            <input-ui
              ref="email_input"
              class="email-input"
              placeholder="Enter email"
              :valid="email !== '' ? validateEmail(email) : true"
              name="role"
              id="role"
              type="email"
              :value="email"
              @input="updateCurrentEmailValue"
              @submit="addEmail"
            />
            <button class="add-email ml-2" @click="addEmail">Add</button>
          </div>
          <div class="added-emails customScroll my-5">
            <div v-for="(email, i) in emails" :key="i" class="email">
              <div class="text">{{ email }}</div>
              <button class="pl-1">
                <svg
                  width="9"
                  height="9"
                  viewBox="0 0 9 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.49915 3.76324L7.58326 0.987549L8.46425 1.78044L5.38015 4.55614L8.46425 7.33183L7.58326 8.12472L4.49915 5.34903L1.41505 8.12472L0.534058 7.33183L3.61816 4.55614L0.534058 1.78044L1.41505 0.987549L4.49915 3.76324Z"
                    fill="black"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div class="send-container">
            <button class="add-email send cancel mr-4" @click="$emit('closeModal')">
              Cancel
            </button>
            <button class="add-email send" @click="sendInvitations">
              Send
            </button>
          </div>
        </div>
      </div>
      <div v-show="sent_emails.length != 0" class="post-send">
        <div class="mx-auto non-centered">
          <div class="title">
            Invitations were successfuly sent to the following users
          </div>
          <div class="added-emails mx-auto customScroll my-5">
            <div v-for="(email, i) in sent_emails" :key="i" class="email">
              <div class="text">{{ email }}</div>
              <svg
                width="9"
                height="9"
                viewBox="0 0 9 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.49915 3.76324L7.58326 0.987549L8.46425 1.78044L5.38015 4.55614L8.46425 7.33183L7.58326 8.12472L4.49915 5.34903L1.41505 8.12472L0.534058 7.33183L3.61816 4.55614L0.534058 1.78044L1.41505 0.987549L4.49915 3.76324Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>
          <div class="send-container">
            <button class="close" @click="$emit('closeModal')">Close</button>
          </div>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import SelectUi from "@/components/reusable/ui/select-ui";
import InputUi from "@/components/reusable/ui/input-ui";
import Apis from "@/services/apis";

export default {
  components: { SelectUi, InputUi },
  data() {
    return {
      options: ["Principal", "Instructor", "Student"],
      emails: [],
      sent_emails: [],
      user_categories: [],
      user_groups: [],
      selected_user_group: "",
      selected_user_category: "",
      email: "",
      error: "",
      closable: false,
    };
  },
  computed: {
    visible() {
      return 1;
    },
    user_group_names() {
      const names = [];
      for (const i in this.user_groups) {
        names.push(this.user_groups[i].name);
      }
      return names;
    },
  },
  methods: {
    addEmail() {
      if (this.validateEmail(this.email)) {
        if (!this.emails.includes(this.email)) {
          this.emails.unshift(this.email);
          this.email = "";
        }
        this.$refs.email_input.$emit("clear");
      }
    },
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    updateCurrentEmailValue(email) {
      this.email = email;
    },
    async sendInvitations() {
      if (this.selected_user_group == "Select user group") {
        this.error = "user group is required"
      } else if (this.selected_user_category == "Select user category") {
        this.error = "user category is required";
      } else if (!this.emails.length) {
        this.error = "you must atleast select one email";
      } else {
        const res = await Apis.create("user_invitations", {
          college: this.$store.state.user.user.college,
          category: this.selected_user_category,
          user_group: this.selected_user_group,
          emails: this.emails,
        });
        if(res.data.data) {
          for (const obj of res.data.data) {
            this.sent_emails.unshift(obj.email);
          }
        }
        else {
          this.error = res.data.message
        }
      }
    },
  },
  watch:{
    error() {
      if (this.error != "")
        this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: this.error,
          status: "danger",
          uptime: 5000,
        }).then(() => {
          this.error = ""
        })
    },
  },
  async beforeMount() {
    const category_res = await Apis.get("user_category/open");
    this.user_categories = category_res.data.data;
    const user_groups_res = await Apis.get(`user_groups/college/ALL`);
    this.user_groups = user_groups_res.data.data;
    setTimeout(() => {
      const dialog = document.querySelector(".v-dialog--active");
      dialog.style.maxWidth = "742px";
      dialog.style.setProperty("height", "432px", "important");
    }, 0);
  },
};
</script>
<style lang="scss">
// resize the modal
.v-dialog:not(.v-dialog--fullscreen) {
  height: 432px !important;
  width: 100% !important;
  max-width: 742px;
  .dialog-body {
    height: 100%;
    padding: 30px;
    background-color: white;
    padding-top: 50px;
    text-align: left;
    &.invite-users {
      max-width: 742px;
      margin: auto
    }
    .close {
      /* position: relative; */
      float: right;
      margin-top: -20px;
    }

    .centered {
      width: 60%;
      .email-input {
        width: 80%;
      }
      .add-email {
        width: 79.24px;
        height: 45.38px;
        &.send {
          width: 251.43px;
          height: 40.38px;
        }
        cursor: pointer;
        background: #193074;
        &.cancel{
          background: #ABABAB;
        }
        border-radius: 3.80952px;
        font-family: Inter;
        font-style: normal;
        font-weight: 500;
        font-size: 12.1905px;
        /* identical to box height, or 125% */

        text-align: center;

        color: #ffffff;
      }
    }
    .added-emails {
      // display: flex;
      // overflow-wrap: anywhere;
      // flex-direction:row;
      max-width: 100%;
      margin: 1rem 0;
      height: 5rem;
      overflow-x: hidden;
      overflow-y: auto;
    }
    .email {
      place-items: center;
      overflow-wrap: anywhere;
      .text {
        font-family: Inter;
        font-style: normal;
        font-weight: normal;
        font-size: 10.5736px;
        color: #000000;
        // width: 98%;
      }
      min-height: 25.38px;
      background: rgba(196, 196, 196, 0.33);
      border-radius: 24.3193px;
      padding: 0.25rem 0.6rem;
      margin: 0.3rem;
      display: inline-flex;
      border-radius: 20px;
      transition: all 0.5s;
    }
    .send-container {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .non-centered {
      .title {
        font-family: Inter;
        font-style: normal;
        font-weight: normal;
        font-size: 20px;
        /* or 126% */

        text-align: center;

        color: #000000;
      }
      .close {
        width: 145px;
        height: 38px;
        background: #193074;
        border-radius: 3.80952px;

        font-family: Inter;
        font-style: normal;
        font-weight: bold;
        font-size: 15px;

        color: #ffffff;
      }
      .added-emails {
        max-width: 80%;
        height: 13rem;
      }
    }
  }
}
// round the modal
.v-dialog.v-dialog--active {
  border-radius: none;
}
#kurious--dialog div {
  background-color: white;
  height: 100%;
  width: 100px;
}
/* Portrait phones and smaller */
@media (max-width: 700px) {
  .v-dialog:not(.v-dialog--fullscreen) {
    .dialog-body {
      .centered {
        width: 100%
      }
    }
  }
}
</style>
