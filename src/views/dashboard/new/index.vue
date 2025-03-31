<template>
  <v-container fluid class="dashboard_page px-6 px-lg-14 pt-9">
    <v-row class="page_title">
      <div class="upper">Dashboard</div>
      <div class="lower" @click="showInviteUsers = true">Overview</div>
    </v-row>
    <v-row class="mt-6 px-4">
      <div class="v-col col-12 col-md-4 pa-0">
        <div class="row">
          <div class="v-col col-12 pa-0">
            <div class="college_info">
              <svg
                width="17"
                height="13"
                viewBox="0 0 17 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.39659 7.02735V9.64482L8.63995 12.1445L13.8833 9.64482V7.02735L8.63995 9.52703L3.39659 7.02735ZM8.63995 0.365906L0.400391 4.2921L8.63995 8.2183L15.3814 5.00536V9.52703H16.8795V4.2921L8.63995 0.365906Z"
                  fill="#FF7700"
                />
              </svg>
              <div class="college_name">University of Kicukiro</div>
              <div class="lower_content">
                <div class="number_of_users">268 Users</div>
                <div class="account_type">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.30346 0.242859L0.936523 2.74135V6.48908C0.936523 9.95573 3.65308 13.1975 7.30346 13.9845C10.9538 13.1975 13.6704 9.95573 13.6704 6.48908V2.74135L7.30346 0.242859ZM5.88858 10.2368L3.05883 7.73832L4.05632 6.85761L5.88858 8.46913L10.5506 4.35287L11.5481 5.23984L5.88858 10.2368Z"
                      fill="#1B998B"
                    />
                  </svg>
                  <div class="text">Premium Account</div>
                </div>
              </div>
            </div>
          </div>
          <div class="v-col col-12 pa-0 mt-5">
            <div class="row ml-0 more_info_container">
              <div class="v-col col-4 pa-0">
                <div class="more_info">
                  <svg
                    width="27"
                    height="21"
                    viewBox="0 0 27 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="19.8789"
                      y="5.94427"
                      width="5.14918"
                      height="5.14918"
                      rx="2.57459"
                      fill="#FFAE34"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M18.0552 15.8748H26.8521C26.6652 13.6094 24.7673 11.8291 22.4537 11.8291C20.14 11.8291 18.2421 13.6094 18.0552 15.8748Z"
                      fill="#FFAE34"
                    />
                    <rect
                      x="14.73"
                      y="0.427307"
                      width="5.14918"
                      height="5.14918"
                      rx="2.57459"
                      fill="#FFAE34"
                    />
                    <rect
                      x="7.74121"
                      y="0.427307"
                      width="5.14918"
                      height="5.14918"
                      rx="2.57459"
                      fill="#FFAE34"
                    />
                    <rect
                      x="2.22461"
                      y="5.94427"
                      width="5.14918"
                      height="5.14918"
                      rx="2.57459"
                      fill="#FFAE34"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.400879 15.8748H9.19783C9.01093 13.6094 7.11305 11.8291 4.79936 11.8291C2.48566 11.8291 0.587781 13.6094 0.400879 15.8748Z"
                      fill="#FFAE34"
                    />
                    <rect
                      x="11.0522"
                      y="10.7257"
                      width="5.14918"
                      height="5.14918"
                      rx="2.57459"
                      fill="#FFAE34"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.22705 20.6562H18.024C17.8371 18.3908 15.9392 16.6105 13.6255 16.6105C11.3118 16.6105 9.41395 18.3908 9.22705 20.6562Z"
                      fill="#FFAE34"
                    />
                  </svg>

                  <div class="total_number">4</div>
                  <div class="description">number of faculties</div>
                </div>
              </div>
              <div class="v-col col-4 pa-0">
                <div class="more_info">
                  <svg
                    width="18"
                    height="19"
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="1.33008"
                      y="0.44046"
                      width="3.58306"
                      height="3.58306"
                      rx="1.79153"
                      fill="#FFAE34"
                    />
                    <path
                      d="M0.84082 8.17662V17.3786C0.84082 18.4372 2.46949 18.3558 2.46949 17.3786C2.44235 16.6728 2.40435 13.6815 2.46949 12.574C2.53464 11.4665 3.93529 11.4339 3.93529 12.574C3.90814 13.5783 3.87014 15.8965 3.93529 17.1343C4.00043 18.372 5.48252 18.3558 5.48252 16.9714V9.56098C5.48252 8.58378 5.23822 7.52515 5.97112 7.52515H9.14701C10.1893 7.52515 10.3414 6.05936 9.14701 6.05936H2.7952C0.84082 6.05936 0.84082 6.87368 0.84082 8.17659V8.17662Z"
                      fill="#FFAE34"
                    />
                    <path
                      d="M17.6161 1.74338V12.4111H13.1373L14.6845 18.2743H13.1373L11.8344 12.4111H10.2872L8.90279 18.2743H7.35556L8.82136 12.4111H6.7041V10.701H15.9875V3.20918H6.86696V1.74338H10.0429V1.09192H11.5086V1.74338H17.6161Z"
                      fill="#FFAE34"
                    />
                  </svg>
                  <div class="total_number">4</div>
                  <div class="description">Student groups</div>
                </div>
              </div>
              <div class="v-col col-4 pa-0">
                <div class="more_info">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.9048 26.5095L15.2727 19.8315L7.64062 26.5095V5.52136C7.64062 4.46718 8.49446 3.61334 9.54864 3.61334H20.9967C22.0509 3.61334 22.9048 4.46718 22.9048 5.52136V26.5095Z"
                      fill="#FFAE34"
                    />
                  </svg>

                  <div class="total_number">4</div>
                  <div class="description">number of courses</div>
                </div>
              </div>
            </div>
          </div>
          <v-col class="col-12 mt-5 pl-0">
            <div class="heading">Recently joined users</div>
            <div class="recent mt-5">
              <div class="record">
                <div class="name">Manzi gustave</div>
                <div class="category">Instructor</div>
                <div class="time">2 minutes ago</div>
              </div>
              <div class="record">
                <div class="name">Mukamana Goreth</div>
                <div class="category">Student</div>
                <div class="time">2 weeks a go</div>
              </div>
            </div>
          </v-col>
          <v-col class="col-12 mt-5 pl-0">
            <div class="more">More ...</div>
            <div class="mt-5">
              <button class="lower_buttons mr-2">Close</button>
              <button class="lower_buttons">New Faculty</button>
            </div>
          </v-col>
        </div>
      </div>
      <div class="v-col col-8">
        <v-row class="pa-4">
          <v-col class="col-6">
            <div class="small-card">
              <div class="d-flex">
                <div class="icon">
                  <svg
                    width="16"
                    height="18"
                    viewBox="0 0 16 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="3.41162"
                      y="0.23822"
                      width="8.82547"
                      height="8.82547"
                      rx="4.41274"
                      fill="#FFAE34"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.285645 17.2588H15.3632C15.0429 13.3758 11.79 10.3245 7.82444 10.3245C3.85886 10.3245 0.605977 13.3758 0.285645 17.2588Z"
                      fill="#FFAE34"
                    />
                  </svg>
                </div>
                <div class="top-blocks">
                  <div class="inner">Instuctors</div>
                  <div class="inner">Students</div>
                  <div class="inner">Staff</div>
                </div>
              </div>
              <!-- <chart
                type="donut"
                width="380"
                :options="chartOptions"
                :series="series"
              ></chart> -->
            </div>
          </v-col>
          <v-col class="col-6">
            <div class="small-card">
              <svg
                width="21"
                height="22"
                viewBox="0 0 21 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.644531"
                  y="0.0536499"
                  width="4.3645"
                  height="4.3645"
                  rx="2.18225"
                  fill="#FFAE34"
                />
                <path
                  d="M0.0488281 9.477V20.6858C0.0488281 21.9753 2.0327 21.8761 2.0327 20.6858C1.99964 19.8262 1.95335 16.1825 2.0327 14.8334C2.11206 13.4844 3.81818 13.4447 3.81818 14.8334C3.78512 16.0568 3.73883 18.8805 3.81818 20.3883C3.89754 21.896 5.70285 21.8761 5.70285 20.1899V11.1633C5.70285 9.97297 5.40527 8.68346 6.29801 8.68346H10.1665C11.4362 8.68346 11.6214 6.89798 10.1665 6.89798H2.42945C0.0488313 6.89798 0.0488301 7.8899 0.0488281 9.47697V9.477Z"
                  fill="#FFAE34"
                />
                <path
                  d="M20.4828 1.64074V14.635H15.0272L16.9118 21.777H15.0272L13.4401 14.635H11.5554L9.86913 21.777H7.98446L9.76993 14.635H7.19092V12.552H18.4989V3.42622H7.3893V1.64074H11.2578V0.847198H13.0433V1.64074H20.4828Z"
                  fill="#FFAE34"
                />
              </svg>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-row>
    <invite-users-dialog
      v-if="showInviteUsers"
      @closeModal="showInviteUsers = false"
    />
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
// import Apexcharts from "vue-apexcharts";
export default {
  name: "ApplicationDashboard",
  data: () => ({
    showInviteUsers: false,
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
        offsetY: 0,
        height: 230,
      },
    },
  }),
  components: {
    InviteUsersDialog: () => import("@/components/dashboard/InviteUsersDialog"),
    // chart: Apexcharts,
  },
  methods: {
    ...mapActions("modal", ["set_modal"]),
  },
  beforeMount() {},
};
</script>

