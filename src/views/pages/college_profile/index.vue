<template>
  <div id="schoolProfile">
    <div :style="college.banner ? `background: linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8) ), url(${college.banner});`:''" class="header d-flex">
      <div class="header-content">
        <div class="logo">
          <img :src="college.logo" alt="colege logo" />
        </div>
        <div class="category">{{ college.category }}</div>
        <div class="connect">
          <button>
            <span>Whatsapp</span>
          </button>
        </div>
        <div class="login">
          <router-link to="/login">Login</router-link>
        </div>
      </div>
      <div class="header-content">
        <div class="welcome">WELCOME TO <br />{{ college.name }}</div>
        <div class="motto">
          {{ college.motto }}
        </div>
      </div>
    </div>
    <div class="courses-container"></div>
    <div class="details"></div>
    <div class="testimonials"></div>
    <div class="identity"></div>
    <div class="footer"></div>
  </div>
</template>

<script>
export default {
  name: "SchoolProfile",
  components: {
    // appDialog: () => import("@/components/shared/Dialog"),
  },
  data() {
    return {
      college: {
        banner: "https://i.ibb.co/sHhk01j/Rectangle-2988.png",
        logo: "https://i.ibb.co/2jk5mBD/ibtc-1.png",
        category: "Multimedia School",
        name: "IBTC FILM & DESIGN SCHOOL",
        motto:
          "You are one click away to update your skillset with our courses. check them out bellow.",
        phone: "+250791257065",
      },
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
#schoolProfile {
  .header {
    // background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 338px;
    .logo {
      width: 122px;
      height: 122px;

      background: #ffffff;
      border: 1px solid #c4c4c4;
      border-radius: 14px;

      display: flex;
      justify-content: center;
      align-items: center;
      margin: auto;
    }
    &-content {
      max-width: 445px;
      &:nth-child(1) {
        max-width: 193px;
        margin-right: 179px;
        text-align: center;
      }
    }
    .welcome {
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 700;
      font-size: 35px;
      line-height: 45px;

      /* or 129% */
      font-feature-settings: "liga" off;

      color: #fcfcfc;
    }
    .motto {
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 30px;

      /* or 167% */

      color: #d8d8d8;
    }
    .category {
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 30px;

      /* identical to box height, or 167% */

      color: #d8d8d8;
      margin-bottom: 21px;
    }
    .login {
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 30px;

      /* identical to box height, or 167% */

      color: #ffffff;
    }
    .connect {
      button {
        width: 193px;
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #3ce970;
        border-radius: 9px;
        font-family: "Montserrat";
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 30px;
        span {
          color: #ffffff;
        }
      }
    }
  }
}
</style>
