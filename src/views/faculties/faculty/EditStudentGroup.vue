<template>
  <div v-if="facultyCollegeYear" class="edit-student-group-container row">
    <div class="col-2 pt-0">
      <button class="back" @click="$router.push(`/faculties/${$route.params.facultyId}/groups`)">Back</button>
    </div>
    <div class="col-10">
      <div class="d-md-flex row">
        <div class="col-12 pa-0"><div class="name">{{ facultyCollegeYear.name }}</div></div>
        <div class="col-md-2 mt-6 pa-0">
          <div class="sgroup-tabs">
            <button @click="activeTab = 1" :class="{'active':activeTab==1}">Details</button>
          </div>
          <div class="sgroup-tabs">
            <button @click="activeTab = 2" :class="{'active':activeTab==2}">Users</button>
          </div>
          <div class="sgroup-tabs">
            <button @click="activeTab = 3" :class="{'active':activeTab==3}">Courses</button>
          </div>
        </div>
        <div class="col-md-10 pa-0">
          <div v-if="activeTab == 1">
            <div class="input-group">
              <div class="label">student group name</div>
              <input class="input" v-model="name" type="text"/>
            </div>
            <div class="input-group mt-4">
              <div class="label">Users</div>
              <div class="d-flex">
                <div class="users-info">
                  <div>
                    <div class="number">{{ facultyCollegeYear.total_instructors }}</div>
                    <div class="label">Instructors</div>
                  </div>
                </div>
                <div class="users-info">
                  <div>
                    <div class="number">{{ facultyCollegeYear.total_students }}</div>
                    <div class="label">Students</div>
                  </div>
                </div>
                <div class="users-info">
                  <div>
                    <div class="number">{{ facultyCollegeYear.total_courses }}</div>
                    <div class="label">Courses</div>
                  </div>
                </div>
              </div>
            </div>
            <!--      <div class="input-group">-->
            <!--        <div class="label"></div>-->
            <!--        <div class="input"></div>-->
            <!--      </div>-->
            <div class="actions">
              <button class="add-email send cancel mr-4"
                      @click="$router.push(`/faculties/${$route.params.facultyId}/groups`)">
                Cancel
              </button>
              <button class="add-email send" @click="editStudentGroup">
                Save
              </button>
            </div>
          </div>

          <div v-else-if="activeTab == 2">
            <div class="tabular-users all-users-table">
              <div class="table-wrapper mt-6" v-if="usersOnUserGroups.length > 0">
                <!--          {{ size }}-->
                <div class="table-header">
                  <table-header>
                    <template #actions>
                      <div :class="{invisible:!size}" class="d-flex mt-n12">
                        <div class="action mx-2" @click="click('announce')">
                          <table-action-burner>
                            <template #icon>
                              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11"
                                   fill="none">
                                <path
                                    d="M3.14576 1.55151L2.41437 0.80361C1.18685 1.76071 0.378734 3.23559 0.307129 4.90921H1.33006C1.40678 3.52324 2.10237 2.30987 3.14576 1.55151ZM9.48281 4.90921H10.5057C10.429 3.23559 9.62091 1.76071 8.39851 0.80361L7.67223 1.55151C8.70539 2.30987 9.40609 3.52324 9.48281 4.90921ZM8.47523 5.17071C8.47523 3.56508 7.63642 2.22096 6.17363 1.86531V1.50967C6.17363 1.07557 5.83095 0.725159 5.40644 0.725159C4.98192 0.725159 4.63924 1.07557 4.63924 1.50967V1.86531C3.17133 2.22096 2.33765 3.55985 2.33765 5.17071V7.78574L1.31472 8.83175V9.35476H9.49816V8.83175L8.47523 7.78574V5.17071ZM5.40644 10.9238C5.47804 10.9238 5.54453 10.9185 5.61102 10.9029C5.94347 10.8296 6.21455 10.5995 6.34753 10.2857C6.39868 10.1602 6.42425 10.0242 6.42425 9.87776H4.37839C4.38351 10.4531 4.83871 10.9238 5.40644 10.9238Z"
                                    fill="#193074"/>
                              </svg>
                            </template>
                            <template #text>Send announcement</template>
                          </table-action-burner>
                        </div>
                        <!--                <div class="action mx-2" @click="click('invite')">-->
                        <!--                  <table-action-burner>-->
                        <!--                    <template #icon>-->
                        <!--                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="11" viewBox="0 0 14 11" fill="none">-->
                        <!--                        <path-->
                        <!--                            d="M12.0394 0.725159H1.84074C1.13959 0.725159 0.572292 1.29883 0.572292 1.99999L0.565918 9.64895C0.565918 10.3501 1.13959 10.9238 1.84074 10.9238H12.0394C12.7405 10.9238 13.3142 10.3501 13.3142 9.64895V1.99999C13.3142 1.29883 12.7405 0.725159 12.0394 0.725159ZM12.0394 3.27481L6.94005 6.46188L1.84074 3.27481V1.99999L6.94005 5.18705L12.0394 1.99999V3.27481Z"-->
                        <!--                            fill="#193074"/>-->
                        <!--                      </svg>-->
                        <!--                    </template>-->
                        <!--                    <template #text>Send invitations</template>-->
                        <!--                  </table-action-burner>-->
                        <!--                </div>-->
                        <div class="action mx-2" @click="click('delete')">
                          <table-action-burner>
                            <template #icon>
                              <svg width="10" height="12" viewBox="0 0 10 12" fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M0.891564 10.2864C0.891564 10.9875 1.46524 11.5612 2.16639 11.5612H7.2657C7.96685 11.5612 8.54052 10.9875 8.54052 10.2864V2.63742H0.891564V10.2864ZM9.17794 0.725182H6.94699L6.30958 0.0877686H3.12251L2.4851 0.725182H0.25415V2.00001H9.17794V0.725182Z"
                                    fill="#FF0808"/>
                              </svg>
                            </template>
                            <template #text>Remove user</template>
                          </table-action-burner>
                        </div>
                        <div class="action mx-2" @click="showAddUsers = true">
                          <table-action-burner>
                            <template #icon>
                              <svg width="17" height="17" viewBox="0 0 17 17" fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.5 1L8.5 16" stroke="black" stroke-width="1.95652" stroke-linecap="round"/>
                                <path d="M1 8.5L16 8.5" stroke="black" stroke-width="1.95652" stroke-linecap="round"/>
                              </svg>
                            </template>
                            <template #text>Add Users</template>
                          </table-action-burner>
                        </div>
                      </div>

                    </template>
                  </table-header>
                </div>
                <!--          <div class="table">-->
                <!--            <table-ui :options="options" @select="handleSelect" :data="users"/>-->
                <!--          </div>-->
                <div class="table">
                  <table-ui :options="options">
                    <template #tableHeaderRow>
                      <table-head-row @select="handleSelect" :cols="options.keysToShow"/>
                    </template>

                    <!--              rows-->
                    <template #tableRows>
                      <table-row :selected="selected_users.has(i)" @select="handleRowSelect(i)" :data="user"
                                 v-for="(user, i) in formatedUsers" :key="user._id" :ref="`row${i}`">
                        <template #cols>
                          <td @click="$router.push(`/users/${user.user_name}`)" class="row--image"
                              @mouseenter="mouseOnPic($event,user.user_name,'user-profile-card')"
                              @mouseleave="mouseOutPic($event,'user-profile-card')">
                            <img v-if="user.profile" :src="user.profile + '?width=50'" class="img" alt=" profile pic">
                            <v-avatar v-else size="30" class="profile-avatar img">
                              {{ `${user.sur_name} ${user.other_names}` | computeText }}
                            </v-avatar>
                          </td>
                          <td @click="$router.push(`/users/${user.user_name}`)"
                              @mouseenter="mouseOnPic($event,user.user_name,'user-profile-card')"
                              @mouseleave="mouseOutPic($event,'user-profile-card')">{{ user.sur_name }}
                            {{ user.other_names }}
                          </td>
                          <td @click="$router.push(`/users/${user.user_name}`)" :title="user.email">
                            {{ user.category | trimString(18) }}
                          </td>
                          <td @click="$router.push(`/users/${user.user_name}`)">{{ user.gender }}</td>
                          <td @click="$router.push(`/users/${user.user_name}`)">{{ user.date_joined }}</td>
                        </template>
                      </table-row>
                    </template>
                  </table-ui>
                </div>
              </div>
              <div v-else class="d-flex justify-center align-center loader">
                <div class="empty-faculties">
                  <div class="wrapper">
                    <div class="icon">
                      <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.95829 23.6142V30.7808L21.5 37.625L34.0416 30.7808V23.6142L21.5 30.4583L8.95829 23.6142ZM21.5 5.375L1.79163 16.125L21.5 26.875L37.625 18.0779V30.4583H41.2083V16.125L21.5 5.375Z"
                            fill="#989899"/>
                      </svg>
                    </div>
                    <div class="title">No users added</div>
                    <div class="subtitle">You can add Users to this user group <br> by
                      clicking on
                    </div>
                    <button @click="showAddUsers = true" class="action">
                      Add users
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div v-if="coursesByUserGroup.length > 0" class="faculties-container  row">
              <div class="col-12 col-md-6 px-0"
                   v-for="(course, i) in coursesByUserGroup"
                   :key="i">
                <student-course-card category="ongoing" :course="course"/>
              </div>
            </div>
            <div v-else class="empty-faculties">
              <div class="wrapper">
                <div class="icon">
                  <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8.95829 23.6142V30.7808L21.5 37.625L34.0416 30.7808V23.6142L21.5 30.4583L8.95829 23.6142ZM21.5 5.375L1.79163 16.125L21.5 26.875L37.625 18.0779V30.4583H41.2083V16.125L21.5 5.375Z"
                        fill="#989899"/>
                  </svg>
                </div>
                <div class="title">No courses created</div>
                <div class="subtitle">You can add Users to this user group <br> to start creating courses by
                  clicking on
                </div>
                <button @click="showAddUsers = true" class="action">
                  Add users
                </button>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
    <add-users-to-student-group-dialog
        :user_group_id="facultyCollegeYear._id"
        :added_users="usersOnUserGroups"
        v-if="showAddUsers"
        @closeModal="showAddUsers = false"
    />
  </div>
