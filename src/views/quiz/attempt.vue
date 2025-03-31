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
              v-if="question.type === 'file-upload'"
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
              v-if="question.type === 'file-upload'"
              type="file"
              :id="`file${i}`"
              hidden
              @change="handleFileUpload(i)"
            />

            <textarea
              v-model="attempt.answers[i].text"
              v-if="question.type === 'open-ended'"
              cols="50"
              rows="5"
              placeholder="Type your answer here"
              class="answer-field"
            ></textarea>
            <div v-else class="options col col-12">
              <div v-if="question.type.includes('text')" class="d-block">
                <v-btn
                  v-for="(choice, k) in question.options.choices"
                  :key="k"
                  @click="handleOptionClick(i, k)"
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
          </v-row>
          <v-btn
            class="radio-btn d-block mb-4 submitt-attempt"
            @click="saveAttempt"
            rounded
            >Submitt Answers</v-btn
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
    filesToUpload: [],
    remaining_time: 0,
  }),
  computed: {
    // get the current course
    ...mapGetters("quiz", ["selected_quiz"]),
    ...mapGetters("quiz_submission", ["selected_quiz_submission"]),
    formated_remaining_time() {
      return new Date(this.remaining_time * 100).toISOString().substr(11, 8);
    },
  },
  watch: {
    remaining_time() {
      if (this.remaining_time == this.selected_quiz.duration) {
        // this.start_couter();
      }
    },
  },
  methods: {
    ...mapActions("quiz", ["findQuizByName"]),
    ...mapActions("quiz_submission", [
      "create_quiz_submission",
      "findQuizSubmissionByStudentAndQuizNames",
    ]),
    start_couter() {
      console.log("ahoooooooooo");
      while (this.remaining_time > 0) {
        setTimeout(() => {
          console.log(this.remaining_time);
          this.remaining_time -= 60;
        }, 1000);
      }
    },
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
        i < this.attempt.answers[questionIndex].choosedOptions.length;
        i++
      ) {
        if (this.selected_quiz.questions[questionIndex].type.includes("text")) {
          if (
            this.attempt.answers[questionIndex].choosedOptions[i].text ===
            value.text
          ) {
            this.attempt.answers[questionIndex].choosedOptions.splice(i, 1);
            deleted = true;
            break;
          }
        } else {
          if (
            this.attempt.answers[questionIndex].choosedOptions[i].src ===
            value.src
          ) {
            this.attempt.answers[questionIndex].choosedOptions.splice(i, 1);
            deleted = true;
            break;
          }
        }
      }
      if (!deleted) {
        if (
          this.selected_quiz.questions[questionIndex].type.includes("single")
        ) {
          this.attempt.answers[questionIndex].choosedOptions = [value];
        } else {
          this.attempt.answers[questionIndex].choosedOptions.push(value);
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
    this.findQuizSubmissionByStudentAndQuizNames({
      studentName: `${this.$store.state.user.user.surName}_${this.$store.state.user.user.otherNames}`,
      quizName: this.$route.params.name,
    });
    this.findQuizByName({
      userCategory: this.$store.state.user.user.category.toLowerCase(),
      userId: this.$store.state.user.user._id,
      quizName: this.$route.params.name,
    }).then((quiz) => {
      console.log(quiz)
      this.remaining_time = quiz.duration;
      this.attempt = {
        quiz: quiz._id,
        student: this.$store.state.user.user._id,
        autoSubmitted: false,
        usedTime: 0,
        answers: [],
      };
      for (const question of quiz.questions) {
        if (question.type === "open-ended") {
          this.attempt.answers.push({ text: "" });
        } else if (question.type === "file-upload") {
          this.attempt.answers.push({ src: "" });
          this.filesToUpload.push({ file: "" });
        } else {
          this.attempt.answers.push({ choosedOptions: [] });
        }
      }
    });
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
</style>