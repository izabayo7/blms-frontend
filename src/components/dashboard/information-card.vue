<template>
  <div class="small-card" :class="template + ' '+size">
    <div v-if="template === 'ADMIN'">
      <div class="d-flex">
        <div class="icon">
          <slot name="icon"/>
        </div>
        <div class="top-blocks">
          <div v-for="item in headers" :key="item" class="inner">{{ item }}</div>
        </div>
      </div>
      <div class="statistics mt-3">
        <div class="combined">
          <div class="chat">
            <chart
                type="donut"
                class="my-chart ml-n6"
                :width="size === 'small' ? 90 : 150"
                :options="chartOptions"
                :series="series"
            ></chart>
          </div>
          <div class="total mt-n4">{{ total }}</div>
          <div class="label">
            {{
              type == "users"
                  ? "Total number of users"
                  : "Total number of courses"
            }}
          </div>
        </div>
        <div :class="`details ${size === 'small' ? 'ml-auto' : 'mt-4'}`">
          <div class="element">
            <div class="label">
              <div class="text">{{ headers[0] }}:</div>
              <div class="numb ml-2">{{ series[0] }}</div>
            </div>
            <div class="progress mt-n5 mb-4">
              <v-progress-linear
                  :active="false"
                  :value="percent(series[0])"
                  class="mt-6 progressbar reports yellow"
              />
            </div>
          </div>
          <div class="element">
            <div class="label">
              <div class="text">{{ headers[1] }}:</div>
              <div class="numb ml-2">{{ series[1] }}</div>
            </div>
            <div class="progress mt-n5 mb-4">
              <v-progress-linear
                  :active="false"
                  :value="percent(series[1])"
                  class="mt-6 progressbar reports blue"
              />
            </div>
          </div>
          <div class="element">
            <div class="label">
              <div class="text">{{ headers[2] }}:</div>
              <div class="numb ml-2">{{ series[2] }}</div>
            </div>
            <div class="progress mt-n5 mb-4">
              <v-progress-linear
                  :active="false"
                  :value="percent(series[2])"
                  class="mt-6 progressbar reports red"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center" v-else-if="template === 'INSTRUCTOR'">
      <div class="start">{{ data.start }}</div>
      <div class="chart">
        <chart
            type="donut"
            class="my-chart"
            :class="{'ml-n6' : data === undefined}"
            width="100%"
            height="100%"
            :options="chartOptions"
            :series="[data.total,100-data.total]"
        ></chart>
      </div>
      <div class="end">{{ data.end }}</div>
    </div>
  </div>
</template>

<script>
import Apexcharts from "vue-apexcharts";

export default {
  props: {
    series: {
      type: Array,
    },
    template: {
      type: String,
      default: "ADMIN"
    },
    data: {
      type: Object
    },
    size: {
      type: String
    },
    width: {
      type: Number,
      default: 150
    },
    type: {
      type: String,
    },
    total: {
      type: Number,
    },
    labels: {
      type: Array
    },
    headers: {
      type: Array,
      required: false,
    },
  },
  methods: {
    percent(value, valuer = this.total) {
      return (value / valuer) * 100;
    },
  },
  data: () => ({
    chartOptions: {
      chart: {
        // width: 380,
        type: "donut",
      },
      plotOptions: {},
      dataLabels: {
        enabled: false,
      },
      colors: ["#ffae34", "#193074", "#ff0808"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            // chart: {
            //   width: 200,
            // },
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
  beforeMount() {
    if (this.labels)
      this.chartOptions.labels = this.labels
    if (this.data) {
      this.chartOptions.colors = this.data.colors
      // this.chartOptions.legend.show = true
      this.chartOptions.tooltip = {
        enabled: false
      }
      this.chartOptions.plotOptions.pie = {
        donut: {
          labels: {
            show: true,
            name:{
              show: false
            },
            total: {
              show: true,
              label: '',
              formatter: () => this.data.total + '%'
            },
          }
        }
      }
    }
  }
};
</script>

<style lang="scss">
.small-card {
  max-width: 350px;

  height: 229px;
  left: 0px;
  top: 0px;

  &.INSTRUCTOR {
    max-width: 217px;
    min-height: 197px;
    .chart{
      overflow: hidden;
      max-width: 100%;
      display: flex;
      justify-content: center;
      //display: none;
    }
  }

  background: #ffffff;
  box-shadow: 0px 7.44731px 12.4122px rgba(180, 180, 180, 0.25);
  border-radius: 4.13739px;
  padding: 14px 30px;

  .start {
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 11.0783px;
    line-height: 13px;
    /* identical to box height */


    color: #000000;
  }

  .chart {
    height: 100px;
    margin: 18px auto;
  }

  .end {
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 11.0783px;
    line-height: 13px;
    /* identical to box height */


    color: #000000;

  }

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
      min-height: 22.95px;

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

  &.small {
    max-width: 306px;
    height: 197px;
    padding: 14px 21px;

    .statistics {
      .label {
        font-size: 8px;
      }
    }

    .top-blocks {
      .inner {
        font-size: 8px;
      }
    }
  }
}

/* Portrait phones and smaller */
@media (max-width: 700px) {
  .small-card {
    &.INSTRUCTOR {
      height: 230px;
      padding: 14px 15px;
    }

    .chart {
      margin: 18px auto 45px;
    }

    max-width: 90% !important;
    margin: auto;
    height: fit-content;
  }
}
</style>