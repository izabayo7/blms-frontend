<template>
  <v-container
      v-if="selected_quiz && attempt !== {}"
      fluid
      class="quiz-page px-4 px-md-16"
  >
    <div
        v-if="(!selected_quiz_submission || $store.state.user.user.category.name ==  'INSTRUCTOR') && filesToUpload.length && !disabled">
      <h2>{{ selected_quiz.name }}</h2>
      <v-row>
        <v-col class="col-12 col-md-7 questions-side">
          <v-row
              v-for="(question, i) in selected_quiz.questions"
              :key="i"
              class="col-12 col-md-12"
          >
            <div class="d-flex align-center">
              <span>
                {{ i + 1 }}
              </span>
              <div class="question_details col-md-12 col-12">
                {{ question.details }} <span v-if="question.required" class="red--text">*</span>
              </div>
            </div>
            <div v-if="question.type === 'file_upload'" class="file-container d-flex">
              <div class="col-4 pa-0">
                <div v-if="filesToUpload[i].file == ''" class="indicator mb-2">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9 0C4.03763 0 0 4.03763 0 9C0 13.9624 4.03763 18 9 18C13.9624 18 18 13.9624 18 9C18 4.03763 13.9624 0 9 0ZM9 16.875C4.6575 16.875 1.125 13.3425 1.125 9C1.125 4.6575 4.6575 1.125 9 1.125C13.3425 1.125 16.875 4.6575 16.875 9C16.875 13.3425 13.3425 16.875 9 16.875Z"
                        fill="#193074"/>
                    <path d="M9 4.1543L9 10.1543" stroke="#193074" stroke-width="1.5" stroke-linecap="round"/>
                    <circle cx="9" cy="13" r="1" fill="#193074"/>
                  </svg>
                  <span class="ml-1">no file chosen</span>
                </div>
                <div>
                  <button class="pick-file file-picked" @click="pickfile(i)">
                    Choose file
                  </button>
                </div>
                <div class="allowed-files">
                  Only
                  <span
                      v-for="(type, x) in question.allowed_files"
                      :key="x">
                  {{ `${type} ${question.allowed_files.length > (x + 1) ? ',' : ''}` }}
                </span>
                  accepted
                </div>
              </div>
              <div v-if="filesToUpload[i].file == ''" class="col-8 d-flex py-0">
                <div class="justify-center align-center d-none">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0)">
                      <path
                          d="M11.5 0C10.9477 0 10.5 0.447734 10.5 1.00001V5.00002C10.5 5.55229 10.9477 6.00003 11.5 6.00003C12.0523 6.00003 12.5 5.55229 12.5 5.00002V1.00001C12.5 0.447734 12.0523 0 11.5 0Z"
                          fill="#2D50A7"/>
                      <path
                          d="M11.5 16C10.9477 16 10.5 16.4477 10.5 17V21C10.5 21.5523 10.9477 22 11.5 22C12.0523 22 12.5 21.5523 12.5 21V17C12.5 16.4477 12.0523 16 11.5 16Z"
                          fill="#73A1FB"/>
                      <path
                          d="M7.96524 6.04919L5.13678 3.22064C4.74637 2.8301 4.11318 2.8301 3.72259 3.22064C3.33205 3.61118 3.33205 4.24433 3.72259 4.63483L6.55106 7.46338C6.74631 7.65863 7.00227 7.75629 7.25811 7.75629C7.51398 7.75629 7.76999 7.65863 7.96516 7.46338C8.35579 7.07283 8.35579 6.43973 7.96524 6.04919Z"
                          fill="#355EC9"/>
                      <path
                          d="M20.5 10H18.5C17.9477 10 17.5 10.4477 17.5 11C17.5 11.5523 17.9477 12 18.5 12H20.5C21.0523 12 21.5 11.5523 21.5 11C21.5 10.4477 21.0523 10 20.5 10Z"
                          fill="#C4D9FD"/>
                      <path
                          d="M16.4492 14.5351C16.0588 14.1445 15.4256 14.1446 15.0351 14.5351C14.6445 14.9256 14.6446 15.5587 15.0351 15.9492L17.8636 18.7777C18.0589 18.9729 18.3148 19.0705 18.5707 19.0705C18.8267 19.0705 19.0826 18.9729 19.2778 18.7777C19.6683 18.3871 19.6683 17.754 19.2778 17.3635L16.4492 14.5351Z"
                          fill="#C4D9FD"/>
                      <path
                          d="M6.50003 11C6.50003 10.4477 6.05229 10 5.50002 10H1.50001C0.947734 10 0.5 10.4477 0.5 11C0.5 11.5523 0.947734 12 1.50001 12H5.50002C6.05229 12 6.50003 11.5523 6.50003 11Z"
                          fill="#3D6DEB"/>
                      <path
                          d="M7.9652 14.5351C7.57474 14.1446 6.94151 14.1446 6.55101 14.5351L3.72259 17.3635C3.33205 17.754 3.33205 18.3872 3.72259 18.7777C3.91784 18.973 4.17381 19.0706 4.42973 19.0706C4.68565 19.0706 4.94162 18.973 5.13678 18.7777L7.9652 15.9493C8.35574 15.5588 8.35574 14.9256 7.9652 14.5351Z"
                          fill="#5286FA"/>
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect width="22" height="22" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>

                </div>
              </div>
              <div v-else class="col-8 d-flex py-0">
                <div class="file-name ">{{ filesToUpload[i].file.name }}</div>
                <div class="file-size mx-auto">{{ filesToUpload[i].file.size }}</div>
                <div class="file-type mx-auto">
                  {{ filesToUpload[i].file.name.split('.')[filesToUpload[i].file.name.split('.').length - 1] }}
                </div>
                <div class="save-status hidden-sm-and-down d-md-flex justify-sm-center align-center">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M5.24909 9.45091L2.79909 7.00091L1.98242 7.81758L5.24909 11.0842L12.2491 4.08424L11.4324 3.26758L5.24909 9.45091Z"
                        fill="#289448"/>
                  </svg>
                  Saved successfuly
                </div>
              </div>
            </div>
            <input
                v-if="question.type === 'file_upload'"
                type="file"
                :id="`file${i}`"
                hidden
                :allowedTypes="findAcceptedFiles(i)"
                @change="handleFileUpload(i)"
            />

            <textarea
                v-model="attempt.answers[i].text"
                @blur="saveProgress(i)"
                v-if="question.type       === 'open_ended'"
                cols="50"
                rows="5"
                placeholder="Type your answer here"
                class="answer-field"
            ></textarea>
            <div v-else class="options col col-12">
              <div @mouseleave="saveProgress(i)" v-if="question.type.includes('text')" class="d-block">
                <div
                    v-for="(choice, k) in question.options.choices"
                    :key="k"
                    @click="handleOptionClick(i, k)"
                    :class="`text-selection cursor-pointer ${
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
              <div @mouseleave="saveProgress(     i)" class="pictures-container" v-else>
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

                    <svg class="check-svg" v-if="
                        checkChoiceStatus(attempt.answers[i].choosed_options, {
                          src: choice.src,
                        })
                      " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true"
                         focusable="false" width="1em" height="1em"
                         style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"
                         preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                      <path d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59L21 7z"/>
                    </svg>
                  </v-img>
                </v-card>
              </div>
            </div>
          </v-row>
          <button
              v-if="$store.state.user.user.category.name == 'STUDENT'"
              class="radio-btn d-block mb-4 submitt-attempt"
              @click="validate"
              rounded
          >Submit Answers
          </button
          >
          <button
              v-else
              class="radio-btn d-block mb-4 submitt-attempt"
              @click="$router.push('/assessments/quiz')"
          >Back to quiz
          </button
          >
        </v-col>
        <v-col class="col-12 col-md-5 timer-side">
          <div
              :class="`timer ${remaining_time > 1000 ? 'greenish' : 'redish'}`"
          >
            <p>{{ formated_remaining_time }}</p>
          </div>
        </v-col>
      </v-row>
    </div>
    <div v-else-if="disabled">
      <ErrorPage
        title="You are not allowed to  do a quiz "
        subtitle="You must first pay your school fees to regain access"
      />
    </div>
    <div class="d-flex justify-center align-center full-height" v-else>
      <img src="https://kurious.rw/_nuxt/img/loader.059b462.gif" alt="loading ..">
    </div>
  </v-container>
