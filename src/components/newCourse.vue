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
        <form>
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
            v-model="course.facilityCollegeYear"
            :items="course.facilityCollegeYear"
            chips
            :rules="simpleRules"
            multiple
            outlined
            disabled="true"
            class="group-select"
          ></v-select>
          <h3>Course Description</h3>
          <textarea v-model="course.description" class="course-description mb-4" cols="60" rows="8"></textarea>
          <h3>Course Cover Image</h3>
          <v-btn
            rounded
            color="#ffd248"
            class="white--text course-image mt-4 mb-6 d-none"
            @click="pickfile()"
          >
            <v-icon>mdi-arrow-expand-up</v-icon>Upload Image
          </v-btn>
          <input
            ref="file"
            type="file"
            id="picture"
            class="d-block my-6"
            @change="handleFileUpload()"
          />
          <v-btn rounded color="#3CE970" class="white--text mb-6" @click="saveCourse()">Save Course</v-btn>
        </form>
      </v-col>
      <v-col v-else class="col-12 pr-12">
        <form>
          <div v-if="type=='details'">
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
              v-model="course.group"
              :items="course.group"
              chips
              :rules="simpleRules"
              multiple
              outlined
              class="group-select"
            ></v-select>
            <h3>Course Description</h3>
            <textarea
              v-model="course.description"
              class="course-description mb-4"
              cols="60"
              rows="8"
            ></textarea>
            <h3>Course Cover Image</h3>
            <v-btn
              rounded
              color="#ffd248"
              class="white--text course-image mt-4 mb-6 d-block"
              @click="pickfile()"
            >
              <v-icon>mdi-arrow-expand-up</v-icon>Upload Image
            </v-btn>
            <input ref="file" type="file" id="picture" hidden @change="handleFileUpload()" />
            <v-btn
              rounded
              color="#3CE970"
              class="white--text mb-6"
              @click="saveCourse()"
            >Save Course</v-btn>
          </div>
          <div class="class-chapters">
            <v-row>
              <v-col class="col-12">
                <v-stepper v-model="e6" vertical>
                  <v-stepper-step :complete="e6 > 1" step="1" editable>
                    Fill chapter basic details
                    <small>Summarize if needed</small>
                  </v-stepper-step>

                  <v-stepper-content step="1">
                    <v-card color="grey lighten-1" class="mb-12 pa-6" height="300px">
                      <h4 class="#f8f8f8--text">Name</h4>
                      <v-text-field
                        v-model="chapter.name"
                        placeholder="Enter Chapter Name"
                        class="chapter-name"
                        solo
                      ></v-text-field>
                      <h4>Description</h4>
                      <textarea
                        v-model="chapter.description"
                        class="white mt-1 course-description mb-4"
                        cols="72"
                        rows="5"
                        placeholder="Course Description"
                      ></textarea>
                    </v-card>
                    <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
                    <v-btn text class="py-6 mt-n3">RESET</v-btn>
                  </v-stepper-content>

                  <v-stepper-step :complete="e6 > 2" step="2" editable>Add chapter content</v-stepper-step>

                  <v-stepper-content step="2">
                    <v-card color class="mb-12">
                      <v-row>
                        <v-col class="col-12 actions-container">
                          <v-row>
                            <v-col
                              :class="`col-6 text-center ${mode=='edit' ? 'yellow white--text' : ''}`"
                              @click="switchMode('edit')"
                            >Edit mode</v-col>
                            <v-col
                              :class="`col-6 text-center ${mode=='preview' ? 'yellow white--text' : ''}`"
                              @click="switchMode('preview')"
                            >View mode</v-col>
                          </v-row>
                        </v-col>

                        <v-col v-if="mode === 'preview'" class="col-12 title">{{chapter.name}}</v-col>
                        <v-col
                          v-if="mode === 'preview'"
                          class="col-12 subtitle"
                        >{{chapter.description}}</v-col>
                        <v-col class="col-12">
                          <kurious-editor
                            v-if="mode !== ''"
                            :mode="`${mode === 'edit' ? mode : 'preview'}`"
                            :defaultContent="mode === 'edit' ? undefined : content"
                          />
                        </v-col>
                        <v-col class="col-12">
                          <kurious-file-picker @addFile="addAttachment" @removeFile="removeAttachment" />
                        </v-col>
                      </v-row>
                    </v-card>
                    <v-btn color="primary" @click="saveChapter()">Continue</v-btn>
                    <v-btn text>Cancel</v-btn>
                  </v-stepper-content>
                </v-stepper>
              </v-col>
            </v-row>
          </div>
        </form>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import Apis from "@/services/apis";
