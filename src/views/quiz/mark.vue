<template>
  <v-container fluid class="quiz-page white pl-lg-16">
    <back
      :target="
        userCategory == 'STUDENT'
          ? '/grades'
          : `/grades/${
              selected_quiz_submission.answers
                ? selected_quiz_submission[isExam ? 'exam' : 'quiz']._id
                : selected_quiz_submission[isExam ? 'exam' : 'quiz']._id
            }${isExam ? '/exams' : ''}`
      "
      class="mt-0 mb-6 ml-0 ml-md-n6"
    />

    <v-row
      v-if="selected_quiz_submission && (attempt.quiz || attempt.exam)"
      class="relative mx-0"
    >
      <v-col class="col-12 col-md-8 px-0">
        <navigation title="Submissions" :links="navigation_links" />
        <v-row
          v-for="(question, i) in selected_quiz_submission[
            isExam ? 'exam' : 'quiz'
          ].questions"
          :key="i"
          class="col-12 col-md-12 px-0 mx-0"
        >
          <v-col class="col-12">
            <v-row class="mx-0">
              <v-col
                class="px-0"
                :class="question.type.includes('select') ? 'col-11' : 'col-12'"
              >
                <p class="question-details col-md-12 col-12 px-0">
                  {{ `${i + 1}. ${question.details}` }}
                </p>
                <div
                  v-if="
                    question.type === 'file_upload' && attempt.answers[i].src
                  "
                  class="file-container row"
                >
                  <div class="indicator mb-2 col-12 pa-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 0C4.03763 0 0 4.03763 0 9C0 13.9624 4.03763 18 9 18C13.9624 18 18 13.9624 18 9C18 4.03763 13.9624 0 9 0ZM9 16.875C4.6575 16.875 1.125 13.3425 1.125 9C1.125 4.6575 4.6575 1.125 9 1.125C13.3425 1.125 16.875 4.6575 16.875 9C16.875 13.3425 13.3425 16.875 9 16.875Z"
                        fill="#193074"
                      />
                      <path
                        d="M9 4.1543L9 10.1543"
                        stroke="#193074"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <circle cx="9" cy="13" r="1" fill="#193074" />
                    </svg>
                    <span class="ml-1">Click on file to open</span>
                  </div>
                  <div
                    class="pick-file file-picked col-12 col-md-8 d-flex px-4"
                  >
                    <button
                      @click="
                        downloadAttachment(
                          `${backend_url}/api/${
                            attempt.quiz ? 'quiz' : 'exam'
                          }_submission/${
                            selected_quiz_submission._id
                          }/attachment/${
                            attempt.answers[i].src
                          }/view?token=${$session.get('jwt')}`
                        )
                      "
                      class="file-name"
                      :title="attempt.answers[i].src"
                    >
                      {{ attempt.answers[i].src | trimString(30) }}
                    </button>
                    <div class="file-size"></div>
                    <div
                      v-if="attempt.answers[i].src"
                      class="file-type ml-auto"
                    >
                      {{
                        attempt.answers[i].src.split(".")[
                          attempt.answers[i].src.split(".").length - 1
                        ]
                      }}
                    </div>
                  </div>
                  <div class="col-12 col-md-4 py-0">
                    <button
                      @click="
                        downloadAttachment(
                          `${backend_url}/api/${
                            attempt.quiz ? 'quiz' : 'exam'
                          }_submission/${
                            selected_quiz_submission._id
                          }/attachment/${
                            attempt.answers[i].src
                          }/download?token=${$session.get('jwt')}`
                        )
                      "
                      class="download-attachment"
                    >
                      Download
                    </button>
                  </div>
                </div>
                <div
                  v-if="
                    question.type === 'file_upload' && !attempt.answers[i].src
                  "
                  class="file-container row"
                >
                  <div class="indicator mb-2 col-12 pa-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 0C4.03763 0 0 4.03763 0 9C0 13.9624 4.03763 18 9 18C13.9624 18 18 13.9624 18 9C18 4.03763 13.9624 0 9 0ZM9 16.875C4.6575 16.875 1.125 13.3425 1.125 9C1.125 4.6575 4.6575 1.125 9 1.125C13.3425 1.125 16.875 4.6575 16.875 9C16.875 13.3425 13.3425 16.875 9 16.875Z"
                        fill="#193074"
                      />
                      <path
                        d="M9 4.1543L9 10.1543"
                        stroke="#193074"
                        stroke-width="1.5"
                        stroke-linecap="round"
                      />
                      <circle cx="9" cy="13" r="1" fill="#193074" />
                    </svg>
                    <span class="ml-1">No file choosen</span>
                  </div>
                </div>
                <textarea
                  v-if="question.type === 'open_ended'"
                  v-model="attempt.answers[i].text"
                  disabled
                  rows="5"
                  placeholder="Type your answer here"
                  class="answer-field"
                ></textarea>
                <div v-else class="d-block d-md-flex flex-row-reverse">
                  <div v-if="question.type.includes('select')" class="ml-4">
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
                  </div>
                  <div class="options">
                    <div v-if="question.type.includes('text')" class="d-block">
                      <div
                        v-for="(choice, k) in question.options.choices"
                        :key="k"
                        :class="`text_selection ${
                          checkChoiceStatus(
                            attempt.answers[i].choosed_options,
                            {
                              text: choice.text,
                            }
                          )
                            ? choice.right
                              ? ''
                              : 'wrong_choice'
                            : ''
                        }
                      ${choice.right ? 'right_choice' : ''}
                      `"
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
                              ? choice.right
                                ? 'to top right, rgba(72,255,90,.52), rgba(72,255,90,.52)'
                                : 'to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)'
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
                          <svg
                            class="check-svg"
                            v-if="
                              checkChoiceStatus(
                                attempt.answers[i].choosed_options,
                                {
                                  src: choice.src,
                                }
                              ) && choice.right
                            "
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            aria-hidden="true"
                            focusable="false"
                            width="1em"
                            height="1em"
                            style="
                              -ms-transform: rotate(360deg);
                              -webkit-transform: rotate(360deg);
                              transform: rotate(360deg);
                            "
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59L21 7z"
                            />
                          </svg>
                          <svg
                            v-else-if="
                              checkChoiceStatus(
                                attempt.answers[i].choosed_options,
                                {
                                  src: choice.src,
                                }
                              )
                            "
                            class="check-svg"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            aria-hidden="true"
                            focusable="false"
                            width="1em"
                            height="1em"
                            style="
                              -ms-transform: rotate(360deg);
                              -webkit-transform: rotate(360deg);
                              transform: rotate(360deg);
                            "
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"
                            />
                          </svg>
                        </v-img>
                      </v-card>
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
            <v-row
              class="mx-0"
              v-if="
                selected_quiz_submission[isExam ? 'exam' : 'quiz'].status ===
                  2 ||
                selected_quiz_submission[isExam ? 'exam' : 'quiz'].status ===
                  'RELEASED' ||
                userCategory === 'INSTRUCTOR'
              "
            >
              <v-col class="col-12 col-md-6 d-flex pb-0">
                <div class="mr-3 marks-label">Award marks:</div>
                <div class="d-flex align-center">
                  <div class="cool-box marks grey-color mt-n1">
                    <input
                      :class="`marks-input ${
                        validationErrors[i] ? 'invalid' : ''
                      } ${question.type === 'open_ended' ? 'editable' : ''}`"
                      type="number"
                      @change="checkMarks(i, question.marks)"
                      :max="question.marks"
                      v-model="attempt.answers[i].marks"
                      :readonly="
                        mode === 'view' || question.type.includes('select')
                      "
                      @mouseleave="computeTotalMarks()"
                    />
                    <span>{{ `/${question.marks}` }}</span>
                  </div>
                </div>
              </v-col>

              <v-col class="col-12 pt-0">
                <feedback
                  v-if="
                    selected_quiz_submission.answers[i].feedback_src ||
                    selected_quiz_submission.answers[i].feedback ||
                    userCategory === 'INSTRUCTOR'
                  "
                  @feedbackSent="handleFeedbackSent"
                  :content="
                    selected_quiz_submission.answers[i].feedback
                      ? selected_quiz_submission.answers[i].feedback.content
                      : ''
                  "
                  :submission_id="selected_quiz_submission._id"
                  :feedback_name="
                    selected_quiz_submission.answers[i].feedback_src
                  "
                  :answerId="selected_quiz_submission.answers[i]._id"
                  :feedbackId="
                    selected_quiz_submission.answers[i].feedback
                      ? selected_quiz_submission.answers[i].feedback._id
                      : ''
                  "
                  :type="isExam ? 'exam' : undefined"
                  :isFileUpload="question.type === 'file_upload'"
                  :index="i"
                  @feedbackDeleted="
                    selected_quiz_submission.answers[i].feedback_src = undefined
                  "
                  @feedbackUploaded="
                    (name) => {
                      selected_quiz_submission.answers[i].feedback_src = name;
                    }
                  "
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        v-if="
          selected_quiz_submission[isExam ? 'exam' : 'quiz'].status === 2 ||
          selected_quiz_submission[isExam ? 'exam' : 'quiz'].status ===
            'RELEASED' ||
          userCategory === 'INSTRUCTOR'
        "
        :class="`col-12 col-md-4 ${
          selected_quiz_submission.hasVideo ? '' : 'mt-16'
        } mb-16 ${
          $vuetify.breakpoint.name == 'lg'
            ? 'right-0 pl-12' + selected_quiz_submission.hasVideo
              ? ''
              : 'fixed'
            : ''
        }`"
      >
        <v-row class="color-primary font-weight-black student_name mb-8 mx-0">
          {{ selected_quiz_submission.user.sur_name }}
          {{ selected_quiz_submission.user.other_names }}
        </v-row>
        <v-row
          v-if="selected_quiz_submission.hasVideo"
          class="exam-highlights mb-8 mx-0"
        >
          <div class="col-12 col-md-6">Exam video highlights</div>
          <div class="col-12 col-md-6 time">
            {{
              getVideoDuration(
                selected_quiz_submission.time_started,
                selected_quiz_submission.used_time
              )
            }}
          </div>
          <div class="video">
            <vue-plyr>
              <video
                :src="`${
                  selected_quiz_submission.videoUrl
                }?token=${$session.get('jwt')}`"
              ></video>
            </vue-plyr>
          </div>
          <div class="highlights">
            <div class="heading">
              User suscpicious movements highlights ( 0 )
            </div>
            <div class="series"></div>
          </div>
          <div class="hint">
            Video deleted after 1 week after releasing marks
          </div>
        </v-row>
        <v-row class="mb-6 mx-0">
          <div class="mr-3 title font-weight-bold">Total marks</div>
          <div>
            <div class="cool-box marks total grey-color mt-n1">
              <input
                class="marks-input"
                v-model="computedTotalMarks"
                readonly
                type="text"
              />
              <span>{{
                `/${
                  selected_quiz_submission[isExam ? "exam" : "quiz"].total_marks
                }`
              }}</span>
            </div>
          </div>
        </v-row>
        <v-row
          v-if="$store.state.user.user.category.name == 'STUDENT'"
          class="mx-0"
        >
          <div class="submission_details">
            <span> Submission ID </span>
            <button
              @click="copy(selected_quiz_submission._id)"
              :class="`copy_code ml-2 ${coppied ? 'coppied' : ''}`"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20.17"
                height="24.973"
                viewBox="0 0 20.17 24.973"
              >
                <path
                  id="Icon_ionic-md-copy"
                  data-name="Icon ionic-md-copy"
                  d="M18.674,3.375H11.5A2.4,2.4,0,0,0,9.069,5.746v.51h-.45A2.4,2.4,0,0,0,6.188,8.628V25.916a2.452,2.452,0,0,0,2.431,2.431H21.105a2.4,2.4,0,0,0,2.371-2.431v-.45h.51a2.4,2.4,0,0,0,2.371-2.431V11.059Zm0,2.677,5.007,5.007H18.674Zm2.881,19.864a.485.485,0,0,1-.45.51H8.619a.535.535,0,0,1-.51-.51V8.628a.485.485,0,0,1,.51-.45h.45V23.515a1.7,1.7,0,0,0,1.951,1.951H21.555Zm2.881-2.881a.485.485,0,0,1-.45.51H11.5a.535.535,0,0,1-.51-.51V5.746a.485.485,0,0,1,.51-.45h5.253V12.98h7.684Z"
                  transform="translate(-6.188 -3.375)"
                />
              </svg>
              copy to clipboard
            </button>
          </div>
          <div class="more_info mt-3 red--text">
            In case you have a claim, write to your instructor and start your
            message with your submission ID
          </div>
        </v-row>
        <v-row class="mx-0">
          <v-btn
            v-if="userCategory === 'INSTRUCTOR'"
            class="red-bg mr-3 px-8"
            :to="`/grades/${
              selected_quiz_submission[isExam ? 'exam' : 'quiz']._id
            }/${isExam ? 'exams' : ''}`"
            >Cancel
          </v-btn>
          <v-btn
            v-if="userCategory === 'INSTRUCTOR'"
            class="primary-bg"
            @click="updateSubmission"
            >Save progress
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
    <div
      class="d-flex justify-center align-center full-height"
      v-else-if="loading"
    >
      <img
        src="https://kurious.rw/_nuxt/img/loader.059b462.gif"
        alt="loading .."
      />
    </div>
    <div v-else class="text-center">Submission not found</div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { downloadAttachment } from "@/services/global_functions";
import { getTime, elapsedDuration } from "../../services/global_functions";

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
    validationErrors: [],
    loading: true,
    quiz: {},
    attempt: {},
    questions_have_feedback: [],
    mode: "view",
    computedTotalMarks: 0,
    coppied: false,
  }),
  components: {
    back: () => import("@/components/shared/back-button"),
    feedback: () => import("@/components/courses/Feedback"),
    navigation: () => import("@/components/shared/simple_navigation"),
  },
  computed: {
    isExam() {
      return this.$route.path.includes("/assessments/exams");
    },
    ...mapGetters("chat", ["socket"]),
    backend_url() {
      return process.env.VUE_APP_api_service_url;
    },
    ...mapGetters("quiz_submission", ["selected_quiz_submission"]),
    userCategory() {
      return this.$store.state.user.user.category.name;
    },
    navigation_links() {
      const links = [
        {
          text: "grades",
          link: "/grades",
        },
        {
          text: this.isExam
            ? this.selected_quiz_submission.exam.course.name
            : this.selected_quiz_submission.quiz.target.course.name,
          link:
            this.userCategory === "INSTRUCTOR"
              ? `/grades/${
                  this.isExam
                    ? this.selected_quiz_submission.exam._id
                    : this.selected_quiz_submission.quiz._id
                }/${this.isExam ? "exams" : ""}`
              : "/grades",
        },
      ];
      if (!this.isExam)
        links.push({
          text: this.selected_quiz_submission.quiz.name,
          link:
            this.userCategory === "INSTRUCTOR"
              ? "/grades/" + this.selected_quiz_submission.quiz._id
              : "/grades",
        });
      links.push({
        text: this.selected_quiz_submission.user.sur_name
          ? `${this.selected_quiz_submission.user.sur_name} ${this.selected_quiz_submission.user.other_names}`
          : `${this.$store.state.user.user.sur_name} ${this.$store.state.user.user.other_names}`,
        link: this.$route.fullPath,
      });
      return links;
    },
  },
  watch: {
    async selected_quiz_submission() {
      if (this.selected_quiz_submission)
        if (!this.selected_quiz_submission.marked) {
          for (const answer of this.selected_quiz_submission.answers) {
            if (!answer.marks) answer.marks = 0;
          }
        }
    },
  },
  methods: {
    checkMarks(i, max) {
        this.validationErrors[i] = this.attempt.answers[i].marks > max
    },
    getVideoDuration(starting_time, duration) {
      let date = new Date(starting_time);
      date.setHours(date.getHours() + 2);
      let result = getTime(date);
      let endDate = new Date(date);
      endDate.setTime(endDate.getTime() + duration * 1000);
      result += ` to ${getTime(endDate)} (${elapsedDuration(
        date,
        endDate
      ).replace("ago", "")})`;
      return result;
    },
    handleFeedbackSent(index, value) {
      this.questions_have_feedback[index] = value;
    },
    downloadAttachment,
    ...mapActions("quiz_submission", [
      "update_quiz_submission",
      "findQuizSubmissionByUserAndQuizNames",
      "markResultsAsSeen",
    ]),
    copy(content) {
      navigator.clipboard.writeText(content);
      this.coppied = true;
      setTimeout(() => {
        this.coppied = false;
      }, 2000);
    },
    computeTotalMarks() {
      let result = 0;
      for (const i in this.attempt.answers) {
        result = parseInt(
          result + parseInt(this.attempt.answers[i].marks || 0)
        );
      }
      this.computedTotalMarks = result;
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
    removeMediaPath(url) {
      return url.split("/")[url.split("/").length - 1];
    },
    async updateSubmission() {
      this.update_quiz_submission({
        submission: this.attempt,
      }).then((valid = true) => {
        if (!valid) return;
        if (
          this.isExam
            ? this.selected_quiz_submission.status === "RELEASED"
            : this.selected_quiz_submission.quiz.status === 2
        ) {
          for (const i in this.questions_have_feedback) {
            if (this.questions_have_feedback[i]) {
              this.socket.emit("chapter-comment", {
                userName: this.selected_quiz_submission.user.user_name,
                route: this.$route.path,
                content: `gave feed back on your submission on ${
                  this.isExam ? "exam" : "quiz"
                } ${
                  this.selected_quiz_submission[this.isExam ? "exam" : "quiz"]
                    .name
                }`,
              });
              break;
            }
          }
        }
        this.$router.push(
          `/grades/${
            this.selected_quiz_submission.answers
              ? this.selected_quiz_submission.quiz._id
              : this.selected_quiz_submission[this.isExam ? "exam" : "quiz"]._id
          }/${this.isExam ? "exams" : ""}`
        );
      });
    },
  },
  created() {
    this.findQuizSubmissionByUserAndQuizNames({
      userName: this.$route.params.user_name,
      quizName: this.isExam
        ? this.$route.params.id
        : this.$route.params.quiz_name,
      isExam: this.isExam,
    }).then(async () => {
      this.loading = false;
      if (this.selected_quiz_submission) {
        this.attempt = {
          auto_submitted: this.selected_quiz_submission.auto_submitted,
          used_time: this.selected_quiz_submission.used_time,
          answers: this.selected_quiz_submission.answers.map((x) => {
            let y = JSON.parse(JSON.stringify(x));
            y.feedback = undefined;
            return y;
          }),
          marked: this.selected_quiz_submission.marked,
          total_marks: this.selected_quiz_submission.totalMarks,
        };
        this.attempt[this.isExam ? "exam" : "quiz"] =
          this.selected_quiz_submission[this.isExam ? "exam" : "quiz"]._id;
        if (this.userCategory === "INSTRUCTOR") {
          this.mode = "edit";
          for (
            let i = 0;
            i < this.selected_quiz_submission.answers.length;
            i++
          ) {
            this.questions_have_feedback.push(false);
          }
        }
        this.computeTotalMarks();
        setTimeout(() => {
          this.markResultsAsSeen({
            course_id: this.isExam
              ? this.selected_quiz_submission.exam.course
              : this.selected_quiz_submission.quiz.target.course._id,
            submission_id: this.selected_quiz_submission._id,
          });
        }, 5000);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.check-svg {
  fill: #ffffff;
  height: 50px;
  width: 50px;
}

.cool-box {
  padding: 4px 12px;
  text-align: center;
  font-size: 1.3rem;
  //width: 31.02px;
  //height: 21.71px;

  border: 0.775483px solid #717171;
  box-sizing: border-box;
  border-radius: 4.6529px;

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

.copy_code {
  svg {
    height: 15px;
  }
}

.submission_details {
  span {
    color: #4a4a4a;
    font-weight: 500;
  }
}

.more_info {
  width: 80%;
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

  &.invalid {
    color: red;
  }
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

.options {
  width: 70%;
}

.text_selection {
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

.exam-highlights {
  max-width: 344.08px;
  width: 100%;
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 12.0892px;

  color: #343434;

  .time {
    font-size: 9.29936px;
  }

  video {
    width: 308.08px;

    &:fullscreen {
      width: auto;
    }

    height: 173.295px;
  }

  .highlights {
    width: 100%;
    height: 206.45px;
    background: rgba(25, 48, 116, 0.1);
    padding: 10px 13px;
  }

  .hint {
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 9.29936px;
    line-height: 24px;
    /* identical to box height, or 262% */

    display: flex;
    justify-content: center;
    align-items: center;

    color: #ffffff;
    height: 22.32px;
    width: 100%;
    background: #193074;
  }
}

.right_choice {
  //background: linear-gradient(#d9f1d8 0%, #85e97d 100%);
  background-color: #85e97d;
}

.wrong_choice {
  //background: linear-gradient(
  //  rgba(255, 0, 0, 0.53) 0%,
  //  rgba(249, 93, 93, 0.53) 100%
  //);
  background-color: rgba(255, 0, 0, 0.53);
  box-shadow: 0px 6px 3px rgba(0, 0, 0, 0.16);
}

.marks {
  font-size: 1rem;
}

.coppied {
  color: $primary;

  svg {
    fill: $primary;
  }
}

.pick-file {
  width: 473.85px;
  height: 28.8px;

  background: rgba(25, 48, 116, 0.1);
  border-radius: 3.92697px;

  .file-type {
    margin-top: -11px;
  }

  .file-name {
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 13.0899px;
    line-height: 34px;
    /* or 262% */

    display: flex;
    align-items: center;

    color: #193074;
  }
}

.download-attachment {
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 13.0899px;
  line-height: 34px;
  /* or 262% */

  display: flex;
  align-items: center;
  text-align: center;

  color: #193074;
}

.marks-label {
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 15.5097px;
  line-height: 41px;
  /* or 262% */

  display: flex;
  align-items: center;

  color: #193074;
}

/* Portrait phones and smaller */
@media (max-width: 700px) {
  .options {
    width: 100%;
  }
  .download-attachment {
    width: 261px;
    height: 34px;
    color: #ffffff;
    background: #193074;
    border-radius: 9.94685px;
    display: flex;
    align-content: center;
    justify-content: center;
    margin-top: 14px;
  }
}
</style>