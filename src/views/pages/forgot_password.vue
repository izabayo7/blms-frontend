<template>
  <v-container fluid class="reset-password-page">
    <v-row>
      <v-col class="col-12 mx-auto col-md-6">
        <div class="reset-password-box mx-auto text-center">
          <div class="heading">
            <img :src="image" alt="" class="logo mx-auto" />
            <div class="college-name">{{ institution }}</div>
            <div class="welcome">Reset password</div>
            <form @submit.prevent="createPasswordReset">
              <div class="input-container">
                <div class="input-icon">
                  <svg
                    width="15"
                    height="18"
                    viewBox="0 0 15 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.8 16.1999V14.5999C13.8 13.7512 13.4629 12.9373 12.8627 12.3372C12.2626 11.737 11.4487 11.3999 10.6 11.3999H4.2C3.35131 11.3999 2.53737 11.737 1.93726 12.3372C1.33714 12.9373 1 13.7512 1 14.5999V16.1999"
                      stroke="#BABABC"
                      stroke-width="1.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M7.39995 8.1998C9.16726 8.1998 10.6 6.76712 10.6 4.9998C10.6 3.23249 9.16726 1.7998 7.39995 1.7998C5.63264 1.7998 4.19995 3.23249 4.19995 4.9998C4.19995 6.76712 5.63264 8.1998 7.39995 8.1998Z"
                      stroke="#BABABC"
                      stroke-width="1.8"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  v-model="email"
                  autocomplete="false"
                  class="wide"
                  required
                />
              </div>
              <div :class="`message ${valid ? 'green--text' : 'red--text'}`">
                {{ message }}
              </div>
              <button class="login-button">RESET PASSWORD</button>
            </form>
            <div class="lower-message">
              <div class="message-row">
                Don’t have an account contact us ?
                <router-link to="/register">Register</router-link>
              </div>
              <div class="message-row">
                Remembered your password ? <router-link to="/login" />
              </div>
              <div class="message-row">
                Having trouble resseting your password ?
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Apis from "@/services/apis";
export default {
  name: "Login",
  data: () => ({
    valid: true,
    email: "",
    message: "",
    image: "https://apis.kurious.rw/assets/images/image%204.png",
    institution: "Kurious Learn",
  }),
  methods: {
    async createPasswordReset() {
      try {
        // call the login api
        let response = await Apis.create("reset_password", {
          email: this.email,
        });

        if (response.data.status != 201) {
          this.valid = false;
          this.message = "Email is not registered";
        } else {
          this.valid = true;
          this.message = response.data.message + ", check your email.";
        }
      } catch (error) {
        this.valid = false;
        this.message = "Service Unavailable";
      }
    },
  },
  async beforeMount() {
    if (this.$route.query.institution) {
      const res = await Apis.get(
        `college/open/${this.$route.query.institution}`
      );
      if (res.data.status != 404) {
        this.institution = res.data.data.name;
        this.image = res.data.data.logo || this.image;
      } else {
        this.$router.push("/login");
      }
    }
  },
};
</script>

<style lang="scss">
.reset-password {
  &-page {
    background: radial-gradient(
      50% 50% at 50% 50%,
      #541974 0%,
      rgba(25, 48, 116, 0.96) 100%
    );
    height: 100vh;
  }
  &-box {
    max-width: 395px;
    width: 100%;
    height: 557px;
    left: 485px;
    margin-top: 54px;
    background-color: white;
    border-radius: 33px;
    padding: 30px 40px;
    text-align: center;
    font-family: Inter;
    form {
      height: 17rem;
      padding-top: 20px;
      // padding-bottom: 60px;
      justify-content: center;
    }
    .welcome {
      font-family: Inter;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      color: #3c3c3c;
    }
    .college-name {
      font-family: Inter;
      font-style: normal;
      font-weight: bold;
      font-size: 21.8152px;
      text-align: center;
      margin: 11px auto 6px;
      color: #bababc;
    }
    .logo {
      // margin-top: 19px;
      // max-width: 100%;
      // max-height: 73px;
      margin-top: 19px;
      max-width: 100%;
      max-height: 73px;
      object-fit: scale-down;
      min-height: 73px;
    }
    .message {
      font-style: normal;
      font-weight: normal;
      font-size: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #000000;
      background: inherit;
      margin: 13px auto;
      padding: 0;
    }
    .input {
      &-container {
        max-width: 299px;

        height: 36px;
        margin: 24px auto;
        border: 1.34978px solid #bababc;
        box-sizing: border-box;
        border-radius: 10px;
        display: flex;
        &.un_bordered {
          border: none;
          padding: 0 12px;
          margin: 0px auto;
          .text {
            margin: 0 12px;
            font-family: Inter;
            font-style: normal;
            font-weight: 500;
            font-size: 15px;
            line-height: 17px;
            text-align: center;

            color: #193074;
          }
        }
        input {
          font-family: Inter;
          font-style: normal;
          font-weight: normal;
          font-size: 11.3404px;
          line-height: 21px;
          text-align: left;
          padding-left: 10px;
          color: #ababab;
          &.wide {
            width: 70%;
          }
        }
      }
      &-icon {
        padding: 10px 20px 10px 20px;
      }
    }
    .login-button {
      max-width: 177px;
      width: 100%;
      height: 46.25px;
      margin: 8px;
      background: #193074;
      border-radius: 4.36304px;
      display: flex;
      justify-content: center;
      place-items: center;
      font-family: Inter;
      font-style: normal;
      font-weight: 500;
      font-size: 13.9617px;
      color: #ffffff;
    }
    .forgot-password {
      font-family: Inter;
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      text-align: center;
      margin-top: 10px;
      color: #193074;
    }
    .lower-message {
      // align-items: baseline;
      .message-row {
        font-family: Inter;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 17px;
        /* or 145% */

        text-align: center;

        color: #7c7c7c;
      }
    }
  }
}
</style>