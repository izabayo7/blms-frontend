<template>
  <v-container fluid>
    <v-card
      v-if="category=='ongoing'"
      @click="handleCourseClick(course._id)"
      class="course-card elevation-0 py-1 px-3"
    >
      <v-row class="card-content">
        <v-col cols="5" class="course-image-side">
          <v-img v-if="course.coverPicture" :src="`${course.coverPicture}`" class="course-image"></v-img>
          <v-avatar
            class="course-image white--text bg-color-one text-h2"
            size="125"
            v-else
          >{{computeText(course.name)}}</v-avatar>
        </v-col>
        <v-col class="col-7 coure-details-side pt-6">
          <p class="course-title">{{course.name}}</p>
          <p class="course-instructor">{{course.instructor.surName}}</p>
          <p class="course-description">{{trimString({string: course.description,length: 100})}}</p>
          <v-progress-linear :value="course.progress.progress" color="#ffc100" class="course-progress" />
          <p class="course-completion">{{Math.round(course.progress.progress)}}% completion</p>
        </v-col>
      </v-row>
    </v-card>
    <v-card v-else @click="handleCourseClick(course._id)" class="course completed">
      <v-row>
        <v-col class="col-12 pa-0" id="cover-pic">
          <v-img
            v-if="course.coverPicture"
            :src="''+course.coverPicture"
            class="course-image"
            style="height: 217px"
          ></v-img>
          <div v-else class="bg-color-one no-image text-center pt-12">
            <span class="text-h1 white--text">{{computeText(course.name)}}</span>
          </div>
        </v-col>
        <v-col cols="12" class="completed-results">
          <span class="title d-block text-truncate mb-2 mb-sm-1 pt-3">{{ course.name }}</span>
          <span
            class="course-description text-caption d-block mb-6"
          >{{ trimString({string: course.description, length: 150}) }}</span>
          <h4>
            <v-avatar size="30" :class="`${course.instructor.profile? '' : 'bg-color-one'} user-profile`">
              <img v-if="course.instructor.profile" :src="course.instructor.profile" alt="avatar" />
              <span class="white--text" v-else>{{computeText(`${course.instructor.surName} ${course.instructor.otherNames}`)}}</span>
            </v-avatar>
            Instructor {{ course.instructor.surName }}
          </h4>
          <h4>
            <v-icon color="#ffd248">mdi-star-outline</v-icon>4.2
          </h4>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
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
  methods: {
    handleCourseClick(id) {
      //update the selectedCourse
      this.$store.commit("set_selected_course", id);

      // navigate to the course
      this.$router.push(`courses/preview/${this.course.name}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.bg-color-one.no-image.text-center {
  height: 208px;
}
.course.completed {
  box-shadow: 0 38px 76px rgba(138, 138, 138, 0.18);
}
.course-card.v-card.v-sheet {
  width: 560px;
  height: 189px;
  border-radius: 24px;
  .course-image-side {
    padding: 35px 0 0;
    .course-image {
      height: 125px;
      width: 125px;
      border: none !important;
      border-radius: 90px;
      margin-left: 23px;
      border: 1px solid grey;
    }
  }
  .coure-details-side {
    p {
      margin-bottom: 7px !important;
    }
    .course-title {
      line-height: 1;
      color: #bbb;
      font-size: 16px;
      font-weight: bold;
    }
    .course-instructor {
      font-size: 12px;
      font-weight: 500;
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
}
.course.completed {
  min-height: 440px !important;
  min-width: 352px;
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
    height: 200.6px;
    margin: -12px 0 0 0px;
    border-radius: 0;
  }

  .completed-results {
    padding: 0px 29px !important;
  }
}
.courses-not-found-image {
  width: 69%;
}
</style>