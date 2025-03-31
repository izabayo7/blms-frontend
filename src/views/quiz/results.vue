<template>
  <v-container fluid class="quiz_results_page white px-lg-16">
    <back class="mt-0 mb-6 ml-lg-n6" />
    <v-row v-if="selected_quiz_submission">
      <div class="col-12 ml-2 mt-5">
        <div class="title">{{ "Quiz name" }}</div>
      </div>
      <v-col class="col-12 col-md-7">
        <div v-if="1 == 2" class="passed_test">Success</div>
        <div v-else class="failed_test">Attempt Failed</div>
        <div class="mt-3 d-flex marks_container">
          <div class="mr-12 label">Your score is</div>
          <div class="marks">{{ "18 / 20" }}</div>
        </div>
        <div v-if="1 == 2" class="mt-8 text_2">
          <div>You have succeeded on this assesment</div>
          <div>You may continue your course.</div>
        </div>
        <div class="actions mt-8">
          <button
            class="start_quiz"
            @click="$router.push(`/courses/${course.name}`)"
          >
            Retry Now
          </button>
          <button
            :class="`start_quiz grey ${!isInstructor ? 'ml-6' : ''}`"
            @click="$router.push('/reports')"
          >
            Go to course
          </button>
        </div>
        <div v-if="1 == 1" class="mt-8 text_1">
          <div>The pass mark is 10/20</div>
          <div>You have 1 Attempt left</div>
        </div>
      </v-col>
      <v-col class="col-12 col-md-5">
        <div class="head_icon">
          <svg
            v-if="2 == 1"
            xmlns="http://www.w3.org/2000/svg"
            width="299.333"
            height="299.333"
            viewBox="0 0 299.333 299.333"
          >
            <path
              id="Icon_awesome-check-circle"
              data-name="Icon awesome-check-circle"
              d="M299.9,150.229A149.667,149.667,0,1,1,150.229.563,149.666,149.666,0,0,1,299.9,150.229ZM132.917,229.477,243.96,118.434a9.656,9.656,0,0,0,0-13.655L230.305,91.123a9.656,9.656,0,0,0-13.656,0l-90.56,90.559L83.809,139.4a9.657,9.657,0,0,0-13.656,0L56.5,153.057a9.656,9.656,0,0,0,0,13.655l62.764,62.763a9.656,9.656,0,0,0,13.656,0Z"
              transform="translate(-0.563 -0.563)"
              fill="#14b52f"
            />
          </svg>

          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="288"
            height="288"
            viewBox="0 0 288 288"
          >
            <g
              id="Group_205"
              data-name="Group 205"
              transform="translate(-1291 -389)"
            >
              <g
                id="Ellipse_255"
                data-name="Ellipse 255"
                transform="translate(1291 389)"
                fill="#ff8585"
                stroke="#f54040"
                stroke-width="15"
              >
                <circle cx="144" cy="144" r="144" stroke="none" />
                <circle cx="144" cy="144" r="136.5" fill="none" />
              </g>
              <text
                id="_"
                data-name="!"
                transform="translate(1407 596)"
                fill="#fff"
                font-size="172"
                font-family="SegoeUI, Segoe UI"
              >
                <tspan x="0" y="0">!</tspan>
              </text>
            </g>
          </svg>
        </div>

        <div class="confirm_nocheat mt-4">
          <div class="content">
            <div class="mt-8">
              You may check your submission status in reports
              <svg
                id="file-chart-fill"
                xmlns="http://www.w3.org/2000/svg"
                width="29.612"
                class="report_svg"
                height="29.612"
                viewBox="0 0 29.612 29.612"
              >
                <path
                  id="Path_1730"
                  data-name="Path 1730"
                  d="M0,0H29.612V29.612H0Z"
                  fill="none"
                />
                <path
                  id="Path_1731"
                  data-name="Path 1731"
                  d="M18.938,2l6.13,6.146V25.364a1.219,1.219,0,0,1-1.217,1.219H4.217A1.228,1.228,0,0,1,3,25.364V3.219A1.219,1.219,0,0,1,4.217,2Zm-6.13,6.146V20.437H15.26V8.146Zm4.9,4.917v7.375h2.452V13.062ZM7.9,15.521v4.917h2.452V15.521Z"
                  transform="translate(0.772 0.515)"
                  fill="#1473e6"
                />
              </svg>

              section
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <div v-else>
      Submission not found bro
      <!-- <router-link
        :to="`/quiz/${$route.params.name}/${$store.state.user.user.surName}_${$store.state.user.user.otherNames}`"
        >review your submission</router-link
      > -->
    </div>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    quiz: {},
    attempt: {},
    mode: "view",
  }),
  components: {
    back: () => import("@/components/shared/back-button"),
  },
  computed: {
    ...mapGetters("courses", ["course"]),
    isInstructor() {
      return this.$store.state.user.user.category.name == "INSTRUCTOR";
    },
    ...mapGetters("quiz_submission", ["selected_quiz_submission"]),
  },
  methods: {
    ...mapActions("quiz_submission", [
      "create_quiz_submission",
      "findQuizSubmissionByUserAndQuizNames",
    ]),
  },
  created() {
    this.findQuizSubmissionByUserAndQuizNames({
      user_name: this.$store.state.user.user.user_name,
      quizName: this.$route.params.name,
    });
    // if (!this.course && !this.isInstructor) this.$router.push("/");
  },
};
</script>

<style lang="scss" scoped>
.quiz_results_page {
  .title {
    color: black;
    font-size: 2rem !important;
  }
  .failed_test {
    color: #f54040;
    font-size: 2.5rem !important;
  }
  .passed_test {
    color: #1cc83f;
    font-size: 2.5rem !important;
  }
  .marks_container {
    .label {
      font-size: 1.5rem;
      color: black !important;
    }
    .marks {
      font-size: 1.8rem;
      font-weight: 500;
      color: black !important;
    }
  }
  .head_icon {
    text-align: center;
    svg {
      height: 210px;
    }
  }
  .course_info {
    display: flex;
    font-weight: 700;
    .item {
      width: 50%;
    }
    svg {
      height: 20px;
    }
  }
  .start_quiz {
    background-color: $primary;
    color: white;
    padding: 8px;
    width: 180px;
    border-radius: 32px;
    font-size: 1.1rem;
    font-size: 0.98rem;
    &.grey {
      background-color: #e6e6e6 !important;
      color: black;
      font-weight: 500;
    }
  }
  .report_svg {
    height: 20px;
  }
  .text_1 {
    width: 55%;
    font-size: 1.2rem;
    color: black;
  }
  .text_2 {
    width: 75%;
    font-size: 1.2rem;
    color: black;
  }
  .content {
    color: black !important;
    width: 80%;
    margin: auto;
    font-size: 1.2rem;
  }
}
</style>