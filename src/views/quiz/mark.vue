<template>
  <v-container
    v-if="selected_quiz_submission"
    fluid
    class="quiz-page white px-16"
  >
    <v-row>
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
              `${attempt.marked ? attempt.totalMarks + "/" : ""}${
                selected_quiz_submission.quiz.totalMarks
              }`
            }}
          </p>
        </div>
      </v-col>
      <v-col class="col-12 col-md-8 questions-side">
        <v-row
          v-for="(question, i) in selected_quiz_submission.quiz.questions"
          :key="i"
          class="col-12 col-md-12"
        >
          <p class="question-details col-md-12 col-12">
            {{ `${i + 1}. ${question.details}` }}
          </p>
          <v-col class="col-10">
            <v-btn
              v-if="question.type === 'file-upload'"
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
              v-if="question.type === 'file-upload'"
              type="file"
              :id="`file${i}`"
              hidden
            />

            <textarea
              v-if="question.type === 'open-ended'"
              v-model="attempt.answers[i].text"
              cols="50"
              disabled
              rows="5"
              placeholder="Type your answer here"
              class="answer-field"
            ></textarea>
            <div v-else class="options">
              <div v-if="question.type.includes('text')" class="d-block">
                <v-btn
                  v-for="(choice, k) in question.options.choices"
                  :key="k"
                  name="radio-btn"
                  class="radio-btn d-block mb-4"
                  rounded
                  outlined
                  :color="
                    checkChoiceStatus(attempt.answers[i].choosedOptions, {
                      text: choice.text,
                    })
                      ? 'green'
                      : ''
                  "
                  >{{ `${alphabets[k]}. ${choice.text}` }}</v-btn
                >
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
                    :src="`${choice.src}?format=png&width=200&height=200`"
                    :lazy-src="`${choice.src}?format=png&width=200&height=200`"
                    :gradient="
                      checkChoiceStatus(attempt.answers[i].choosedOptions, {
                        src: choice.src,
                      })
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
                        checkChoiceStatus(attempt.answers[i].choosedOptions, {
                          src: choice.src,
                        })
                      "
                      class="white--text"
                      size="50"
                      >mdi-check</v-icon
                    >
                  </v-img>
                </v-card>
              </div>
            </div>
          </v-col>
          <v-col class="col-2">
            <div
              v-if="question.type === 'open-ended'"
              class="cool-box grey-bg ml-6 mt-n1"
            >
              <input
                :class="`marks-input ${
                  attempt.answers[i].marks > question.marks ? 'red--text' : ''
                }`"
                v-model="attempt.answers[i].marks"
                :readonly="attempt.marked"
                type="text"
              />
              <span>{{ `/${question.marks}` }}</span>
            </div>
            <div v-else>
              <!-- <v-checkbox
                :input-value="attempt.answers[i].marks === question.marks"
                
                :disabled="attempt.marked"
                label="True"
              ></v-checkbox> -->
              {{ attempt.answers[i].marks + " " + question.marks }}
              <button
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
              <button
                @click="attempt.answers[i].marks = question.marks"
                :class="`${
                  attempt.answers[i].marks == question.marks ? 'd-none' : ''
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
                </svg>
              </button>
              <button
                @click="attempt.answers[i].marks = 0"
                class="svg-check-marks"
              >
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
            </div>
          </v-col>
        </v-row>
        <v-btn
          v-if="!attempt.marked"
          class="radio-btn d-block mb-4 submitt-attempt"
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
  computed: {
    // get the current course
    ...mapGetters("quiz_submission", ["selected_quiz_submission"]),
  },
  methods: {
    ...mapActions("quiz_submission", [
      "update_quiz_submission",
      "findQuizSubmissionByStudentAndQuizNames",
    ]),
    checkChoiceStatus(choosedOptions, choice) {
      if (choice.src) {
        for (const option of choosedOptions) {
          if (option.src === this.removeMediaPath(choice.src)) {
            return true;
          }
        }
      } else if (choice.text) {
        for (const option of choosedOptions) {
          if (option.text === choice.text) {
            return true;
          }
        }
      }
      return false;
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
    this.mode = "edit";
    this.findQuizSubmissionByStudentAndQuizNames({
      studentName: this.$route.params.student_name,
      quizName: this.$route.params.quiz_name,
    });
    setTimeout(() => {
      if (!this.selected_quiz_submission.marked) {
        for (const answer of this.selected_quiz_submission.answers) {
          answer.marks = 0;
        }
      }
      this.attempt = {
        quiz: this.selected_quiz_submission.quiz._id,
        student: this.selected_quiz_submission.student._id,
        autoSubmitted: this.selected_quiz_submission.autoSubmitted,
        usedTime: this.selected_quiz_submission.usedTime,
        answers: this.selected_quiz_submission.answers,
        marked: this.selected_quiz_submission.marked,
        totalMarks: this.selected_quiz_submission.totalMarks,
      };
      if (
        !this.attempt.marked &&
        this.$store.state.user.category === "Instructor"
      ) {
        this.mode = "edit";
      }
    }, 1000);
  },
};
</script>

<style lang="scss">
.cool-box {
  height: 45px;
  padding: 2px 20px;
  text-align: center;
  font-size: 1.7rem;
  display: inline-flex;
  font-weight: bold;
  border-radius: 13px;
}
.blue-bg {
  background-color: #6daefc;
  color: white;
}
.grey-bg {
  background-color: #f5f5f5;
  color: #4a4a4a;
}
.marks-input {
  width: 50px;
}
.marks-input:focus {
  outline: none;
}
.pictures-container {
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
}
.submitt-attempt {
  background-color: $primary !important;
  color: white !important;
}
.svg-check-marks {
  display: block;
  margin: 16px;
}
</style>