<template>
  <div class="combined-statistics py-6">
    <div class="d-flex">
      <div class="selection">
        <div class="title mb-3">Select data</div>
        <button class="choice" v-for="(obj, i) in data_categories" :key="i">
          {{ obj.name }}
        </button>
      </div>
      <div class="result-view mb-3">
        <div class="title">User join rate</div>
      </div>
    </div>
  </div>
</template>

<script>
// import Apexcharts from "vue-apexcharts";
export default {
  data: () => ({
    data_categories: [
      { name: "User joins" },
      { name: "Course user access" },
      { name: "Courses created" },
      { name: "Quizes done" },
      { name: "Live classes attendees" },
    ],
    series: [44, 55, 13, 33],
    chartOptions: {
      chart: {
        width: 380,
        type: "donut",
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              show: false,
            },
          },
        },
      ],
      legend: {
        position: "right",
        show: false,
        offsetY: 0,
        height: 230,
      },
    },
  }),
  components: {
    // chart: Apexcharts,
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
    }
  }
  .result-view {
    width: 60%;
  }
}
</style>