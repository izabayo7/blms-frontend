<template>
  <v-app class="create-quiz-page">
    <div class="d-flex">
      <span class="quiz_lable">Quiz title</span>
      <v-text-field v-model="name" class="quiz_title ml-4 mt-n3" required />
    </div>
    <span class="quiz_lable my-6">Quiz instructions</span>
    <kurious-editor
      v-if="mode !== ''"
      ref="editor"
      :mode="mode"
      :defaultContent="'<ol><li><p>Write your custom instructions</p></li></ol>'"
      template="small"
    />
    <span class="quiz_lable my-6">Quiz duration</span>
    <time-picker :duration="duration" @updateTime="updateDutation" />
    <span class="quiz_lable my-6">Questions</span>
    <v-row v-for="(question, i) in questions" :key="i">
      <v-col class="col-12">
        <v-row>
          <v-col class="col-1 px-0">
            <span class="question_number">Q{{ i + 1 }}</span>
          </v-col>
          <v-col class="col-10 px-0">
            <v-row>
              <v-col class="col-12 col-md-3">
                <span class="field_title">question Type</span>
                <v-select
                  v-model="question.type"
                  :items="questionTypes"
                  label="Question Type"
                  class="field_shadow_2"
                  @change="handleTypeChange(i)"
                  solo
                ></v-select>
              </v-col>
              <v-col class="col-12 col-md-6 pb-0">
                <v-row>
                  <v-col class="col-12 mt-n3">
                    <span class="field_title">question Details</span>
                    <v-textarea
                      v-model="question.details"
                      placeholder="Type question details"
                      class="field_shadow_1"
                      solo
                      required
                    ></v-textarea>
                  </v-col>
                  <v-col
                    class="col-12"
                    v-if="question.type !== 'Open ended' && question.options"
                  >
                    <v-row>
                      <v-col
                        v-if="
                          question.type === 'Single text select' ||
                          question.type === 'Multiple text select'
                        "
                        class="col-12"
                      >
                        <v-textarea
                          v-for="(option, k) in question.options.choices"
                          :key="k"
                          v-model="option.text"
                          :placeholder="`Option ${k + 1}`"
                          class="question-options"
                          @click:prepend="handleOptionClick(i, k)"
                          :prepend-icon="
                            option.right ? 'mdi-check' : 'mdi-close'
                          "
                          solo
                          required
                        >
                          <template
                            v-if="question.options.choices.length > 2"
                            v-slot:append-outer
                          >
                            <v-icon
                              :color="'error'"
                              @click="removeOption(i, k)"
                              v-text="'mdi-close'"
                            />
                          </template>
                        </v-textarea>
                        <v-btn text class="add-option" @click="addOption(i)">
                          <v-icon class="mr-2">mdi-plus</v-icon>Add Option
                        </v-btn>
                      </v-col>
                      <v-col
                        v-else-if="
                          question.type === 'Single file select' ||
                          question.type === 'Multiple file select'
                        "
                        class="col-12 file-drop"
                      >
                        <kurious-file-picker
                          :ref="`picker${i}`"
                          :boundIndex="i"
                          :allowedTypes="['image']"
                          :multiple="true"
                          @addFile="addPicture"
                          @removeFile="removePicture"
                          @fileClicked="handleOptionClick"
                        />
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
              <v-col class="col-6 col-md-2 mx-auto mx-md-0">
                <span class="field_title">Marks</span>
                <v-text-field
                  v-model="question.marks"
                  suffix="Marks"
                  class="field_shadow_1"
                  type="number"
                  solo
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-1 px-0">
            <v-btn
              v-if="questions.length > 1"
              class="mt-10"
              icon
              @click="removeQuestion(i)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="27"
                viewBox="0 0 21 27"
              >
                <path
                  id="Icon_material-delete"
                  data-name="Icon material-delete"
                  d="M9,28.5a3.009,3.009,0,0,0,3,3H24a3.009,3.009,0,0,0,3-3v-18H9ZM28.5,6H23.25l-1.5-1.5h-7.5L12.75,6H7.5V9h21Z"
                  transform="translate(-7.5 -4.5)"
                  fill="#fc6767"
                />
              </svg>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-btn color="#707070" class="white--text" rounded @click="addQuestion()">
      <v-icon>mdi-plus</v-icon>Add a question
    </v-btn>
    <v-row>
      <v-btn class="white--text save-quiz" rounded @click="saveQuiz()"
        >Save</v-btn
      >
      <v-btn
        color="transparent"
        class="cancel-quiz"
        @click="$router.push('/quiz')"
        >Cancel</v-btn
      >
    </v-row>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import TimePicker from "@/components/quiz/timePicker";
