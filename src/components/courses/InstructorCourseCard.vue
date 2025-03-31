<template>
  <div class="class-view">
    <div :class="`class-card ${course.published ? '' : 'unpublished-card'}`">
      <v-row class="first-row">
        <v-col class="col-md-7 col-7 content-side">
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
        <v-col class="col-md-5 col-5 image-side">
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
            >{{ course.name | computeText }}</v-avatar
          >
          <p class="course-students" v-if="course.published">
            {{
              `${course.attendedStudents} Student${
                course.attendedStudents > 1 ? "s" : ""
              }`
            }}
          </p>
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
            >Unpublish <span class="hidden-sm-and-down">Course</span></v-btn
          >
        </v-col>
        <v-col class="col-md-6 text-right">
          <v-btn :to="`/courses/preview/${course.name}`" text class="action-btn"
            >Preview <span class="hidden-sm-and-down">Course</span></v-btn
          >
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    power: 67,
    publishedList: [
      { title: "Preview Course" },
      { title: "Edit Course" },
      { title: "Unpublish Course" },
    ],
    unPublishedList: [
      { title: "Publish Course" },
      { title: "Edit Course" },
      { title: "Delete Course" },
    ],
  }),
  props: {
    course: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions("courses", ["tooglePublishCourse", "deleteCourse"]),
  },
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
    .instructor-course-title {
      font-weight: bold;
      color: #141414;
      font-size: 17px;
      margin: 0 0 3px 0;
    }
    .instructor-course-description {
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
