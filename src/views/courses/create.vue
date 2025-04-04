<template>
  <v-app>
    <div class="feedback"></div>
    <v-row class="new-class-form ml-2 ml-md-10 mt-5 mt-md-10">
      <v-col class="col-12">
        <h1 class="d-block">CREATE NEW COURSE</h1>
        <div class="new-class-btns mb-5">
          <v-btn
            rounded
            text
            :class="`details-btn ${type == 'details' ? 'new-active-btn' : ''}`"
            >Course Details
          </v-btn>
          <v-btn
            rounded
            text
            :class="`chapters-btn ${
              type == 'chapters' ? 'new-active-btn' : ''
            }`"
            >Course Chapters
          </v-btn>
        </div>
      </v-col>
      <v-col v-if="type == 'details'" class="col-12 col-md-6 mt-n4">
        <v-form>
          <h3 class="input_lable">Course Name</h3>
          <input
            v-model="course.name"
            type="text"
            class="course_input"
            placeholder="Type course name..."
          />
          <h3 class="input_lable">Course Maximum marks</h3>
          <input
            v-model="course.maximum_marks"
            type="text"
            class="course_input"
            placeholder="Type marks..."
          />
          <h3 class="input_lable">Student Group</h3>
          <v-select
            v-model="selectedFacultyCollegeYearName"
            :items="facultyCollegeYearNames"
            chips
            solo
            class="group-select elevation-0"
          ></v-select>
          <h3 class="input_lable mt-0">Course Description</h3>
          <textarea
            v-model="course.description"
            class="kurious--textarea mb-4 customScroll"
            rows="8"
          ></textarea>
          <h3>Course Cover Image</h3>
          <v-btn
            fab
            small
            text
            class="new-active-btn course-image mt-4 mb-6 mr-4"
            @click="pickfile()"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M14.828 7.757l-5.656 5.657a1 1 0 1 0 1.414 1.414l5.657-5.656A3 3 0 1 0 12 4.929l-5.657 5.657a5 5 0 1 0 7.071 7.07L19.071 12l1.414 1.414-5.657 5.657a7 7 0 1 1-9.9-9.9l5.658-5.656a5 5 0 0 1 7.07 7.07L12 16.244A3 3 0 1 1 7.757 12l5.657-5.657 1.414 1.414z" fill="rgba(255,255,255,1)"/></svg>
          </v-btn>
          <span>{{
            coverPicture === undefined
              ? "Upload Course CoverPicture"
              : coverPicture.name
          }}</span>
          <input
            ref="file"
            type="file"
            hidden
            accept="image/*"
            id="picture"
            class="d-none my-6"
            @change="handleFileUpload()"
          />
          <div class="actions mx-0">
            <v-btn
              rounded
              text
              class="new-active-btn mb-6 mx-2"
              @click="validate()"
              >Save Course
            </v-btn>
            <v-btn
              color="transparent"
              class="cancel-quiz mt-n4 mx-2"
              @click="$router.push('/courses')"
              >Cancel
            </v-btn>
          </div>
        </v-form>
      </v-col>
      <v-col v-else class="col-12 pr-12">
        <chapters action="create" />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "create_course",
  components: {
    chapters: () => import("@/views/courses/chapters"),
  },
  data: () => ({
    selectedFacultyCollegeYearName: "",
    type: "details",
    course: {
      name: "",
      description: "",
      maximum_marks: 100,
    },
    error: "",
    coverPicture: undefined,
  }),
  computed: {
    ...mapGetters("faculties", ["facultyCollegeYearNames"]),
    selectedFacultyCollegeYearCode() {
      return this.$store.getters["faculties/facultyCollegeYear"](
        this.selectedFacultyCollegeYearName
      )._id;
    },
  },
  watch: {
    error() {
      this.$store.dispatch("app_notification/SET_NOTIFICATION", {
        message: this.error,
        status: "danger",
        uptime: 2000,
      }).then(() => {
        this.error = ""
      })
    },
  },
  methods: {
    ...mapActions("courses", ["createCourse"]),
    ...mapActions("faculties", ["getFacultyCollegeYears"]),
    validate() {
      if (this.course.name === "") {
        return (this.error = "name is required");
      } else if (this.course.name.length < 3) {
        return (this.error = "name is too short");
      }
      if (this.selectedFacultyCollegeYearName === "") {
        return (this.error = "student_group is required");
      }
      if (this.course.description === "") {
        return (this.error = "description is required");
      } else if (this.course.description.length < 10) {
        return (this.error = "description is too short");
      }
      this.saveCourse();
    },
    pickfile() {
      document.getElementById("picture").click();
    },
    handleFileUpload() {
      this.coverPicture = this.$refs.file.files[0];
    },
    saveCourse() {
      this.createCourse({
        course: {
          name: this.course.name,
          maximum_marks: this.course.maximum_marks,
          description: this.course.description,
          user_group: this.selectedFacultyCollegeYearCode,
        },
        coverPicture: this.coverPicture,
      }).then(() => {
        this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: "Course successfully created",
          status: "success",
          uptime: 2000,
        });
        setTimeout(() => {
          this.type = 'chapters'
        }, 2000);
      });
    },
  },
  created() {
    this.getFacultyCollegeYears();
  },
};
</script>

<style>
.ProseMirror:focus {
  outline: none;
}
</style>
