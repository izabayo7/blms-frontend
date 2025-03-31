<template>
  <div class="courses-container">
    <!-- view of the student -->
    <v-container v-if="userCategory == 'STUDENT'" id="courses" fluid>
      <v-row>
        <v-col class="col-12 courses-header">
          <h2>
            Hey Mr{{
              `${
                  $store.state.user.user.gender.toLowerCase() === "male"
                      ? ""
                      : "s"
              } ${$store.state.user.user.sur_name}`
            }},
          </h2>
          <h3>Ready to start your courses?</h3>
        </v-col>
        <v-col cols="12">
          <h2 class="course-group-title">Ongoing Courses</h2>
        </v-col>
      </v-row>
      <v-col class="col-12 pa-0">
        <v-row v-if="!loaded" class="loaders ml-3">
          <v-col class="col-12 col-md-4" v-for="n in 5" :key="n">
            <div class="ssc ssc-card student-card-skeleton ongoing">
              <div class="ssc-wrapper flex justify-between">
                <div class="w-40">
                  <div class="ssc-circle mb-2"></div>
                  <div
                    v-if="type == 'published'"
                    class="ssc-line w-60 ml"
                  ></div>
                </div>
                <div class="w-60 mr">
                  <div class="ssc-head-line mb w-80"></div>
                  <div class="ssc-line w-30 mb"></div>
                  <div class="ssc-line w-90 mb-1"></div>
                  <div class="ssc-line w-70 mb"></div>
                  <div class="ssc-line w-80 mb-1"></div>
                  <div class="ssc-line w-60 mb"></div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row v-else-if="loaded && ongoingCourses.length">
          <v-col
            v-for="(course, i) in ongoingCourses"
            :key="i"
            class="n-padding col-12 col-md-auto pa-0"
          >
            <student-course-card category="ongoing" :course="course" />
          </v-col>
        </v-row>
        <v-row v-else>
          <img src="@/assets/images/courses_empty.svg" class="mx-auto" />
          <div class="col-12">
            <p class="text-center">You have no ongoing courses</p>
            <p class="text-center">You can review completed courses.</p>
          </div>
        </v-row>
      </v-col>
      <v-col cols="12" class="pb-0 mt-6">
        <h2 class="second-title course-group-title">Completed Courses</h2>
      </v-col>
      <v-col class="col-12 px-0">
        <v-row v-if="!loaded" class="loaders">
          <v-col class="col-12 col-md-4" v-for="n in 3" :key="n">
            <div class="ssc ssc-card student-card-skeleton finished">
              <div class="ssc-wrapper pa-0">
                <div class="ssc-square w-100"></div>
              </div>
              <div class="ssc-wrapper ml">
                <div class="ssc-head-line mb w-80"></div>
                <div class="ssc-line w-60 mb"></div>
                <div class="ssc-line w-50 mb"></div>
              </div>
              <div class="ssc-wrapper flex ml">
                <div class="w-20">
                  <div class="ssc-circle mb"></div>
                </div>
                <div class="w-50 mt-2 mr">
                  <div class="ssc-line w-90"></div>
                </div>
              </div>
              <div class="ssc-wrapper flex ml pt-0">
                <div class="w-20">
                  <div class="w-60 ssc-square mb"></div>
                </div>
                <div class="w-50 mt-2 mr">
                  <div class="ssc-line w-90"></div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row v-if="loaded && finishedCourses.length">
          <v-col
            v-for="(course, i) in finishedCourses"
            :key="i"
            cols="12"
            sm="6"
            md="4"
            class="px-0"
          >
            <student-course-card category="completed" :course="course" />
          </v-col>
        </v-row>
        <v-row v-else-if="loaded">
          <img src="@/assets/images/courses_empty.svg" class="mx-auto" />
          <div class="col-12">
            <p class="text-center">You have no finsihed courses</p>
            <p class="text-center">You can finish ongoing courses.</p>
          </div>
        </v-row>
      </v-col>
    </v-container>
    <!-- view of instructor -->
    <v-container
      v-else-if="userCategory == 'INSTRUCTOR'"
      class="courses-home"
      fluid
    >
      <v-row>
        <v-col cols="12" md="6" class="courses-header mt-5">
          <h2>
            Hey Mr{{
              `${
                $store.state.user.user.gender.toLowerCase() === "male"
                  ? ""
                  : "s"
              } ${$store.state.user.user.sur_name}`
            }},
          </h2>
          <h3>Ready to start your courses?</h3>
          <div class="class-btns">
            <v-btn
              rounded
              text
              :class="`published-btn ${
                type == 'published' ? 'active-btn' : ''
              }`"
              @click="type = 'published'"
              >Published Classes</v-btn
            >
            <v-btn
              rounded
              text
              :class="`unpublished-btn ${
                type == 'unpublished' ? 'active-btn' : ''
              }`"
              @click="type = 'unpublished'"
              >Draft Classes</v-btn
            >
          </div>
          <div v-if="!loaded" class="loaders">
            <div
              v-for="n in 3"
              :key="n"
              :class="`ssc ssc-card instructor-card-skeleton ${type}`"
            >
              <div class="ssc-wrapper flex justify-between">
                <div class="w-60 mr">
                  <div class="ssc-head-line mb w-80"></div>
                  <div class="ssc-line w-40 mb"></div>
                  <div class="ssc-line w-90 mb-2"></div>
                  <div class="ssc-line w-70 mb"></div>

                  <div v-if="type == 'published'" class="ssc-line w-60"></div>
                  <div v-else class="ssc-head-line mb w-60"></div>
                </div>
                <div class="w-40">
                  <div class="ssc-circle mb"></div>
                  <div
                    v-if="type == 'published'"
                    class="ssc-line w-60 ml"
                  ></div>
                </div>
              </div>
              <div v-if="type == 'published'" class="ssc-hr"></div>
              <div
                v-if="type == 'published'"
                class="ssc-wrapper flex justify-between"
              >
                <div class="search-ssc-lg__tag ssc-square w-20 ml"></div>
                <div class="search-ssc-lg__tag ssc-square w-20 mr"></div>
              </div>
            </div>
          </div>
          <div
            v-else-if="
              loaded && type == 'unpublished'
                ? unpublishedCourses.length > 0
                : publishedCourses.length > 0
            "
          >
            <instructor-course-card
              v-for="(course, i) in type == 'unpublished'
                ? unpublishedCourses
                : publishedCourses"
              :key="i"
              :course="course"
            />
          </div>
          <div class="text-center" v-else>
            <img
              src="@/assets/images/Blank canvas-rafiki.svg"
              class="courses-not-found-image mt-4 mx-auto"
            />
            <div class="text-h5 text-center courses-not-found-image pa-2 ml-n4">
              <span class="d-block ml-n-12"
                >Oops You
                {{
                  `${
                    type == "published"
                      ? "have not yet published any course"
                      : "dont have unpublished courses"
                  }`
                }}.</span
              >
              <v-btn
                rounded
                class="mt-3 active-btn px-12"
                text
                x-large
                :to="type == 'published' ? undefined : '/courses/new'"
                @click="type = 'unpublished'"
                >{{
                  `${type == "published" ? "Publish one" : "Create one"}`
                }}</v-btn
              >
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="live-class">
            <v-row>
              <v-col cols="12">
                <v-img :src="require('@/assets/images/live-class.svg')"></v-img>
              </v-col>
              <v-col class="mx-ato col-12">
                <router-link to="/live/schedule">
                  <div class="circle mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M16 4a1 1 0 0 1 1 1v4.2l5.213-3.65a.5.5 0 0 1 .787.41v12.08a.5.5 0 0 1-.787.41L17 14.8V19a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h14zM7.4 8.829a.4.4 0 0 0-.392.32L7 9.228v5.542a.4.4 0 0 0 .542.374l.073-.036 4.355-2.772a.4.4 0 0 0 .063-.624l-.063-.05L7.615 8.89A.4.4 0 0 0 7.4 8.83z"/></svg>
                  </div>
                  <div><p>Start Live Class</p></div>
                </router-link>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "courses",
  data: () => ({
    type: "published",
  }),
  components: {
    InstructorCourseCard: () =>
      import("@/components/courses/InstructorCourseCard"),
    StudentCourseCard: () => import("@/components/courses/StudentCourseCard"),
  },
  computed: {
    // get the userCategory
    userCategory() {
      return this.$store.state.user.user.category.name;
    },
    // get courses published and unpublished
    ...mapGetters("courses", [
      "publishedCourses",
      "unpublishedCourses",
      "courses",
      "loaded",
    ]),
    finishedCourses() {
      return this.courses.filter((course) =>
        course.progress ? course.progress.progress == 100 : false
      );
    },
    ongoingCourses() {
      return this.courses.filter((course) =>
        course.progress ? course.progress.progress < 100 : !course.progress
      );
    },
  },
  methods: {
    ...mapActions("courses", ["getCourses"]),
  },
  mounted() {
    // if (!this.loaded) {
      //get courses on page load
      this.getCourses()
    // }
  },
};
</script>
<style lang="scss" scoped>
.circle{
  background-color: $primary;
  border-radius: 50%;
  display: flex;
  width: 50px;
  height: 50px;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  svg{
    fill: white;
  }
}
#courses {
  background-color: #F3F6FF;
  padding: 25px 0px 0 35px;
  min-height: calc(100vh - 76px);
  .perfom-action {
    background-color: $primary !important;
    color: white;
  }
  .course-group-title{
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 20.63px;
    line-height: 31px;
    /* identical to box height */


    color: #6A6A6A;
  }
}
.courses-container {
  .instructor-card-skeleton {
    &.published {
      max-height: 222px;
    }
    &.unpublished {
      max-height: 187px;
    }
    max-width: 400px;
    margin-top: 40px;
    box-shadow: 0px 17px 34px rgba(116, 113, 113, 0.16);
    .ssc-circle {
      height: 110px;
      width: 110px;
    }
    .ssc-square {
      height: 20px;
    }
  }
  .student-card-skeleton {
    &.ongoing {
      max-height: 181px !important;
      max-width: 349.891px;
      .ssc-square {
        height: 20px;
      }
      .ssc-circle {
        height: 110px;
        width: 110px;
        margin-top: 25px;
      }
    }
    &.finished {
      max-height: 400px !important;
      max-width: 260px;
      .ssc-square {
        height: 161px;
      }
      .ssc-square.mb {
        height: 30px;
      }
      .ssc-circle {
        height: 30px;
        width: 30px;
      }
    }
    margin-top: 40px;
    box-shadow: 0px 17px 34px rgba(116, 113, 113, 0.16);
  }
}
/* Portrait phones and smaller */
@media (max-width: 700px) {
  #courses {
    padding: 25px 0px 45px;
  }
}
</style>
