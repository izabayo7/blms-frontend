<template>
  <div v-if="selected_course" class="students-page bg-one d-flex justify-center">
    <div class="users-page-container d-flex flex-column">
      <div class="header">
        <div class="header-wrapper row ">
          <div class="heading col-12 col-md-2 d-flex align-center">
            <div class="text-content">
              <h4>Dashboard</h4>
              <h2>Students</h2>
            </div>
          </div>
          <div class=" hidden-sm-and-down col-12 col-md-4">
            <select-ui
                :label="selected_course"
                name="role"
                id="user_group"
                :options="courseNames"
                @input="
                (e) => {
                  selected_course = e;
                }
              "
            />
          </div>
          <div class="col-12 hidden-sm-and-down col-md-3">
            <button class="mx-auto" @click="notifyStudents">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0)">
                  <path
                      d="M11.9289 5.8542C11.7674 5.71477 11.7495 5.47092 11.889 5.30942L13.0176 4.00206C13.1572 3.84091 13.4009 3.82266 13.5624 3.96209C13.7239 4.10151 13.7418 4.34536 13.6023 4.50686L12.4737 5.81423C12.3326 5.97678 12.0894 5.99244 11.9289 5.8542Z"
                      fill="#193074"/>
                  <path
                      d="M15.0688 8.9173L13.3457 8.79881C13.1329 8.78417 12.9723 8.59982 12.9869 8.38697C13.0024 8.17418 13.1863 8.01454 13.3987 8.02813L15.1218 8.14663C15.3347 8.16127 15.4953 8.34561 15.4807 8.55847C15.4659 8.76999 15.2834 8.93148 15.0688 8.9173Z"
                      fill="#193074"/>
                  <path
                      d="M14.3491 6.7487L12.9232 7.34313C12.7262 7.42527 12.5003 7.33231 12.4181 7.13527C12.336 6.93824 12.429 6.71234 12.626 6.6302L14.0519 6.03577C14.2489 5.95363 14.4748 6.04659 14.5569 6.24362C14.6391 6.44065 14.5461 6.66656 14.3491 6.7487Z"
                      fill="#193074"/>
                  <path
                      d="M9.56831 3.30414C9.37128 3.38628 9.27831 3.61218 9.36045 3.80921L9.57264 4.3182C8.62787 5.68048 7.33229 6.8467 5.89041 7.66341L7.44964 11.4035C9.04466 10.9542 10.785 10.8547 12.4177 11.1425L12.6298 11.6515C12.712 11.8485 12.9379 11.9415 13.1349 11.8593C13.3319 11.7772 13.4249 11.5513 13.3428 11.3542L10.0734 3.51199C9.99124 3.31496 9.76534 3.22199 9.56831 3.30414Z"
                      fill="#193074"/>
                  <path
                      d="M7.65554 14.2176C7.08099 13.7636 6.50814 13.1879 6.47195 12.4862L4.62985 13.0241C4.49137 13.0646 4.35202 13.0892 4.21304 13.1049C4.26736 13.973 4.60236 14.7098 4.8579 15.2589C4.92313 15.3997 4.98442 15.531 5.03536 15.6532C5.11751 15.8502 5.34341 15.9432 5.54044 15.8611L7.67924 14.9694C7.80281 14.9179 7.89099 14.806 7.91192 14.6738C7.93318 14.5416 7.88439 14.4079 7.78303 14.3206L7.65554 14.2176Z"
                      fill="#193074"/>
                  <path
                      d="M2.39248 11.317C2.7225 12.1086 3.59199 12.5241 4.41514 12.2835L6.70118 11.6156L5.2131 8.04614L3.12962 9.1999C2.37933 9.61526 2.06246 10.5253 2.39248 11.317Z"
                      fill="#193074"/>
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="13.1824" height="13.1824" fill="white"
                          transform="translate(0 5.58936) rotate(-22.6309)"/>
                  </clipPath>
                </defs>
              </svg>

              Make anouncement
            </button>
          </div>
          <div class="col-12 mt-6 mt-md-0 col-md-3 d-flex">
            <div>
              <div class="big">{{ statistics ? Math.round(statistics.total_attendance) : 0 }}%</div>
              <div class="small">Attendance</div>
            </div>
            <div class="ml-auto">
              <div class="big">{{ statistics ? Math.round(statistics.total_perfomance) : 0 }}%</div>
              <div class="small">Performance</div>
            </div>
          </div>
          <div class=" hidden-md-and-up col-12 col-md-4">
            <select-ui
                :label="selected_course"
                name="role"
                id="user_group1"
                :options="courseNames"
                @input="
                (e) => {
                  selected_course = e;
                }
              "
            />
          </div>
        </div>
      </div>
      <div v-if="statistics.students.length>0" class="tabular-users students-table mb-14">
        <div class="table-wrapper mt-6">
          <div class="table-header">
            <table-header/>
          </div>

          <div class="table">
            <table-ui :options="options">
              <template #tableHeaderRow>
                <table-head-row @select="handleSelect" :cols="options.keysToShow"/>
              </template>

              <!--              rows-->
              <template v-if="statistics" #tableRows>
                <table-row :options="options" :data="user"
                           v-for="(user, i) in statistics.students" :key="user._id" @select="handleRowSelect(i)"
                           :selected="selected_users.has(i)" :ref="`row${i}`">
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
                        @mouseleave="mouseOutPic($event,'user-profile-card')">{{ user.sur_name }} {{ user.other_names }}
                    </td>
                    <td>{{ user.gender }}</td>
                    <td v-if="$store.state.sidebar_navbar.college.users_verification_link">
                      <div :class="`payment-status ${user.paid ? 'paid' : 'pending'}`">
                        {{user.paid ? "Paid" : "Pending"}}
                      </div>
                    </td>
                    <td>
                      <progress :value="user.progress" max="100"></progress>
                      <p class="text-caption mb-0 text-left ml-1">
                        {{ Math.round(user.progress) }}%
                      </p>
                    </td>
                    <td>{{ Math.round(user.perfomance) }}</td>
                    <td>{{ Math.round(user.attendance) }}%</td>
                  </template>
                </table-row>
              </template>
            </table-ui>
          </div>
        </div>
      </div>
      <div v-else class="empty-faculties mt-md-10">
        <div class="wrapper">
          <div class="icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_3622_440)">
                <path d="M41.0715 25.6245H37.3594C37.7378 26.6605 37.9445 27.7784 37.9445 28.9436V42.9734C37.9445 43.4592 37.8599 43.9255 37.7061 44.3592H43.843C46.1355 44.3592 48.0005 42.4941 48.0005 40.2017V32.5535C48.0006 28.7329 44.8922 25.6245 41.0715 25.6245Z" fill="#3C3C3C" fill-opacity="0.51"/>
                <path d="M10.0564 28.9436C10.0564 27.7783 10.2631 26.6605 10.6415 25.6245H6.92932C3.10863 25.6245 0.000244141 28.7329 0.000244141 32.5536V40.2018C0.000244141 42.4942 1.86522 44.3593 4.15769 44.3593H10.2948C10.1409 43.9254 10.0564 43.4592 10.0564 42.9734V28.9436Z" fill="#3C3C3C" fill-opacity="0.51"/>
                <path d="M28.244 22.0132H19.7576C15.9369 22.0132 12.8285 25.1216 12.8285 28.9423V42.972C12.8285 43.7373 13.4489 44.3578 14.2143 44.3578H33.7873C34.5527 44.3578 35.1731 43.7373 35.1731 42.972V28.9423C35.1731 25.1216 32.0647 22.0132 28.244 22.0132Z" fill="#3C3C3C" fill-opacity="0.51"/>
                <path d="M24.0001 3.6416C19.4052 3.6416 15.667 7.3798 15.667 11.9748C15.667 15.0915 17.3872 17.8135 19.9277 19.2427C21.1326 19.9205 22.5218 20.3079 24.0001 20.3079C25.4783 20.3079 26.8675 19.9205 28.0725 19.2427C30.613 17.8135 32.3331 15.0914 32.3331 11.9748C32.3331 7.37989 28.595 3.6416 24.0001 3.6416Z" fill="#3C3C3C" fill-opacity="0.51"/>
                <path d="M9.36778 11.4087C5.93137 11.4087 3.13574 14.2043 3.13574 17.6407C3.13574 21.0771 5.93137 23.8728 9.36778 23.8728C10.2395 23.8728 11.0695 23.6922 11.8236 23.3677C13.1273 22.8064 14.2022 21.8128 14.8674 20.5683C15.3342 19.6948 15.5998 18.6983 15.5998 17.6407C15.5998 14.2044 12.8042 11.4087 9.36778 11.4087Z" fill="#3C3C3C" fill-opacity="0.51"/>
                <path d="M38.6332 11.4087C35.1968 11.4087 32.4011 14.2043 32.4011 17.6407C32.4011 18.6984 32.6667 19.6949 33.1336 20.5683C33.7988 21.8129 34.8737 22.8065 36.1774 23.3677C36.9314 23.6922 37.7615 23.8728 38.6332 23.8728C42.0696 23.8728 44.8652 21.0771 44.8652 17.6407C44.8652 14.2043 42.0696 11.4087 38.6332 11.4087Z" fill="#3C3C3C" fill-opacity="0.51"/>
              </g>
              <defs>
                <clipPath id="clip0_3622_440">
                  <rect width="48" height="48" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>
          <div class="title">No students</div>
          <div class="subtitle">To start having students, create a <br> course and publish it to a student group
          </div>
          <button @click="$router.push('/courses/new')" class="action">
            Create course
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableHeader from "../../components/reusable/ui/table-header";
import TableUi from "../../components/reusable/table/TableUi";
import TableHeadRow from "../../components/reusable/table/TableHeadRow";
import SelectUi from "@/components/reusable/ui/select-ui";
import TableRow from "../../components/reusable/table/TableRow";
import {mapActions, mapGetters, mapMutations} from "vuex";
import Apis from '../../services/apis'
import userSimpleCard from "../../mixins/user-simple-card.mixin";

