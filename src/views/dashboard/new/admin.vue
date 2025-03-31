<template>
  <v-container fluid class="dashboard_page px-6 pl-lg-14 pt-9">
    <v-row class="page_title">
      <div class="upper">Dashboard</div>
      <div class="lower">Overview</div>
    </v-row>
    <v-row class="mt-6 px-4">
      <div class="v-col col-12 col-md-4 pa-0">
        <div class="row">
          <div class="v-col col-12 pa-0">
            <div class="college_info">
              <svg
                width="17"
                height="13"
                viewBox="0 0 17 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.39659 7.02735V9.64482L8.63995 12.1445L13.8833 9.64482V7.02735L8.63995 9.52703L3.39659 7.02735ZM8.63995 0.365906L0.400391 4.2921L8.63995 8.2183L15.3814 5.00536V9.52703H16.8795V4.2921L8.63995 0.365906Z"
                  fill="#FF7700"
                />
              </svg>
              <div class="college_name">
                {{ $store.state.sidebar_navbar.college.name }}
              </div>
              <div class="lower_content">
                <div class="number_of_users">
                  {{ user_statistics.total_users }} Users
                </div>
                <div class="account_type">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.30346 0.242859L0.936523 2.74135V6.48908C0.936523 9.95573 3.65308 13.1975 7.30346 13.9845C10.9538 13.1975 13.6704 9.95573 13.6704 6.48908V2.74135L7.30346 0.242859ZM5.88858 10.2368L3.05883 7.73832L4.05632 6.85761L5.88858 8.46913L10.5506 4.35287L11.5481 5.23984L5.88858 10.2368Z"
                      fill="#1B998B"
                    />
                  </svg>
                  <div class="text">Premium Account</div>
                </div>
              </div>
            </div>
          </div>
          <div class="v-col col-12 pa-0 mt-5">
            <div class="row ml-0 more_info_container">
              <div class="v-col col-4 pa-0">
                <div class="more_info">
                  <svg
                    width="27"
                    height="21"
                    viewBox="0 0 27 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="19.8789"
                      y="5.94427"
                      width="5.14918"
                      height="5.14918"
                      rx="2.57459"
                      fill="#FFAE34"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M18.0552 15.8748H26.8521C26.6652 13.6094 24.7673 11.8291 22.4537 11.8291C20.14 11.8291 18.2421 13.6094 18.0552 15.8748Z"
                      fill="#FFAE34"
                    />
                    <rect
                      x="14.73"
                      y="0.427307"
                      width="5.14918"
                      height="5.14918"
                      rx="2.57459"
                      fill="#FFAE34"
                    />
                    <rect
                      x="7.74121"
                      y="0.427307"
                      width="5.14918"
                      height="5.14918"
                      rx="2.57459"
                      fill="#FFAE34"
                    />
                    <rect
                      x="2.22461"
                      y="5.94427"
                      width="5.14918"
                      height="5.14918"
                      rx="2.57459"
                      fill="#FFAE34"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.400879 15.8748H9.19783C9.01093 13.6094 7.11305 11.8291 4.79936 11.8291C2.48566 11.8291 0.587781 13.6094 0.400879 15.8748Z"
                      fill="#FFAE34"
                    />
                    <rect
                      x="11.0522"
                      y="10.7257"
                      width="5.14918"
                      height="5.14918"
                      rx="2.57459"
                      fill="#FFAE34"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.22705 20.6562H18.024C17.8371 18.3908 15.9392 16.6105 13.6255 16.6105C11.3118 16.6105 9.41395 18.3908 9.22705 20.6562Z"
                      fill="#FFAE34"
                    />
                  </svg>

                  <div class="total_number">{{ total_faculties }}</div>
                  <div class="description">number of faculties</div>
                </div>
              </div>
              <div class="v-col col-4 pa-0">
                <div class="more_info">
                  <svg
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="1.33008"
                      y="0.44046"
                      width="3.58306"
                      height="3.58306"
                      rx="1.79153"
                      fill="#FFAE34"
                    />
                    <path
                      d="M0.84082 8.17662V17.3786C0.84082 18.4372 2.46949 18.3558 2.46949 17.3786C2.44235 16.6728 2.40435 13.6815 2.46949 12.574C2.53464 11.4665 3.93529 11.4339 3.93529 12.574C3.90814 13.5783 3.87014 15.8965 3.93529 17.1343C4.00043 18.372 5.48252 18.3558 5.48252 16.9714V9.56098C5.48252 8.58378 5.23822 7.52515 5.97112 7.52515H9.14701C10.1893 7.52515 10.3414 6.05936 9.14701 6.05936H2.7952C0.84082 6.05936 0.84082 6.87368 0.84082 8.17659V8.17662Z"
                      fill="#FFAE34"
                    />
                    <path
                      d="M17.6161 1.74338V12.4111H13.1373L14.6845 18.2743H13.1373L11.8344 12.4111H10.2872L8.90279 18.2743H7.35556L8.82136 12.4111H6.7041V10.701H15.9875V3.20918H6.86696V1.74338H10.0429V1.09192H11.5086V1.74338H17.6161Z"
                      fill="#FFAE34"
                    />
                  </svg>
                  <div class="total_number">{{ total_student_groups }}</div>
                  <div class="description">Student groups</div>
                </div>
              </div>
              <div class="v-col col-4 pa-0">
                <div class="more_info">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.9048 26.5095L15.2727 19.8315L7.64062 26.5095V5.52136C7.64062 4.46718 8.49446 3.61334 9.54864 3.61334H20.9967C22.0509 3.61334 22.9048 4.46718 22.9048 5.52136V26.5095Z"
                      fill="#FFAE34"
                    />
                  </svg>

                  <div class="total_number">{{ total_courses }}</div>
                  <div class="description">number of courses</div>
                </div>
              </div>
            </div>
          </div>
          <v-col class="col-12 mt-5 px-0">
            <div class="heading">Recently joined users</div>
            <div class="recent mt-5">
              <loader
                  v-if="!recentJoinedUsers.length"
                  type="2"
                  class="vertically--centered"
              />
              <div v-for="(user, i) in recentJoinedUsers" :key="i" class="record">
                <div class="name">{{ user.sur_name + ' ' + user.other_names }}</div>
                <div class="category">{{ user.category.name }}</div>
                <div class="time">{{ elapsedDuration(user.createdAt) }}</div>
              </div>
            </div>
          </v-col>
          <v-col class="col-12 mt-5 pl-0">
            <div class="more">More ...</div>
            <div class="mt-5 d-flex">
              <button
                class="lower_buttons mr-2"
                @click="showInviteUsers = true"
              >
                Invite users
              </button>
              <button class="lower_buttons" @click="showFacultyModal = true">
                New Faculty
              </button>
            </div>
          </v-col>
        </div>
      </div>
      <div class="v-col col-12 col-lg-8 py-0 mt-0 mt-md-n3" :class="{'px-0': $vuetify.breakpoint.width < 700 }">
        <v-row class="pa-0 mt-6 mt-md-0" :class="{'px-0': $vuetify.breakpoint.width < 700 }">
          <v-col class="col-12 col-lg-6 pt-0 mb-6 mb-md-0" :class="{'px-0': $vuetify.breakpoint.width < 700 }">
            <small-card
              :total="user_statistics.total_users"
              :series="computeUserSeries()"
              type="users"
              :headers="['Instuctors', 'Students', 'Staff']"
            >
              <template v-slot:icon>
                <svg
                  width="16"
                  height="18"
                  viewBox="0 0 16 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3.41162"
                    y="0.23822"
                    width="8.82547"
                    height="8.82547"
                    rx="4.41274"
                    fill="#FFAE34"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.285645 17.2588H15.3632C15.0429 13.3758 11.79 10.3245 7.82444 10.3245C3.85886 10.3245 0.605977 13.3758 0.285645 17.2588Z"
                    fill="#FFAE34"
                  />
                </svg>
              </template>
            </small-card>
          </v-col>
          <v-col class="col-12 col-lg-6 pa-0">
            <small-card
              :total="total_courses"
              :series="computeOtherSeries()"
              type="others"
              :headers="['Faculties', 'Courses', 'Student groups']"
            >
              <template v-slot:icon>
                <svg
                  width="21"
                  height="22"
                  viewBox="0 0 21 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.644531"
                    y="0.0536499"
                    width="4.3645"
                    height="4.3645"
                    rx="2.18225"
                    fill="#FFAE34"
                  />
                  <path
                    d="M0.0488281 9.477V20.6858C0.0488281 21.9753 2.0327 21.8761 2.0327 20.6858C1.99964 19.8262 1.95335 16.1825 2.0327 14.8334C2.11206 13.4844 3.81818 13.4447 3.81818 14.8334C3.78512 16.0568 3.73883 18.8805 3.81818 20.3883C3.89754 21.896 5.70285 21.8761 5.70285 20.1899V11.1633C5.70285 9.97297 5.40527 8.68346 6.29801 8.68346H10.1665C11.4362 8.68346 11.6214 6.89798 10.1665 6.89798H2.42945C0.0488313 6.89798 0.0488301 7.8899 0.0488281 9.47697V9.477Z"
                    fill="#FFAE34"
                  />
                  <path
                    d="M20.4828 1.64074V14.635H15.0272L16.9118 21.777H15.0272L13.4401 14.635H11.5554L9.86913 21.777H7.98446L9.76993 14.635H7.19092V12.552H18.4989V3.42622H7.3893V1.64074H11.2578V0.847198H13.0433V1.64074H20.4828Z"
                    fill="#FFAE34"
                  />
                </svg>
              </template>
            </small-card>
          </v-col>
          <v-col class="col-12" :class="{'px-0': $vuetify.breakpoint.width < 700 }">
            <combined-statistics v-if="$store.state.sidebar_navbar.college">
              <template v-slot:icon>
                <svg
                  width="21"
                  height="22"
                  viewBox="0 0 21 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.644531"
                    y="0.0536499"
                    width="4.3645"
                    height="4.3645"
                    rx="2.18225"
                    fill="#FFAE34"
                  />
                  <path
                    d="M0.0488281 9.477V20.6858C0.0488281 21.9753 2.0327 21.8761 2.0327 20.6858C1.99964 19.8262 1.95335 16.1825 2.0327 14.8334C2.11206 13.4844 3.81818 13.4447 3.81818 14.8334C3.78512 16.0568 3.73883 18.8805 3.81818 20.3883C3.89754 21.896 5.70285 21.8761 5.70285 20.1899V11.1633C5.70285 9.97297 5.40527 8.68346 6.29801 8.68346H10.1665C11.4362 8.68346 11.6214 6.89798 10.1665 6.89798H2.42945C0.0488313 6.89798 0.0488301 7.8899 0.0488281 9.47697V9.477Z"
                    fill="#FFAE34"
                  />
                  <path
                    d="M20.4828 1.64074V14.635H15.0272L16.9118 21.777H15.0272L13.4401 14.635H11.5554L9.86913 21.777H7.98446L9.76993 14.635H7.19092V12.552H18.4989V3.42622H7.3893V1.64074H11.2578V0.847198H13.0433V1.64074H20.4828Z"
                    fill="#FFAE34"
                  />
                </svg>
              </template>
            </combined-statistics>
          </v-col>
        </v-row>
      </div>
    </v-row>
    <invite-users-dialog
      v-if="showInviteUsers"
      @closeModal="showInviteUsers = false"
    />
    <faculty-dialog
      v-if="showFacultyModal"
      @closeModal="showFacultyModal = false"
    />
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Apis from "@/services/apis";
import {elapsedDuration} from "../../../services/global_functions";
export default {
  name: "ApplicationDashboard",
  data: () => ({
    showInviteUsers: false,
    showFacultyModal: false,
    recentJoinedUsers: [],
    user_statistics: {},
    total_faculties: 0,
    total_courses: 0,
    total_student_groups: 0,
  }),
  computed:{
    ...mapGetters("chat", ["socket"]),
  },
  components: {
    InviteUsersDialog: () => import("@/components/dashboard/InviteUsersDialog"),
    FacultyDialog: () => import("@/components/dashboard/addFaculty"),
    SmallCard: () => import("@/components/dashboard/information-card"),
    loader: () => import("@/components/loaders"),
    CombinedStatistics: () =>
      import("@/components/dashboard/combined-statistics"),
  },
  methods: {
    elapsedDuration,
    ...mapActions("modal", ["set_modal"]),
    computeUserSeries() {
      const res = [];
      res.push(this.user_statistics.total_instructors);
      res.push(this.user_statistics.total_students);
      res.push(this.user_statistics.total_staff);
      return res;
    },
    computeOtherSeries() {
      const res = [];
      res.push(this.total_faculties);
      res.push(this.total_courses);
      res.push(this.total_student_groups);
      return res;
    },
  },
  async beforeMount() {
    let res = await Apis.get("user/statistics");
    this.user_statistics = res.data.data;

    res = await Apis.get("faculty/statistics");
    this.total_faculties = res.data.data.total_faculties;

    res = await Apis.get("course/statistics");
    this.total_courses = res.data.data.total_courses;

    res = await Apis.get("user_groups/statistics");
    this.total_student_groups = res.data.data.total_student_groups;

    this.socket.emit("users/recentlyJoined");

    this.socket.on("res/users/recentlyJoined",(users)=>{
      this.recentJoinedUsers = users;
    });

    this.socket.on("res/users/new", ({user}) => {
      console.log(this.recentJoinedUsers, user)
      if(this.recentJoinedUsers.indexOf(user) == -1) {
        this.recentJoinedUsers.unshift(user)
        this.recentJoinedUsers.pop()
      }
    });

  },
};
</script>

<style lang="scss">
@import '../../../assets/sass/imports/dashboard';
</style>