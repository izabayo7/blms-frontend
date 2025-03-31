<template>
  <div class="combined-statistics pt-6">
    <div class="row">
      <div class="selection col-12 col-lg-5" :class="{'px-0': $vuetify.breakpoint.width < 700 }">
        <div class="title mb-6">Select data</div>
        <button
          v-for="(obj, i) in data_categories"
          :key="i"
          :class="`choice ${obj.name == selected_category ? 'active' : ''}`"
          @click="selected_category = obj.name"
        >
          {{ obj.name }}
        </button>
      </div>
      <div class="result-view mb-3 col-12 col-lg-7" :class="{'px-8': $vuetify.breakpoint.width < 700 }">
        <div class="title">User join rate</div>
        <div class="chart">
          <chart
            type="line"
            class="my-chart ml-n6"
            width="390px"
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
export default {
  data: () => ({
    selected_category: "",
    data_categories: [
      { name: "User joins" },
      { name: "Course user access" },
      { name: "Courses created" },
      { name: "Quizes done" },
      { name: "Live classes attendees" },
    ],
    series: [
      {
        name: "Likes",
        data: [4, 3, 10, 9, 29, 19, 22, 9, 12],
      },
    ],
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
        categories: [
          "1/11/2000",
          "2/11/2000",
          "3/11/2000",
          "4/11/2000",
          "5/11/2000",
          "6/11/2000",
          "7/11/2000",
          "8/11/2000",
          "9/11/2000",
        ],
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
        min: -10,
        max: 40,
      },
    },
  }),
  components: {
    chart: Apexcharts,
  },
};
</script>

<style lang="scss">
.combined-statistics {
  max-width: 734px;
  background: #ffffff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
  border-radius: 4.14px;

  .title {
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 10.7572px;
    line-height: 17px;
    /* or 154% */

    color: #494949;
    padding-left: 20%;
  }
  .selection {
    width: 40%;
    .choice {
      display: block;
      padding-left: 20%;
      text-align: left;
      width: 100%;

      font-family: Inter;
      font-size: 11px;
      font-style: normal;
      font-weight: 700;
      line-height: 17px;
      letter-spacing: 0em;
      text-align: left;

      height: 23px;
      &.active {
        box-shadow: 0px 0px 5px rgba(25, 48, 116, 0.69);
        border-radius: 4px;
      }
    }
  }
  .result-view {
    width: 60%;
  }
}
</style>