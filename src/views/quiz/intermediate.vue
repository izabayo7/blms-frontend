<template>
  <v-container v-if="selected_quiz != undefined" fluid class="quiz_intermediate_page white px-md-16">
    <back class="mt-0 mb-6 ml-lg-n6" />
    <v-row>
      <v-col class="col-12 col-md-6">
        <div class="title text-h4">{{ selected_quiz.name }}</div>
        <div class="instructions mt-6">
          <!-- In this quiz, pay attention to the question number 4 as it has more
          marks than others. please notice it. -->
          <kurious-editor
            v-if="selected_quiz.instructions"
            :defaultContent="selected_quiz.instructions"
          />
        </div>
        <div class="quiz_info mt-6">
          <div class="item">
            <div class="lable">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30.849"
                height="30.849"
                viewBox="0 0 30.849 30.849"
              >
                <path
                  id="Icon_metro-question"
                  data-name="Icon metro-question"
                  d="M16.067,23.136h3.856v3.856H16.067Zm7.712-13.5a1.928,1.928,0,0,1,1.928,1.928v5.784l-5.784,3.856H16.067V19.28l5.784-3.856V13.5h-9.64V9.64H23.779ZM17.995,4.82a12.532,12.532,0,1,0,8.862,3.671A12.45,12.45,0,0,0,17.995,4.82Zm0-2.892A15.424,15.424,0,1,1,2.571,17.352,15.424,15.424,0,0,1,17.995,1.928Z"
                  transform="translate(-2.571 -1.928)"
                />
              </svg>

              Number of questions
            </div>
            <div class="value">{{ selected_quiz.questions.length }}</div>
          </div>
          <div class="item">
            <div class="lable">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30.486"
                height="34.791"
                viewBox="0 0 30.486 34.791"
              >
                <path
                  id="Icon_open-timer"
                  data-name="Icon open-timer"
                  d="M8.7,0V4.349h4.349v.13a15.233,15.233,0,1,0,17.4,15.091,14.772,14.772,0,0,0-1.087-5.436L25.4,15.787a10.464,10.464,0,0,1,.7,3.827A10.872,10.872,0,1,1,15.221,8.741a10.63,10.63,0,0,1,3.827.7l1.479-4.088a18.209,18.209,0,0,0-3.131-.7V4.392h4.349V.043H8.7ZM30.442,5.045s-15.873,12.22-16.7,13.047a2.126,2.126,0,0,0,0,3,2.051,2.051,0,0,0,3,0c.87-.87,13.743-16.047,13.743-16.047Z"
                />
              </svg>

              Duration
            </div>
            <div class="value">
              {{
                new Date(selected_quiz.duration * 1000)
                  .toISOString()
                  .substr(11, 8)
              }}
            </div>
          </div>
          <div class="item">
            <div class="lable">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30.486"
                height="34.791"
                viewBox="0 0 44.436 44.436"
              >
                <path
                  id="Icon_awesome-slack-hash"
                  data-name="Icon awesome-slack-hash"
                  d="M31.372,16.757a2.559,2.559,0,0,0-3.234-1.61l-3.192,1.062-2.13-6.328,3.192-1.062A2.55,2.55,0,1,0,24.39,3.981L21.2,5.043l-1.1-3.3a2.557,2.557,0,0,0-4.852,1.617l1.1,3.3L9.779,8.854l-1.1-3.3A2.557,2.557,0,0,0,3.824,7.166l1.1,3.3L1.743,11.526A2.555,2.555,0,0,0,.125,14.753a2.637,2.637,0,0,0,2.362,1.73c.478.07.844-.112,4.057-1.181l2.13,6.328L5.483,22.691a2.564,2.564,0,0,0-1.617,3.227,2.637,2.637,0,0,0,2.362,1.73c.478.07.844-.112,4.057-1.181l1.1,3.3a2.612,2.612,0,0,0,3.234,1.61,2.555,2.555,0,0,0,1.617-3.227l-1.1-3.3,6.581-2.2,1.1,3.3a2.612,2.612,0,0,0,3.234,1.61,2.555,2.555,0,0,0,1.617-3.227l-1.1-3.3,3.192-1.062a2.534,2.534,0,0,0,1.61-3.213ZM13.506,20.076l-2.13-6.342,6.574-2.2,2.13,6.342Z"
                  transform="translate(20.662) rotate(41)"
                />
              </svg>

              Marks
            </div>
            <div class="value">{{ selected_quiz.total_marks }}</div>
          </div>
        </div>
      </v-col>
      <v-col class="col-12 col-md-6">
        <div class="head_icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="167"
            height="167"
            viewBox="0 0 167 167"
          >
            <g
              id="Group_203"
              data-name="Group 203"
              transform="translate(-534 -498)"
            >
              <path
                id="Icon_map-school"
                data-name="Icon map-school"
                d="M48.444,12.471v55.4H8.155v-55.4h40.29m6.715-6.715H1.44V76.263H55.159V5.756ZM13.191,19.186H43.408V25.9H13.191Zm0,11.751H43.408v6.715H13.191Zm0,11.751H43.408V49.4H13.191Zm0,11.751H43.408v6.715H13.191ZM65.232,19.186h13.43v47H65.232ZM71.957.72a6.69,6.69,0,0,0-6.725,6.609V14.15h13.43V7.329A6.683,6.683,0,0,0,71.957.72ZM65.128,71.227l6.784,10.722,6.75-10.722Z"
                transform="translate(578.711 543.619)"
              />
              <g
                id="Ellipse_8"
                data-name="Ellipse 8"
                transform="translate(534 498)"
                fill="none"
                stroke="#414141"
                stroke-width="5"
              >
                <circle cx="83.5" cy="83.5" r="83.5" stroke="none" />
                <circle cx="83.5" cy="83.5" r="81" fill="none" />
              </g>
            </g>
          </svg>
        </div>

        <div class="side_content mx-auto">
          <div class="course_info mt-5">
            <div class="item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36.571"
                height="29.922"
                viewBox="0 0 36.571 29.922"
              >
                <path
                  id="Icon_metro-school"
                  data-name="Icon metro-school"
                  d="M10.505,23.349V30l11.636,6.35L33.778,30V23.349L22.142,29.7ZM22.142,6.427,3.856,16.4l18.286,9.974L37.1,18.213V29.7h3.325V16.4L22.142,6.427Z"
                  transform="translate(-3.856 -6.427)"
                  fill="#414141"
                />
              </svg>
              {{ selected_quiz.target.course.name }}
            </div>
            <div class="item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26.535"
                height="26.534"
                viewBox="0 0 26.535 26.534"
              >
                <path
                  id="Icon_open-flag"
                  data-name="Icon open-flag"
                  d="M0,0V26.534H3.317V0ZM6.634,0V13.267h6.634v3.317H26.535L19.9,10.05l6.634-6.733h-9.95V0Z"
                  fill="#414141"
                />
              </svg>
              {{ selected_quiz.target.chapter.name }}
            </div>
          </div>
          <div class="confirm_nocheat mt-4">
            <div class="content">
              <input type="checkbox" name="" id="">
              <div class="words">
                I agree I will not use any cheating method if cough, I will
                automatically fail this assessment
              </div>
            </div>
          </div>
          <button
            class="start_quiz mt-5 mb-14 mb-md-0"
            @click="$router.push(`/quiz/attempt/${$route.params.name}`)"
          >
            Take Quiz
          </button>
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
    this.findQuizByName({
      user_name: this.$store.state.user.user.user_name,
      quizName: this.$route.params.name,
    });
  },
};
</script>

