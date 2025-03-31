<template>
  <v-container fluid>
    <div
        v-if="category == 'ongoing'"
        @click="$router.push(`/courses/preview/${course.name}`)"
        class="course-card py-1 px-3"
    >
      <v-row class="card-content">
        <v-col cols="5" class="course-image-side">
          <div class="live d-flex">
            <div v-if="course.live">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M7.12364 14.6692C11.0579 14.6692 14.2473 11.4798 14.2473 7.54552C14.2473 3.61124 11.0579 0.421875 7.12364 0.421875C3.18936 0.421875 0 3.61124 0 7.54552C0 11.4798 3.18936 14.6692 7.12364 14.6692Z"
                    fill="#FFD248"/>
              </svg>

              Live in 2 hours
            </div>
          </div>
          <v-img
              v-if="course.cover_picture"
              :src="`${
              course.cover_picture
            }?format=png&width=200&height=200&token=${$session.get('jwt')}`"
              class="course-image"
          >
          </v-img>
          <v-avatar
              class="course-image white--text bg-color-one text-h2"
              size="112"
              v-else
          >{{ course.name | computeText }}
          </v-avatar>
        </v-col>
        <v-col class="col-7 coure-details-side pt-4">
          <p class="course-title">{{ course.name | trimString(15) }}</p>
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
    </div>
    <v-card
        v-else
        @click="$router.push(`/courses/preview/${course.name}`)"
        class="course completed"
    >
      <v-row>
        <v-col class="col-12 pa-0" id="cover-pic">
          <v-img
              v-if="course.cover_picture"
              :src="`${
              course.cover_picture
            }?format=png&width=300&height=300&token=${$session.get('jwt')}`"
              class="course-image"
          >
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
                  `${course.user.sur_name} ${course.user.other_names}`
                      | computeText
                }}</span>
            </v-avatar>
            Instructor {{ course.user.sur_name }}
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

.course-card {
  box-shadow: 0px 4px 10px 3px rgba(25, 48, 116, 0.17);
  width: 355px;
  height: 170px;
  // border-radius: 24px;
  background: white;
  //border-radius: 10px;

  .course-image-side {
    //padding: 35px 0 0;
    .live {
      font-family: Montserrat;
      font-style: normal;
      font-weight: normal;
      font-size: 9.29171px;
      line-height: 11px;
      margin-bottom: 8px;
      color: #747474;
      height: 17px;

      svg {
        margin-right: 5px;
      }
    }

    .v-avatar {
      margin: 0;
    }

    .course-image {
      height: 112.74px;
      width: 112.74px;
      border-radius: 90px;
      //margin-left: 8%;
      border: 2px solid $primary;
    }
  }

  .coure-details-side {
    p {
      margin-bottom: 7px !important;
    }

    .course-title {
      font-family: Poppins;
      font-style: normal;
      font-weight: 500;
      font-size: 15.4862px;
      line-height: 23px;
margin-bottom: 4.7px !important;
      color: #6A6A6A;
    }

    .course-instructor {
      font-family: Poppins;
      font-style: normal;
      font-weight: normal;
      font-size: 12.3889px;
      line-height: 19px;
      /* identical to box height */


      color: #ACACAC;
    }

    .course-description {
      font-family: Poppins;
      font-style: normal;
      font-weight: 500;
      font-size: 9.91115px;
      line-height: 15px;
      display: flex;
      align-items: flex-end;
margin-bottom: 20px !important;
      color: #787878;
    }

    .course-progress {
      height: 6px !important;
      width: 130px;
      border-radius: 3px;
      margin-bottom: 11px;
    }

    .course-completion {
      font-family: Montserrat;
      font-style: normal;
      font-weight: normal;
      font-size: 8.05281px;
      line-height: 10px;
      /* identical to box height */


      color: #929292;
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