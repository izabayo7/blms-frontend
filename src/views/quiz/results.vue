<template>
  <v-container fluid class="quiz_results_page white px-lg-16">
    <back class="mt-0 mb-6 ml-lg-n6" />
    <v-row>
      <div class="col-12 title ml-2 mt-5">
        {{ "Quiz name" }}
        <br />
      </div>
      <!-- <div class="title ml-2 mt-5">
        {{ "Attempt Failed" }}
      </div> -->
      <v-col class="col-12 col-md-7">
        <div v-if="$route.fullPath == '/quiz/timeout'" class="mt-8 text_1">
          Your assessment time is up , all your answers have been saved and
          submitted successfuly
        </div>
        <div v-else class="mt-8 text_1">
          All your answers have been saved and submitted successfuly
        </div>
        <div class="actions mt-8">
          <button
            v-if="course"
            class="start_quiz"
            @click="$router.push(`/courses/${course.name}`)"
          >
            Continue course
          </button>
          <button
            :class="`start_quiz grey ${!isInstructor ? 'ml-6' : ''}`"
            @click="$router.push('/reports')"
          >
            Open reports
          </button>
        </div>
      </v-col>
      <v-col class="col-12 col-md-5">
        <div class="head_icon">
          <svg
            v-if="$route.fullPath == '/quiz/timeout'"
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
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
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
  },
  beforeMount() {
    if (!this.course) {
      this.course = {
        _id: "5fbc79c9bf2a5b0ba449ce57",
        published: true,
        status: 1,
        name: "maths",
        user: {
          _id: "5f9a43cffae74e30347cf824",
          sur_name: "Muhodari",
          other_names: "Sage",
          user_name: "user_942333",
          gender: "male",
          phone: "0788616951",
          category: "INSTRUCTOR",
        },
        faculty_college_year: {
          _id: "5f9a4279fae74e30347cf81f",
          faculty_college: {
            _id: "5f9a41eefae74e30347cf81e",
            faculty: {
              _id: "5f98eccb3cb1651a784b5ffe",
              name: "Software Engineering",
            },
            college: {
              _id: "5f98ec02e96a170d580e02fe",
              name: "Rwanda Best University",
            },
          },
          college_year: {
            _id: "5f98ecaf3cb1651a784b5ffd",
            digit: 1,
          },
        },
        description: "abana biga imibare",
        updatedAt: "2020-12-10T12:46:31.895Z",
        createdAt: "2020-11-24T03:11:05.292Z",
        __v: 0,
        cover_picture:
          "http://localhost:7070/api/course/maths/cover_picture/wallpaper-0.jpg",
        published_on: "2020-12-10T12:46:31.895Z",
        progress: {
          id: "5fd234af47a12d38b0d2e06a",
          progress: 100,
          dateStarted: "2020-12-10T14:46:07.220Z",
          lastUpdated: "2020-12-11T15:22:10.299Z",
        },
        assignmentsLength: 1,
        chapters: [
          {
            _id: "5fbc7a21bf2a5b0ba449ce58",
            status: 1,
            name: "intoduction",
            description: "the first chapter",
            number: 1,
            attachments: [
              {
                _id: "5fbc7a21bf2a5b0ba449ce59",
                src: "amatorero 7.docx",
                download_link:
                  "http://localhost:7070/api/chapter/5fbc7a21bf2a5b0ba449ce58/attachment/amatorero 7.docx/download",
                name: "amatorero 7.docx",
              },
            ],
            updatedAt: "2020-11-24T12:23:07.259Z",
            createdAt: "2020-11-24T03:12:33.648Z",
            uploaded_video:
              "http://localhost:7070/api/chapter/5fbc7a21bf2a5b0ba449ce58/video/Bruce Melodie - Abu Dhabi.mp4",
            document:
              "http://localhost:7070/api/chapter/5fbc7a21bf2a5b0ba449ce58/document",
            quiz: [],
            commentsLength: 0,
          },
          {
            _id: "5fbd092eef451b3f9cfc76d9",
            status: 1,
            name: "mamiya",
            description: "iri joro ndarigutuye",
            number: 2,
            attachments: [],
            updatedAt: "2020-11-26T22:42:21.648Z",
            createdAt: "2020-11-24T13:22:54.822Z",
            document:
              "http://localhost:7070/api/chapter/5fbd092eef451b3f9cfc76d9/document",
            quiz: [
              {
                _id: "5fbb6430362a4516ecee94cf",
                status: 1,
                name: "Joji",
                duration: 300,
                user: "5f9a43cffae74e30347cf824",
                questions: [
                  {
                    options: {
                      choices: [],
                    },
                    _id: "5fbb6430362a4516ecee94d0",
                    type: "open_ended",
                    marks: 100,
                    details: "what is weedaa",
                  },
                  {
                    _id: "5fbb96a4bba0082c941c1efc",
                    type: "single_text_select",
                    marks: 0,
                    details: "abana",
                    options: {
                      choices: [
                        {
                          right: false,
                          _id: "5fbb96a4bba0082c941c1efd",
                          text: "a",
                        },
                        {
                          right: true,
                          _id: "5fbb96a4bba0082c941c1efe",
                          text: "b",
                        },
                      ],
                    },
                  },
                  {
                    _id: "5fbb9b0fbba0082c941c1f03",
                    type: "single_file_select",
                    marks: 5,
                    details: "aaaaaaaaaaaaaaaaa",
                    options: {
                      choices: [
                        {
                          right: false,
                          _id: "5fbba13c2875471b985a4f2e",
                          src: "about1.PNG",
                        },
                        {
                          right: true,
                          _id: "5fbba13c2875471b985a4f2f",
                          src: "about2.PNG",
                        },
                        {
                          right: false,
                          _id: "5fbba13c2875471b985a4f30",
                          src: "about3.PNG",
                        },
                      ],
                    },
                  },
                ],
                total_marks: 105,
                updatedAt: "2020-11-26T22:42:21.681Z",
                createdAt: "2020-11-23T07:26:40.343Z",
                __v: 7,
                published: false,
                target: {
                  type: "chapter",
                  id: "5fbd092eef451b3f9cfc76d9",
                },
              },
            ],
            commentsLength: 1,
          },
          {
            _id: "5fd1e0878b5c772ea0ec88ac",
            status: 1,
            name: "last one",
            description: "aaaaaaaaaaaaaaaaaa",
            number: 3,
            attachments: [],
            updatedAt: "2020-12-10T08:47:03.655Z",
            createdAt: "2020-12-10T08:47:03.655Z",
            document:
              "http://localhost:7070/api/chapter/5fd1e0878b5c772ea0ec88ac/document",
            quiz: [],
            commentsLength: 3,
          },
        ],
        quiz: [],
        attendedStudents: 3,
      };
    }
    // if (!this.course && !this.isInstructor) this.$router.push("/");
  },
};
</script>

<style lang="scss" scoped>
.quiz_results_page {
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
  .content {
    color: black !important;
    width: 80%;
    margin: auto;
    font-size: 1.2rem;
  }
}
</style>