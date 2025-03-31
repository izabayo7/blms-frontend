<template>
  <div>
    <v-container v-if="$store.state.user.category === 'Student'" id="courses" fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="mt-10 course-group-title">Ongoing Courses {{$vuetify.breakpoint.name}}</h2>
        </v-col>
      </v-row>
      <v-col class="col-12 pa-0">
        <v-row>
          <v-col v-for="(course, i) in courses" :key="i" class="n-padding col-12 col-md-4 pa-0">
            <kurious-student-course-card category="ongoing" :course="course" />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <h2 class="second-title course-group-title">Completed Courses</h2>
      </v-col>
      <v-col class="col-12">
        <v-row>
          <v-col v-for="(course, i) in courses" :key="i" cols="12" sm="6" md="4">
            <kurious-student-course-card
              to="/courses/anyCourse"
              category="completed"
              :course="course"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-container>
    <v-container v-if="$store.state.user.category === 'Instructor'" class="classes-home">
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
          <div v-if="activeCourses.length > 0">
            <kurious-instructor-course-card
              v-for="(course, i) in activeCourses"
              :key="i"
              :course="course"
              v-on:childToParent="performAction"
            />
          </div>
          <div v-else>
            <v-img src="@/assets/images/Blank canvas-rafiki.svg" class="courses-not-found-image mt-4"></v-img>
            <div class="text-h5 text-center courses-not-found-image pa-12 ml-n4">
              <span class="d-block ml-n-12">Oops You {{`${type == 'published' ? 'have not yet published any course' : 'dont have unpublished courses'}`}}.</span>
              <v-btn
                rounded
                color="#ffd248"
                class="mt-3 white--text px-12"
                x-large
                :to="type == 'published' ? undefined : '/courses/new-course'"
                @click="type = 'unpublished' "
                v-if="$route.name=='Courses' && $store.state.user.category === 'Instructor'"
              >
                {{`${type == 'published' ? 'Publish one' : 'Create one'}`}}
              </v-btn>
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
import Apis from "@/services/apis";
export default {
  name: "courses",
  data: () => ({
    type: "unpublished",
    courses: [],
  }),
  computed: {
    activeCourses() {
      return this.courses
        .filter((i) => i.published === (this.type === "published"))
        .reverse();
    },
  },
  beforeMount() {
    this.getEssentials();
    if (this.activeCourses.length === 0) {
      this.type = "published";
    }
  },
  methods: {
    async getEssentials() {
      try {
        let response;
        let facilityCollegeYear = "";
        if (this.$store.state.user.category === "Student") {
          response = await Apis.get(
            `student-facility-college-year/student/${this.$store.state.user._id}`
          );
          facilityCollegeYear = response.data.facilityCollegeYear;
        }
        const url =
          this.$store.state.user.category === "Instructor"
            ? `course/instructor/${this.$store.state.user._id}`
            : this.$store.state.user.category === "Student"
            ? `course/facility-college-year/${facilityCollegeYear}`
            : undefined;
        const courses = await Apis.get(url);
        this.courses = courses.data;
      } catch (error) {
        console.log(error);
      }
    },
    async performAction(type, id) {
      let i = 0;
      for (const course of this.courses) {
        if (course._id === id) {
          if (type === "delete") {
            const response = await Apis.delete("course", id);
            if (response.data.includes("Successfully")) {
              alert("yuhuuuu");
              this.courses.splice(i, 1);
            } else {
              alert("opsss");
            }
          } else {
            const response = await Apis.update("course", id, {
              published: true,
            });
            if (response.data._id) {
              course.published = true;
            } else {
              alert("opsss");
            }
          }
          break;
        }
        i++;
      }
    },
  },
};
</script>

<style scoped>
.classes-home {
  background-color: #f8f8f8;
  padding-left: 40px;
}
.course-group-title {
  color: #6a6a6a;
}
</style>