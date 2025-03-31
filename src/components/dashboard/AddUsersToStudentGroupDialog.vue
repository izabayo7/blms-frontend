<template>
  <v-dialog id="kurious--dialog" v-model="visible" :persistent="!closable">
    <div class="dialog-body invite-users">
      <div v-show="sent_emails.length == 0" class="pre-send">
        <div class="mx-auto centered">
          <div class="title">Send user Invitations</div>
          <div class="role my-2">
            <select-ui
                label="Select user type"
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
          <div class="my-1">
            <div class="ma-0 group-members">
              <div class="members input-group">

                <input-ui
                    ref="group_members_input"
                    class="group_members_input"
                    placeholder="Search user"
                    name="role"
                    :value="''"
                    :valid="true"
                    id="group_members_input"
                    type="text"
                    @input="updateCurrentSearchValue"
                />
                <transition name="member">
                  <div
                      class="found-members"
                      v-if="foundUsers.length > 0 || userLoading"
                  >
                    <svg
                        v-if="userLoading"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                    >
                      <path fill="none" d="M0 0h24v24H0z"/>
                      <path d="M12 3a9 9 0 0 1 9 9h-2a7 7 0 0 0-7-7V3z"/>
                    </svg>
                    <div class="no-user" v-if="NotFoundText.length > 0">
                      {{ NotFoundText }}
                    </div>
                    <transition-group name="members">
                      <div
                          class="member"
                          v-for="user in foundUsers.filter(e=>e.category == selected_user_category)"
                          @click="addMember(user)"
                          :key="user.email"
                      >
                        <member
                            :disabled="disabled(user.email)"
                            :user="user"
                        />
                      </div>
                    </transition-group>
                  </div>
                </transition>
              </div>
              <div class="added-members-list" v-if="users.length > 0">
                <transition-group name="chips">
                  <chip
                      v-for="(member, i) in users"
                      @closed="closed(i)"
                      :key="member.email"
                  >

                    <member
                        :disabled="false"
                        :user="member"
                    />
                  </chip>
                </transition-group>
              </div>
            </div>
          </div>
          <div class="send-container">
            <button class="add-email send cancel mr-4" @click="$emit('closeModal')">
              Cancel
            </button>
            <button class="add-email send" @click="addUsers">
              Add users
            </button>
          </div>
        </div>
      </div>
      <div v-show="sent_emails.length != 0" class="post-send">
        <div class="mx-auto non-centered">
          <div class="title">
            Users successfully added to student group
          </div>
          <div class="added-emails mx-auto customScroll my-5">
            <chip
                v-for="(member, i) in users"
                @closed="closed(i)"
                :key="member.email"
            >

              <member
                  :disabled="false"
                  :user="member"
              />
            </chip>
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
import Apis from "@/services/apis";
import InputUi from "@/components/reusable/ui/input-ui";
import {mapActions} from "vuex";

export default {
  components: {
    SelectUi, Member: () => import("@/components/messages/Member"),
    chip: () => import("@/components/reusable/ui/Chip"),
    InputUi
  },
  props: {
    user_group_id: {
      type: String,
      required: true
    },
    added_users:{
      type: Array
    }
  },
  data() {
    return {
      options: ["Principal", "Instructor", "Student"],
      emails: [],
      sent_emails: [],
      saved_users: [],
      failedUsers: [],
      foundUsers: [],
      user_categories: [],
      selected_user_category: "",
      email: "",
      users: [],
      error: "",
      currentMember: "",
      userLoading: false,
      closable: false,
      NotFoundText: ""
    };
  },
  computed: {
    visible() {
      return 1;
    },
  },
  methods: {
    closed(i) {
      this.users.splice(i, 1);
    },
    ...mapActions("users", ["searchUser"]),
    addMember(user) {
      const membersNotAvailable = this.foundUsers.length <= 0;
      const disabled = this.disabled(user.email);

      if (membersNotAvailable || this.currentMember.length <= 0 || disabled)
        return;

      this.users.unshift(user);
    },
    updateCurrentSearchValue(e) {
      this.currentMember = e;
        this.getUsers()
    },
    disabled(email) {
      return this.users.some((member) => member.email === email) || this.added_users.some((member) => member.email === email);
    },
    getUsers() {
      this.userLoading = true;
      this.NotFoundText = "";
      const EmptyStringRegex = /^\s+$/g; //regext to detect empty string

      if (
          EmptyStringRegex.test(this.currentMember) ||
          this.currentMember.length <= 0
      ) {
        this.foundUsers = [];
        this.userLoading = false;
        return;
      }

      this.searchUser({query: this.currentMember}).then((result) => {
        this.userLoading = false;
        this.foundUsers = result;

        //tell user that we didnt find the user with such id
        this.NotFoundText = result.length > 0 ? "" : "No user found";
      });
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
    async addUsers() {
      if (this.selected_user_category === "Select user category") {
        this.error = "user category is required";
      } else if (!this.users.length) {
        this.error = "you must at least select one user";
      } else {
        for (const i in this.users) {
          try {
            const res = await Apis.create("user_user_group?sendEmail=true", {
              user: this.users[i].user_name,
              user_group: this.user_group_id,
            });
            if (res.data.data) {
                this.sent_emails.unshift(this.users[i].email);
            } else {
              this.error = res.data.message
            }
          } catch (e) {
            console.log(e)
          }
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
    this.user_categories = category_res.data.data.filter(e => e !== 'ADMIN');
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
.group-members {
  .added-members-list {
    max-width: 92%;
    border-bottom: 0.5px solid lighten($secondary, 5);
    border-top: 0.5px solid lighten($secondary, 5);
    margin: 1rem 0;
    max-height: 15rem;
    overflow-x: hidden;
    overflow-y: auto;

    @include scroll-bar;

    /* aniamation of chips */
    .chips-enter-active,
    .chips-leave-active {
      //transition: all .4s;
    }

    .chips-enter,
    .chips-leave-to {
      opacity: 0;
    }
  }

  .members {
    width: 100%;

    input {
      //width: 100%;
    }
  }
}
</style>
