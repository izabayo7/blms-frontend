<template>
  <v-container
    v-if="selected_quiz && attempt !== {}"
    fluid
    class="quiz-page px-16"
  >
    <div v-if="!selected_quiz_submission">
      <h2>{{ selected_quiz.name }}</h2>
      <v-row>
        <v-col class="col-12 col-md-7 questions-side">
          <v-row
            v-for="(question, i) in selected_quiz.questions"
            :key="i"
            class="col-12 col-md-12"
          >
            <p class="question-details col-md-12 col-12">
              {{ `${i + 1}. ${question.details}` }}
            </p>
            <v-btn
              v-if="question.type === 'file_upload'"
              rounded
              color="#ffd248"
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
              @change="handleFileUpload(i)"
            />

            <textarea
              v-model="attempt.answers[i].text"
              v-if="question.type === 'open_ended'"
              cols="50"
              rows="5"
              placeholder="Type your answer here"
              class="answer-field"
            ></textarea>
            <div v-else class="options col col-12">
              <div v-if="question.type.includes('text')" class="d-block">
                <div
                  v-for="(choice, k) in question.options.choices"
                  :key="k"
                  @click="handleOptionClick(i, k)"
                  :class="`text-selection ${
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
                      checkChoiceStatus(attempt.answers[i].choosed_options, {
                        src: choice.src,
                      })
                        ? 'to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)'
                        : undefined
                    "
                    @click="handleOptionClick(i, k)"
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
                        checkChoiceStatus(attempt.answers[i].choosed_options, {
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
          </v-row>
          <v-btn
            v-if="$store.state.user.user.category.name == 'STUDENT'"
            class="radio-btn d-block mb-4 submitt-attempt"
            @click="saveAttempt"
            rounded
            >Submit Answers</v-btn
          >
          <v-btn
            v-else
            class="radio-btn d-block mb-4 submitt-attempt"
            @click="$router.push('/quiz')"
            rounded
            >Back to quiz</v-btn
          >
        </v-col>
        <v-col class="col-12 col-md-5 timer-side">
          <div class="timer">
            <p>{{ formated_remaining_time }}</p>
          </div>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      You arleady did this assignment, you can
      <router-link
        :to="`/quiz/${$route.params.name}/${$store.state.user.user.surName}_${$store.state.user.user.otherNames}`"
        >review your submission</router-link
      >
    </div>
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
    attempt: {},
    done: false,
    filesToUpload: [],
    remaining_time: 0,
  }),
  computed: {
    // get the current course
    ...mapGetters("quiz", ["selected_quiz"]),
    ...mapGetters("quiz_submission", ["selected_quiz_submission", "loaded"]),
    formated_remaining_time() {
      return new Date(this.remaining_time * 1000).toISOString().substr(11, 8);
    },
  },
  watch: {
    remaining_time() {
      if (this.remaining_time > 0) {
        setTimeout(() => {
          this.remaining_time -= 1;
        }, 1000);
      } else if (!this.done) {
        this.done = true;
        const category = this.$store.state.user.user.category.name;
        if (category == "INSTRUCTOR") {
          this.$router.push("/quiz");
        } else if (category == "STUDENT") {
          this.markUndoneQuestions();
          this.saveAttempt();
        }
      }
    },
  },
  methods: {
    ...mapActions("quiz", ["findQuizByName"]),
    ...mapActions("quiz_submission", [
      "create_quiz_submission",
      "findQuizSubmissionByStudentAndQuizNames",
    ]),
    async markUndoneQuestions() {
      for (const i in this.attempt.answers) {
        if (this.selected_quiz.questions[i].type.includes("select")) {
          this.attempt.answers[i].not_done =
            this.attempt.answers[i].choosed_options.length > 0
              ? undefined
              : true;
        } else if (this.selected_quiz.questions[i].type === "open_ended") {
          if (this.attempt.answers[i].text == "") {
            this.attempt.answers[i].not_done = true;
            this.attempt.answers[i].text = undefined;
          }
        } else if (this.selected_quiz.questions[i].type === "file_upload") {
          if (this.attempt.answers[i].src == "") {
            this.attempt.answers[i].not_done = true;
            this.attempt.answers[i].src = undefined;
          }
        }
      }
    },
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
    pickfile(index) {
      document.getElementById(`file${index}`).click();
    },
    handleFileUpload(index) {
      this.filesToUpload[index].file = document.getElementById(
        `file${index}`
      ).files[0];
      this.attempt.answers[index].src = this.filesToUpload[index].file.name;
    },
    removeMediaPath(url) {
      return url.split("/")[url.split("/").length - 1];
    },
    handleOptionClick(questionIndex, optionIndex) {
      const value = this.selected_quiz.questions[questionIndex].type.includes(
        "text"
      )
        ? {
            text: this.selected_quiz.questions[questionIndex].options.choices[
              optionIndex
            ].text,
          }
        : {
            src: this.removeMediaPath(
              this.selected_quiz.questions[questionIndex].options.choices[
                optionIndex
              ].src
            ),
          };

      let deleted = false;
      for (
        let i = 0;
        i < this.attempt.answers[questionIndex].choosed_options.length;
        i++
      ) {
        if (this.selected_quiz.questions[questionIndex].type.includes("text")) {
          if (
            this.attempt.answers[questionIndex].choosed_options[i].text ===
            value.text
          ) {
            this.attempt.answers[questionIndex].choosed_options.splice(i, 1);
            deleted = true;
            break;
          }
        } else {
          if (
            this.attempt.answers[questionIndex].choosed_options[i].src ===
            value.src
          ) {
            this.attempt.answers[questionIndex].choosed_options.splice(i, 1);
            deleted = true;
            break;
          }
        }
      }
      if (!deleted) {
        if (
          this.selected_quiz.questions[questionIndex].type
            .toLowerCase()
            .includes("single")
        ) {
          this.attempt.answers[questionIndex].choosed_options = [value];
        } else {
          this.attempt.answers[questionIndex].choosed_options.push(value);
        }
      }
    },
    async saveAttempt() {
      this.create_quiz_submission({
        submission: this.attempt,
        attachments: this.filesToUpload,
      }).then(() => {
        this.$router.push("/reports");
      });
    },
  },
  created() {
    this.mode = "edit";
    if (!this.loaded) {
      if (this.$store.state.user.user.category == "Student") {
        this.findQuizSubmissionByStudentAndQuizNames({
          studentName: `${this.$store.state.user.user.surName}_${this.$store.state.user.user.otherNames}`,
          quizName: this.$route.params.name,
        });
      }

      this.findQuizByName({
        user_name: this.$store.state.user.user.user_name,
        quizName: this.$route.params.name,
      }).then((quiz) => {
        this.remaining_time = quiz.duration;
        this.attempt = {
          quiz: quiz._id,
          user: this.$store.state.user.user.user_name,
          auto_submitted: false,
          used_time: 0,
          answers: [],
        };
        for (const question of quiz.questions) {
          if (question.type === "open_ended") {
            this.attempt.answers.push({ text: "" });
          } else if (question.type === "file_upload") {
            this.attempt.answers.push({ src: "" });
            this.filesToUpload.push({ file: "" });
          } else {
            this.attempt.answers.push({ choosed_options: [] });
          }
        }
        this.start_couter();
      });
    }
  },
};
</script>

<style lang="scss">
.timer {
  width: 290px;
  height: 135px;
  padding: 21px;
  margin-top: 9%;
  text-align: center;
  font-size: 3.99rem;
  position: fixed;
  font-weight: bold;
  border-radius: 33px;
  /* p {
     color: white;
   }*/
  background-color: rgba(252, 103, 103, 0.27);
}
// show colors based on the remaining time
.timer.green {
  color: #fc6767;
  background: #fed6d6;
}
.timer.orange {
  color: #fc6767;
  background: #fed6d6;
}
.timer.red {
  color: #fc6767;
  background: #fed6d6;
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
.text-selection {
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