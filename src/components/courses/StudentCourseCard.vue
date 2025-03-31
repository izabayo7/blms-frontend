<template>
  <v-container fluid>
    <v-card
      v-if="category == 'ongoing'"
      @click="$router.push(`/courses/preview/${course.name}`)"
      class="course-card py-1 px-3"
    >
      <v-row class="card-content">
        <v-col cols="5" class="course-image-side">
          <v-img
            v-if="course.cover_picture"
            :src="`${course.cover_picture}?format=png&width=200&height=200`"
            :lazy-src="`${course.cover_picture}?format=png&width=200&height=200`"
            class="course-image"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <v-avatar
            class="course-image white--text bg-color-one text-h2"
            size="125"
            v-else
            >{{ course.name | computeText }}</v-avatar
          >
        </v-col>
        <v-col class="col-7 coure-details-side pt-6">
          <p class="course-title">{{ course.name | trimString(30) }}</p>
          <p class="course-instructor">{{ course.user.sur_name }}</p>
          <p class="course-description">
            {{ course.description | trimString(50) }}
          </p>
          <v-progress-linear
            v-if="course.progress"
            :value="course.progress.progress"
            class="course-progress"
            :color="primary"
          />
          <p class="course-completion">
            {{
              course.progress
                ? Math.round(course.progress.progress) + "% completion"
                : "Not yet started"
            }}
          </p>
        </v-col>
      </v-row>
    </v-card>
    <v-card
      v-else
      @click="$router.push(`/courses/preview/${course.name}`)"
      class="course completed"
    >
      <v-row>
        <v-col class="col-12 pa-0" id="cover-pic">
          <v-img
            v-if="course.cover_picture"
            :src="`${course.cover_picture}?format=png&width=300&height=300`"
            :lazy-src="`${course.cover_picture}?format=png&width=300&height=300`"
            class="course-image"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <div
            v-else
            class="bg-color-one vertically--centered text-center pt-12"
          >
            <span class="text-h1 white--text">{{
              course.name | computeText
            }}</span>
          </div>
        </v-col>
        <v-col cols="12" class="completed-results">
          <span class="title d-block mb-2 mb-sm-1 pt-3">{{
            course.name | trimString(20)
          }}</span>
          <span class="course-description text-caption d-block mb-6">{{
            course.description | trimString(50)
          }}</span>
          <h4>
            <v-avatar
              size="30"
              :class="`${
                course.user.profile ? '' : 'bg-color-one'
              } user-profile mr-2 course-image`"
            >
              <v-img
                v-if="course.user.profile"
                :src="course.user.profile"
                alt="avatar"
              />
              <span class="white--text" v-else>{{
                `${course.user.surName} ${course.user.otherNames}`
                  | computeText
              }}</span>
            </v-avatar>
            Instructor {{ course.user.surName }}
          </h4>
          <div class="mt-4">
            <div class="svg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="27"
                viewBox="0 0 24 27"
              >
                <path
                  id="Icon_material-date-range"
                  data-name="Icon material-date-range"
                  d="M12.5,15.15H9.833v2.7H12.5Zm5.333,0H15.167v2.7h2.667Zm5.333,0H20.5v2.7h2.667ZM25.833,5.7H24.5V3H21.833V5.7H11.167V3H8.5V5.7H7.167A2.672,2.672,0,0,0,4.513,8.4L4.5,27.3A2.683,2.683,0,0,0,7.167,30H25.833A2.691,2.691,0,0,0,28.5,27.3V8.4A2.691,2.691,0,0,0,25.833,5.7Zm0,21.6H7.167V12.45H25.833Z"
                  transform="translate(-4.5 -3)"
                />
              </svg>
            </div>
            <div class="ml-4 date_finished">
              completed on {{ course.progress.lastUpdated | formatDate }}
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import colors from "@/assets/sass/imports/_colors.scss";
export default {
  props: {
    course: {
      type: Object,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    primary: colors.primary,
  }),
};
</script>

<style lang="scss" scoped>
.bg-color-one.vertically--centered.text-center {
  height: 208px;
}
.course-card:hover,
.course.completed:hover {
  box-shadow: 0px 5px 15px rgb(199, 199, 199, 1.6) !important;
  margin-top: -10px;
}

// card animation
/* Quick-zoom Container */
.course-card,
.course.completed {
  margin-top: 0;
  transition: margin 0.25s, visibility 0.25s ease-out;
}

.course-card.v-card.v-sheet {
  box-shadow: 3px 3px 3px rgb(183, 183, 183, 0.66);
  width: 560px;
  height: 189px;
  // border-radius: 24px;
  border-radius: 10px;
  .course-image-side {
    padding: 35px 0 0;
    .course-image {
      height: 125px;
      width: 125px;
      border-radius: 90px;
      margin-left: 8%;
      border: 2px solid $primary;
    }
  }
  .coure-details-side {
    p {
      margin-bottom: 7px !important;
    }
    .course-title {
      line-height: 1;
      font-size: 16px;
      font-weight: bold;
    }
    .course-instructor {
      font-size: 12px;
      font-weight: 500;
      color: #bbb;
      //   margin-top: -12px;
    }
    .course-description {
      font-size: 12px;
      line-height: 1.2;
      color: #acacac;
    }
    .course-progress {
      height: 10px !important;
      width: 130px;
      border-radius: 3px;
    }
    .course-completion {
      font-size: 11px;
      font-weight: 700;
      margin-top: 3px;
    }
  }
  // .course-image {
  //   height: 110px;
  //   width: 110px;
  //   border-radius: 55px;
  //   border: 2px solid $primary;
  //   margin: 6px 0;
  //   font-size: 35px !important;
  // }
}
.date_finished {
  margin: -31px 0 0 40px !important;
}
.course.completed {
  min-height: 380px !important;
  max-width: 300px;
  border-radius: 0 !important;

  h4 {
    color: #acacac;
  }

  p {
    color: #787878;
  }

  .course-description {
    margin-right: 80px !important;
  }

  .course-image {
    height: 160.6px;
    margin: -12px 0 0 0px;
    // border-radius: 0;
  }

  .completed-results {
    padding: 0px 29px !important;
  }
}
.courses-not-found-image {
  width: 69%;
}
</style>