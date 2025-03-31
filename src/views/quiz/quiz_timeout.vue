<template>
  <v-container fluid class="quiz_timeout_page white px-lg-16">
    <back class="mt-0 mb-6 ml-lg-n6" />
    <v-row>
      <div class="title ml-2 mt-5">Automatic Submission ( Timed)</div>
      <v-col class="col-12 col-md-7">
        <div class="mt-8 text_1">
          Your assessment time is up , all your answers have been saved and
          submitted successfuly
        </div>
        <div class="mt-8 text_1">
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
        <div class="actions mt-8">
          <button class="start_quiz" @click="$router.push(`/quiz/attempt/`)">
            Continue course
          </button>
          <button
            class="start_quiz grey ml-6"
            @click="$router.push(`/quiz/attempt/`)"
          >
            Open reports
          </button>
        </div>
      </v-col>
      <v-col class="col-12 col-md-5">
        <div class="head_icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="299.333"
            height="339.442"
            viewBox="0 0 299.333 339.442"
          >
            <path
              id="Icon_awesome-check-circle"
              data-name="Icon awesome-check-circle"
              d="M299.9,150.229A149.667,149.667,0,1,1,150.229.563,149.666,149.666,0,0,1,299.9,150.229ZM132.917,229.477,243.96,118.434a9.656,9.656,0,0,0,0-13.655L230.305,91.123a9.656,9.656,0,0,0-13.656,0l-90.56,90.559L83.809,139.4a9.657,9.657,0,0,0-13.656,0L56.5,153.057a9.656,9.656,0,0,0,0,13.655l62.764,62.763a9.656,9.656,0,0,0,13.656,0Z"
              transform="translate(-0.563 39.546)"
              fill="#14b52f"
            />
            <circle
              id="Ellipse_255"
              data-name="Ellipse 255"
              cx="49.5"
              cy="49.5"
              r="49.5"
              transform="translate(192.945 10.622)"
              fill="#fff"
            />
            <path
              id="Icon_open-timer"
              data-name="Icon open-timer"
              d="M24.268,0V12.134H36.4V12.5A42.5,42.5,0,1,0,84.938,54.6,41.215,41.215,0,0,0,81.9,39.435L70.862,44.046A29.2,29.2,0,0,1,72.8,54.724,30.335,30.335,0,1,1,42.469,24.389a29.66,29.66,0,0,1,10.678,1.941l4.126-11.406a50.807,50.807,0,0,0-8.736-1.941v-.728H60.67V.121h-36.4Zm60.67,14.075s-44.289,34.1-46.594,36.4a5.932,5.932,0,0,0,0,8.372,5.724,5.724,0,0,0,8.372,0c2.427-2.427,38.343-44.774,38.343-44.774Z"
              transform="translate(206.708)"
              fill="#14b52f"
            />
          </svg>
        </div>

        <div class="confirm_nocheat mt-4">
          <div class="content">
            <div class="words">
              Please wait as the instructor assess your submission,you will be
              notified via notification about the status of your submission.
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
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
    ...mapGetters("quiz", ["selected_quiz"]),
  },
  methods: {
    ...mapActions("quiz", ["findQuizByName"]),
  },
  created() {
    // this.findQuizByName({
    //   user_name: this.$store.state.user.user.user_name,
    //   quizName: this.$route.params.name,
    // });
  },
};
</script>

<style lang="scss" scoped>
.quiz_timeout_page {
  .title {
    color: black;
    font-size: 2.5rem !important;
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
  .words {
    color: black;
  }
}
</style>