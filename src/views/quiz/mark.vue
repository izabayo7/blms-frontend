<template>
  <v-container
    v-if="selected_quiz_submission"
    fluid
    class="quiz-page white pl-lg-16"
  >
    <back class="mt-0 mb-6 ml-n6" to="/reports" />

    <v-row class="relative">
      <v-col class="col-12 col-md-8">
        <navigation />
        <v-row
          v-for="(question, i) in selected_quiz_submission.quiz.questions"
          :key="i"
          class="col-12 col-md-12"
        >
          <v-col class="col-12">
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
            </v-row>
            <v-row
              v-if="
                selected_quiz_submission.marked || userCategory === 'INSTRUCTOR'
              "
            >
              <v-col class="col-12 col-md-6 d-flex">
                <div class="mr-3">Awarded marks:</div>
                <div>
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
                  </div>
                </div>
              </v-col>
              <v-col
                v-if="question.type.includes('select')"
                class="col-12 col-md-4 ml-n6"
              >
                <div class="choice_status vertically--centered">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    v-if="attempt.answers[i].marks == question.marks"
                    width="34.657"
                    height="32.115"
                    viewBox="0 0 34.657 32.115"
                  >
                    <g
                      id="Icon_feather-check-square"
                      data-name="Icon feather-check-square"
                      transform="translate(2.5 2.5)"
                    >
                      <path
                        id="Path_2256"
                        data-name="Path 2256"
                        d="M13.5,16.545l4.519,4.519L33.083,6"
                        transform="translate(-4.462 -4.494)"
                        fill="none"
                        stroke="#3ce970"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="5"
                      />
                      <path
                        id="Path_2257"
                        data-name="Path 2257"
                        d="M31.615,18.058V28.6A3.013,3.013,0,0,1,28.6,31.615H7.513A3.013,3.013,0,0,1,4.5,28.6V7.513A3.013,3.013,0,0,1,7.513,4.5h16.57"
                        transform="translate(-4.5 -4.5)"
                        fill="none"
                        stroke="#3ce970"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="5"
                      />
                    </g>
                  </svg>

                  <svg
                    v-else
                    id="Icon_ionic-ios-checkbox-outline"
                    data-name="Icon ionic-ios-checkbox-outline"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30.103"
                    height="30.103"
                    viewBox="0 0 30.103 30.103"
                  >
                    <path
                      id="Path_2259"
                      data-name="Path 2259"
                      d="M32.094,4.5H7.009A2.506,2.506,0,0,0,4.5,7.009V32.094A2.506,2.506,0,0,0,7.009,34.6H32.094A2.506,2.506,0,0,0,34.6,32.094V7.009A2.506,2.506,0,0,0,32.094,4.5Zm.314,27.281a.629.629,0,0,1-.627.627H7.322a.629.629,0,0,1-.627-.627V7.322A.629.629,0,0,1,7.322,6.7H31.781a.629.629,0,0,1,.627.627Z"
                      transform="translate(-4.5 -4.5)"
                      fill="#fc6767"
                    />
                    <path
                      id="Icon_metro-cross"
                      data-name="Icon metro-cross"
                      d="M19.112,15.339h0l-5.064-5.064L19.111,5.21h0a.523.523,0,0,0,0-.738L16.719,2.08a.523.523,0,0,0-.738,0h0L10.917,7.145,5.853,2.08h0a.523.523,0,0,0-.738,0L2.723,4.473a.523.523,0,0,0,0,.738h0l5.064,5.064L2.723,15.339h0a.523.523,0,0,0,0,.738l2.392,2.392a.523.523,0,0,0,.738,0h0L10.917,13.4l5.064,5.064h0a.523.523,0,0,0,.738,0l2.392-2.392a.523.523,0,0,0,0-.738Z"
                      transform="translate(4.548 4.653)"
                      fill="#fc6767"
                    />
                  </svg>

                  <span class="ml-2 font-weight-bold">
                    {{
                      attempt.answers[i].marks == question.marks
                        ? "Right answer"
                        : "Wrong answer"
                    }}
                  </span>
                </div>
              </v-col>
              <v-col class="col-12">
                <feedback
                  v-if="
                    selected_quiz_submission.answers[i].feedback ||
                    userCategory === 'INSTRUCTOR'
                  "
                  :content="
                    selected_quiz_submission.answers[i].feedback
                      ? selected_quiz_submission.answers[i].feedback.content
                      : ''
                  "
                  :answerId="selected_quiz_submission.answers[i]._id"
                  :feedbackId="
                    selected_quiz_submission.answers[i].feedback
                      ? selected_quiz_submission.answers[i].feedback._id
                      : ''
                  "
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        :class="`col-12 col-md-4 mt-16 ${
          $vuetify.breakpoint.name == 'lg' ? 'fixed right-0' : ''
        }`"
      >
        <v-row
          class="font-weight-black student_name mb-8"
          align-content="center"
        >
          <v-col class="col-10 mx-auto color-primary">
            {{ selected_quiz_submission.user.sur_name }}
            {{ selected_quiz_submission.user.other_names }}
          </v-col>
        </v-row>
        <v-row class="mb-6">
          <div class="mr-3 title font-weight-bold">Total marks</div>
          <div>
            <div class="cool-box marks total grey-color mt-n1">
              <input
                class="marks-input"
                v-model="computedTotalMarks"
                readonly
                type="text"
              />
              <span>{{ `/${selected_quiz_submission.quiz.total_marks}` }}</span>
            </div>
          </div>
        </v-row>
        <v-row>
          <v-btn
            v-if="userCategory === 'INSTRUCTOR'"
            class="red-bg mr-3 px-8"
            to="/reports"
            >Cancel</v-btn
          >
          <v-btn
            v-if="userCategory === 'INSTRUCTOR'"
            class="primary-bg"
            @click="updateSubmission"
            >Save progress</v-btn
          >
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";
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
    navigation: () => import("@/components/shared/simple_navigation"),
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
        answers: this.selected_quiz_submission.answers.map((x) =>
          _.omit(x, ["feedback"])
        ),
        marked: this.selected_quiz_submission.marked,
        total_marks: this.selected_quiz_submission.totalMarks,
      };
      if (this.userCategory === "INSTRUCTOR") {
        this.mode = "edit";
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.cool-box {
  padding: 4px 12px;
  text-align: center;
  font-size: 1.3rem;
  * {
    color: $primary;
  }
  display: inline-flex;
  font-weight: bold;
  // border-radius: 13px;
  &.marks {
    // border: 2px solid #cbcbcb;
    box-shadow: 0px 3px 6px rgb(0, 0, 0, 0.16);
  }
  &.total {
    border-radius: 11px;
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
.red-bg {
  background-color: #fc6767 !important;
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
.relative {
  position: relative;
}
.fixed {
  position: fixed;
}
.right-0 {
  right: 0;
}
.color-primary {
  color: $primary;
}
.student_name {
  font-size: 1.6rem;
}
</style>