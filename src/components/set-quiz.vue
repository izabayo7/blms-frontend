<template>
  <v-app class="set-quiz-page">
    <h2>Economics Basics</h2>
    <v-text-field
      v-model="name"
      placeholder="Enter the quiz name"
      class="question-options"
      solo
      required
    />
    <kurious-editor
      v-if="mode !== ''"
      ref="editor"
      :mode="mode"
      :defaultContent="'Write Here You custom instructions'"
    />
    <vue-timepicker v-model="duration" format="hh:mm:ss" />
    <v-row v-for="(question, i) in questions" :key="i">
      <v-col class="col-12">
        <v-row>
          <v-col class="col-1 px-0">
            <v-btn text @click="removeQuestion(i)">
              <h2>Q{{i+1}}</h2>
            </v-btn>
          </v-col>
          <v-col class="col-11 px-0">
            <v-col class="col-12 pb-0">
              <h4>Question Details</h4>
              <v-text-field
                v-model="question.details"
                placeholder="Type question details"
                solo
                required
              ></v-text-field>
            </v-col>
            <v-col class="col-12 pt-0">
              <v-row>
                <v-col class="col-12 col-md-4">
                  <h4>Question Type</h4>
                  <v-select
                    v-model="question.type"
                    :items="questionTypes"
                    label="Question Type"
                    solo
                  ></v-select>
                </v-col>
                <v-col class="col-8 pt-9" v-if="question.type !== 'Open ended'">
                  <v-row>
                    <v-col
                      v-if="question.type === 'Single text select' || question.type === 'Multiple text select'"
                      class="col-12"
                    >
                      <v-text-field
                        v-for="(option, k) in question.options.choices"
                        :key="k"
                        v-model="option.text"
                        :placeholder="`Option ${k+1}`"
                        class="question-options"
                        solo
                        required
                      >
                        <template v-if="question.options.choices.length > 2" v-slot:append-outer>
                          <v-icon :color="'error'" @click="removeOption(i,k)" v-text="'mdi-close'" />
                        </template>
                      </v-text-field>
                      <v-btn text class="add-option" @click="addOption(i)">
                        <v-icon class="mr-2">mdi-plus</v-icon>Add Option
                      </v-btn>
                    </v-col>
                    <v-col
                      v-else-if="question.type === 'Single file select' || question.type === 'Multiple file select'"
                      class="col-12 file-drop"
                    >
                      <kurious-file-picker
                        :boundIndex="i"
                        :allowedTypes="['image']"
                        @addFile="addPicture"
                        @removeFile="removePicture"
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
            <v-col class="col-6 col-md-4 mx-auto mx-md-0">
              <h4>Marks</h4>
              <v-text-field v-model="question.marks" suffix="Marks" solo required></v-text-field>
            </v-col>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-btn color="#707070" class="white--text" rounded @click="addQuestion()">
      <v-icon>mdi-plus</v-icon>Add a question
    </v-btn>
    <v-row>
      <v-btn color="#ffd248" class="white--text save-quiz" rounded @click="saveQuiz() ">Save</v-btn>
      <v-btn color="#707070" class="cancel-quiz" text>Cancel</v-btn>
    </v-row>
    <kurious-dialog :show="show" :message="message" :modal="modal" :status="status">
      <!-- <v-icon slot="icon" size="55" dark>mdi-clipboard-text-multiple-outline</v-icon> -->
      <v-icon slot="icon" size="55" dark>mdi-barley</v-icon>
      <v-row slot="actions">
        <v-col class="col-6 mx-auto my-0">
          <v-btn color="mx-2" to="/quiz">Go to Quizes</v-btn>
          <v-btn v-if="status !== 200" color="mx-2" @click="show = false">Edit Quiz</v-btn>
          <v-btn v-else color="mx-2" @click="reset();show = false">Add Another Quiz</v-btn>
        </v-col>
      </v-row>
    </kurious-dialog>
  </v-app>
</template>

