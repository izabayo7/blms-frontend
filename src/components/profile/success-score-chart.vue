<template>
<div class="ssc">
  <div class="ssc--wrapper">
    <apex-charts
      type="bar"
      class="my-chart ml-n6"
      width="390px"
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
        },
        dataLabels: {
          style: {
            colors: ["black"],
          },
          offsetX: 0,
          offsetY: -30,
        },
        xaxis: {
          categories: [
            ["Bookkeeping", "basics"],
            ["Business", "English"],
            ["Computer", "science"],
            ["Another", "test", "course"],
            ["The course", "you failed"],
          ],
        },

        //end;
        yaxis: {
          show: false,
          max: 100,
        },
        //end
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "70%",
            barHeight: "80%",
            colors: {
              ranges: [
                { from: 0, to: 40, color: "#fc6767" },
                { from: 41, to: 50, color: "#FF7700" },
              ],
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
          name: "series-1",
          data: [30, 81, 71, 46, 50],
        },
      ],
    }
  }
}
</script>

<style scoped>

</style>