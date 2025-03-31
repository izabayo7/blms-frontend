<template>
<div class="ssc">
  <div class="ssc--wrapper">
    <apex-charts
      type="bar"
      class="my-chart ml-n6"
      width="300px"
      height="250px"
      :options="chartOptions"
      :series="series"
    >
    </apex-charts>
  </div>
</div>
</template>

<script>
import apexCharts from 'vue-apexcharts';

export default {
  name: "success-score-chart",
  components:{
    apexCharts
  },
  data(){
    return {
      chartOptions: {
        chart: {
          id: "basic-bar",
          type:"bar",
        },
        grid: {
          show: false,      // you can either change hear to disable all grids
        },
        dataLabels: {
          style: {
            colors: ["#212121"],
          },
          offsetX: 0,
          offsetY: -15,
        },
        xaxis: {
          categories: [
            ["Bookkeeping", "basics"],
            ["Business", "English"],
            ["Computer", "science"],
            ["Another", "test", "course"],
            ["The course", "you failed"],
          ],
          axisBorder: {
            show: true,
            color: "#212121",
            offsetX: 0,
            offsetY: 0,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            style: {
              colors: [],
              fontSize: '9px',
              fontWeight: 400,
            },

          },
        },
        yaxis: {
          show: false,
          axisTicks: {
            show: false,
          },
          crosshairs: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "70%",
            barHeight: "100%",
            colors: {
              ranges: [
                { from: 0, to: 40, color: "#fc6767" },
                { from: 41, to: 50, color: "#FF7700" },
                { from: 51, to: 100, color: "#193074" },
              ],
              backgroundBarOpacity: 1,
            },
            dataLabels: {
              position: "top",
              maxItems: 100,
              hideOverflowingLabels: true,
              orientation: "horizontal",
            },
          },
        },
      },
      series: [
        {
          name: "success rate",
          data: [30, 81, 71, 46, 50],
        },
      ],
    }
  }
}
</script>

<style scoped>

</style>