</template>
<script>

import {mapActions, mapGetters, mapMutations} from "vuex";
import Apis from "@/services/apis";
import TableHeader from "../../../components/reusable/ui/table-header";
import tableActionBurner from "../../../components/reusable/ui/table-action-burner";
import TableRow from "../../../components/reusable/table/TableRow";
import TableHeadRow from "../../../components/reusable/table/TableHeadRow";
import TableUi from "../../../components/reusable/table/TableUi";
import userSimpleCard from "../../../mixins/user-simple-card.mixin";
import moment from "moment";

export default {
  name: "EditStudentGroup",
  components: {
    TableHeader,
    // Search,
    tableActionBurner, TableRow, TableHeadRow, TableUi,
    StudentCourseCard: () => import("@/components/courses/StudentCourseCard"),
    AddUsersToStudentGroupDialog: () => import("@/components/dashboard/AddUsersToStudentGroupDialog")
  },
  mixins: [userSimpleCard],
  data() {
    return {
      size: 0,
      numberOfNewNotifications: 4,
      cardActive: false,
      showAddUsers: false,
      courses: [],
      name: "",
      error: "",
      activeTab: 1,
      selected_users: new Set([]),
    };
  },
  methods: {
    ...mapMutations("users", ["SET_SELECTED_USERS"]),
    ...mapActions("modal", ["set_modal"]),
    click(value) {
      if (!this.selected_users.size)
        return this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: "please select at least one user",
          status: "info",
          uptime: 5000,
        })

      if (value === 'announce') {
        let users = []

        if (this.selected_users.has(-1)) {
          users = this.usersOnUserGroups
        } else
          for (const item of this.selected_users) {
            users.push(this.usersOnUserGroups[item])
          }

        this.SET_SELECTED_USERS(users)
        this.$router.push('/announcements/new?target=individual')
      }

      else if (value === 'delete') {
        const ids = []

        for (const item of this.selected_users) {
          ids.push(this.usersOnUserGroups[item].user_user_group_id)
        }

        this.set_modal({
          template: 'action_confirmation',
          title: "Remove users",
          method: {action: 'users/removeUsers', parameters: {ids}},
          message: `Are you sure you want to remove ${this.selected_users.has(-1) ? 'All' : this.selected_users.size} user${this.selected_users.size > 1 || this.selected_users.has(-1) ? 's' : ''}?`,
        })
      }
      setTimeout(() => {
        this.loadUsers();
      }, 5000);
    },
    loadUsers(){
      this.$store.dispatch('users/loadUsersBasedOnUserGroups', {
        userGroupId: this.facultyCollegeYear._id,
        category: "ALL"
      })
    },
    loadCourses(){
      this.$store.dispatch('courses/getCourseByUserGroup',{Id:this.facultyCollegeYear._id})
    },
    handleRowSelect(index) {
      const found = this.selected_users.has(index)
      if (found) {
        this.selected_users.delete(index)
        this.size--
      } else {
        this.selected_users.add(index)
        this.size++
      }
      this.$refs[`row${index}`][0].changeSelectedIndex()
    },
    handleSelect(value) {
      for (const i in this.usersOnUserGroups) {
        if (value.has(-1)) {
          if (!this.$refs[`row${i}`][0].selectSelected)
            this.$refs[`row${i}`][0].changeSelectedIndex()
        } else if (this.$refs[`row${i}`][0].selectSelected)
          this.$refs[`row${i}`][0].changeSelectedIndex()
      }
      this.size = this.usersOnUserGroups.length
      this.selected_users = value
    },
    async editStudentGroup() {
      if (this.name === "")
        return this.error = "name is required"
      if (this.name.length < 5)
        return this.error = "name is too short"

      const res = await Apis.update("user_groups", this.$route.params.groupId, {
        name: this.name
      })
      if (res.data.status !== 200 && res.data.status !== 201) {
        this.error = res.data.message
      } else {
        this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: "Changes were successfuly saved",
          status: "success",
          uptime: 2000,
        })
      }
    }
  },
  computed: {
    formatedUsers() {
      let filteredUsers = [];

      this.usersOnUserGroups.map(user => {

        user.date_joined = moment(user.date_joined).format("DD MMM  YYYY")
        filteredUsers.push(user)
      })

      return filteredUsers;
    },
    ...mapGetters('users', ['usersOnUserGroups']),
    ...mapGetters('courses',['coursesByUserGroup']),
    options() {
      const options = {
        link: {
          routeTo: '/users/{id}',
          paramPropertyName: 'user_name'
        },
        keysToShow: [" ", "User name", "User type", "Gender", "Date joined"],
        showSelect: true
      }

      return options
    },
    ...mapGetters('faculties', ['faculty']),
    ...mapGetters('faculty_college_year', ['facultyCollegeYear']),
  },
  watch: {
    facultyCollegeYear() {
      this.name = this.facultyCollegeYear.name
      this.loadUsers();
      this.loadCourses();
    },
    showAddUsers() {
      if (!this.showAddUsers)
        this.loadUsers();
    },
    error() {
      if (this.error != "")
        this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: this.error,
          status: "danger",
          uptime: 2000,
        }).then(() => {
          this.error = ""
        })
    }
  },
  async mounted() {
    await this.$store.commit('faculty_college_year/SET_SELECTED_FACULTY_COLLEGE_YEAR', this.$route.params.groupId);
    await this.$store.dispatch('faculties/getFaculty', this.$route.params.facultyId);
    await this.$store.dispatch('faculty_college_year/getFacultyCollegeYearsByFaculty', {facultyId: this.$route.params.facultyId})
  },
};
</script>
<style lang="scss">
@import '../../../assets/sass/imports/tableEmptyState';

