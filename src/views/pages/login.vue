<template>
  <v-container fluid class="login-page">
    <v-row>
      <v-col class="col-12 mx-auto col-md-6">
        <div class="login-box mx-auto text-center">
          <div class="heading">
            <div class="welcome">Welcome to</div>
            <div class="college-name">{{ institution }}.</div>
            <img v-if="!$route.query.institution || collegeHasLogo" :src="image" alt="" class="logo mx-auto"/>
            <div :class="`message ${valid ? '' : 'red--text'}`">
              {{ message }}
            </div>
            <form @submit.prevent="login">
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
                    type="text"
                    placeholder="Email or Username"
                    v-model="email_or_user_name"
                    autocomplete="false"
                    class="wide"
                    @keyup="validate"
                    required
                />
              </div>
              <div class="input-container">
                <div class="input-icon">
                  <svg
                      width="17"
                      height="18"
                      viewBox="0 0 17 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        d="M13.3001 8.2998H3.5001C2.7269 8.2998 2.1001 8.92661 2.1001 9.6998V14.5998C2.1001 15.373 2.7269 15.9998 3.5001 15.9998H13.3001C14.0733 15.9998 14.7001 15.373 14.7001 14.5998V9.6998C14.7001 8.92661 14.0733 8.2998 13.3001 8.2998Z"
                        stroke="#BABABC"
                        stroke-width="1.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M4.8999 8.3V5.5C4.8999 4.57174 5.26865 3.6815 5.92503 3.02513C6.58141 2.36875 7.47164 2 8.3999 2C9.32816 2 10.2184 2.36875 10.8748 3.02513C11.5312 3.6815 11.8999 4.57174 11.8999 5.5V8.3"
                        stroke="#BABABC"
                        stroke-width="1.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <input
                    :type="showPassword ? 'text' : 'password'"
                    v-model="password"
                    @keyup="validate"
                    autocomplete="false"
                    class="wide"
                    placeholder="Password"
                    required
                />
                <div class="input-icon vertically--centered">
                  <svg class="cursor-pointer" @click="showPassword = true" v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9C2.121 6.88 6.608 3 12 3zm0 16a9.005 9.005 0 0 0 8.777-7 9.005 9.005 0 0 0-17.554 0A9.005 9.005 0 0 0 12 19zm0-2.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" fill="rgba(186,186,188,1)"/></svg>
                  <svg class="cursor-pointer" @click="showPassword = false" v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M17.882 19.297A10.949 10.949 0 0 1 12 21c-5.392 0-9.878-3.88-10.819-9a10.982 10.982 0 0 1 3.34-6.066L1.392 2.808l1.415-1.415 19.799 19.8-1.415 1.414-3.31-3.31zM5.935 7.35A8.965 8.965 0 0 0 3.223 12a9.005 9.005 0 0 0 13.201 5.838l-2.028-2.028A4.5 4.5 0 0 1 8.19 9.604L5.935 7.35zm6.979 6.978l-3.242-3.242a2.5 2.5 0 0 0 3.241 3.241zm7.893 2.264l-1.431-1.43A8.935 8.935 0 0 0 20.777 12 9.005 9.005 0 0 0 9.552 5.338L7.974 3.76C9.221 3.27 10.58 3 12 3c5.392 0 9.878 3.88 10.819 9a10.947 10.947 0 0 1-2.012 4.592zm-9.084-9.084a4.5 4.5 0 0 1 4.769 4.769l-4.77-4.769z" fill="rgba(186,186,188,1)"/></svg>
                </div>
              </div>
<!--              <div class="input-container un_bordered">-->
<!--                <input type="checkbox"/>-->
<!--                <div class="text">Remember me</div>-->
<!--              </div>-->
              <button
                  :disabled="!valid"
                  :class="`login-button ${valid ? '' : 'disabled'}`"
              >
                LOGIN
              </button>
            </form>
            <div
                class="forgot-password mx-auto"
            >
              <router-link
                  :to="`/forgot_password${$route.query.institution ? '?institution='+$route.query.institution : ''}`"
              >
                Forgot password
              </router-link>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Apis from "@/services/apis";
import axios from "axios";
import jwt from "jsonwebtoken";

export default {
  name: "Login",
  data: () => ({
    valid: true,
    userCategory: "",
    email_or_user_name: "",
    showPassword: false,
    password: "",
    message: "Please login to continue",
    image: "https://apis.kurious.rw/assets/images/logo.png",
    collegeHasLogo: false,
    institution: "Kurious Learn Docker",
  }),
  methods: {
    // validate the form
    validate() {
      this.message =
          this.email_or_user_name.length < 3
              ? "username or email too short"
              : this.password.length == 0
              ? "Password is required"
              : this.password.length < 8
                  ? "Password too short"
                  : "Please login to continue";
      this.valid = this.message == "Please login to continue";
    },
    async login() {
      try {
        const credentials = {
          email_or_user_name: this.email_or_user_name,
          password: this.password,
        };
        // call the login api
        let response = await Apis.login(credentials);
        if (response.data.status != 200) {
          this.message = response.data.message;
          this.valid = false;
        } else {
          // set the token in axios headers
          axios.defaults.headers.common.Authorization = `Bearer ${response.data.data}`;
          // start the session
          this.$session.start();
          // set the token in the session
          this.$session.set("jwt", response.data.data);

          const user = await jwt.decode(this.$session.get("jwt"));
          const category = user.category.name;
          // keep the decoded user in vuex
          this.$store.dispatch("user/setUser", user);
          if (this.$route.query.redirect) {
            this.$router.push(this.$route.query.redirect);
          }
          // student and teacher land to courses
          else {
            if (category === "STUDENT") {
              this.$router.push("/courses");
            }
            // others land to the dashboard
            else if (category === "ADMIN" || category === "INSTRUCTOR") {
              this.$router.push("/welcome");
            }
          }
        }
      } catch (error) {
        this.message = "Service Unavailable";
        this.valid = false;
      }
    },
  },
  async beforeMount() {
    if (this.$route.query.institution) {
      const res = await Apis.get(
          `college/open/${this.$route.query.institution}`
      );
      if (res.data.status != 404) {
        this.institution = res.data.data.name
        if(res.data.data.logo)
        {
          this.collegeHasLogo = true
          this.image = res.data.data.logo;
        }
      } else {
        this.$router.push("/login");
      }
    }
  },
};
</script>

<style lang="scss">
.login {
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
    padding: 40px;
    text-align: center;
    font-family: Inter;

    .welcome {
      font-style: normal;
      font-weight: 300;
      font-size: 21.8152px;
      color: #000000;
    }

    .college-name {
      font-style: normal;
      font-weight: bold;
      font-size: 21.8152px;
      color: #000000;
    }

    .logo {
      margin-top: 19px;
      max-width: 100%;
      max-height: 73px;
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
        max-width: 350px;

        height: 36px;
        margin: 24px auto;
        border: 1.34978px solid #bababc;
        box-sizing: border-box;
        border-radius: 5px;
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
            font-size: 16px;
            line-height: 17px;
            text-align: center;

            color: #193074;
          }
        }

        input {
          font-family: Inter;
          font-style: normal;
          font-weight: normal;
          font-size: 13px;
          line-height: 21px;
          text-align: left;
          padding-left: 10px;
          color: black;

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
      max-width: 298.04px;
      width: 100%;
      height: 46.25px;
      left: 533.96px;
      top: 427px;
      margin: auto;
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
  }
}
</style>
