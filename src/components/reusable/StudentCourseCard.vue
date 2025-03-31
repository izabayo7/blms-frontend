<template>
  <v-container fluid>
    <v-card
      v-if="category=='ongoing'"
      :to="`courses/${course._id}`"
      class="course-card elevation-0 py-1 px-3"
    >
      <v-row class="card-content">
        <v-col cols="5" class="course-image-side">
          <v-img v-if="image" :src="''+image" class="course-image"></v-img>
          <v-avatar
            class="course-image white--text bg-color-one text-h2"
            size="125"
            v-else
          >{{computText(course.name)}}</v-avatar>
        </v-col>
        <v-col class="col-7 coure-details-side pt-6">
          <p class="course-title">{{course.name}}</p>
          <p class="course-instructor">{{instructor.surName}}</p>
          <p class="course-description">{{trimString(course.description, 100)}}</p>
          <v-progress-linear :value="progress" color="#ffc100" class="course-progress" />
          <p class="course-completion">{{Math.round(progress)}}% completion</p>
        </v-col>
      </v-row>
    </v-card>
    <v-card v-else :to="`courses/${course._id}`" class="course completed">
      <v-row>
        <v-col class="col-12 pa-0" id="cover-pic">
          <!-- <v-img class="course-image" :src="''+image" ></v-img> -->
          <v-img v-if="image" :src="''+image" class="course-image" style="height: 217px"></v-img>
          <div v-else class="bg-color-one no-image text-center pt-12">
            <span class="text-h1 white--text">{{computText(course.name)}}</span>
          </div>
        </v-col>
        <v-col cols="12" class="completed-results">
          <span class="title d-block text-truncate mb-2 mb-sm-1 pt-3">{{ course.name }}</span>
          <span
            class="course-description text-caption d-block mb-6"
          >{{ trimString(course.description, 150) }}</span>
          <h4>
            <v-avatar size="30" class="user-profile">
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="avatar" />
            </v-avatar>
            Instructor {{ instructor.surName }}
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
import Apis from "@/services/apis";
export default {
  data: () => ({
    progress: 0,
    instructor: {},
  }),
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
  computed: {
    image() {
      return this.course.coverPicture !== undefined
        ? `http://161.35.199.197:7070/kurious/file/courseCoverPicture/${this.course._id}`
        : undefined;
    },
  },
  beforeMount() {
    this.getStudentProgress();
    this.getInstructor();
  },
  methods: {
    async getStudentProgress() {
      try {
        let response = await Apis.get(
          `studentProgress/${this.$store.state.user._id}/${this.course._id}`
        );
        this.progress = response.data.progress;
      } catch (error) {
        if (error.response) {
          this.maximumIndex = 0;
          this.progress = 0;
        } else if (error.request) {
          this.status = 503;
          this.message = "Service Unavailable";
          this.modal = false;
          this.show = true;
        }
      }
    },
    async getInstructor() {
      try {
        const response = await Apis.get(`instructor/${this.course.instructor}`);
        this.instructor = response.data;
      } catch (error) {
        if (error.request && !error.response) {
          this.status = 503;
          this.message = "Service Unavailable";
          this.modal = false;
          this.show = true;
        }
      }
    },
    trimString(string, length) {
      let trimedString = string.substring(0, length);
      trimedString = trimedString.split(" ");
      trimedString.splice(trimedString.length - 1, 1);
      trimedString = trimedString.join(" ") + " ...";
      return trimedString;
    },
    computText(name) {
      let text = "";
      const forbiden = ["and", "of"];
      name.split(" ").forEach((val) => {
        if (!forbiden.includes(val)) text += val.substring(0, 1).toUpperCase();
      });

      return text;
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