import axios from "axios";
export default {
  name: "NewClass",
  data: () => ({
    e6: 1,
    activeChapter: 0,
    attachments: [],
    type: "details",
    mode: "edit",
    message: "",
    course: {
      _id: undefined,
      name: "",
      facilityCollegeYear: "5f0ab5f7deea002f14fd93a2",
      description: "",
      coverPicture: undefined,
    },
    chapter: {
      name: "",
      description: "",
    },
    content: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => v.length > 2 || "Name is too short",
    ],
    simpleRules: [(v) => !!v || "This field is required"],
  }),
  watch: {
    e6() {
      if (this.e6 === 2) {
        document.querySelector(".ProseMirror").focus();
      }
    },
  },
  methods: {
    addAttachment(file) {
      this.attachments.push(file);
    },
    removeAttachment(index) {
      this.attachments.splice(index, 1);
    },
    switchMode(mode) {
      this.mode = "";
      this.content = document.querySelector(".ProseMirror").innerHTML;
      document
        .querySelector(".ProseMirror")
        .setAttribute("contenteditable", mode === "edit");
      this.mode = mode;
    },
    pickfile() {
      document.getElementById("picture").click();
    },
    handleFileUpload() {
      this.course.coverPicture = this.$refs.file.files[0];
    },
    async saveCourse() {
      this.message = "";
      const savedCourse = await Apis.create("course", {
        name: this.course.name,
        instructor: this.$store.state.user._id,
        description: this.course.description,
        facilityCollegeYear: this.course.facilityCollegeYear,
      });
      if (savedCourse.data._id) {
        this.course._id = savedCourse.data._id;
        // if pic provided upload it
        if (this.course.coverPicture !== undefined) {
          const formData = new FormData();
          formData.append("file", this.course.coverPicture);
          const response = await axios.put(
            `http://localhost:7070/kurious/file/updateCourseCoverPicture/${savedCourse.data._id}`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
          if (!response.data._id) {
            this.message = response.data;
          }
        }
      } else {
        this.message = savedCourse.data;
      }
      if (this.message === "") {
        // success message needed
        this.type = "chapters";
      }
    },
    async saveChapter() {
      this.message = "";
      const savedChapter = await Apis.create("chapter", {
        name: this.chapter.name,
        course: "5f2a2db8e1c8af0fd07ac541",
        description: this.chapter.description,
      });
      if (savedChapter.data._id) {
        const content = document.querySelector(".ProseMirror").innerHTML;

        const response = await Apis.create(
          `file/updateChapterContent/${savedChapter.data._id}`,
          {
            content: content,
          }
        );
        if (!response.data._id) {
          this.message = response.data;
        } else{
      const formData = new FormData();
      for (const i in this.attachments) {
        formData.append("files[" + i + "]", this.attachments[i]);
      }
      const response = await axios.post(
        `http://localhost:7070/kurious/file/AddAttachments/${savedChapter.data._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (
        response.data.message === "All attachments were successfully uploaded"
      ) {
        this.message = response.data;
      } else {
        alert(response.data);
      }
        }
      } else {
        this.message = savedChapter.data;
      }
      if (this.message === "") {
        // success message needed
        // this.type = 'chapters'
        alert("kbx");
      }
    },
  },
};
</script>

<style>
.ProseMirror:focus {
  outline: none;
}
</style>