<template>
  <v-container fluid class="quiz-page">
    <h2>{{quiz.name}}</h2>
    <v-row>
      <v-col v-if="quiz !== []" class="col-12 col-md-7 questions-side">
        <v-row v-for="(question, i) in quiz.questions" :key="i" class="col-12 col-md-12">
          <p class="question-details col-md-12 col-12">{{`${i+1}. ${question.details}`}}</p>
          <v-btn
            v-if="question.type === 'file-upload'"
            rounded
            color="#ffd248"
            class="white--text course-image mt-4 mb-6 d-block"
            @click="pickfile(i)"
          >
            <v-icon>mdi-arrow-expand-up</v-icon>
            <span>{{attempt.answers[i].src === "" ? 'Upload file' : attempt.answers[i].src}}</span>
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
                @click="handleOptionClick(i,k)"
                name="radio-btn"
                class="radio-btn d-block mb-4"
                rounded
                outlined
                :color="checkCoiceStatus(attempt.answers[i].choosedOptions, {text: choice.text}) ? 'green' : '' "
              >{{`${alphabets[k]}. ${choice.text}`}}</v-btn>
            </div>
            <v-container v-else fluid>
              <v-row>
                <v-col
                  v-for="(choice, k) in question.options.choices"
                  :key="k"
                  class="d-flex child-flex"
                  cols="6"
                >
                  <v-card flat tile class="d-flex">
                    <v-img
                      :src="`http://localhost:7070/kurious/file/quizAttachedFiles/${$route.params.id}/${choice.src}?format=png&width=200&height=200`"
                      :lazy-src="`http://localhost:7070/kurious/file/quizAttachedFiles/${$route.params.id}/${choice.src}?format=png&width=200&height=200`"
                      :gradient="checkCoiceStatus(attempt.answers[i].choosedOptions, {src: choice.src}) ? 'to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)' : undefined"
                      @click="handleOptionClick(i,k)"
                    >
                      <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-row>
                      </template>
                      <v-icon
                        v-if="checkCoiceStatus(attempt.answers[i].choosedOptions, {src: choice.src})"
                        class="ma-16 white--text"
                        size="50"
                      >mdi-check</v-icon>
                    </v-img>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-row>
        <v-btn
          name="radio-btn"
          class="radio-btn d-block mb-4"
          @click="saveAttempt"
          rounded
          color="#ffd248"
        >Submitt Quiz</v-btn>
      </v-col>
      <v-col class="col-12 col-md-5 timer-side">
        <div class="timer">
          <p>00 : 59</p>
        </div>
      </v-col>
    </v-row>
    <kurious-dialog :show="show" :message="message" :modal="modal" :status="status">
      <!-- <v-icon slot="icon" size="55" dark>mdi-clipboard-text-multiple-outline</v-icon> -->
      <v-icon slot="icon" size="55" dark>mdi-barley</v-icon>
      <!-- <v-row slot="actions">
        <v-col class="col-6 mx-auto my-0">
          <v-btn color="mx-2" to="/quiz">Go to Quizes</v-btn>
          <v-btn v-if="status !== 200" color="mx-2" @click="show = false">Edit Quiz</v-btn>
          <v-btn v-else color="mx-2" @click="reset();show = false">Add Another Quiz</v-btn>
        </v-col>
      </v-row>-->
    </kurious-dialog>
  </v-container>
</template>

<script>
import Apis from "@/services/apis";
import axios from "axios";
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
    show: false,
    message: "",
    filesToUpload: [],
    status: 200,
    modal: true,
  }),
  beforeMount() {
    this.getQuiz();
  },
  methods: {
    checkCoiceStatus(choosedOptions, choice) {
      if (choice.src) {
        for (const option of choosedOptions) {
          if (option.src === choice.src) {
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
    handleOptionClick(questionIndex, optionIndex) {
      const value = this.quiz.questions[questionIndex].type.includes("text")
        ? {
            text: this.quiz.questions[questionIndex].options.choices[
              optionIndex
            ].text,
          }
        : {
            src: this.quiz.questions[questionIndex].options.choices[optionIndex]
              .src,
          };

      let deleted = false;
      for (
        let i = 0;
        i < this.attempt.answers[questionIndex].choosedOptions.length;
        i++
      ) {
        if (this.quiz.questions[questionIndex].type.includes("text")) {
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
        if (this.quiz.questions[questionIndex].type.includes("single")) {
          this.attempt.answers[questionIndex].choosedOptions = [value];
        } else {
          this.attempt.answers[questionIndex].choosedOptions.push(value);
        }
      }
    },
    async getQuiz() {
      try {
        const response = await Apis.get(`quiz/${this.$route.params.id}`);
        this.attempt = {
          quiz: response.data._id,
          student: this.$store.state.user._id,
          autoSubmitted: false,
          usedTime: 0,
          answers: [],
        };
        for (const question of response.data.questions) {
          if (question.type === "open-ended") {
            this.attempt.answers.push({ text: "" });
          } else if (question.type === "file-upload") {
            this.attempt.answers.push({ src: "" });
          } else {
            this.attempt.answers.push({ choosedOptions: [] });
          }
          this.filesToUpload.push({ file: "" });
        }
        this.quiz = response.data;
      } catch (error) {
        if (error.request && !error.response) {
          this.status = 503;
          this.message = "Service Unavailable";
          this.modal = false;
          this.show = true;
        }
      }
    },
    async uploadAttachments(submissionId) {
      try {
        const formData = new FormData();
        for (const i in this.filesToUpload) {
          if (this.filesToUpload[i].file !== "") {
            formData.append("files[" + i + "]", this.filesToUpload[i].file);
          }
        }
        await axios.post(
          `http://localhost:7070/kurious/file/submissionAttachedFiles/${submissionId}`,
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
        console.log(error);
        this.modal = false;
        this.show = true;
      }
    },
    async saveAttempt() {
      try {
        const response = await Apis.create("quizSubmission", this.attempt);
        this.uploadAttachments(response.data._id);
        // upload the files
        this.message = "Submission was saved successfuly";
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
  color: #fc6767;
  background: #fed6d6;
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
</style>