<style lang="scss">
@font-face {
  font-family: "Inter";
  src: local("Inter"),
    url(http://localhost:7070/assets/fonts/Inter/Inter-VariableFont_slnt\,wght.ttf)
      format("truetype");
}
.dashboard_page {
  background-color: #f3f6ff;
  min-height: 50em;
  height: 10em;
  .page_title {
    display: block;
    .upper {
      font-family: Inter;
      font-size: 17px;
      font-style: normal;
      font-weight: 500;
      line-height: 13px;
      letter-spacing: 0em;
      text-align: left;
      color: #343434;
      margin-bottom: 15px;
    }
    .lower {
      font-family: Inter;
      font-style: normal;
      font-weight: 600;
      font-size: 24.8244px;
      line-height: 13px;
      /* identical to box height, or 53% */

      color: #343434;
    }
  }
  .more_info_container {
    max-width: 358.8px;
  }
  .college_info {
    max-width: 358.8px;
    // width: 100%;
    left: 159px;
    background: #ffffff;
    box-shadow: 0px 5.79235px 13.2397px rgba(180, 180, 180, 0.25);
    border-radius: 4.13739px;
    padding: 17.38px 13.05px 9.1px 19.65px;
    .college_name {
      font-family: Inter;
      font-style: normal;
      font-weight: bold;
      font-size: 20.687px;
      line-height: 28px;
      display: flex;
      align-items: center;

      color: #193074;
      margin-bottom: 50.48px;
    }
    .lower_content {
      display: flex;
    }
    .number_of_users {
      font-family: Inter;
      font-style: normal;
      font-weight: 500;
      font-size: 12.4122px;
      width: 60%;

      display: flex;
      align-items: center;
      text-align: center;

      color: #3c3c3c;
    }
    .account_type {
      display: flex;
      .text {
        font-family: Inter;
        font-style: normal;
        font-weight: 500;
        font-size: 11.4122px;
        margin-left: 6px;

        display: flex;
        align-items: center;
        text-align: center;

        color: #3c3c3c;
      }
    }
  }
  .more_info {
    width: 111.01px;
    height: 89.8px;
    background: #ffffff;
    box-shadow: 0px 5.79235px 9.92974px rgba(156, 156, 156, 0.25);
    border-radius: 4.13739px;
    padding: 8px;

    .total_number {
      height: 49.34px;
      width: 100%;
      font-family: Inter;
      font-style: normal;
      font-weight: bold;
      font-size: 33.0991px;
      margin-top: -20px;
      display: flex;
      justify-content: center;

      color: #000000;
    }
    .description {
      width: 99.66px;
      height: 34.54px;
      left: calc(50% - 99.66px / 2 - 469.23px);
      top: 369.06px;

      font-family: Inter;
      font-style: normal;
      font-weight: 500;
      font-size: 9.27479px;
      text-align: center;

      color: #3c3c3c;
    }
  }
  .heading {
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    line-height: 4px;
    color: #343434;
  }
  .recent {
    width: 358px;
    height: 77px;
    background: #ffffff;
    box-shadow: 0px 5.9px 13.2px rgba(0, 0, 0, 0.1);
  }
  .record {
    display: flex;
    padding: 12px;
    justify-content: space-between;
    .name {
      font-family: Inter;
      font-style: normal;
      font-weight: bold;
      font-size: 12.4122px;
      color: #000000;
      flex: 1;
    }
    .category {
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 12.4122px;
      color: #000000;
      flex: 1;
    }
    .time {
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 12.4122px;
      color: #000000;
      flex: 1;
    }
  }
  .more {
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 12.4122px;
    line-height: 4px;
    /* identical to box height, or 33% */
    text-align: right;
    max-width: 310.8px;
    color: #193074;
  }
  .lower_buttons {
    width: 153.91px;
    height: 43.86px;
    left: calc(50% - 153.91px / 2 - 448.04px);
    top: calc(50% - 43.86px / 2 + 231.49px);

    background: #193074;
    box-shadow: 0px 5.79235px 11.5847px rgba(147, 147, 147, 0.25);
    border-radius: 2.48244px;

    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 13.2397px;
    /* identical to box height, or 150% */

    color: #ffffff;
  }
  .small-card {
    max-width: 359.95px;

    height: 199.2px;
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
  }
}
</style>