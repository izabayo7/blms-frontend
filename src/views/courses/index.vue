<template>
  <div>
    <!-- view of the student -->
    <v-container v-if="userCategory == 'Student'" id="courses" fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="mt-10 course-group-title">Ongoing Courses</h2>
        </v-col>
      </v-row>
      <v-col class="col-12 pa-0">
        <v-row>
          <v-col
            v-for="(course, i) in ongoingCourses"
            :key="i"
            class="n-padding col-12 col-md-4 pa-0"
          >
            <student-course-card category="ongoing" :course="course" />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <h2 class="second-title course-group-title">Completed Courses</h2>
      </v-col>
      <v-col class="col-12">
        <v-row>
          <v-col v-for="(course, i) in finishedCourses" :key="i" cols="12" sm="6" md="4">
            <student-course-card category="completed" :course="course" />
          </v-col>
        </v-row>
      </v-col>
    </v-container>
    <!-- view of instructor -->
    <v-container v-else-if="userCategory == 'Instructor'" class="classes-home">
      <v-row>
        <v-col cols="12" md="6" class="classes-header mt-5">
          <h2>Hey Mr{{`${$store.state.user.gender === 'Male' ? '' : 's'} ${$store.state.user.surName}`}},</h2>
          <h3>Ready to start your classes?</h3>
          <div class="class-btns">
            <v-btn
              rounded
              text
              color="#000"
              dark
              :class="`unpublished-btn ${type=='unpublished' ? 'active-btn' : ''}`"
              @click="type='unpublished'"
            >Unpublished Classes</v-btn>
            <v-btn
              rounded
              text
              color="#000"
              dark
              :class="`published-btn ${type=='published' ? 'active-btn' : ''}`"
              @click="type='published'"
            >Published Classes</v-btn>
          </div>
          <div
            v-if="type=='unpublished' ? unpublishedCourses.length > 0 : publishedCourses.length > 0"
          >
            <instructor-course-card
              v-for="(course, i) in type == 'unpublished' ? unpublishedCourses : publishedCourses"
              :key="i"
              :course="course"
            />
          </div>
          <div v-else>
            <v-img
              src="@/assets/images/Blank canvas-rafiki.svg"
              class="courses-not-found-image mt-4"
            ></v-img>
            <div class="text-h5 text-center courses-not-found-image pa-12 ml-n4">
              <span
                class="d-block ml-n-12"
              >Oops You {{`${type == 'published' ? 'have not yet published any course' : 'dont have unpublished courses'}`}}.</span>
              <v-btn
                rounded
                color="#ffd248"
                class="mt-3 white--text px-12"
                x-large
                :to="type == 'published' ? undefined : '/courses/new-course'"
                @click="type = 'unpublished' "
                v-if="$route.name=='Courses' && $store.state.user.category === 'Instructor'"
              >{{`${type == 'published' ? 'Publish one' : 'Create one'}`}}</v-btn>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="live-class">
            <v-row>
              <v-col cols="12">
                <v-img :src="require('@/assets/images/live-class.svg')"></v-img>
              </v-col>
              <v-col>
                <router-link to="/live-class">
                  <v-icon dark class="video-icon">mdi-video</v-icon>
                </router-link>
              </v-col>
              <v-col>
                <p>Start Live Class</p>
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
  name: "Courses",
  data: () => ({
    type: "unpublished",
  }),
  components: {
    InstructorCourseCard: () =>
      import("@/components/courses/InstructorCourseCard"),
    StudentCourseCard: () => import("@/components/courses/StudentCourseCard"),
  },
  computed: {
    // get the userCategory
    userCategory() {
      return this.$store.state.user.user.category;
    },
    // get courses published and unpublished
    ...mapGetters("courses", [
      "publishedCourses",
      "unpublishedCourses",
      "ongoingCourses",
      "finishedCourses",
      "loaded",
    ]),
  },
  methods: {
    ...mapActions("courses", ["getCourses"]),
  },
  created() {
    if (!this.loaded) {
      //get courses on page load
      this.getCourses({
        userCategory: this.$store.state.user.category.toLowerCase(),
        userId: this.$store.state.user._id,
      });
    }
  },
};
</script>
<style lang="scss" scoped>
#courses {
  background-color: #f8f8f8;
}
</style>
