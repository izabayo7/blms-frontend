<template>
  <v-container fluid class="reset-password-page">
    <v-row>
      <v-col class="col-12 mx-auto col-md-6">
        <div v-if="password_reset" class="reset-password-box mx-auto text-center">
          <div class="heading">
            <div class="college-name">{{ institution }}.</div>
            <div class="welcome">Reset password</div>
            <form @submit.prevent="validate">
              <div class="label">Email</div>
              <div class="input-container disabled">
                <input
                    type="email"
                    placeholder="Email"
                    v-model="password_reset.user.email"
                    autocomplete="false"
                    disabled
                    class="wider"
                />
              </div>
              <div class="label">Choose A Password</div>
              <div class="input-container with_hint">
                <input
                    :type="`${showPassword1 ? 'text' : 'password'}`"
                    v-model="obj.new_password"
                    @input="validatePassword"
                    autocomplete="false"
                    class="wider"
                    required
                />
                <div class="input-icon" @click="showPassword1 = !showPassword1">
                  <svg
                      v-if="!showPassword1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path
                        d="M12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9C2.121 6.88 6.608 3 12 3zm0 16a9.005 9.005 0 0 0 8.777-7 9.005 9.005 0 0 0-17.554 0A9.005 9.005 0 0 0 12 19zm0-2.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"
                    />
                  </svg>
                  <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path
                        d="M17.882 19.297A10.949 10.949 0 0 1 12 21c-5.392 0-9.878-3.88-10.819-9a10.982 10.982 0 0 1 3.34-6.066L1.392 2.808l1.415-1.415 19.799 19.8-1.415 1.414-3.31-3.31zM5.935 7.35A8.965 8.965 0 0 0 3.223 12a9.005 9.005 0 0 0 13.201 5.838l-2.028-2.028A4.5 4.5 0 0 1 8.19 9.604L5.935 7.35zm6.979 6.978l-3.242-3.242a2.5 2.5 0 0 0 3.241 3.241zm7.893 2.264l-1.431-1.43A8.935 8.935 0 0 0 20.777 12 9.005 9.005 0 0 0 9.552 5.338L7.974 3.76C9.221 3.27 10.58 3 12 3c5.392 0 9.878 3.88 10.819 9a10.947 10.947 0 0 1-2.012 4.592zm-9.084-9.084a4.5 4.5 0 0 1 4.769 4.769l-4.77-4.769z"
                    />
                  </svg>
                </div>
              </div>
              <div class="label hint">
                {{ errors.passwordError }}
              </div>
              <div class="label">Confirm Password</div>
              <div class="input-container with_hint">
                <input
                    :type="`${showPassword2 ? 'text' : 'password'}`"
                    v-model="obj.confirm_password"
                    autocomplete="false"
                    class="wider"
                    @input="validateConfirmPassword"
                    required
                />
                <div class="input-icon" @click="showPassword2 = !showPassword2">
                  <svg
                      v-if="!showPassword2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path
                        d="M12 3c5.392 0 9.878 3.88 10.819 9-.94 5.12-5.427 9-10.819 9-5.392 0-9.878-3.88-10.819-9C2.121 6.88 6.608 3 12 3zm0 16a9.005 9.005 0 0 0 8.777-7 9.005 9.005 0 0 0-17.554 0A9.005 9.005 0 0 0 12 19zm0-2.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"
                    />
                  </svg>
                  <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path
                        d="M17.882 19.297A10.949 10.949 0 0 1 12 21c-5.392 0-9.878-3.88-10.819-9a10.982 10.982 0 0 1 3.34-6.066L1.392 2.808l1.415-1.415 19.799 19.8-1.415 1.414-3.31-3.31zM5.935 7.35A8.965 8.965 0 0 0 3.223 12a9.005 9.005 0 0 0 13.201 5.838l-2.028-2.028A4.5 4.5 0 0 1 8.19 9.604L5.935 7.35zm6.979 6.978l-3.242-3.242a2.5 2.5 0 0 0 3.241 3.241zm7.893 2.264l-1.431-1.43A8.935 8.935 0 0 0 20.777 12 9.005 9.005 0 0 0 9.552 5.338L7.974 3.76C9.221 3.27 10.58 3 12 3c5.392 0 9.878 3.88 10.819 9a10.947 10.947 0 0 1-2.012 4.592zm-9.084-9.084a4.5 4.5 0 0 1 4.769 4.769l-4.77-4.769z"
                    />
                  </svg>
                </div>
              </div>
              <div class="label hint">
                {{ errors.confirmPasswordError }}
              </div>
              <button class="login-button">UPDATE PASSWORD</button>
            </form>
            <div class="lower-message">
              <div class="message-row">
                Remembered your password ?
                <router-link to="/login">login</router-link>
              </div>
            </div>
          </div>
          <div class="message" v-show="message !== ''">
            <svg
                width="14"
                height="15"
                viewBox="0 0 13 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M12 1L1.48047 13.71"
                  stroke="#8B601F"
                  stroke-linecap="round"
                  stroke-linejoin="round"
              />
              <path
                  d="M1.48047 1L12 13.71"
                  stroke="#8B601F"
                  stroke-linecap="round"
                  stroke-linejoin="round"
              />
            </svg>

            {{ message }}
          </div>
        </div>
        <div v-else class="reset-password-box mx-auto d-flex align-center justify-center">
          {{ message }}
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
    showPassword1: false,
    showPassword2: false,
    message: "",
    image: "https://apis.kurious.rw/assets/images/image%204.png",
    institution: "Kurious Learn",
    obj: {
      email: "",
    },
    password_reset: undefined,
    errors: {
      passwordError: "",
      confirmPasswordError: ""
    },
  }),
  watch: {
    message() {
      setTimeout(() => {
        this.message = "";
      }, 10000);
    },
  },
  methods: {
    // validate the form
    validate() {
      if (this.errors.passwordError === "" && this.errors.confirmPasswordError === "") {
        this.updatePasswordReset();
      }
    },
    validateConfirmPassword() {
      const str = this.obj.confirm_password
      if (str.length)
        if (this.obj.new_password === str)
          this.errors.confirmPasswordError = ""
        else
          this.errors.confirmPasswordError = "Passwords must match"
      else
        this.errors.confirmPasswordError = "Confirmation password is required"
    },
    validatePassword() {
      const str = this.obj.new_password
      if (!str.length)
        return this.errors.passwordError = "password is required"

      if (!/^(?=.*[a-z])/.test(str))
        return this.errors.passwordError = "password must contain a lowercase letter"
      if (!/^(?=.*[A-Z])/.test(str))
        return this.errors.passwordError = "password must contain an uppercase letter"
      if (!/^(?=.*[0-9])/.test(str))
        return this.errors.passwordError = "password must contain a number"
      if (!/^(?=.{8,})/.test(str))
        return this.errors.passwordError = "password must have atleast 8 characters"

      this.errors.passwordError = ""
    },
    async updatePasswordReset() {
      try {
        // call the login api
        let response = await Apis.update("reset_password", "", {
          email: this.password_reset.user.email,
          token: this.$route.query.token,
          password: this.obj.new_password,
        });

        if (response.data.status !== 200) {
          this.valid = false;
          this.message = response.data.message;
        } else {
          this.valid = true;
          this.message = response.data.message + ", you can now login.";
          setTimeout(() => {
            this.$router.push("/login");
          }, 3000);
        }
      } catch (error) {
        this.valid = false;
        this.message = "Service Unavailable";
      }
    },
  },
  async beforeMount() {
    if (this.$route.query.token) {
      const res = await Apis.get(`reset_password/${this.$route.query.token}`);
      if (res.data.data) {
        this.password_reset = res.data.data;
      } else {
        this.message = res.data.message
      }
      if (this.$route.query.institution) {
        this.institution = this.$route.query.institution;
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
      height: 60%;
      padding-top: 10px;
      justify-content: center;
    }

    .message {
      width: 413px;
      height: 53px;
      left: 476px;
      top: 188px;
      position: absolute;
      background-color: #ffae34;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
      border-radius: 4px;
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 15px;
      line-height: 15px;
      /* or 99% */

      text-align: center;

      color: #8b601f;

      svg {
        position: absolute;
        width: 4.97px;
        height: 6px;
        right: 15px;
        top: 14px;
      }
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
      margin: 11px auto 15px;
      color: #bababc;
    }

    .logo {
      margin-top: 19px;
      max-width: 100%;
      max-height: 73px;
    }

    // .message {
    //   font-style: normal;
    //   font-weight: normal;
    //   font-size: 13px;
    //   display: flex;
    //   align-items: center;
    //   justify-content: center;
    //   color: #000000;
    //   background: inherit;
    //   margin: 13px auto;
    //   padding: 0;
    // }
    .label {
      text-align: left;
      font-family: Inter;
      font-style: normal;
      font-weight: 500;
      font-size: 11px;
      color: #6a6a6a;
      margin-left: 0.6rem;
    }

    .input {
      &-container {
        max-width: 299px;
        height: 36px;
        margin: 5px auto 24px;
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

          &.wider {
            width: 82%;
          }
        }

        &.disabled {
          background-color: #eeeeee;

          input {
            color: #6a6a6a;
          }

          border: none;
          font-family: Inter;
          font-style: normal;
          padding-left: 14px;
          font-weight: normal;
          font-size: 11.3404px;
        }

        &.with_hint {
          margin: 5px auto 5px;
        }
      }

      &-icon {
        padding: 5px 20px 10px 20px;

        svg {
          fill: #bababc;
        }
      }
    }

    .hint {
      margin-bottom: 19px;
      color: red;
    }

    .login-button {
      max-width: 177px;
      width: 100%;
      height: 46.25px;
      margin: 8px;
      margin-bottom: 30px;
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
      align-items: baseline;

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