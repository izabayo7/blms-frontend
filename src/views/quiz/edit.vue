<template>
  <v-app class="create-quiz-page" v-if="selected_quiz !== undefined">
    <div class="d-flex">
      <span class="quiz_lable">Quiz title</span>
      <v-text-field
        v-model="selected_quiz.name"
        class="quiz_title ml-4 mt-n3"
        required
      />
    </div>
    <span class="quiz_lable my-6">Quiz instructions</span>
    <kurious-editor
      v-if="mode !== ''"
      ref="editor"
      :mode="mode"
      :defaultContent="selected_quiz.instructions"
      template="small"
    />
    <span class="quiz_lable my-6">Quiz duration</span>
    <time-picker
      :duration="duration"
      @updateTime="updateDutation"
    />
    <span class="quiz_lable my-6">Questions</span>
    <v-row v-for="(question, i) in selected_quiz.questions" :key="i">
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
                        <div
                          v-if="soltAttachments(i).length > 0"
                          class="attachments"
                        >
                          <!-- <div
                            v-for="(choice, key) in soltAttachments(i)"
                            :key="key"
                            class="file-listing d-flex"
                          > -->
                          <div
                            class="downloadable_attachment vertically--centered"
                          >
                            <!-- <v-icon color="#000000" x-large
                                >mdi-file{{
                                  findIcon(choice.src)
                                }}-outline</v-icon
                              > -->
                            <!-- <v-icon color="#000000" x-large
                              >mdi-file-outline</v-icon
                            > -->
                            <!-- <span class="filename text-truncate">{{
                                choice.src.split("/")[
                                  choice.src.split("/").length - 1
                                ]
                              }}</span> -->
                            <div class="pictures-container">
                              <v-card
                                v-for="(choice,
                                k) in question.options.choices.filter((_c) =>
                                  _c.src.includes('http')
                                )"
                                :key="k"
                                flat
                                tile
                                class="ma-1 d-flex"
                                color="transparent"
                              >
                                <v-img
                                  :src="`${choice.src}?format=png&width=200&height=200`"
                                  :lazy-src="`${choice.src}?format=png&width=200&height=200`"
                                  :gradient="
                                    choice.right
                                      ? 'to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)'
                                      : undefined
                                  "
                                  @click="handleOptionClick(i, k)"
                                  class="vertically--centered text-center"
                                >
                                  <v-icon
                                    v-if="choice.right"
                                    class="white--text"
                                    size="50"
                                    >mdi-check</v-icon
                                  >
                                </v-img>
                                <button
                                  @click.prevent="
                                    remove_quiz_attached_file({
                                      index: i,
                                      file_name: choice.src,
                                    })
                                  "
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="45"
                                    height="45"
                                    viewBox="0 0 69 69"
                                  >
                                    <circle
                                      id="Ellipse_225"
                                      data-name="Ellipse 225"
                                      cx="34.5"
                                      cy="34.5"
                                      r="34.5"
                                      fill="#fc6767"
                                    />
                                    <path
                                      id="Icon_material-delete"
                                      data-name="Icon material-delete"
                                      d="M9,28.5a3.009,3.009,0,0,0,3,3H24a3.009,3.009,0,0,0,3-3v-18H9ZM28.5,6H23.25l-1.5-1.5h-7.5L12.75,6H7.5V9h21V6Z"
                                      transform="translate(16.5 16.5)"
                                      fill="none"
                                      stroke="#fff"
                                      stroke-width="2"
                                    />
                                  </svg>
                                </button>
                              </v-card>
                            </div>
                          </div>
                          <!-- </div> -->
                        </div>
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
              v-if="selected_quiz.questions.length > 1"
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
        >Update quiz</v-btn
      >
      <v-btn
        color="#707070"
        class="cancel-quiz"
        text
        @click="$router.push('/quiz')"
        >Cancel</v-btn
      >
    </v-row>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TimePicker from "@/components/quiz/timePicker";
