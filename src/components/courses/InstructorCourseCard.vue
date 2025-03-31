<template>
  <div class="class-view">
    <div :class="`class-card ${course.published ? '' : 'unpublished-card'}`">
      <v-row class="first-row">
        <v-col v-if="!isLive" class="col-md-7 col-7 content-side">
          <p class="instructor-course-title">
            {{ course.name | trimString(25) }}
          </p>
          <p class="course-chapters mt-0">
            {{ course.chapters.length }} Chapters
          </p>
          <p
              class="instructor-course-description hidden-sm-and-down"
          >
            {{ course.description | trimString(50) }}
          </p>
          <p
              class="published-date"
              v-if="course.published"
          >
            Published on {{ course.published_on | formatDate }}
          </p>
          <v-btn
              v-else
              class="edit-btn ml-0"
              :to="`/courses/preview/${course.name}`"
          >
            Preview Course
            <v-icon color="#fff">mdi-arrow-right</v-icon>
          </v-btn>
        </v-col>
        <v-col v-if="!isLive" class="col-md-5 col-5 image-side">
          <v-img
              v-if="course.cover_picture"
              :src="`${
              course.cover_picture
            }?height=300&width=300&token=${$session.get('jwt')}`"
              class="course-image"
          >
          </v-img>
          <v-avatar
              class="course-image white--text bg-color-one text-h2"
              size="106"
              v-else
          >{{ course.name | computeText }}
          </v-avatar
          >
          <p class="course-students" v-if="course.published">
            {{
              `${course.attendedStudents} Student${
                  course.attendedStudents > 1 ? "s" : ""
              }`
            }}
          </p>
        </v-col>
        <v-col v-if="nearestLiveSession" class="col-12 live">
          <div class="d-flex">
            <div>
              <div class="title">LIVE BROADCAST</div>
              <div class="course">{{ course.name }}</div>
              <div class="chapter">introduction</div>
              <div class="created">Scheduled on {{ nearestLiveSession.createdAt | formatDate }}</div>
            </div>
            <div class="pl-4 pl-lg-14">
              <div>
                <svg width="66" height="42" viewBox="0 0 66 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M46.9008 10.08L42 15.15C44.4504 18.69 44.4504 23.28 42 26.82L46.9008 31.89C52.7934 25.83 52.7934 16.68 46.9008 10.08ZM56.5565 0L51.8015 4.89C59.882 13.95 59.882 27.57 51.8015 37.11L56.5565 42C67.9333 30.33 67.9624 12.15 56.5565 0Z"
                      fill="#FF4E4E"/>
                  <path
                      d="M18.2008 10.08L23.1016 15.15C20.6512 18.69 20.6512 23.28 23.1016 26.82L18.2008 31.89C12.3082 25.83 12.3082 16.68 18.2008 10.08ZM8.5451 0L13.3 4.89C5.21957 13.95 5.21957 27.57 13.3 37.11L8.5451 42C-2.83169 30.33 -2.86086 12.15 8.5451 0Z"
                      fill="#FF4E4E"/>
                  <circle cx="32.5508" cy="19.9502" r="5.25" fill="#FF4E4E"/>
                </svg>

              </div>
              <div class="time hidden-sm-and-down">{{ nearestLiveSession.time }} Local time</div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row
          v-if="course.published"
          class="second-row text-center"
      >
        <v-col class="col-md-6">
          <v-btn
              @click="tooglePublishCourse(course._id)"
              text
              color="error"
              class="action-btn"
          >Unpublish
            <!--            <span class="hidden-sm-and-down">Course</span>-->
          </v-btn
          >
        </v-col>
        <v-col class="col-md-6 text-right">
          <v-btn :to="`/courses/preview/${course.name}`" text class="action-btn"
          >Preview
            <!--            <span class="hidden-sm-and-down">Course</span>-->
          </v-btn
          >
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import {calculateNearestLiveSession, convertUTCDateToLocalDate, elapsedDuration} from "../../services/global_functions";

export default {
  data: () => ({
    rem_time: "",
    currentDate: new Date().toISOString().substring(0, 10),
    nearestLiveSession: undefined,
    interval: null
  }),
  computed: {
    isLive() {
      if (!this.nearestLiveSession) return false;

      if ((new Date(this.nearestLiveSession.date) <= new Date(new Date().toISOString().substring(0, 10)))) {
        if (convertUTCDateToLocalDate(new Date(this.nearestLiveSession.date.replace("00:00", this.nearestLiveSession.time))) <= new Date(new Date().toGMTString())) {
          return true;
        }
      }
      return false;
    }
  },
  props: {
    course: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions("courses", ["tooglePublishCourse", "deleteCourse"]),
  },
  watch: {
    course(){
      this.nearestLiveSession = calculateNearestLiveSession(this.course)
    },
    nearestLiveSession() {
      this.interval = setInterval(() => {
        this.rem_time = elapsedDuration(convertUTCDateToLocalDate(new Date(this.nearestLiveSession.date.replace("00:00", this.nearestLiveSession.time))));
      }, 1000)
    }
  },
  destroyed() {
    clearInterval(this.interval)
  },
  mounted() {
    this.nearestLiveSession = calculateNearestLiveSession(this.course)
  }
};
</script>

<style lang="scss" scoped>
.class-view {
  .class-card {
    max-width: 400px;
    width: 100%;
    margin-top: 40px;
    border-radius: 15px;
    background-color: #eee;
    cursor: pointer;

    .instructor-course-title {
      font-weight: bold;
      color: #141414;
      font-size: 17px;
      margin: 0 0 3px 0;
    }

    .instructor-course-description {
      overflow-wrap: anywhere;
      color: #1d1d1d;
    }

    .first-row {
      background-color: #fff !important;
      box-shadow: 0px 17px 34px rgba(116, 113, 113, 0.16);
      //width: 400px;
      margin-left: 0;
      border-radius: 10px;
      padding-left: 10px;

      .content-side {
        .course-title {
          font-weight: 600;
        }

        .course-chapters {
          margin-top: -18px;
          font-size: 12px;
          font-weight: 900;
          color: #9a9a9a;
        }

        p.course-description {
          margin-top: -6px;
          font-weight: 500;
          line-height: 1;
        }

        .published-date {
          font-size: 12px;
          color: #9a9a9a;
        }

        .edit-btn {
          box-shadow: 0 7px 14px rgb(114, 114, 114, 0.16);
          background: $primary;
          color: #fff;
          font-size: 11px;
          height: 30px;
          border-radius: 15px;

          .mdi-arrow-right::before {
            font-size: 18px;
            padding-left: 10px;
          }
        }
      }

      .image-side {
        .course-image {
          height: 110px;
          width: 110px;
          border-radius: 55px;
          border: 2px solid $primary;
          margin: 6px 0;
          font-size: 35px !important;
        }

        .course-students {
          margin: 18px 18px 0;
          color: #9a9a9a;
          font-size: 14px;
          font-weight: 500;
        }
      }

      .live {
        font-family: Roboto;
        font-style: normal;

        .title {
          font-weight: normal;
          font-size: 21px;
          line-height: 25px;
          margin-top: 12px;
          margin-bottom: 20px;
          color: #FF0808;
        }

        .course {
          font-weight: bold;
          font-size: 15.88px;
          line-height: 19px;

          color: #353535;
        }

        .chapter {
          font-weight: normal;
          font-size: 13.88px;
          line-height: 16px;
          margin-bottom: 40px;
          color: #2C2C2C;
        }

        .created {
          font-weight: normal;
          font-size: 10px;
          line-height: 12px;
          margin-bottom: 4px;
          color: #2C2C2C;
        }

        svg {
          margin-top: 45px;
          margin-bottom: 38px;
        }

        .time {
          font-weight: bold;
          font-size: 10px;
          line-height: 12px;

          color: #2C2C2C;
        }
      }
    }

    .second-row {
      //width: 400px;
      margin-left: 0;
      height: 38px;

      .action-btn {
        margin-top: -10px;
      }
    }
  }

  //@media (max-width: 800px) {
  //  .class-view {
  //    .class-card {
  //      width: 280px !important;
  //      .first-row {
  //        height: 155px;
  //        .menu-btn {
  //          margin-left: 85px;
  //        }
  //      }
  //    }
  //  }
  //  .class-card {
  //    width: 280px !important;
  //    .first-row {
  //      height: 180px;
  //      .menu-btn {
  //        margin-left: 85px;
  //      }
  //    }
  //  }
  //}
}
</style>