.edit-student-group-container {
  background-color: #FFFFFF;
  min-height: 68vh;
  padding: 46px 52px;

  .back {
    max-width: 184px;
    width: 100%;
    height: 25.33px;
    background: #F8F8F8;
    border-radius: 4.75155px;
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 12.354px;
    line-height: 15px;

    color: #193074;

  }
.table .table--wrapper{
  padding: 0;
}
  .users-info {
    margin-right: 25px;
    width: 81px;
    height: 61px;
    background: #E8E8E8;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    .number {
      font-family: Inter;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      color: #000000;
    }

    .label {
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 10.8279px;
      line-height: 15px;
      color: #000000;


    }
  }

  .sgroup-tabs {
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 16.2041px;
    color: #3C3C3C;

    .active {
      color: #193074;
    }
  }

  .name {
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    /* identical to box height */
    margin-bottom: 25px;

    color: #000000;
  }

  .label {
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 10.8279px;
    line-height: 15px;
    /* identical to box height, or 143% */

    margin-bottom: 4px;
    color: #000000;
  }

  .input {
    width: 320px;
    height: 41px;
    padding: 12px 20px;
    border: 1.54684px solid #BABABC;
    box-sizing: border-box;
    border-radius: 4px;

    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 12.3747px;
    line-height: 15px;
    /* identical to box height, or 125% */


    color: #000000;
  }

  .actions {
    margin-top: 20px;
  }

  .add-email {
    width: 79.24px;
    height: 45.38px;

    &.send {
      width: 158px;
      height: 40.38px;
    }

    cursor: pointer;
    background: #193074;

    &.cancel {
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

/* Portrait phones and smaller */
@media (max-width: 700px) {
  .student-group-container {
    .actions {
      .content {
        left: -129px;
      }
    }
  }
}
</style>