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
          <circle cx="25" cy="25" r="25" fill="#FC6767" />
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
          label="Select course"
          class="bold-border"
          name="role"
          id="user_group"
          :options="user_group_names"
          @input="
            (e) => {
              selected_user_group = e;
            }
          "
        />
      </div>
      <div class="input-container my-margin">
        <select-ui
          label="Select chapter"
          class="bold-border"
          name="role"
          id="user_group"
          :options="user_group_names"
          @input="
            (e) => {
              selected_user_group = e;
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
            v-model="date"
            no-title
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> OK </v-btn>
          </v-date-picker>
        </div>
        <div class="start-now d-flex mb-4 my-margin ml-0 ml-md-7">
          <input type="checkbox" :v-model="startNow" />
          Start Live class now
        </div>
      </div>
      <div class="input-container my-margin">
        <div class="label mb-2">Select time</div>
        <div class="d-flex">
          <div class="text-filed mr-5" @click="showTimePicker(false)">
            {{ hours }}
          </div>
          <div class="text-filed" @click="showTimePicker(true)">
            {{ minutes }}
          </div>
        </div>
        <div ref="timepicker" class="time_pckr">
          <TimePicker
            @update="updateTime"
            class="mt-4"
            v-if="showPicker"
            format="24hr"
            scrollable
            min="9:30"
            :no-title="true"
            :use-seconds="useSeconds"
            max="22:15"
            @close="showPicker = false"
          ></TimePicker>
        </div>
      </div>
      <div class="input-container my-margin">
        <div class="label mb-2">Select quiz</div>
        <select-ui
          class="bold-border"
          name="role"
          id="user_group"
          :options="user_group_names"
          @input="
            (e) => {
              selected_user_group = e;
            }
          "
        />
      </div>
      <button class="submit" @click="saveSession()">Schedule class</button>
    </div>
  </div>
</template>

<script>
import SelectUi from "@/components/reusable/ui/select-ui";
import { mapActions } from "vuex";
import TimePicker from "@/components/TimePicker";
export default {
  components: { SelectUi, TimePicker },
  data() {
    return {
      user_group_names: ["Principal", "Instructor", "Student"],
      date: "2018-09-15",
      menu: false,
      time: "00:00",
      useSeconds: false,
      startNow: false,
      showPicker: false,
      counter: 0,
    };
  },
  computed: {
    hours() {
      return this.time.split(":")[0];
    },
    minutes() {
      console.log(this.time.toString());
      return this.time.split(":")[1];
    },
  },
  methods: {
    ...mapActions("live_session",["createLiveSession"]),
    updateTime(value) {
      // console.log(value, this.counter);
      if (value) {
        this.time = value;
        if (
          this.hours &&
          this.minutes &&
          this.hours != "00" &&
          this.minutes != "00"
        ) {
          this.showPicker = false;
        }
      }
    },
    toogleMenu() {
      this.menu = true;
    },
    showTimePicker(showSeconds) {
      this.useSeconds = showSeconds;
      this.showPicker = true;
    },
    async saveSession(){
      this.createLiveSession({
        session: {
          target: {
            type: "chapter",
            id: "5fc01903bff43af061f71727"
          },
          starting_time:this.date,
        }
      }).then(()=>{
        console.log("Live session created")
      })
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
    width: 79px;
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