</template>

<script>
import Apis from "@/services/apis";
import {mapGetters, mapActions} from "vuex";
import {assessmentMixins} from "../../services/mixins";

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
    error: "",
    filesToUpload: [],
    remaining_time: 0,
    submission_id: "",
  }),
  mixins: [assessmentMixins],
  computed: {
    ...mapGetters("chat", ["socket"]),
    ...mapGetters("network", ["onLine"]),
    // get the current course
    ...mapGetters("quiz", ["selected_quiz"]),
    ...mapGetters("quiz_submission", ["selected_quiz_submission", "loaded"]),
    formated_remaining_time() {
      return new Date(this.remaining_time * 1000).toISOString().substr(11, 8);
    }
  },
  watch: {
    remaining_time() {
      if (this.remaining_time > 0) {
        setTimeout(() => {
          this.remaining_time -= 1;
        }, 1000);
        if (this.remaining_time == this.selected_quiz.duration - 1)
          this.initialiseQuiz();

        this.attempt.used_time = this.selected_quiz.duration - this.remaining_time;
      } else if (!this.done) {
        this.done = true;
        const category = this.$store.state.user.user.category.name;
        if (category == "INSTRUCTOR") {
          this.$router.push("/assessments/quiz/timeout");
        } else if (category == "STUDENT") {
          this.markUndoneQuestions();
          this.attempt.auto_submitted = true;
          this.saveAttempt();
        }
      }
    },
    error() {
      if (this.error != "")
        this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: this.error,
          status: "danger",
          uptime: 5000,
        }).then(() => {
          this.error = ""
        })
    },
    onLine() {
      if (this.onLine) {
        this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: "You are online, you can now submit your quiz",
          status: "success",
          uptime: 5000,
        }).then(() => {
          this.error = ""
        })
      } else {
        this.error = "You are offline, continue doing your quiz"
      }
    },
  },
  methods: {
    saveProgress(index) {
      if (this.$store.state.user.user.category.name === 'STUDENT') {
        this.socket.emit('save-progress', {
          index,
          submission_id: this.submission_id,
          attempt: this.attempt,
          end: false
        })
      }
    },
    async uploadFile(index) {
      const formData = new FormData()
      formData.append("files[0]", this.filesToUpload[index].file);

      await Apis.create(`quiz_submission/${this.submission_id}/attachment`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    },
    ...mapActions("quiz", ["findQuizByName"]),
    ...mapActions("quiz_submission", [
      "create_quiz_submission",
      "findQuizSubmissionByUserAndQuizNames",
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
    findAcceptedFiles(index) {
      if (!this.selected_quiz.questions[index].allowed_files)
        return "*"

      let allowed_types = []
      if (this.selected_quiz.questions[index].allowed_files.includes('image'))
        allowed_types.push('image/*')

      if (this.selected_quiz.questions[index].allowed_files.includes('Pdf'))
        allowed_types.push('application/pdf')

      if (this.selected_quiz.questions[index].allowed_files.includes('Word document'))
        allowed_types.push('application/msword')

      if (this.selected_quiz.questions[index].allowed_files.includes('Powerpoint file'))
        allowed_types.push('application/vnd.ms-powerpoint')

      if (this.selected_quiz.questions[index].allowed_files.includes('Zip'))
        allowed_types.push('application/zip,application/x-zip,application/x-zip-compressed,application/octet-stream')

      if (this.selected_quiz.questions[index].allowed_files.includes('image'))
        allowed_types.push('.txt')

      if (this.selected_quiz.questions[index].allowed_files.includes('Video'))
        allowed_types.push('video/*')

      return allowed_types.join(',')

    },
    handleFileUpload(index) {
      this.filesToUpload[index].file = document.getElementById(
          `file${index}`
      ).files[0];
      this.attempt.answers[index].src = this.filesToUpload[index].file.name;
      this.saveProgress(index);
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
    validate() {
      for (const i in this.selected_quiz.questions) {

        if (this.selected_quiz.questions[i].required) {
          if (this.selected_quiz.questions[i].type.includes('select') && !this.attempt.answers[i].choosed_options.length)
            return this.error = `Question ${parseInt(i) + 1} is required`

          else if (this.selected_quiz.questions[i].type == 'open_ended' && !this.attempt.answers[i].text.length)
            return this.error = `Question ${parseInt(i) + 1} is required`

          else if (this.selected_quiz.questions[i].type == 'file_upload' && !this.attempt.answers[i].src.length)
            return this.error = `Question ${parseInt(i) + 1} is required`

        }
      }

      this.saveAttempt();
    },
    initialiseQuiz() {
      if (this.$store.state.user.user.category.name === 'STUDENT') {
        this.socket.emit('start-quiz', {
          quiz: this.selected_quiz._id
        })
        this.socket.on('start-quiz', (id) => {
          this.submission_id = id;
        })
        this.socket.on('progress-saved', ({index, end, is_selection_only}) => {
          if (end) {
            // notify instructor
            this.socket.emit('student-submitted', {
              userId: this.selected_quiz.user,
              route: `/assessments/quiz/${this.$route.params.name}/${this.$store.state.user.user.user_name}`,
              content: 'submitted quiz ' + this.selected_quiz.name
            })
            if (is_selection_only) {
              this.$router.push(`/assessments/quiz/${this.selected_quiz.name}/results`);
            } else {
              this.$router.push(
                  `${
                      this.attempt.auto_submitted ? "/assessments/quiz/timeout" : "/assessments/quiz/submitted"
                  }`
              );
            }
          } else if (index != undefined) {
            if (this.filesToUpload[index].file != "")
              this.uploadFile(index);
          }
        })
      }
    },
    async saveAttempt() {

      this.socket.emit('save-progress', {
        submission_id: this.submission_id,
        attempt: this.attempt,
        end: true,
        questions: this.selected_quiz.questions
      })

      // this.create_quiz_submission({
      //   submission: this.attempt,
      //   attachments: this.filesToUpload.filter(e => e.file != ""),
      // }).then((is_selection_only) => {
      //   // notify instructor
      //   this.socket.emit('student-submitted', {
      //     userId: this.selected_quiz.user,
      //     route: `/quiz/${this.$route.params.name}/${this.$store.state.user.user.user_name}`,
      //     content: 'submitted quiz ' + this.selected_quiz.name
      //   })
      //   if (is_selection_only) {
      //     this.$router.push(`/quiz/${this.selected_quiz.name}/results`);
      //   } else {
      //     this.$router.push(
      //         `${
      //             this.attempt.auto_submitted ? "/quiz/timeout" : "/quiz/submitted"
      //         }`
      //     );
      //   }
      // });
    },
  },
  created() {

    this.mode = "edit";
    if (this.$store.state.user.user.category.name === "STUDENT") {
      this.findQuizSubmissionByUserAndQuizNames({
        userName: this.$store.state.user.user.user_name,
        quizName: this.$route.params.name,
      }).then(() => {
        if (this.selected_quiz_submission != undefined)
          this.$router.push(`/assessments/quiz/${this.$route.params.name}/${this.$store.state.user.user.user_name}`)
      })
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
          this.attempt.answers.push({text: ""});
        } else if (question.type === "file_upload") {
          this.attempt.answers.push({src: ""});
        } else {
          this.attempt.answers.push({choosed_options: []});
        }
        this.filesToUpload.push({file: ""});
      }
    });
    // } else if (this.$store.state.user.user.category.name == "INSTRUCTOR") {
    //   for (let i = 0; i < this.selected_quiz.questions.length; i++) {
    //     this.filesToUpload.push({file: ""});
    //   }
    // }
  },
};
</script>