<style lang="scss" scoped>
.quiz_intermediate_page {
  min-height: 100%j;
  .instructions {
    font-size: 1rem;
  }
  .quiz_info {
    background-color: #d2d2d2;
    padding: 20px;
    border-radius: 17px;
    width: 80%;
    * {
      color: black !important;
    }
    .item {
      display: flex;
      margin-bottom: 1rem;
    }
    svg {
      height: 20px;
      fill: black;
    }
    .lable {
      width: 80%;
      font-weight: bold;
    }
    .value {
      width: 10%;
    }
  }
  .head_icon {
    text-align: center;
    width: 85%;
    svg {
      height: 110px;
    }
  }
  .course_info {
    display: flex;
    font-weight: 700;
    .item {
      width: 50%;
      font-size: .7rem;
    }
    svg {
      height: 20px;
    }
  }
  .side_content {
    width: 90%;
  }
  .confirm_nocheat {
    .content {
      display: flex;
      input{
        width: 30px;
        height: 30px;
        margin-right: 12px;
      }
    }
    svg {
      margin-right: 12px;
    }
    .words{
      font-size: .8rem
    }
  }
  .start_quiz {
    background-color: $primary;
    color: white;
    padding: 8px;
    width: 180px;
    border-radius: 32px;
    font-size: 1.1rem;
  }
}
</style>
