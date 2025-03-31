  <template>
  <v-app>
    <v-row v-if="course != undefined" class="new-class-form ml-10 mt-10">
      <v-col class="col-12">
        <h1 class="d-block">EDIT COURSE</h1>
        <div class="new-class-btns mb-5">
          <v-btn
            rounded
            text
            color="#000"
            dark
            :class="`details-btn ${type=='details' ? 'new-active-btn' : ''}`"
            @click="type='details'"
          >Course Details</v-btn>
          <v-btn
            rounded
            text
            color="#000"
            dark
            :class="`chapters-btn ${type=='chapters' ? 'new-active-btn' : ''}`"
            @click="type='chapters'"
          >Course Chapters</v-btn>
        </div>
      </v-col>
      <v-col v-if="type=='details'" class="col-12">
        <v-form>
          <v-row>
            <v-col class="col-12 col-md-8">
              <h3>Course Name</h3>
              <v-text-field
                v-model="course.name"
                required
                :rules="nameRules"
                placeholder="Type course name..."
                outlined
                class="course-input"
              ></v-text-field>
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
            <v-col class="col-12 col-md-4">
              <v-avatar
                v-if="course.coverPicture"
                size="245"
                :class="course.coverPicture ? 'user-profile ml-2 mt-6 d-block' : 'course-image white--text bg-color-one text-h2'"
              >
                <img :src="course.coverPicture" alt="avatar" />
              </v-avatar>
              <v-avatar
                class="course-image white--text bg-color-one text-h2 d-block vertically--centered"
                size="245"
                v-else
              >{{course.name | computeText}}</v-avatar>
              <v-btn
                fab
                small
                color="#828282"
                class="white--text course-image mt-4 mb-6 mr-4"
                @click="pickfile()"
              >
                <v-icon>mdi-paperclip</v-icon>
              </v-btn>
              <span>{{course.coverPicture === undefined ? 'Upload Course CoverPicture' : coverPicture ? coverPicture.name : "Update Course CoverPicture" }}</span>
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
                color="#3CE970"
                class="white--text mb-6"
                @click="saveCourseChanges"
              >update Course</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-col v-else class="col-12 pr-12">
        <chapters action="update" />
      </v-col>
    </v-row>
  </v-app>
</template>

  <script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "edit_course",
  components: {
    chapters: () => import("@/views/courses/chapters"),
  },
  data: () => ({
    selectedFacultyCollegeYearName: "",
    type: "details",
    coverPicture: undefined,
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => v.length > 2 || "Name is too short",
    ],
    simpleRules: [(v) => !!v || "This field is required"],
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
    course() {
      if (this.selectedFacultyCollegeYearName === "") {
        this.selectedFacultyCollegeYearName = `${this.course.facultyCollegeYear.facultyCollege.faculty.name} ${this.course.facultyCollegeYear.collegeYear.digit}`;
      }
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
    },
    saveCourseChanges() {
      this.updateCourse({
        course: {
          name: this.course.name,
          instructor: this.$store.state.user.user._id,
          description: this.course.description,
          facultyCollegeYear: this.selectedFacultyCollegeYearCode,
        },
        coverPicture: this.coverPicture,
      }).then(() => {
        this.course.name != this.$route.params.name
          ? this.$router.push(`/courses/edit/${this.course.name}`)
          : undefined;
      });
    },
  },
  created() {
    this.getFacultyCollegeYears(this.$store.state.user.user.college);
    this.findCourseByName({
      userCategory: this.$store.state.user.user.category.toLowerCase(),
      userId: this.$store.state.user.user._id,
      courseName: this.$route.params.name,
    });
  },
};
</script>