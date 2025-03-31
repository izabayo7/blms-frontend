<template>
  <v-dialog id="kurious--dialog" v-model="visible" :persistent="!closable">
    <input
        ref="file"
        type="file"
        id="file"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        hidden
        @change="handleFileUpload"
    />
    <div v-if="choice === 0" class="dialog-body invite-users">
      <div class="d-flex align-items-center centered first">
        <div class="d-flex">
          <button class="add-email ml-auto send mr-4" @click="choice = 1">
            Add users manually
          </button>
          <button class="add-email send" @click="choice = 2">
            Invite users by email
          </button>
        </div>
      </div>
      <div class="centered">
        <div class="">
          <button class="add-email send cancel small" @click="$emit('closeModal')">
            Cancel
          </button>
        </div>
      </div>
    </div>
    <div v-if="choice===1 || choice===4" class="dialog-body invite-users">
      <div v-show="saved_users.length === 0 && failedUsers.length === 0" class="pre-send">
        <div class="mx-auto centered">
          <div class="title">{{ choice === 4 ? 'Invite' : 'Create' }} users</div>
          <div class="d-flex my-6">
            <button class="add-email" @click="pickFile">Pick file</button>
            <div class="filename ml-2 d-flex align-center">{{ file ? file.name : 'please pick a xlsx file' }}</div>
          </div>
          <div class="added-emails customScroll my-3">
            The .xlsx file should contain the following columns
            <div v-if="choice === 4" class="columns">
              EMAIL, USER GROUP, USER CATEGORY
              <a href="https://docs.google.com/spreadsheets/d/1fY2596IFt-73vZmYX9bDfHWKgrGSd9DOlJDQkqJ-vZ8/edit?usp=sharing"
                 target="_blank">find sample here</a>
            </div>
            <div v-if="choice === 1" class="columns">
              FIRST NAME, LAST NAME, GENDER, PASSWORD, USER GROUP, USER CATEGORY
              <a href="http://docs.google.com/spreadsheets/d/15ZJ6ZYaxihVz2XpiV8Ub-cMMoBZZW74Tbxg6i9xgBu0/edit?usp=sharing"
                 target="_blank">find sample here</a>
            </div>
          </div>
          <div class="send-container">
            <button class="add-email send cancel mr-4" @click="$emit('closeModal')">
              Cancel
            </button>
            <button class="add-email send" :class="{disabled: file === undefined}"
                    :disabled="file === undefined" @click="uploadFile">
              Send
            </button>
          </div>
        </div>
      </div>
      <div v-show="saved_users.length !== 0 || failedUsers.length !== 0" class="post-send">
        <div class="mx-auto non-centered">
          <div v-if="choice === 4" class="title">
            Sent {{ saved_users.length }} invitations
          </div>
          <div v-else class="title">
            Added {{ saved_users.length }} new users
          </div>
          <div v-if="failedUsers.length" class="title text-left">
            Errors:
          </div>
          <div class="added-emails mx-auto customScroll my-5">
            <div v-for="(error, i) in failedUsers" :key="i" class="email">
              <div class="text">{{ error }}</div>
            </div>
          </div>
          <div class="send-container">
            <button class="close" @click="$emit('closeModal')">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="choice === 2" class="dialog-body invite-users">
      <div class="d-flex align-items-center centered first">
        <div class="d-flex">
          <button class="add-email send mr-4" @click="choice = 4">
            Upload file with required info
          </button>
          <button class="add-email ml-auto send" @click="choice = 3">
            Enter emails manually
          </button>
        </div>
      </div>
      <div class="centered">
        <div class="">
          <button class="add-email send cancel small mr-2" @click="choice=0">
            Back
          </button>
          <button class="add-email send cancel small" @click="$emit('closeModal')">
            Cancel
          </button>
        </div>
      </div>
    </div>
    <div v-else-if="choice === 3" class="dialog-body invite-users">
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
            <div v-if="selected_user_category === 'ADMIN'" class="hint normal">
              Admin accounts usage :{{ total_admins }} / 3
            </div>
          </div>
          <div v-if="selected_user_category !== 'ADMIN'" class="role my-2">
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
              <button @click="emails=emails.filter(x=>x!=email)" class="pl-1">
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
  components: {SelectUi, InputUi},
  props: {
    total_admins: {
      type: Number
    }
  },
  data() {
    return {
      options: ["Principal", "Instructor", "Student"],
      emails: [],
      sent_emails: [],
      saved_users: [],
      failedUsers: [],
      choice: 0,
      user_categories: [],
      user_groups: [],
      selected_user_group: "",
      selected_user_category: "",
      email: "",
      error: "",
      closable: false,
      file: undefined
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
    pickFile() {
      document.getElementById("file").click();
    },
    handleFileUpload() {
      this.file = document.getElementById("file").files[0]
      if (this.file.name.split('.')[this.file.name.split('.').length - 1].toLowerCase() !== 'xlsx') {
        document.getElementById("file").value = ""
        this.file = undefined
        this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: "invalid file format",
          status: "danger",
          uptime: 2000,
        });
      }
    },
    async uploadFile() {
      const formData = new FormData()
      formData.append('file', this.file)

      if (this.choice === 1) {
        const res = await Apis.create("user/multiple", formData);
        if (res.data.status === 201) {
          res.data = res.data.data
          if (res.data.savedUsers.length)
            this.saved_users = res.data.savedUsers
          if (res.data.creationErrors.length)
            this.failedUsers = res.data.creationErrors
        } else {
          this.error = res.data.message
        }
      } else {
        const res = await Apis.create("user_invitations/multiple", formData);
        if (res.data.status === 201) {
          res.data = res.data.data
          if (res.data.savedInvitations.length)
            this.saved_users = res.data.savedInvitations
          if (res.data.creationErrors.length)
            this.failedUsers = res.data.creationErrors
        } else {
          this.error = res.data.message
        }
      }
    },
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
      if (this.selected_user_group === "Select user group" && this.selected_user_category !== "ADMIN") {
        this.error = "user group is required"
      } else if (this.selected_user_category === "Select user category") {
        this.error = "user category is required";
      } else if (!this.emails.length) {
        this.error = "you must atleast select one email";
      } else {
        const res = await Apis.create("user_invitations", {
          college: this.$store.state.user.user.college,
          category: this.selected_user_category,
          user_group: this.selected_user_group === "Select user group" ? undefined : this.selected_user_group,
          emails: this.emails,
        });
        if (res.data.data) {
          for (const obj of res.data.data) {
            this.sent_emails.unshift(obj.email);
          }
        } else {
          this.error = res.data.message
        }
      }
    },
  },
  watch: {
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
    // setTimeout(() => {
    //   const dialog = document.querySelector(".v-dialog--active");
    //   dialog.style.maxWidth = "742px";
    //   dialog.style.setProperty("height", "432px", "important");
    // }, 0);
  },
};
</script>
<style lang="scss">
@import '../../assets/sass/imports/dialog';
</style>
