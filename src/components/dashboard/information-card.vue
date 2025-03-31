<template>
  <div class="small-card">
    <div class="d-flex">
      <div class="icon">
        <slot name="icon" />
      </div>
      <div class="top-blocks">
        <div class="inner">Instuctors</div>
        <div class="inner">Students</div>
        <div class="inner">Staff</div>
      </div>
    </div>
    <div class="statistics mt-3">
      <div class="combined">
        <div class="chat">
          <chart
            type="donut"
            class="my-chart ml-n6"
            width="150"
            :options="chartOptions"
            :series="series"
          ></chart>
        </div>
        <div class="total mt-n4">56</div>
        <div class="label">Total number of users</div>
      </div>
      <div class="details mt-4">
        <div class="element">
          <div class="label">
            <div class="text">Instuctors:</div>
            <div class="numb ml-2">26</div>
          </div>
          <div class="progress mt-n5 mb-4">
            <v-progress-linear
              :active="false"
              :value="26"
              class="mt-6 progressbar reports yellow"
            />
          </div>
        </div>
        <div class="element">
          <div class="label">
            <div class="text">Students:</div>
            <div class="numb ml-2">36</div>
          </div>
          <div class="progress mt-n5 mb-4">
            <v-progress-linear
              :active="false"
              :value="36"
              class="mt-6 progressbar reports blue"
            />
          </div>
        </div>
        <div class="element">
          <div class="label">
            <div class="text">Staff:</div>
            <div class="numb ml-2">12</div>
          </div>
          <div class="progress mt-n5 mb-4">
            <v-progress-linear
              :active="false"
              :value="12"
              class="mt-6 progressbar reports red"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Apexcharts from "vue-apexcharts";
export default {
  data: () => ({
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
    chart: Apexcharts,
  },
};
</script>

<style lang="scss">
.small-card {
  max-width: 359.95px;
  left: 0px;
  top: 0px;

  background: #ffffff;
  box-shadow: 0px 7.44731px 12.4122px rgba(180, 180, 180, 0.25);
  border-radius: 4.13739px;
  padding: 14px 30px;
  .d-flex {
    max-width: 100%;
    .icon {
      width: 30%;
    }
  }
  .top-blocks {
    border: 0.827479px solid #dedede;
    max-width: 70%;
    display: flex;
    .inner {
      width: 201.09px;
      height: 22.95px;

      border-left: 0.827479px solid #dedede;
      box-sizing: border-box;
      border-radius: 1.65496px;
      font-family: Inter;
      font-style: normal;
      font-weight: 500;
      font-size: 10.7572px;
      text-align: center;
      padding-top: 4px;
      align-items: center;

      color: #515151;
    }
  }
  .statistics {
    display: flex;
    .total {
      font-family: Inter;
      font-size: 41px;
      font-style: normal;
      font-weight: 700;
      letter-spacing: 0em;
      text-align: left;
    }
    .label {
      font-family: Inter;
      font-size: 10px;
      font-style: normal;
      font-weight: 700;
      letter-spacing: 0em;
      text-align: left;
    }
    .details {
      width: 50%;
      .label {
        display: flex;
        .text {
          font-family: Inter;
          font-size: 11px;
          font-style: normal;
          font-weight: 400;
          letter-spacing: 0em;
          text-align: left;
        }
        .numb {
          font-family: Inter;
          font-size: 12px;
          font-style: normal;
          font-weight: 700;
          letter-spacing: 0em;
          text-align: left;
        }
      }
    }
    .progress {
      &bar {
        border-radius: 20px !important;
        height: 7px !important;
        width: 87%;
        .v-progress-linear__background {
          background: #dedede !important;
          &[style] {
            opacity: 1 !important;
          }
        }
        &.yellow {
          .v-progress-linear__determinate {
            background: #ffae34 !important;
          }
        }
        &.blue {
          .v-progress-linear__determinate {
            background: #193074 !important;
          }
        }
        &.red {
          .v-progress-linear__determinate {
            background: #ff0808 !important;
          }
        }
      }
    }
  }
}
</style>