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
      <div class="tabular-users mb-14">
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
                <table-row :data="user"
                           v-for="(user, i) in statistics.students" :key="user._id" @select="handleRowSelect(i)"
                           :selected="selected_users.has(i)" :ref="`row${i}`">
                  <template #cols>
                    <td class="row--image">
                      <img v-if="user.profile" :src="user.profile + '?width=50'" class="img" alt=" profile pic">
                      <v-avatar v-else size="30" class="profile-avatar img">
                        {{ `${user.sur_name} ${user.other_names}` | computeText }}
                      </v-avatar>
                    </td>
                    <td>{{ user.sur_name }} {{ user.other_names }}</td>
                    <td>{{ user.gender }}</td>
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
    </div>
  </div>
</template>

<script>
import TableHeader from "../../components/reusable/ui/table-header";
import TableUi from "../../components/reusable/table/TableUi";
import TableHeadRow from "../../components/reusable/table/TableHeadRow";
import SelectUi from "@/components/reusable/ui/select-ui";
import TableRow from "../../components/reusable/table/TableRow";
import {mapActions, mapGetters} from "vuex";
import Apis from '../../services/apis'

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
      options: {
        coloredRows: false,
        keysToShow: [" ", "User name", "Gender", "Course progress", "Perfomance (%)", "Attendace"],
      },
    }
  }
}
</script>

<style lang="scss">
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
</style>