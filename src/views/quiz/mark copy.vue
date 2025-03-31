<template>
  <v-container
    v-if="selected_quiz_submission"
    fluid
    class="quiz-page white px-lg-16"
  >
    <back class="mt-0 mb-6 ml-n6" to="/reports" />
    <v-row>
      <v-col class="col-12" v-if="userCategory === 'INSTRUCTOR'">
        <v-row class="pa-0">
          <v-col class="col-5 mx-auto d-flex">
            <button
              :class="`mode-type mx-2 ${
                mode === 'view' ? 'active' : 'inactive'
              }`"
              @click="mode = 'view'"
            >
              View
            </button>
            <button
              :class="`mode-type mx-2 ${
                mode === 'edit' ? 'active' : 'inactive'
              }`"
              @click="mode = 'edit'"
            >
              Edit
            </button>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="col-12 col-md-8">
        <h2>{{ selected_quiz_submission.quiz.name }}</h2>
      </v-col>
      <v-col class="col-12 col-md-4 mt-2 d-flex text-center">
        <div class="totalMarks">
          <h3>Total marks</h3>
        </div>
        <div class="cool-box blue-bg d-flex ml-6 mt-n1">
          <p class="white--text">
            {{
              `${attempt.marked ? computedTotalMarks + "/" : ""}${
                selected_quiz_submission.quiz.total_marks
              }`
            }}
          </p>
        </div>
      </v-col>
      <v-col class="col-12 col-md-12 questions-side">
        <v-row
          v-for="(question, i) in selected_quiz_submission.quiz.questions"
          :key="i"
          class="col-12 col-md-12"
        >
          <v-col class="col-12 col-lg-7">
            <v-row>
              <v-col
                :class="question.type.includes('select') ? 'col-10' : 'col-12'"
              >
                <p class="question-details col-md-12 col-12">
                  {{ `${i + 1}. ${question.details}` }}
                </p>
                <v-btn
                  v-if="question.type === 'file_upload'"
                  rounded
                  color="#ffd248"
                  disabled
                  class="white--text course-image mt-4 mb-6 d-block"
                  @click="pickfile(i)"
                >
                  <v-icon>mdi-arrow-expand-up</v-icon>
                  <span>{{
                    attempt.answers[i].src === ""
                      ? "Upload file"
                      : attempt.answers[i].src
                  }}</span>
                </v-btn>
                <input
                  v-if="question.type === 'file_upload'"
                  type="file"
                  :id="`file${i}`"
                  hidden
                />

                <textarea
                  v-if="question.type === 'open_ended'"
                  v-model="attempt.answers[i].text"
                  :cols="$vuetify.breakpoint.name == 'lg' ? 50 : 40"
                  disabled
                  rows="5"
                  placeholder="Type your answer here"
                  class="answer-field"
                ></textarea>
                <div v-else class="options">
                  <div v-if="question.type.includes('text')" class="d-block">
                    <div
                      v-for="(choice, k) in question.options.choices"
                      :key="k"
                      :class="`text_selection ${
                        checkChoiceStatus(attempt.answers[i].choosed_options, {
                          text: choice.text,
                        })
                          ? 'selected'
                          : ''
                      }`"
                    >
                      {{ `${alphabets[k]}. ${choice.text}` }}
                    </div>
                  </div>
                  <div class="pictures-container" v-else>
                    <v-card
                      v-for="(choice, k) in question.options.choices"
                      :key="k"
                      flat
                      tile
                      class="ma-1"
                    >
                      <v-img
                        :src="`${
                          choice.src
                        }?format=png&width=200&height=200&token=${$session.get(
                          'jwt'
                        )}`"
                        :lazy-src="`${
                          choice.src
                        }?format=png&width=200&height=200&token=${$session.get(
                          'jwt'
                        )}`"
                        :gradient="
                          checkChoiceStatus(
                            attempt.answers[i].choosed_options,
                            {
                              src: choice.src,
                            }
                          )
                            ? 'to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)'
                            : undefined
                        "
                        class="vertically--centered text-center"
                      >
                        <template v-slot:placeholder>
                          <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                          >
                            <v-progress-circular
                              indeterminate
                              color="grey lighten-5"
                            ></v-progress-circular>
                          </v-row>
                        </template>
                        <v-icon
                          v-if="
                            checkChoiceStatus(
                              attempt.answers[i].choosed_options,
                              {
                                src: choice.src,
                              }
                            )
                          "
                          class="white--text"
                          size="50"
                          >mdi-{{ choice.right ? "check" : "close" }}</v-icon
                        >
                      </v-img>
                    </v-card>
                  </div>
                </div>
              </v-col>
              <v-col
                v-if="question.type.includes('select')"
                class="col-2 vertically--centered"
              >
                <button
                  v-if="attempt.answers[i].marks == question.marks"
                  :class="`${
                    attempt.answers[i].marks != question.marks ? 'd-none' : ''
                  } svg-check-marks`"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 42 42"
                  >
                    <g
                      id="Rectangle_903"
                      data-name="Rectangle 903"
                      fill="none"
                      stroke="#3ce970"
                      stroke-width="3"
                    >
                      <rect width="42" height="42" rx="8" stroke="none" />
                      <rect
                        x="1.5"
                        y="1.5"
                        width="39"
                        height="39"
                        rx="6.5"
                        fill="none"
                      />
                    </g>
                    <path
                      id="Icon_feather-check"
                      data-name="Icon feather-check"
                      d="M30,9,13.5,25.5,6,18"
                      transform="translate(3 4)"
                      fill="none"
                      stroke="#3ce970"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="3"
                    />
                  </svg>
                </button>
                <button v-else class="svg-check-marks">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 42 42"
                  >
                    <rect
                      id="Rectangle_902"
                      data-name="Rectangle 902"
                      width="42"
                      height="42"
                      rx="8"
                      fill="#fc6767"
                    />
                    <path
                      id="Icon_metro-cross"
                      data-name="Icon metro-cross"
                      d="M19.511,15.663h0l-5.186-5.187L19.511,5.29h0a.536.536,0,0,0,0-.755l-2.45-2.45a.536.536,0,0,0-.755,0h0L11.119,7.271,5.933,2.084h0a.536.536,0,0,0-.755,0l-2.45,2.45a.536.536,0,0,0,0,.755h0l5.187,5.187L2.727,15.663h0a.535.535,0,0,0,0,.755l2.45,2.45a.536.536,0,0,0,.755,0h0l5.187-5.187,5.187,5.187h0a.535.535,0,0,0,.755,0l2.45-2.45a.535.535,0,0,0,0-.755Z"
                      transform="translate(9.43 11.072)"
                      fill="#fff"
                    />
                  </svg>
                </button>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            class="col-12 col-lg-5"
            v-if="
              selected_quiz_submission.marked || userCategory === 'INSTRUCTOR'
            "
          >
            <v-row>
              <v-col class="col-12 col-md-5 pb-0 pr-md-0"
                ><div class="question title grey-color">
                  Q{{ i + 1 }} marks
                </div></v-col
              >
              <v-col class="col-12 col-md-6 pl-md-0">
                <div class="cool-box marks grey-color mt-n1">
                  <input
                    :class="`marks-input ${
                      question.type === 'open_ended' ? 'editable' : ''
                    }`"
                    v-model="attempt.answers[i].marks"
                    :readonly="mode === 'view'"
                    type="text"
                  />
                  <span>{{ `/${question.marks}` }}</span>
                </div></v-col
              >
              <v-col class="col-12">
                <feedback
                  v-if="
                    attempt.answers[i].feedback.length ||
                    userCategory === 'INSTRUCTOR'
                  "
                  :content="
                    attempt.answers[i].feedback.length
                      ? attempt.answers[i].feedback[0].content
                      : ''
                  "
                  :answerId="attempt.answers[i]._id"
                  :feedbackId="
                    attempt.answers[i].feedback.length
                      ? attempt.answers[i].feedback[0]._id
                      : ''
                  "
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-btn
          v-if="userCategory === 'INSTRUCTOR'"
          class="d-block mb-4 primary-bg"
          @click="updateSubmission"
          rounded
          >Save Marks</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    alphabets: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ],
    quiz: {},
    attempt: {},
    mode: "view",
  }),
  components: {
    back: () => import("@/components/shared/back-button"),
    feedback: () => import("@/components/courses/Feedback"),
  },
  computed: {
    ...mapGetters("quiz_submission", ["selected_quiz_submission"]),
    userCategory() {
      return this.$store.state.user.user.category.name;
    },
    computedTotalMarks() {
      let result = 0;
      for (const i in this.selected_quiz_submission.answers) {
        result = parseInt(
          result + parseInt(this.selected_quiz_submission.answers[i].marks || 0)
        );
      }
      return result;
    },
  },
  watch: {
    async selected_quiz_submission() {
      if (!this.selected_quiz_submission.marked) {
        for (const answer of this.selected_quiz_submission.answers) {
          answer.marks = 0;
        }
      }
      await this.autoMarkChoiceQuestions();
    },
  },
  methods: {
    ...mapActions("quiz_submission", [
      "update_quiz_submission",
      "findQuizSubmissionByUserAndQuizNames",
    ]),
    checkChoiceStatus(choosed_options, choice) {
      if (choice.src) {
        for (const option of choosed_options) {
          if (option.src === this.removeMediaPath(choice.src)) {
            return true;
          }
        }
      } else if (choice.text) {
        for (const option of choosed_options) {
          if (option.text === choice.text) {
            return true;
          }
        }
      }
      return false;
    },
    async autoMarkChoiceQuestions() {
      for (const i in this.selected_quiz_submission.quiz.questions) {
        if (
          this.selected_quiz_submission.quiz.questions[i].type.includes(
            "select"
          )
        ) {
          const rightChoices = this.selected_quiz_submission.quiz.questions[
            i
          ].options.choices.filter((choice) => choice.right);

          if (
            this.selected_quiz_submission.quiz.questions[i].type.includes(
              "single"
            )
          ) {
            if (
              this.selected_quiz_submission.quiz.questions[i].type.includes(
                "file"
              ) &&
              this.selected_quiz_submission.answers[i].choosed_options[0].length
            ) {
              if (
                this.selected_quiz_submission.answers[i].choosed_options[0]
                  .src ==
                rightChoices[0].src.split("/")[
                  rightChoices[0].src.split("/").length - 1
                ]
              ) {
                this.selected_quiz_submission.answers[
                  i
                ].marks = this.selected_quiz_submission.quiz.questions[i].marks;
              }
            } else {
              if (
                this.selected_quiz_submission.answers[i].choosed_options[0]
                  .text == rightChoices[0].text
              ) {
                this.selected_quiz_submission.answers[
                  i
                ].marks = this.selected_quiz_submission.quiz.questions[i].marks;
              }
            }
          } else {
            for (const k in this.selected_quiz_submission.answers[i]
              .choosed_options) {
              if (
                this.selected_quiz_submission.quiz.questions[i].type.includes(
                  "file"
                )
              ) {
                let checkStatus = rightChoices.filter(
                  (choice) =>
                    choice.src.split("/")[
                      rightChoices[0].src.split("/").length - 1
                    ] ==
                    this.selected_quiz_submission.answers[i].choosed_options[k]
                      .src
                );

                if (checkStatus.length > 0) {
                  this.selected_quiz_submission.answers[i].marks +=
                    this.selected_quiz_submission.quiz.questions[i].marks /
                    rightChoices.length;
                }
              } else {
                let checkStatus = rightChoices.filter(
                  (choice) =>
                    choice.text ==
                    this.selected_quiz_submission.answers[i].choosed_options[k]
                      .text
                );
                if (checkStatus.length > 0) {
                  this.selected_quiz_submission.answers[i].marks +=
                    this.selected_quiz_submission.quiz.questions[i].marks /
                    rightChoices.length;
                }
              }
            }
          }
        }
      }
    },
    removeMediaPath(url) {
      return url.split("/")[url.split("/").length - 1];
    },
    pickfile(index) {
      document.getElementById(`file${index}`).click();
    },
    async updateSubmission() {
      this.update_quiz_submission({
        submission: this.attempt,
      }).then(() => {
        this.$router.push("/reports");
      });
    },
  },
  created() {
    this.findQuizSubmissionByUserAndQuizNames({
      userName: this.$route.params.user_name,
      quizName: this.$route.params.quiz_name,
    }).then(async () => {
      this.attempt = {
        quiz: this.selected_quiz_submission.quiz._id,
        user: this.selected_quiz_submission.user.user_name,
        auto_submitted: this.selected_quiz_submission.auto_submitted,
        used_time: this.selected_quiz_submission.used_time,
        answers: this.selected_quiz_submission.answers,
        marked: this.selected_quiz_submission.marked,
        total_marks: this.selected_quiz_submission.totalMarks,
      };
      if (!this.attempt.marked && this.userCategory === "Instructor") {
        this.mode = "edit";
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.cool-box {
  padding: 10px 20px;
  text-align: center;
  font-size: 1.7rem;
  display: inline-flex;
  font-weight: bold;
  border-radius: 13px;
  &.marks {
    border: 2px solid #cbcbcb;
  }
  p {
    margin: 0;
  }
}
.blue-bg {
  background-color: #6daefc;
  color: white;
}
.grey-color {
  color: #4a4a4a;
}
.marks-input {
  width: 50px;
  &.editable {
    border-bottom: 1px solid #d2d2d2;
    text-align: center;
  }
}
.marks-input:focus {
  outline: none;
}
.pictures-container {
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
}
.primary-bg {
  background-color: $primary !important;
  color: white !important;
}
.svg-check-marks {
  display: block;
  margin: 16px;
}
.mode-type {
  width: 50%;
  padding: 12px;
}
.active {
  background-color: $primary;
  color: white;
}
.inactive {
  color: $primary;
  border: 1px solid $primary;
}
.text_selection {
  width: 75%;
  border-radius: 20px;
  padding: 16px;
  box-shadow: 0px 4px 16px rgb(199 199 199);
  margin-bottom: 12px;
  &.selected {
    font-weight: 600;
    border: none;
    /* border-color: green; */
    box-shadow: 8px 9px 11px rgb(199 199 199);
  }
}
</style>