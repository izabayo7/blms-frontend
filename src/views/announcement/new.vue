<template>
  <v-container fluid class="announcements_page px-6 pl-md-14 pr-md-9 pt-9">
    <v-row class="page_title">
      <div class="col-4 col-md-6">
        <div class="upper">Dashboard</div>
        <div class="lower">Anouncements</div>
      </div>
      <div class="col-8 col-md-6 text-right">

      </div>
      <div class="col-12 col-md-5">
        <div class="row">
          <div class="col-12">
            <div class="announcement-container">
              <div class="head">
                <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M15.3227 5.26241C15.1041 5.07365 15.0799 4.74353 15.2686 4.52488L16.7966 2.75495C16.9856 2.53679 17.3155 2.51209 17.5341 2.70084C17.7528 2.8896 17.777 3.21972 17.5882 3.43836L16.0603 5.2083C15.8693 5.42837 15.54 5.44957 15.3227 5.26241Z"
                      fill="#2D3E70"/>
                  <path
                      d="M19.5783 9.41017L17.2455 9.24974C16.9573 9.22992 16.7399 8.98036 16.7597 8.69219C16.7807 8.40411 17.0297 8.18799 17.3173 8.20639L19.65 8.36681C19.9382 8.38663 20.1556 8.6362 20.1358 8.92437C20.1158 9.21073 19.8687 9.42936 19.5783 9.41017Z"
                      fill="#2D3E70"/>
                  <path
                      d="M18.6044 6.4734L16.674 7.27815C16.4073 7.38935 16.1015 7.26349 15.9903 6.99675C15.879 6.73001 16.0049 6.42418 16.2717 6.31297L18.202 5.50822C18.4688 5.39702 18.7746 5.52288 18.8858 5.78962C18.997 6.05636 18.8711 6.36219 18.6044 6.4734Z"
                      fill="#2D3E70"/>
                  <path
                      d="M12.131 1.81085C11.8642 1.92205 11.7384 2.22789 11.8496 2.49463L12.1368 3.1837C10.8578 5.02799 9.10382 6.60683 7.15178 7.7125L9.26269 12.7759C11.4221 12.1676 13.7781 12.033 15.9885 12.4226L16.2757 13.1116C16.3869 13.3783 16.6928 13.5042 16.9595 13.393C17.2262 13.2818 17.3521 12.976 17.2409 12.7092L12.8148 2.09225C12.7036 1.82551 12.3977 1.69965 12.131 1.81085Z"
                      fill="#2D3E70"/>
                  <path
                      d="M9.54039 16.5854C8.76256 15.9708 7.98703 15.1913 7.93803 14.2413L5.44417 14.9696C5.25669 15.0244 5.06804 15.0577 4.87988 15.079C4.95343 16.2543 5.40694 17.2517 5.7529 17.9951C5.84122 18.1857 5.92419 18.3635 5.99316 18.5289C6.10436 18.7957 6.41019 18.9216 6.67694 18.8103L9.57247 17.6032C9.73977 17.5335 9.85915 17.3819 9.88748 17.2031C9.91626 17.024 9.85021 16.843 9.71299 16.7248L9.54039 16.5854Z"
                      fill="#2D3E70"/>
                  <path
                      d="M2.41355 12.6584C2.86033 13.7301 4.03747 14.2926 5.15186 13.9669L8.24673 13.0627L6.23214 8.2303L3.4115 9.79227C2.39575 10.3546 1.96676 11.5867 2.41355 12.6584Z"
                      fill="#2D3E70"/>
                </svg>
                {{ announcement.title | trimString(18) }}
              </div>
              <div class="details">
                <div class="time">{{ announcement.createdAt | formatDate }}</div>
                <div class="targert">{{ selected_target_id }}</div>
                <div class="views vertically--centered">
                  <svg class="hidden-sm-and-down" width="17" height="17" viewBox="0 0 17 17" fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0)">
                      <path
                          d="M8.14475 3.05371C4.75154 3.05371 1.85374 5.16429 0.679688 8.14352C1.85374 11.1228 4.75154 13.2333 8.14475 13.2333C11.538 13.2333 14.4358 11.1228 15.6098 8.14352C14.4358 5.16429 11.538 3.05371 8.14475 3.05371ZM8.14475 11.5367C6.2717 11.5367 4.75154 10.0166 4.75154 8.14352C4.75154 6.27047 6.2717 4.75032 8.14475 4.75032C10.0178 4.75032 11.538 6.27047 11.538 8.14352C11.538 10.0166 10.0178 11.5367 8.14475 11.5367ZM8.14475 6.1076C7.0182 6.1076 6.10882 7.01698 6.10882 8.14352C6.10882 9.27007 7.0182 10.1794 8.14475 10.1794C9.27129 10.1794 10.1807 9.27007 10.1807 8.14352C10.1807 7.01698 9.27129 6.1076 8.14475 6.1076Z"
                          fill="#193074"/>
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect width="16.2874" height="16.2874" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                  <svg class="hidden-md-and-up" width="18" height="18" viewBox="0 0 18 18" fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0)">
                      <path
                          d="M11.9289 5.33711C11.7674 5.19768 11.7495 4.95383 11.889 4.79233L13.0176 3.48497C13.1572 3.32382 13.4009 3.30557 13.5624 3.445C13.7239 3.58442 13.7418 3.82827 13.6023 3.98977L12.4737 5.29714C12.3326 5.45969 12.0894 5.47535 11.9289 5.33711Z"
                          fill="#193074"/>
                      <path
                          d="M15.0688 8.40021L13.3457 8.28172C13.1329 8.26708 12.9723 8.08274 12.9869 7.86988C13.0024 7.65709 13.1863 7.49745 13.3987 7.51104L15.1218 7.62954C15.3347 7.64418 15.4953 7.82852 15.4807 8.04138C15.4659 8.2529 15.2834 8.41439 15.0688 8.40021Z"
                          fill="#193074"/>
                      <path
                          d="M14.3491 6.23161L12.9232 6.82604C12.7262 6.90818 12.5003 6.81522 12.4181 6.61818C12.336 6.42115 12.429 6.19525 12.626 6.11311L14.0519 5.51868C14.2489 5.43654 14.4748 5.5295 14.5569 5.72653C14.6391 5.92356 14.5461 6.14947 14.3491 6.23161Z"
                          fill="#193074"/>
                      <path
                          d="M9.56831 2.78705C9.37128 2.86919 9.27831 3.09509 9.36045 3.29212L9.57264 3.80111C8.62787 5.16339 7.33229 6.32961 5.89041 7.14632L7.44964 10.8864C9.04466 10.4371 10.785 10.3376 12.4177 10.6254L12.6298 11.1344C12.712 11.3314 12.9379 11.4244 13.1349 11.3422C13.3319 11.2601 13.4249 11.0342 13.3428 10.8372L10.0734 2.9949C9.99124 2.79787 9.76534 2.70491 9.56831 2.78705Z"
                          fill="#193074"/>
                      <path
                          d="M7.65554 13.7006C7.08099 13.2466 6.50814 12.6708 6.47195 11.9691L4.62985 12.507C4.49137 12.5475 4.35202 12.5721 4.21304 12.5878C4.26736 13.4559 4.60236 14.1927 4.8579 14.7418C4.92313 14.8826 4.98442 15.0139 5.03536 15.1361C5.11751 15.3332 5.34341 15.4261 5.54044 15.344L7.67924 14.4523C7.80281 14.4008 7.89099 14.2889 7.91192 14.1568C7.93318 14.0245 7.88439 13.8908 7.78303 13.8035L7.65554 13.7006Z"
                          fill="#193074"/>
                      <path
                          d="M2.39248 10.7999C2.7225 11.5915 3.59199 12.007 4.41514 11.7664L6.70118 11.0985L5.2131 7.52905L3.12962 8.68281C2.37933 9.09817 2.06246 10.0083 2.39248 10.7999Z"
                          fill="#193074"/>
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect width="13.1824" height="13.1824" fill="white"
                              transform="translate(0 5.07227) rotate(-22.6309)"/>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              <div class="new">New</div>
            </div>
          </div>
          <div class="col-12">
            <div class="input-group">
              <div class="label">Announcement title</div>
              <input v-model="announcement.title" type="text">
            </div>
            <div class="d-flex mb-4 target">
              <button class="button" :class="{'outlined' : target_type === 'individual'}"
                      @click="target_type = 'groups'">Groups
              </button>
              <button class="button ml-auto" :class="{'outlined' : target_type === 'groups'}"
                      @click="target_type = 'individual'">Individuals
              </button>
            </div>
            <div v-if="target_type === 'groups'">
              <div class="input-group">
                <SelectUi
                    label="Select target type"
                    name="role"
                    id="target_type"
                    :options="target_types"
                    @input="
                              (e) => {
                                selected_target_type = e;
                              }
                            "
                />
              </div>
              <div class="input-group">
                <SelectUi
                    label="Select target"
                    name="role"
                    id="target_id"
                    :options="select_options"
                    @input="
                              (e) => {
                                selected_target_id = e;
                              }
                            "
                />
              </div>
            </div>
            <div v-else-if="target_type === 'individual'">
              <div class="row ma-0 group-members">
                <label for="group_members_input">Add users</label>
                <div class="members input-group">
                  <input
                      @input="getUsers"
                      v-model="currentMember"
                      type="text"
                      id="group_members_input"
                  />
                  <transition name="member">
                    <div
                        class="found-members"
                        v-show="showFoundUsers"
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
                            v-for="user in foundUsers"
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
                      {{ member.sur_name + " " + member.other_names }}
                    </chip>
                  </transition-group>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-7 pt-0">
        <img :src="$store.state.sidebar_navbar.college.logo" alt="" class="college-logo">
        <Editor
            ref="editor"
            mode="edit"
            class="editor-container"
            :inverted="true"
            :defaultContent="'<ol><li><p>Write your content here</p></li></ol>'"
        />
        <div class="actions mb-12 mb-md-0">
          <button class="button" @click="validate">Send</button>
          <button class="cancel button mx-auto" @click="$router.push('/announcements')">Cancel</button>
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import SelectUi from "@/components/reusable/ui/select-ui";
import Apis from "@/services/apis";
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

