<template>
  <v-container fluid class="quiz-page white">
    <v-row>
      <v-col class="col-12 col-md-8">
        <h2>{{quiz.name}}</h2>
      </v-col>
      <v-col class="col-12 col-md-4 mt-2 d-flex text-center">
        <div class="totalMarks">
          <h3>Total marks</h3>
        </div>
        <div class="cool-box blue-bg d-flex ml-6 mt-n1">
          <p>{{quiz.totalMarks}}</p>
        </div>
      </v-col>
      <v-col v-if="quiz !== {}" class="col-12 col-md-8 questions-side">
        <v-row v-for="(question, i) in quiz.questions" :key="i" class="col-12 col-md-12">
          <p class="question-details col-md-12 col-12">{{`${i+1}. ${question.details}`}}</p>
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
                        :src="`http://localhost:7070/kurious/file/quizAttachedFiles/${attempt.quiz}/${choice.src}?format=png&width=200&height=200`"
                        :lazy-src="`http://localhost:7070/kurious/file/quizAttachedFiles/${attempt.quiz}/${choice.src}?format=png&width=200&height=200`"
                        :gradient="checkCoiceStatus(attempt.answers[i].choosedOptions, {src: choice.src}) ? 'to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)' : undefined"
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
          </v-col>
          <v-col class="col-2">
            <div v-if="question.type === 'open-ended'" class="cool-box grey-bg ml-6 mt-n1">
              <input
                :class="`marks-input ${attempt.answers[i].marks > question.marks ? 'red--text': ''}`"
                v-model="attempt.answers[i].marks"
                type="text"
              />
              <span>{{`/${question.marks}`}}</span>
            </div>
            <div v-else>
              <v-checkbox
                :input-value="(attempt.answers[i].marks === question.marks)"
                @click="attempt.answers[i].marks = question.marks"
                label="True"
              ></v-checkbox>
              <v-checkbox
                :input-value="(attempt.answers[i].marks !== question.marks)"
                @click="attempt.answers[i].marks = 0"
                label="False"
              ></v-checkbox>
            </div>
          </v-col>
        </v-row>
        <v-btn
          name="radio-btn"
          class="radio-btn d-block mb-4"
          @click="updateSubmission"
          rounded
          color="#ffd248"
        >Save Marks</v-btn>
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
    this.getSubmission();
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
    async getSubmission() {
      try {
        let response = await Apis.get(
          `quizSubmission/${this.$route.params.id}`
        );

        for (const answer of response.data.answers) {
          answer.marks = 0;
        }
        this.attempt = {
          quiz: response.data.quiz,
          student: response.data.student,
          autoSubmitted: response.data.autoSubmitted,
          usedTime: response.data.usedTime,
          answers: response.data.answers,
        };
        const quizId = response.data.quiz;
        response = await Apis.get(`quiz/${quizId}`);
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
    async updateSubmission() {
      try {
        await Apis.update(
          "quizSubmission",
          this.$route.params.id,
          this.attempt
        );
        // upload the files
        this.message = "Submission was marked successfuly";
        this.show = true;
        setTimeout(() => {
          this.$router.push("/reports");
        }, 1000);
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
</style>