export default {
  name: "Students",
  components: {TableRow, TableHeadRow, TableUi, TableHeader, SelectUi},
  computed: {
    ...mapGetters("courses", ["courses", "loaded"]),
    courseNames() {
      let res = [];
      for (const i in this.courses) {
        res.push(this.courses[i].name);
      }
      return res;
    },
    options(){
      const options = {
        coloredRows: false,
        link: {
          routeTo: '/users/{id}',
          paramPropertyName: 'user_name'
        },
        keysToShow: this.$store.state.sidebar_navbar.college.users_verification_link ?  [" ", "User name", "Gender","Payment status", "Course progress", "Perfomance (%)", "Attendace"] :  [" ", "User name", "Gender", "Course progress", "Perfomance (%)", "Attendace"],
      }

          // $store.state.sidebar_navbar.college.users_verification_link
      return options
    }
  },
  watch: {
    selected_course() {
      if (this.courseNames.includes(this.selected_course)) {
        this.loadStatistics()
      }
    },
    courses() {
      if (this.courses.length)
        this.selected_course = this.courses[0].name
    }
  },
  methods: {
    ...mapMutations("users", ["SET_SELECTED_USERS"]),
    handleSelect(value) {
      for (const i in this.statistics.students) {
        if (value.has(-1)) {
          if (!this.$refs[`row${i}`][0].selectSelected)
            this.$refs[`row${i}`][0].changeSelectedIndex()
        } else if (this.$refs[`row${i}`][0].selectSelected)
          this.$refs[`row${i}`][0].changeSelectedIndex()
      }

      this.selected_users = value
    },
    handleRowSelect(index) {
      const found = this.selected_users.has(index)
      if (found)
        this.selected_users.delete(index)
      else
        this.selected_users.add(index)

      this.$refs[`row${index}`][0].changeSelectedIndex()
    },
    notifyStudents() {
      if (!this.selected_users.size)
        return this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: "please select atleast one user",
          status: "info",
          uptime: 5000,
        })
      let users = []
      if (this.selected_users.has(-1)) {
        users = this.statistics.students
      } else
        for (const item of this.selected_users) {
          users.push(this.statistics.students[item])
        }

      this.SET_SELECTED_USERS(users)
      this.$router.push('/announcements/new?target=individual')
    },
    ...mapActions("courses", ["getCourses"]),
    async loadStatistics() {
      let course_id
      for (const i in this.courses) {
        if (this.courses[i].name === this.selected_course) {
          course_id = this.courses[i]._id
          break
        }
      }
      const res = await Apis.get(`course/statistics/course/${course_id}`)
      this.statistics = res.data.data
    }
  },
  mixins: [userSimpleCard],
  created() {
    this.getCourses(!this.loaded);
    if (this.courses.length)
      this.selected_course = this.courses[0].name
  },
  data() {
    return {
      statistics: undefined,
      selected_course: undefined,
      selected_users: new Set([]),
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/sass/imports/tableEmptyState';
.students-page {
  height: 100%;
  width: 100%;
  padding-top: 24px;

  .users-page-container {
    height: 100%;
    width: 90%;

    .header {
      h4 {
        font-family: Inter;
        font-style: normal;
        font-weight: 500;
        font-size: 16.5496px;
        line-height: 13px;
        /* identical to box height, or 80% */

        margin-bottom: 14px;
        color: #343434;
      }

      h2 {
        font-family: Inter;
        font-style: normal;
        font-weight: 600;
        font-size: 24.8244px;
        line-height: 13px;
        /* identical to box height, or 53% */


        color: #343434;
      }
    }

    .my-select .select-container {
      border: 1.5px solid #193074 !important;

      select {
        font-family: Inter;
        font-style: normal;
        font-weight: bold;
        font-size: 12px;
        line-height: 23px;
        /* identical to box height, or 190% */


        color: #193074;
      }
    }

    button {
      font-family: Inter;
      font-style: normal;
      font-weight: bold;
      font-size: 15px;
      line-height: 30px;
      /* identical to box height, or 200% */


      /* primary color/ default */

      color: #193074;
    }

    .big {
      font-family: Inter;
      font-style: normal;
      font-weight: 900;
      font-size: 30px;
      line-height: 13px;
      /* or 44% */

      display: flex;
      align-items: center;
      margin-bottom: 15px;
      color: #343434;
    }

    .small {
      font-family: Inter;
      font-style: normal;
      font-weight: 500;
      font-size: 16.5496px;
      line-height: 13px;
      /* or 80% */


      color: #343434;
    }

    progress {
      max-width: 114px;
    }
  }
}
/* Portrait phones and smaller */
@media (max-width: 700px) {
  .students-page {
    .users-page-container {
      .students-table{
        overflow: auto;
        .table-wrapper{
          min-width: 808px;
          overflow: auto;
        }
      }
    }
  }
}
</style>