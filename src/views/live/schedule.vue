<template>
  <div id="schedule_live_class">
    <div class="content">
      <div class="heading my-title d-flex my-margin">
        <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="25" cy="25" r="25" fill="#FC6767"/>
          <path
              d="M37 20L30 25L37 30V20Z"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
          />
          <path
              d="M28 18H17C15.8954 18 15 18.8954 15 20V30C15 31.1046 15.8954 32 17 32H28C29.1046 32 30 31.1046 30 30V20C30 18.8954 29.1046 18 28 18Z"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
          />
        </svg>
        Start a live class
      </div>
      <div class="my-title my-margin">Live class details</div>
      <div class="input-container my-margin">
        <select-ui
            class="bold-border"
            name="role"
            :options="courseNames"
            id="course"
            :label="selected_course == ''? 'Select course' : selected_course"
            @input="
            (e) => {
              selected_course = e;
            }
          "
        />
      </div>
      <div class="input-container my-margin">
        <select-ui
            label="Select chapter"
            class="bold-border"
            id="chapter"
            name="role"
            :options="chapterNames"
            @input="
            (e) => {
              selected_chapter = e;
            }
          "
        />
      </div>
      <div class="d-md-flex y-centered">
        <div class="input-container my-margin">
          <div class="select-date d-flex" @click="toogleMenu()">
            <div class="value">{{ date }}</div>

            <svg
                class="drop-down-icon my-auto ml-auto"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M9 11H7V13H9V11ZM13 11H11V13H13V11ZM17 11H15V13H17V11ZM19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V9H19V20Z"
                  fill="black"
              />
            </svg>
          </div>
          <v-date-picker
              class="date-picker"
              v-show="menu"
              :disabled="startNow"
              v-model="date"
              no-title
              scrollable
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> OK</v-btn>
          </v-date-picker>
        </div>
        <div class="start-now d-flex mb-4 my-margin ml-0 ml-md-7">
          <input type="checkbox" @change="startNow =!startNow"/>
          Start Live class now
        </div>
      </div>
      <div class="input-container my-margin">
        <div class="label mb-2">Select time</div>
        <div class="d-flex">
          <input :disabled="startNow" class="text-filed pa-4" v-model="time" type="time" />
        </div>
      </div>
      <div class="input-container my-margin">
        <div class="label mb-2">Select quiz</div>
        <select-ui
            class="bold-border"
            name="role"
            id="quiz"
            :options="quizNames"
            @input="
            (e) => {
              selected_quiz = e;
            }
          "
        />
      </div>
      <div class="input-container my-margin d-flex">
        <div class="label mb-2">Record this live class </div>
        <input v-model="record_session" class="mt-1 ml-2" type="checkbox">
      </div>
      <button class="submit" @click="validateForm()">Schedule class</button>
    </div>
    <Popup v-show="showModal" :title="'You are about to schedule a live class with the following details'">
      <template v-if="isConfirming" v-slot:content>
        <div class="col-12 mx-4 mt-0 mt-xs-4 mt-lg-0 ml-lg-14 text-left">
          <div class="mr-4">
            <div class="detail">Course name: <span>{{ selected_course }}</span></div>
            <div class="detail">Chapter name : <span>{{ selected_chapter }}</span></div>
            <div class="detail">Student group : <span>{{ studentGroup() }}</span></div>
            <div class="detail">Date : <span>{{ date | formatDate }}</span></div>
            <div class="detail">Time : <span>{{ time }}</span></div>
          </div>
<!--          <div>-->
<!--            <div class="detail">Notification : <span>Urgent live anouncement</span></div>-->
<!--            <div class="detail">Details : <span>Dear year 2 students,-->
<!--you  are invite to this 20 minutes live class,-->
<!--Attendance will not be accounted-->
<!--thanks</span></div>-->
<!--          </div>-->
        </div>
        <div class="mx-auto">
          <button class="action" @click="showModal = false">Cancel</button>
          <button class="action primary" @click="saveSession()">Approve</button>
        </div>
      </template>
      <template v-else v-slot:content>
        <div class="subtitle">Live class successfly scheduled for :</div>
        <div class="detail">course : <span>{{ selected_course }}</span></div>
        <div class="detail"> user group: <span>{{ studentGroup() }}</span></div>
        <div class="detail"><span>{{ date | formatDate }} at {{ time }}</span></div>
        <div class="detail">Student have already been notified</div>
        <div class="mx-auto">
          <button @click="showModal = false;this.$router.push('/courses')">OKAY</button>
        </div>
      </template>
    </Popup>
  </div>
</template>

<script>
import SelectUi from "@/components/reusable/ui/select-ui";
import {mapActions, mapGetters} from "vuex";
import Popup from "@/components/Live/Popup";
import {getDateAndTime} from "../../services/global_functions";