export default {
  components: {
    TimePicker,
  },
  data: () => ({
    pictures: [],
    mode: "",
    duration: {},
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
  computed: {
    // get the current course
    ...mapGetters("quiz", ["selected_quiz"]),
  },
  methods: {
    ...mapActions("quiz", ["update_quiz", "findQuizByName"]),
    updateDutation(hh,mm,ss){
      this.duration.hh = hh
      this.duration.mm = mm
      this.duration.ss = ss
    },
    handleOptionClick(questionIndex, optionIndex, fileName) {
      let rightChoices = [],
        calculatedIndex = optionIndex,
        realIndex = optionIndex,
        separatingIndex = 0;

      if (fileName) {
        for (const i in this.selected_quiz.questions[questionIndex].options
          .choices) {
          if (
            !this.selected_quiz.questions[questionIndex].options.choices[
              i
            ].src.includes("http")
          ) {
            separatingIndex = i;
            calculatedIndex = parseInt(i) + realIndex;
            break;
          }
        }
      }

      for (const k in this.selected_quiz.questions[questionIndex].options
        .choices) {
        if (k == calculatedIndex) {
          this.selected_quiz.questions[questionIndex].options.choices[
            k
          ].right = !this.selected_quiz.questions[questionIndex].options
            .choices[k].right;
        } else if (
          this.selected_quiz.questions[questionIndex].type.includes("Single")
        ) {
          this.selected_quiz.questions[questionIndex].options.choices[
            k
          ].right = false;
        }
        if (
          this.selected_quiz.questions[questionIndex].options.choices[k]
            .right &&
          calculatedIndex > separatingIndex - 1 &&
          fileName
        ) {
          rightChoices.push(calculatedIndex - separatingIndex);
        }
      }
      if (this.selected_quiz.questions[questionIndex].type.includes("file")) {
        this.$refs[`picker${questionIndex}`][0].showRightFiles(
          questionIndex,
          rightChoices
        );
      }
    },
    soltAttachments(index) {
      let attachments = [];
      for (const i in this.selected_quiz.questions[index].options.choices) {
        if (
          this.selected_quiz.questions[index].options.choices[i].src.includes(
            "http"
          )
        ) {
          attachments.push(
            this.selected_quiz.questions[index].options.choices[i]
          );
        }
      }
      return attachments;
    },
    //delete a quiz attached file
    remove_quiz_attached_file({ index, file_name }) {
      for (const i in this.selected_quiz.questions[index].options.choices) {
        if (
          this.selected_quiz.questions[index].options.choices[i].src ===
          file_name
        ) {
          this.selected_quiz.questions[index].options.choices.splice(i, 1);
          break;
        }
      }
    },
    addPicture(file, boundIndex) {
      this.pictures[boundIndex].push(file);
      this.selected_quiz.questions[boundIndex].options.choices.push({
        src: file.name,
        right: false,
      });
    },
    removePicture(index, boundIndex) {
      this.pictures[boundIndex].splice(index, 1);
      this.selected_quiz.questions[boundIndex].options.choices.splice(index, 1);
    },
    handleTypeChange(index) {
      if (this.selected_quiz.questions[index].type.includes("text")) {
        this.selected_quiz.questions[index].options = {
          choices: [
            { text: "", right: false },
            { text: "", right: false },
          ],
        };
      } else if (
        this.selected_quiz.questions[index].type.includes("file") &&
        this.selected_quiz.questions[index].type.includes("select")
      ) {
        this.selected_quiz.questions[index].options = {
          choices: [],
        };
      }
      this.pictures[index] = [];
    },
    addQuestion() {
      this.selected_quiz.questions.push({
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
      this.selected_quiz.questions[index].options.choices.push({
        text: "",
        right: false,
      });
    },
    removeOption(index, index1) {
      this.selected_quiz.questions[index].options.choices.splice(index1, 1);
    },
    removeQuestion(index) {
      this.selected_quiz.questions.splice(index, 1);
      this.selected_quiz.pictures.splice(index, 1);
    },
    toSeconds(duration) {
      const hours = duration.hh ? duration.hh : 0;
      const minutes = duration.mm ? duration.mm : 0;
      const seconds = duration.ss ? duration.ss : 0;
      const result = seconds + minutes * 60 + hours * 3600;
      return result;
    },
    to_hh_mm_ss(seconds) {
      let string = new Date(seconds * 1000).toISOString().substr(11, 8);
      string = string.split(":");
      return {
        hh: string[0],
        mm: string[1],
        ss: string[2],
      };
    },
    async saveQuiz() {
      let questions = [];
      for (const index in this.selected_quiz.questions) {
        // format the question type
        this.selected_quiz.questions[index].type = this.selected_quiz.questions[
          index
        ].type
          .toLowerCase()
          .split(" ")
          .join("-");

        // remove options for non select questions
        if (!this.selected_quiz.questions[index].type.includes("select")) {
          this.selected_quiz.questions[index].options = undefined;
        }
        // remove media path from src
        else if (
          this.selected_quiz.questions[index].type.includes("file-select")
        ) {
          for (const i in this.selected_quiz.questions[index].options.choices) {
            const mediapath = this.selected_quiz.questions[index].options
              .choices[i].src;
            this.selected_quiz.questions[index].options.choices[
              i
            ].src = mediapath.split("/")[mediapath.split("/").length - 1];
          }
        }
        questions.push(this.selected_quiz.questions[index]);
      }

      const editorContent = this.$refs.editor.getHTML();

      this.update_quiz({
        quiz: {
          name: this.selected_quiz.name,
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
    formatQuestionType(value) {
      for (const index in this.questionTypes) {
        if (
          value == this.questionTypes[index].toLowerCase().split(" ").join("-")
        ) {
          return this.questionTypes[index];
        }
      }
    },
  },
  created() {
    this.mode = "edit";
    this.findQuizByName({
      userCategory: this.$store.state.user.user.category.toLowerCase(),
      userId: this.$store.state.user.user._id,
      quizName: this.$route.params.name,
    }).then((quiz) => {
      this.duration = this.to_hh_mm_ss(quiz.duration);

      for (let i = 0; i < quiz.questions.length; i++) {
        this.selected_quiz.questions[i].type = this.formatQuestionType(
          quiz.questions[i].type
        );
        this.pictures.push([]);
      }
    });
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

  button.cancel-quiz.v-btn.v-btn--flat.v-btn--text.theme--light.v-size--default {
    font-size: 18px;
    margin: 20px -10px;
  }
  .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
    > .v-input__control
    > .v-input__slot:focus-within {
    border-left: 8px solid #ffc100;
  }
  .downloadable_attachment {
    width: 100%;
    margin-bottom: 18px;
  }
  .pictures-container {
    display: flex;
    flex-direction: row;
    flex-flow: wrap;
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