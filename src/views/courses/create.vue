  <template>
  <v-app>
    <v-row class="new-class-form ml-10 mt-10">
      <v-col class="col-12">
        <h1 class="d-block">CREATE NEW COURSE</h1>
        <div class="new-class-btns mb-5">
          <v-btn
            rounded
            text
            color="#000"
            dark
            :class="`details-btn ${type=='details' ? 'new-active-btn' : ''}`"
          >Course Details</v-btn>
          <v-btn
            rounded
            text
            color="#000"
            dark
            :class="`chapters-btn ${type=='chapters' ? 'new-active-btn' : ''}`"
          >Course Chapters</v-btn>
        </div>
      </v-col>
      <v-col v-if="type=='details'" class="col-12">
        <v-form>
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
          <textarea v-model="course.description" class="kurious--textarea mb-4" cols="60" rows="8"></textarea>
          <h3>Course Cover Image</h3>
          <v-btn
            fab
            small
            color="#828282"
            class="white--text course-image mt-4 mb-6 mr-4"
            @click="pickfile()"
          >
            <v-icon>mdi-paperclip</v-icon>
          </v-btn>
          <span>{{coverPicture === undefined ? 'Upload Course CoverPicture' : coverPicture.name}}</span>
          <input
            ref="file"
            type="file"
            hidden
            accept="image/*"
            id="picture"
            class="d-none my-6"
            @change="handleFileUpload()"
          />
          <v-btn
            rounded
            color="#3CE970"
            class="white--text mb-6 d-block"
            @click="saveCourse()"
          >Save Course</v-btn>
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
    },
    coverPicture: undefined,
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => v.length > 2 || "Name is too short",
    ],
    simpleRules: [(v) => !!v || "This field is required"],
  }),
  computed: {
    ...mapGetters("faculties", ["facultyCollegeYearNames"]),
    selectedFacultyCollegeYearCode() {
      return this.$store.getters["faculties/facultyCollegeYear"](
        this.selectedFacultyCollegeYearName
      )._id;
    },
  },
  methods: {
    ...mapActions("courses", ["createCourse"]),
    ...mapActions("faculties", ["getFacultyCollegeYears"]),
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
          instructor: this.$store.state.user.user._id,
          description: this.course.description,
          facultyCollegeYear: this.selectedFacultyCollegeYearCode,
        },
        coverPicture: this.coverPicture,
      }).then(() => {
        this.type = "chapters";
      });
    },
    reset(type) {
      if (type === "course") {
        this.course = {
          name: "",
          description: "",
        };
        (this.coverPicture = undefined),
          (this.selectedFacultyCollegeYearName = "");
      }
    },
  },
  created() {
    this.getFacultyCollegeYears(this.$store.state.user.user.college);
  },
};
</script>

  <style>
.ProseMirror:focus {
  outline: none;
}
</style>