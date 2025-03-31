<template>
  <div class="combined-statistics pt-6">
    <div class="row">
      <div class="selection col-12 pb-0 col-lg-5 px-0" :class="{'px-0': $vuetify.breakpoint.width < 700 }">
        <div class="title mb-6">Select data</div>
        <button
            v-for="(obj, i) in data_categories"
            :key="i"
            :class="`choice hidden-sm-and-down ${obj.name == selected_category ? 'active' : ''}`"
            @click="selected_category = obj.name"
        >
          {{ obj.name }}
        </button>
        <select-ui
            class="hidden-md-and-up"
            :options="data_categories.map((x)=>x.name)"
            @input="
                (e) => {
                  selected_category = e;
                }
              "
        />
      </div>
      <div class="result-view pb-0 col-12 col-lg-7">
        <div class="filters-containter">
          <div class="filters">
            <div class="cursor-pointer" @click="activeFilter = 1" :class="{'active': activeFilter === 1}">All time</div>
            <div class="cursor-pointer" @click="activeFilter = 2" :class="{'active': activeFilter === 2}">Year</div>
            <div class="cursor-pointer" @click="activeFilter = 3" :class="{'active': activeFilter === 3}">Month</div>
            <div class="cursor-pointer" @click="activeFilter = 4" :class="{'active': activeFilter === 4}">Week</div>
            <div class="cursor-pointer" @click="activeFilter = 5" :class="{'active': activeFilter === 5}">Day</div>
          </div>
          <div class="hint">Select a time range to compare data</div>
        </div>
        <div class="chart">
          <chart
              v-if="loaded"
              type="line"
              class="my-chart ml-n6"
              width="305px"
              height="170px"
              :options="chartOptions"
              :series="series"
          ></chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Apexcharts from "vue-apexcharts";
import Apis from "@/services/apis";
import SelectUi from "@/components/reusable/ui/select-ui";

export default {
  name: "combined-statistics",
  data: () => ({
    selected_category: "Users online",
    userJoins: undefined,
    loaded: false,
    activeFilter: 4,
    data_categories: [
      {name: "Users online"},
      {name: "User joins"},
      {name: "Course access"},
      {name: "Quizes submitted"},
      {name: "Live classes attendees"},
    ],
    series: undefined,
    chartOptions: {
      chart: {
        height: 350,
        type: "line",
      },
      stroke: {
        width: 4,
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [],
        tickAmount: 10,
        labels: {
          formatter: function (value, timestamp, opts) {
            return opts.dateFormatter(new Date(timestamp), "dd MMM");
          },
        },
      },
      fill: {
        type: "solid",
        colors: ["#193074"],
      },
      markers: {
        size: 4,
        colors: ["#FFA41B"],
        strokeColors: "#fff",
        strokeWidth: 2,
        hover: {
          size: 7,
        },
      },
      yaxis: {
        min: 0,
        max: 40,
      },
    },
  }),
  components: {
    chart: Apexcharts,
    SelectUi
  },
  methods: {
    findStartDate(date) {
      switch (this.activeFilter) {
        case 2: {
          const res = new Date(date)
          res.setFullYear(res.getFullYear() - 1)
          return res
        }
        case 3: {
          const res = new Date(date)
          res.setMonth(res.getMonth() - 1)
          return res
        }
        case 4: {
          const res = new Date(date)
          res.setDate(res.getDate() - 7)
          return res
        }
        case 5: {
          const res = new Date(date)
          res.setDate(res.getDate() - 1)
          return res
        }
        default:
          return new Date(this.$store.state.sidebar_navbar.college.createdAt)
      }
    },
    async fetchData() {
      this.loaded = false
      const today = new Date()
      const endDate = new Date(today)
      let startDate = this.findStartDate(endDate)
      endDate.setDate(endDate.getDate() + 1)
      startDate = startDate.toISOString()
      let response
      if (this.selected_category === "User joins") {
        response = await Apis.get(`user/statistics/user_joins?start_date=${startDate}&end_date=${endDate.toISOString()}`);
        this.series = [
          {
            name: "Users",
            data: response.data.data.map(x => x.total_users),
          },
        ]
        this.chartOptions.xaxis.categories = response.data.data.map(x => x._id)
        this.loaded = true
      } else if (this.selected_category === "Quizes submitted") {
        response = await Apis.get(`quiz_submission/statistics/submitted?start_date=${startDate}&end_date=${endDate.toISOString()}`);
        this.series = [
          {
            name: "Submissions",
            data: response.data.data.map(x => x.total_submissions),
          },
        ]
        this.chartOptions.xaxis.categories = response.data.data.map(x => x._id)
        this.loaded = true
      } else if (this.selected_category === "Users online") {
        response = await Apis.get(`user_logs/statistics/online?start_date=${startDate}&end_date=${endDate.toISOString()}`);
        this.series = [
          {
            name: "Users",
            data: response.data.data.map(x => x.total_users),
          },
        ]
        this.chartOptions.xaxis.categories = response.data.data.map(x => x._id)
        this.loaded = true
      } else {
        response = await Apis.get(`user_logs/statistics/${this.selected_category === "Course access" ? 'course_access' : 'live_session_access'}?start_date=${startDate}&end_date=${endDate.toISOString()}`);
        this.series = [
          {
            name: this.selected_category,
            data: response.data.data.map(x => x.total_access),
          },
        ]
        this.chartOptions.xaxis.categories = response.data.data.map(x => x._id)
        this.loaded = true
      }

    }
  },
  watch: {
    selected_category() {
      this.fetchData();
    },
    activeFilter() {
      this.fetchData();
    }
  },
  async created() {
    this.fetchData()
  }
};
</script>

<style lang="scss">
.combined-statistics {
  max-width: 774px;
  max-height: 253px;
  overflow-x: auto;
  background: #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
  border-radius: 4.14px;
  padding: 17px 41px;

  .title {
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 10.7572px;
    line-height: 17px;
    /* or 154% */

    color: #494949;
  }

  .selection {
    width: 40%;

    .choice {
      display: block;
      text-align: left;
      width: 100%;

      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 11.7572px;
      line-height: 17px;
      /* or 154% */


      color: #494949;

      height: 23px;

      &.active {
        font-family: Inter;
        font-style: normal;
        font-weight: bold;
        font-size: 13px;
        line-height: 17px;
        /* or 138% */


        color: #193074;
      }
    }
  }

  .result-view {
    width: 60%;

    .filters-containter {
      margin-left: auto;
      max-width: 247px;

      .filters {
        font-family: Inter;
        font-style: normal;
        font-weight: bold;
        font-size: 10.7572px;
        line-height: 17px;
        /* or 154% */
        display: flex;

        div {
          margin-right: auto;
        }

        color: #ABABAB;

        .active {
          color: #193074;
        }
      }

      .hint {
        font-family: Inter;
        font-style: normal;
        font-weight: normal;
        font-size: 8px;
        line-height: 17px;
        /* or 207% */


        color: #ABABAB;

      }
    }
  }
}

/* Portrait phones and smaller */
@media (max-width: 700px) {
  .combined-statistics {
    max-height: fit-content;
  }
}
</style>