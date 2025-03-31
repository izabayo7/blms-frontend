<template>
  <v-app class="quiz-page">
    <h2>{{quiz.name}}</h2>
    <v-row>
      <v-col v-if="quiz !== []" class="col-12 col-md-7 questions-side">
        <v-row v-for="(question, i) in quiz.questions" :key="i" class="col-12 col-md-12">
          <p class="question-details col-md-12 col-12">{{`${i+1}. ${question.details}`}}</p>
          <textarea v-model="attempt.answers[i].text" v-if="question.type === 'open-ended'" cols="50" rows="5" placeholder="Type your answer here" class="answer-field"></textarea>
          <div v-else class="options">
          <div class="d-block">
            <v-btn v-for="(option, k) in question.options.options" :key="k" @click="handleOptionClick(i,k)" name="radio-btn" class="radio-btn d-block mb-4" rounded outlined :color="attempt.answers[i].choosedOptions.includes(k) ? 'green' : '' ">B. {{option.text}}</v-btn>
          </div>
          </div>
        </v-row>
        <!-- <v-row class="col-12 col-md-12">
          <p class="question-details col-md-12 col-12">2. {{questions.details[0]}}</p>
          <div class="radio-btn1">
            <v-btn name="radio-btn" class="radio-btn" color="transparent">A. Shantanu Kumar</v-btn>
          </div>
          <div class="d-block">
            <v-btn name="radio-btn" class="radio-btn" color="transparent">B. Assam</v-btn>
          </div>
        </v-row>
        <v-row class="col-12 col-md-12">
          <p class="question-details col-md-12 col-12">3. {{questions.details[0]}}</p>
          <v-btn rounded color="#ffd248" class="white--text">
            <v-icon>mdi-arrow-expand-up</v-icon>Upload file
          </v-btn>
        </v-row>
        <v-row class="col-12 col-md-12">
          <p class="question-details col-md-12 col-12">4. {{questions.details[0]}}</p>
          <v-card>
            <v-container fluid>
              <v-row>
                <v-col v-for="n in 4" :key="n" class="d-flex child-flex" cols="6">
                  <v-card flat tile class="d-flex">
                    <v-img
                      :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                      :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                      aspect-ratio="1"
                      class="grey lighten-2"
                    >
                      <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-row> -->
        <v-btn name="radio-btn" class="radio-btn d-block mb-4" @click="saveAttempt" rounded color="#ffd248">Submitt Quiz</v-btn>
      </v-col>
      <v-col class="col-12 col-md-5 timer-side">
        <div class="timer">
          <p>00 : 59</p>
        </div>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import Apis from "@/services/apis";
export default {
  data: () => ({
    quiz: {},
    attempt: {},
    show: false,
    message: '',
    status: 200,
    modal: true,
  }),
  beforeMount () {
      this.getQuiz();
  },
  methods: {
    handleOptionClick(questionIndex, optionIndex){
      if (this.quiz.questions[questionIndex].type === 'single-select') {
        this.attempt.answers[questionIndex].choosedOptions = [optionIndex]
      } else {
        if (this.attempt.answers[questionIndex].choosedOptions.includes(optionIndex)) {
          this.attempt.answers[questionIndex].choosedOptions.splice(this.attempt.answers[questionIndex].choosedOptions.inexOf(optionIndex), 1)
        } else {
          this.attempt.answers[questionIndex].choosedOptions.push(optionIndex)
        }
      }
      console.log(this.attempt)
    },
    async getQuiz() {
      try {
        const response = await Apis.get(`quiz/${this.$route.params.id}`);
        this.attempt = {
          quiz: response.data._id,
          student: this.$store.state.user._id,
          autoSubbmitted: undefined,
          usedTime: 0,
          answers: []
        }
        for (const question of response.data.questions) {
          if (question.type === 'open-ended') {
            this.attempt.answers.push({text: ''})
          } else {
            this.attempt.answers.push({choosedOptions: []})
          }
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
    async saveAttempt() {
      try {
        let response = await Apis.create("course", this.attempt);
        this.message = "Course was saved successfuly";
        this.show = true;
        this.course._id = response.data._id;

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

<style>
</style>