export default {
  name: "CreateAnnouncement",
  components: {
    Editor: () => import("@/components/reusable/Editor"),
    Member: () => import("@/components/messages/Member"),
    chip: () => import("@/components/reusable/ui/Chip"),
    SelectUi
  },
  computed: {
    ...mapGetters("users", ["selected_users"]),
    ...mapState("sidebar_navbar", {
      confirmed: "send_confirmation",
    }),
  },
  data: () => ({
    announcement: {
      title: "",
      target: "",
      content: "",
      createdAt: new Date(),
    },
    showFoundUsers: false,
    target_types: ['course', 'student group', 'faculty'],
    selected_target_type: '',
    selected_target_id: '',
    target_type: 'groups',
    select_options: [],
    users: [],
    courses: [],
    student_groups: [],
    faculties: [],
    error: "",
    currentMember: "",
    userLoading: false,
    foundUsers: [],
    NotFoundText: ""
  }),
  methods: {
    ...mapActions("users", ["searchUser"]),
    ...mapActions("modal", ["set_modal"]),
    ...mapActions("announcement", ["addAnnouncement"]),
    ...mapMutations("sidebar_navbar", {setConfirmation: "SET_SEND_CONFIRMATION"}),
    outsideClickDetector() {
      const self = this
      let el = document.querySelector('.found-members')
      document.addEventListener("click", function (e) {
        if (e)
          if (!el || !el.contains(e.target)) {
            self.toogleshowFoundUsers(false)
          }
      });
    },
    toogleshowFoundUsers(value) {
      this.showFoundUsers = value
    },
    addMember(user) {
      const membersNotAvailable = this.foundUsers.length <= 0;
      const disabled = this.disabled(user.email);

      if (membersNotAvailable || this.currentMember.length <= 0 || disabled)
        return;

      this.users.unshift(user);
    },
    closed(i) {
      this.users.splice(i, 1);
    },
    disabled(email) {
      return this.users.some((member) => member.email === email);
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
      this.toogleshowFoundUsers(true)
      this.searchUser({query: this.currentMember}).then((result) => {
        this.userLoading = false;
        this.foundUsers = result;

        //tell user that we didnt find the user with such id
        this.NotFoundText = result.length > 0 ? "" : "No user found";
      });
    },
    async computeOptions() {

      this.select_options = []

      if (this.selected_target_type === 'college')
        this.select_options = [this.$store.state.sidebar_navbar.college.name]
      else if (this.selected_target_type === 'student group') {
        if (this.$store.state.user.user.category.name === 'INSTRUCTOR') {
          const res = await Apis.get('user_groups/user')
          this.student_groups = res.data.data
        } else {
          const res = await Apis.get('user_groups/college/ALL')
          this.student_groups = res.data.data
        }

        this.student_groups.map(x => {
          this.select_options.push(x.name)
        })
      } else if (this.selected_target_type === 'faculty') {
        if (this.$store.state.user.user.category.name === 'INSTRUCTOR') {
          const res = await Apis.get('faculty/user')
          this.faculties = res.data.data
        } else {
          const res = await Apis.get('faculty/ALL')
          this.faculties = res.data.data
        }

        this.faculties.map(x => {
          this.select_options.push(x.name)
        })
      } else if (this.selected_target_type === 'course') {
        if (this.$store.state.user.user.category.name === 'INSTRUCTOR') {
          const res = await Apis.get('course/user')
          this.courses = res.data.data
        } else {
          const res = await Apis.get('course/college')
          this.courses = res.data.data
        }

        this.courses.map(x => {
          this.select_options.push(x.name)
        })
      }
    },
    validate() {
      this.announcement.content = this.$refs.editor.getHTML();
      if (this.announcement.title === "")
        return this.error = "Announcement title is required"
      if (this.announcement.title.length < 5)
        return this.error = "Announcement title too short"
      if (this.announcement.content === '<ol><li><p>Write your content here</p></li></ol>')
        return this.error = "Announcement content is required"
      this.announcement.createdAt = undefined
      if (this.target_type === 'groups') {
        if (this.selected_target_id === 'Select target')
          return this.error = "Announcement target is required"

        this.announcement.target = {
          type: this.selected_target_type === 'student group' ? 'student_group' : this.selected_target_type,
          id: this.findId()
        }
      } else {
        if (this.users.length === 0)
          return this.error = "Please select users to send the announcement"
        this.announcement.specific_receivers = this.users.map(x => x.user_name)
        this.announcement.target = undefined
      }
      this.set_modal({
        template: 'action_confirmation',
        method: {
          action: 'sidebar_navbar/SET_SEND_CONFIRMATION',
          parameters: true,
        },
        title: 'Create Announcement',
        message: `Are you sure you want to send this announcement to ${this.target_type == 'individual' ? this.selected_users.length :'all '} users ${this.target_type != 'individual' ? 'in '+this.selected_target_type+' ('+this.selected_target_id+')':''}`,
      })
    },
    findId() {
      if (this.selected_target_type === 'college')
        return this.$store.state.sidebar_navbar.college._id
      else if (this.selected_target_type === 'student group') {
        for (const i in this.student_groups) {
          if (this.student_groups[i].name === this.selected_target_id)
            return this.student_groups[i]._id
        }
      } else if (this.selected_target_type === 'faculty') {
        for (const i in this.faculties) {
          if (this.faculties[i].name === this.selected_target_id)
            return this.faculties[i]._id
        }
      } else if (this.selected_target_type === 'course') {
        for (const i in this.courses) {
          if (this.courses[i].name === this.selected_target_id)
            return this.courses[i]._id
        }
      }
    },
    async saveAnnouncement() {

      const response = await Apis.create(`announcement/${this.target_type === 'groups' ? 'group' : 'specific_users'}`, this.announcement)
      if (response.data.status !== 201)
        this.error = response.data.message
      else {
        this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: "Announcement was successfully created",
          status: "success",
          uptime: 2000,
        })
        this.addAnnouncement(response.data.data)
        this.$router.push('/announcements')
      }
    }
  },
  watch: {
    confirmed(){
      if(this.confirmed) {
        this.saveAnnouncement();
        this.setConfirmation(false)
      }
    },
    selected_target_type() {
      this.computeOptions()
    },
    error() {
      if (this.error !== "")
        this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: this.error,
          status: "danger",
          uptime: 2000,
        }).then(() => {
          this.error = ""
        })
    },
  },
  mounted() {
    if (this.$store.state.user.user.category.name === 'ADMIN') {
      this.target_types.push('college')
    }
    if (this.$route.query.target === 'individual') {
      this.target_type = 'individual'
      if (this.selected_users.length) {
        this.users = this.selected_users
      }
    }
    this.outsideClickDetector()
  }
};
</script>

<style lang="scss">
@import '../../assets/sass/imports/announcements';
</style>