export default {
  components: {SelectUi, Popup},
  data() {
    return {
      user_group_names: ["Principal", "Instructor", "Student"],
      date: new Date().toISOString().substring(0, 10),
      menu: false,
      time: "00:00",
      startNow: false,
      counter: 0,
      selected_course: "",
      selected_chapter: "",
      selected_quiz: "",
      record_session: false,
      showModal: false,
      isConfirming: false,
    };
  },
  watch: {
    selected_course() {
      this.selected_chapter = ""
    },
    startNow(){
      const obj = getDateAndTime();
      this.date = obj.date
      this.time= obj.time
    }
  },
  computed: {
    ...mapGetters("courses", ["courses", "loaded", "course"]),
    ...mapGetters("quiz", ["all_quiz"]),
    courseNames() {
      let res = [];
      for (const i in this.courses) {
        res.push(this.courses[i].name);
      }
      return res;
    },
    chapterNames() {
      let res = [];
      for (const i in this.courses) {
        if (this.courses[i].name == this.selected_course) {
          for (const k in this.courses[i].chapters) {
            res.push(this.courses[i].chapters[k].name);
          }
        }
      }
      return res;
    },
    selectedQuiz() {
      if (this.selected_quiz && this.all_quiz.length && this.selected_quiz != "") {
        return this.all_quiz.filter((quiz) => quiz.name == this.selected_quiz)[0]._id;
      } else {
        return undefined;
      }
    },
    quizNames() {
      let res = []
      for (const i in this.all_quiz) {
        res.push(this.all_quiz[i].name)
      }
      return res
    }
  },
  methods: {
    ...mapActions("live_session", ["createLiveSession"]),
    ...mapActions("courses", ["getCourses"]),
    ...mapActions("quiz", ["getQuizes"]),
    toogleMenu() {
      this.menu = true;
    },
    validateForm() {
      if (this.selected_chapter == "" || this.date == "") {
        this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: "All fields are required",
          status: "danger",
          uptime: 20000,
        });
      } else if (this.time == "00:00") {
        this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: "Time is required",
          status: "info",
          uptime: 20000,
        });
      } else {
        this.isConfirming = true;
        this.showModal = true
      }
    },
    studentGroup() {
      for (const i in this.courses) {
        if (this.courses[i].name == this.selected_course) {
          return this.courses[i].user_group.name
        }
      }
    },
    async saveSession() {
      let chapter_id = "";
      for (const i in this.courses) {
        if (this.courses[i].name == this.selected_course) {
          for (const k in this.courses[i].chapters) {
            if (this.courses[i].chapters[k].name == this.selected_chapter) {
              chapter_id = this.courses[i].chapters[k]._id
            }
          }
        }
      }
      this.createLiveSession({
        session: {
          target: {
            type: "chapter",
            id: chapter_id,
          },
          date: this.date,
          time: this.time,
          record_session: this.record_session,
          quiz: this.selectedQuiz ? this.selectedQuiz : undefined
        },
      }).then(() => {
        this.showModal = false;
        this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: "Live session created",
          status: "success",
          uptime: 5000,
        });
        setTimeout(() => {
          this.$router.push('/courses')
        }, 3000);
      });
    },
  },
  created() {
    this.getCourses(!this.loaded);
    this.getQuizes({
      user_name: this.$store.state.user.user.user_name,
    });
    console.log(this.$store.state.courses.selectedCourse, this.course)
    if(this.course){
      console.log(this.course.name)
      this.selected_course = this.course.name
    }
  },
};
</script>

<style lang="scss">
#schedule_live_class {
  background: #f3f6ff;
  padding: 25px 44px;
  min-height: 100%;

  .content {
    background: white;
    max-width: 1156px;
    max-height: 745px;
    padding: 58px 62px;

    .my-title {
      font-family: Inter;
      font-style: normal;
      font-weight: bold;
      font-size: 20px;
      line-height: 25px;
      /* identical to box height, or 125% */

      color: #000000;
    }

    .my-margin {
      margin-bottom: 50px;

      &.input-container {
        margin-bottom: 20px;
      }
    }

    .heading {
      place-items: center;

      svg {
        margin-right: 15px;
      }
    }

    .bold-border .select-container {
      border: 1.54684px solid #bababc !important;
    }

    .input-container {
      max-width: 515px;

      .label {
        font-family: Inter;
        font-style: normal;
        font-weight: normal;
        font-size: 14.3284px;
        line-height: 21px;

        color: #717171;
      }
    }

    .select-date {
      border: 1.5px solid lighten($grayish, 20%);
      border-radius: 2px;
      padding: 0.6rem 1.4rem 0.6rem 0;

      .value {
        padding-left: 1.4rem;
        font-family: Inter;
        font-style: normal;
        font-weight: 500;
        font-size: 11.6667px;
        /* identical to box height, or 214% */

        color: #7c7c7c;
      }
    }

    .date-picker {
      position: relative;
      filter: drop-shadow(2.75622px 2.75622px 6.89055px rgba(25, 48, 116, 0.4));
      margin-top: -41px;
      margin-left: 110px;
    }
  }

  .start-now {
    margin-left: 27px;

    input {
      margin-right: 11px;
    }

    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 10.483px;
    line-height: 16px;
    /* identical to box height */

    color: #000000;
  }

  .y-centered {
    place-items: center;
  }

  .text-filed {
    //width: 79px;
    height: 41px;
    border: 1.54684px solid #bababc;
    display: flex;
    place-items: center;
    justify-content: center;
    border-radius: 4px;
  }

  .submit {
    width: 184px;
    height: 52.67px;
    left: 208px;
    top: 724px;

    background: #193074;
    border-radius: 4.75155px;

    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 12.354px;
    line-height: 15px;
    /* identical to box height */

    color: #ffffff;
  }
}

/* Portrait phones and smaller */
@media (max-width: 1000px) {
  #schedule_live_class {
    padding: 0px;
  }
}
</style>
