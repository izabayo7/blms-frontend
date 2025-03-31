<template>
  <div>
    <v-container v-if="$store.state.user.category === 'Student'" id="courses" fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="mt-10">Ongoing Courses {{$vuetify.breakpoint.name}}</h2>
        </v-col>
      </v-row>
      <v-col class="course-heading col-12">
        <v-row>
          <v-col
            v-for="(course, i) in coursesfake"
            :key="i"
            cols="12"
            sm="6"
            md="4"
            class="n-padding"
          >
            <kurious-student-course-card
              to="/courses/anyCourse"
              category="ongoing"
              :image="course.image"
              :course="{name: course.title, instructor: course.instructor, description: course.description}"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col class="course-heading col-12">
        <v-row>
          <v-col v-for="(course, i) in courses" :key="i" cols="12" sm="6" md="4" class="n-padding">
            <kurious-student-course-card
              category="ongoing"
              :course="course"
              :image="course.coverPicture === undefined ? 'https://media.inmobalia.com/imgV1/B8vEv5Xh~OlgGrmOOeWCtYHtdv2TGtX20HosCpYxDmKApRO9fqu6aebRr_kOYwWZUUBuTZKwOZPzAYj7tZulyLOn1CMNcFuV2RqXoT28SJ2OnPhaGG~JUijtTYAgMuK~95K_MTLY7d8_mFzQgU5qCIR0acc49iB4a7RKlRbhA4L7nCLwQUoy~55Chgn65VnEfSbkn8wPAPU65wNYna0WPiwq3DO5FR3ZyC4GVH6cISHb5qeFj9bXdaLtSafxK6JAQUDjvlHmu11lcAZR0m_DzjaXII2SqzhJKqZGy8Wosxgange8oRKNfl1fRhzEUpEtTw8_MfQPTjpPx4wbxN_lreBfVwnD1tE-.jpg' : `http://localhost:7070/kurious/file/courseCover/${course._id}`"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <h2 class="second-title">Completed Courses</h2>
      </v-col>
      <v-col class="course-heading col-12">
        <v-row>
          <v-col v-for="(course, i) in coursesfake" :key="i" cols="12" sm="6" md="4">
            <kurious-student-course-card
              to="/courses/anyCourse"
              category="completed"
              :image="course.image"
              :course="{name: course.title, instructor: course.instructor, description: course.description}"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-container>
    <v-container v-if="$store.state.user.category === 'Instructor'" class="classes-home">
      <v-row>
        <v-col cols="12" md="6" class="classes-header mt-10">
          <h2>Hey Mrs Ellen,</h2>
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
          <kurious-instructor-course-card
            v-for="(course, i) in activeCourses"
            :key="i"
            :course="course"
            v-on:childToParent="performAction"
          />
          {{activeCourses.length === 0 ? `${type} courses are empty`:''}}
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
    coursesfake: [
      {
        title: "Algebra and Calculus",
        instructor: "Jyoni",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi facilis quos inventore,officia officiis eius",
        image:
          "https://media.inmobalia.com/imgV1/B8vEv5Xh_VThvnEqMx4G0YtA8lAADdw1sBC5uN5pSX6~ImMWYgK8f72a6_2V5Fsi3Ei28Kvmds~cBwEukMeKfUqYSWBBx9dABGpiKVqX3duVN6IEC7a3fmuwpC4jE02qSn1_fEuDmqtn3cNbb5YsvDhrezEpAj8jK1u2cB7hDtjnp3AjMGMJ6~dvCdzQTUzEhF7JQMwYxJv4fg68HkKU8sZFpu9wlzdv_yAQb6xKkB3xf53zeE9XnkLocRN_LBREHQ4O2b40z7mI6SsIADH4NFjdTEzU0BB1JLPy97TaP8VEuGQ8kY0VfXj44~0sKXt_9OXj9oUWLtb7LxRlF0sn6eXgIKhrovrdTA--.jpg",
      },
      {
        title: "Algebra and Calculus",
        instructor: "Jyoni",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi facilis quos inventore,officia officiis eius",
        image:
          "https://media.inmobalia.com/imgV1/B8vEv5Xh~OlgGrmOOeWCtYHtdv2TGtX20HosCpYxDmKApRO9fqu6aebRr_kOYwWZUUBuTZKwOZPzAYj7tZulyLOn1CMNcFuV2RqXoT28SJ2OnPhaGG~JUijtTYAgMuK~95K_MTLY7d8_mFzQgU5qCIR0acc49iB4a7RKlRbhA4L7nCLwQUoy~55Chgn65VnEfSbkn8wPAPU65wNYna0WPiwq3DO5FR3ZyC4GVH6cISHb5qeFj9bXdaLtSafxK6JAQUDjvlHmu11lcAZR0m_DzjaXII2SqzhJKqZGy8Wosxgange8oRKNfl1fRhzEUpEtTw8_MfQPTjpPx4wbxN_lreBfVwnD1tE-.jpg",
      },
      {
        title: "Algebra and Calculus",
        instructor: "Jyoni",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi facilis quos inventore,officia officiis eius",
        image:
          "https://media.inmobalia.com/imgV1/B8vEv5Xh~OlgGrmOOeWCtYHtdv2TGtX20HosCpYxDmKApRO9fqu6aebRr_kOYwWZUUBuTZKwOZPzAYj7tZulyLOn1CMNcFuV2RqXoT28SJ2OnPhaGG~JUijtTYAm92TMoqn5vKlCgmlDm1fJFTC~eEH0YVpJPXok9tTHQsxjtb8qqVipJvT8IfWKux_tIpDIJ1HfJkb5d_gZ9c2D9JHACBXNvkqwg6ZTLWgW_yoFUGFHuIVx58NSuXnAOkF3iTTjvRxnsmP3eNI7FjqdQ0XW1N91pQ14UxD~S9YY5iU7Zg24xstwbdVF5D_SJR5TltSg2vkhz9xEVQCQKge_d6qZaFjwnDP_tqg-.jpg",
      },
    ],
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
        const url =
          this.$store.state.user.category === "Instructor"
            ? `course/instructor/${this.$store.state.user._id}`
            : this.$store.state.user.category === "Student"
            ? `course/facility-college-year/5f0ab5f7deea002f14fd93a2`
            : undefined;
        const courses = await Apis.get(url);
        if (!courses.data.includes("No")) {
          this.courses = courses.data;
          if (this.$store.state.user.category === "Student") {
            for (const course of this.courses) {
              const instructor = await Apis.get(
                `instructor/${course.instructor}`
              );
              course.instructor = `${instructor.data.surName} ${instructor.data.otherNames}`;
            }
          }
        }
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
</style>