export default {
  components: {
    TimePicker,
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
    questions: [],
  }),
  created() {
    this.mode = "edit";
    this.recreate();
  },
  methods: {
    ...mapActions("quiz", ["create_quiz"]),
    updateDutation(hh, mm, ss) {
      this.duration.hh = hh;
      this.duration.mm = mm;
      this.duration.ss = ss;
    },
    addPicture(file, boundIndex) {
      this.pictures[boundIndex].push(file);
      this.questions[boundIndex].options.choices.push({
        src: file.name,
        right: false,
      });
    },
    removePicture(index, boundIndex) {
      this.pictures[boundIndex].splice(index, 1);
      this.questions[boundIndex].options.choices.splice(index, 1);
    },
    recreate() {
      this.questions = [
        {
          type: "",
          marks: 0,
          details: "",
          options: {
            choices: [],
          },
        },
        {
          type: "",
          marks: 0,
          details: "",
          options: {
            choices: [],
          },
        },
      ];
      this.duration = { hh: "00", mm: "05", ss: "00" };
      this.pictures = [[], []];
    },
    handleOptionClick(questionIndex, optionIndex) {
      let rightChoices = [];

      for (const k in this.questions[questionIndex].options.choices) {
        if (k == optionIndex) {
          this.questions[questionIndex].options.choices[k].right = !this
            .questions[questionIndex].options.choices[k].right;
        } else if (this.questions[questionIndex].type.includes("Single")) {
          this.questions[questionIndex].options.choices[k].right = false;
        }
        if (this.questions[questionIndex].options.choices[k].right) {
          rightChoices.push(k);
        }
      }
      if (this.questions[questionIndex].type.includes("file")) {
        this.$refs[`picker${questionIndex}`][0].showRightFiles(
          questionIndex,
          rightChoices
        );
      }
    },
    handleTypeChange(index) {
      if (this.questions[index].type.includes("text")) {
        this.questions[index].options = {
          choices: [
            { text: "", right: false },
            { text: "", right: false },
          ],
        };
      } else if (
        this.questions[index].type.includes("file") &&
        this.questions[index].type.includes("select")
      ) {
        this.questions[index].options = {
          choices: [],
        };
      }
      this.pictures[index] = [];
    },
    addQuestion() {
      this.questions.push({
        type: "",
        marks: 0,
        details: "",
        options: {
          choices: [],
        },
      });
      this.pictures.push([]);
    },
    addOption(index) {
      this.questions[index].options.choices.push({ text: "", right: false });
    },
    removeOption(index, index1) {
      this.questions[index].options.choices.splice(index1, 1);
    },
    removeQuestion(index) {
      this.questions.splice(index, 1);
      this.pictures.splice(index, 1);
    },
    toSeconds(duration) {
      const hours = duration.hh ? duration.hh : 0;
      const minutes = duration.mm ? duration.mm : 0;
      const seconds = duration.ss ? duration.ss : 0;
      const result = parseInt(seconds) + parseInt(minutes) * 60 + parseInt(hours) * 3600;
      return result;
    },
    async saveQuiz() {
      let questions = [];
      for (const index in this.questions) {
        this.questions[index].type = this.questions[index].type
          .toLowerCase()
          .split(" ")
          .join("-");
        if (!this.questions[index].type.includes("select")) {
          this.questions[index].options = undefined;
        }
        questions.push(this.questions[index]);
      }

      const editorContent = this.$refs.editor.getHTML();

      this.create_quiz({
        quiz: {
          name: this.name,
          instructions: editorContent.includes(
            "Write Here You custom instructions"
          )
            ? undefined
            : editorContent,
          duration: this.toSeconds(this.duration),
          instructor: this.$store.state.user.user._id,
          questions: questions,
        },
        pictures: this.pictures,
      }).then(() => {
        this.$router.push("/quiz");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.create-quiz-page {
  background-color: #f9faff;
  padding: 30px;
  .quiz_lable {
    color: #8f8f8f;
    font-size: 20px;
  }
  .quiz_title {
    width: 12px !important;
    max-width: 300px;
  }
  .question_number,
  field_title {
    font-size: 24px;
  }
  .mdi-plus::before {
    font-size: 28px;
    color: #fff;
    background-color: #707070;
    border-radius: 15px;
  }
  a.add-option.router-link-exact-active.router-link-active {
    text-decoration: none;
    color: #717171;
    margin-left: 5px;
    font-weight: bold;
  }
  button.theme--light.v-btn.v-btn--contained.v-btn--rounded.v-size--default.white--text {
    width: 160px;
    margin-left: 0;
  }

  button.white--text.save-quiz.v-btn.v-btn--contained.v-btn--rounded.v-size--default {
    width: 120px;
    margin: 20px 30px;
    background-color: $primary;
  }

  .cancel-quiz {
    font-size: 18px;
    margin: 20px -10px;
  }
  .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
    > .v-input__control
    > .v-input__slot:focus-within {
    border-left: 8px solid #ffc100;
  }
}
</style>
<style lang="scss">
// the shadows
.field_shadow_1.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  box-shadow: 0px 10px 20px rgb(183, 183, 183, 0.16) !important;
}

.field_shadow_2.v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  box-shadow: 0px 10px 40px rgb(199, 199, 199, 0.16) !important;
}

.v-menu__content {
  box-shadow: 0px 10px 40px rgb(199, 199, 199, 0.16) !important;
}
</style>