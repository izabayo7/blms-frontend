<template>
  <v-app>
    <v-row
        v-if="course != undefined"
        class="new-class-form ml-md-10 ml-2 mt-md-10 mt-4"
    >
      <v-col v-if="$route.params.type == 'details' || $route.params.type == 'chapters'" class="col-12">
        <h1 class="d-block">EDIT COURSE</h1>
        <div class="new-class-btns mb-5">
          <v-btn
              rounded
              text
              :class="`details-btn ${$route.params.type == 'details' ? 'new-active-btn' : ''}`"
              :to="$route.params.type == 'chapters' ? `/courses/edit/${course.name}/details` : undefined"
          >Course Details
          </v-btn
          >
          <v-btn
              rounded
              text
              :class="`chapters-btn ${
              $route.params.type == 'chapters' ? 'new-active-btn' : ''
            }`"
              :to="$route.params.type == 'details' ? `/courses/edit/${course.name}/chapters` : undefined"
          >Course Chapters
          </v-btn
          >
        </div>
      </v-col>
      <v-col v-else class="col-12">
        Invalid route
      </v-col>
      <v-col v-if="$route.params.type == 'details'" class="col-12">
        <v-form>
          <v-row>
            <v-col class="col-12 col-md-6">
              <h3>Course Name</h3>
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
              <h3>Student Group</h3>
              <v-select
                  v-model="selectedFacultyCollegeYearName"
                  :items="facultyCollegeYearNames"
                  chips
                  :rules="simpleRules"
                  outlined
                  class="group-select"
              ></v-select>
              <h3>Course Description</h3>
              <textarea
                  v-model="course.description"
                  class="kurious--textarea mb-4"
                  cols="60"
                  rows="8"
              ></textarea>
            </v-col>
            <v-col class="col-12 col-md-6" align="center">
              <v-avatar
                  v-if="course.cover_picture || coverPicture"
                  size="245"
                  :class="
                  course.cover_picture
                    ? 'user-profile ml-2 mt-6 d-block'
                    : 'course-image white--text bg-color-one text-h2' + ' d-block'
                "
              >
                <v-img
                    :src="loaded_pic ? loaded_pic : `${
                    course.cover_picture
                  }?height=300&width=300&token=${$session.get('jwt')}`"
                    alt="avatar"
                >
                </v-img>
              </v-avatar>
              <v-avatar
                  class="course-image white--text bg-color-one text-h2 vertically--centered"
                  size="245"
                  v-else
              >{{ course.name | computeText }}
              </v-avatar
              >
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
                  course.cover_picture === undefined
                      ? "Upload Course CoverPicture"
                      : coverPicture
                      ? coverPicture.name
                      : "Update Course CoverPicture"
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
            </v-col>
            <v-col class="col-12 text-center">
              <v-btn
                  rounded
                  text
                  class="new-active-btn mb-6"
                  @click="validate()"
              >update Course
              </v-btn
              >
              <v-btn
                  color="transparent"
                  class="cancel-quiz mt-n6 mx-2"
                  @click="$router.push('/courses')"
              >Cancel
              </v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-col v-else-if="$route.params.type == 'chapters'" class="col-12 pr-12">
        <chapters action="update"/>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "edit_course",
  components: {
    chapters: () => import("@/views/courses/chapters"),
  },
  data: () => ({
    selectedFacultyCollegeYearName: "",
    coverPicture: undefined,
    loaded_pic:undefined,
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => v.length > 2 || "Name is too short",
    ],
    simpleRules: [(v) => !!v || "This field is required"],
    error: "",
  }),
  computed: {
    // get the current course
    ...mapGetters("courses", ["course"]),
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
      });
    },
  },
  methods: {
    ...mapActions("courses", ["findCourseByName", "updateCourse"]),
    ...mapActions("faculties", ["getFacultyCollegeYears"]),
    // pick coverPicture
    pickfile() {
      document.getElementById("picture").click();
    },
    // keep the coverPicture
    handleFileUpload() {
      this.coverPicture = this.$refs.file.files[0];
      const fileReader = new FileReader();
      const self = this
      fileReader.readAsDataURL(this.coverPicture);
      fileReader.addEventListener("load", function () {
        self.loaded_pic = this.result
      });
    },
    validate() {
      if (this.course.name === "") {
        return (this.error = "name is required");
      } else if (this.course.name.length < 3) {
        return (this.error = "name is too short");
      }
      if (!this.course.maximum_marks) {
        return (this.error = "maximum marks is required");
      }
      if (this.selectedFacultyCollegeYearName === "") {
        return (this.error = "student_group is required");
      }
      if (this.course.description === "") {
        return (this.error = "description is required");
      } else if (this.course.description.length < 10) {
        return (this.error = "description is too short");
      }
      this.saveCourseChanges();
    },
    saveCourseChanges() {
      this.updateCourse({
        course: {
          name: this.course.name,
          description: this.course.description,
          user_group: this.selectedFacultyCollegeYearCode,
          maximum_marks: this.course.maximum_marks,
        },
        coverPicture: this.coverPicture,
      }).then(() => {
        this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: "Course successfully updated",
          status: "success",
          uptime: 3000,
        });
        setTimeout(() => {
            this.$router.push(`/courses/edit/${this.course.name}/chapters`)
        }, 3000);

      });
    },
  },
  created() {
    this.getFacultyCollegeYears(this.$store.state.user.user.user_name);
    this.findCourseByName({
      user_name: this.$store.state.user.user.user_name,
      courseName: this.$route.params.name,
    }).then((course) => {
      this.selectedFacultyCollegeYearName = course.user_group.name;
    });
  },
};
</script>