<script>
import axios from "axios";
import Apis from "@/services/apis";
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";
export default {
  components: {
    VueTimepicker,
  },
  data: () => ({
    pictures: [[], []],
    show: false,
    message: "",
    modal: true,
    mode: "",
    status: 200,
    name: "",
    duration: { hh: "00", mm: "00", ss: "00" },
    activeQuestion: 0,
    questionTypes: [
      "Open ended",
      "Single text select",
      "Multiple text select",
      "Single file select",
      "Multiple file select",
      "File upload",
      // "Matching",
      // "Filling Blanks",
      // "Image Selection",
      // "Audio Question",
    ],
    questions: [
      {
        type: "Open ended",
        marks: 0,
        details: "",
        options: {
          choices: [{ text: "" }, { text: "" }],
        },
      },
      {
        type: "Single text select",
        marks: 0,
        details: "",
        options: {
          choices: [{ text: "" }, { text: "" }],
        },
      },
    ],
  }),
  beforeMount() {
    this.mode = "edit";
  },
  methods: {
    addPicture(file, boundIndex) {
      this.pictures[boundIndex].push(file);
      this.questions[boundIndex].options.choices.push({ src: file.name });
    },
    removePicture(index, boundIndex) {
      this.pictures[boundIndex].splice(index, 1);
      this.questions[boundIndex].options.choices.splice(index, 1);
    },
    reset() {
      this.questions = [
        {
          type: "Multiple text select",
          marks: 0,
          details: "",
          options: {
            choices: [{ text: "" }, { text: "" }],
          },
        },
        {
          type: "Open ended",
          marks: 0,
          details: "",
          options: {
            choices: [{ text: "" }, { text: "" }],
          },
        },
      ];
      this.duration = { hh: "00", mm: "00", ss: "00" };
      this.pictures = [[], []];
    },
    addQuestion() {
      this.questions.push({
        type: "Open ended",
        marks: 0,
        details: "",
        options: {
          choices: [{ text: "" }, { text: "" }],
        },
      });
      this.pictures.push([]);
    },
    addOption(index) {
      this.questions[index].options.choices.push({ text: "" });
    },
    removeOption(index, index1) {
      this.questions[index].options.choices.splice(index1, 1);
    },
    removeQuestion(index) {
      this.questions.splice(index, 1);
    },
    toSeconds(duration) {
      const hours = duration.hh ? duration.hh : 0;
      const minutes = duration.mm ? duration.mm : 0;
      const seconds = duration.ss ? duration.ss : 0;
      const result = seconds + minutes * 60 + hours * 3600;
      return result;
    },
    async uploadPictures(quizId) {
      try {
        const formData = new FormData();
        for (const picturesGroup of this.pictures) {
          for (const index in picturesGroup) {
            formData.append("files[" + index + "]", picturesGroup[index]);
          }
        }
        await axios.post(
          `http://localhost:7070/kurious/file/quizAttachedFiles/${quizId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } catch (error) {
        if (error.response) {
          this.status = error.response.status;
          this.message = error.response.data;
        } else if (error.request) {
          this.status = 503;
          this.message = "Service Unavailable";
        }
        this.modal = false;
        this.show = true;
      }
    },
    async saveQuiz() {
      try {
        let questions = [];
        for (const index in this.questions) {
          if (!this.questions[index].type.includes("select")) {
            this.questions[index].options = undefined;
          }

          this.questions[index].type = this.questions[index].type
            .toLowerCase()
            .split(" ")
            .join("-");

          if (
            this.questions[index].type.includes("file") &&
            this.questions[index].options.choices.length > 0
          ) {
            this.questions[index].options.choices.splice(0, 2);
          }
          questions.push(this.questions[index]);
        }
        const instructions = this.$refs.editor.getHTML();
        let response = await Apis.create("quiz", {
          name: this.name,
          instructions: instructions.includes(
            "Write Here You custom instructions"
          )
            ? undefined
            : instructions,
          duration: this.toSeconds(this.duration),
          instructor: this.$store.state.user._id,
          questions: questions,
        });
        this.uploadPictures(response.data._id);
        this.message = "Quiz was saved successfully";
        this.show = true;
      } catch (error) {
        if (error.response) {
          this.status = error.response.status;
          this.message = error.response.data;
        } else if (error.request) {
          this.status = 503;
          this.message = "Service Unavailable";
        }
        this.modal = false;
        this.show = true;
      }
    },
  },
};
</script>