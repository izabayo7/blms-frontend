<template>
  <v-container fluid class="login-page">
    <v-row>
      <!-- the side of image -->
      <v-col cols="12" md="6" class="image-side">
        <h2 class="headline">KURIOUS.</h2>
        <v-img
          height="550px"
          :src="require('@/assets/images/image1.png')"
          class="welcome-image"
        />
      </v-col>
      <!-- the side of the form -->
      <v-col cols="12" md="6" class="login-side">
        <v-form
          ref="loginForm"
          v-model="valid"
          class="login-form"
          @submit.prevent="validate()"
        >
          <h1>Welcome Back,</h1>
          <h3>Login To Continue</h3>
          <v-text-field
            v-model="email_user_name_or_phone"
            required
            :rules="simpleRules"
            placeholder="email, username or phone"
            class="text-field"
            solo
          />
          <v-text-field
            v-model="password"
            required
            color="#ffc100"
            placeholder="Password"
            class="text-field"
            :rules="simpleRules"
            solo
            @click:append="showPassword = !showPassword"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
          />
          <router-link to="/recover-password" class="forgot-pass"
            >Forgot Password?</router-link
          >
          <v-btn class="login-btn" type="submit">Login</v-btn>
        </v-form>
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
    email_user_name_or_phone: "",
    showPassword: false,
    password: "",
    simpleRules: [(v) => !!v || "This Field is required"],
  }),
  methods: {
    // validate the form
    validate() {
      if (this.$refs.loginForm.validate()) {
        this.login();
      }
    },
    async login() {
      try {
        const credentials = {
          email_user_name_or_phone: this.email_user_name_or_phone.toLowerCase(),
          password: this.password,
        };
        // call the login api
        let response = await Apis.login(credentials);

        if (response.data.status == 200) {
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
            if (category === "STUDENT" || category === "INSTRUCTOR") {
              this.$router.push("/courses");
            }
            // others land to the dashboard
            else if (category === "ADMIN") {
              this.$router.push("/administration");
            }
          }
        } else {
          this.$store.dispatch("modal/set_modal", {
            template: "display_information",
            message: response.data.message,
            closable: true,
          });
        }
      } catch (error) {
        // handle errors
        // the server responded
        if (error.response) {
          this.$store.dispatch("modal/set_modal", {
            template: "display_information",
            message: error.response.data,
            closable: true,
          });
        }
        // the server didn't respond
        else if (error.request) {
          this.$store.dispatch("modal/set_modal", {
            template: "display_information",
            message: "Service Unavailable",
            closable: true,
          });
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.login-page {
  height: 620px;
  overflow-y: hidden;
}

.headline {
  font-weight: 900;
}

.login-form {
  margin: 4em 90px;

  h1 {
    font-size: 40px;
    font-weight: 200;
  }

  h3 {
    margin: 5px 13px 2em 0;
    color: #8b8b8b;
    font-weight: 200;
    font-size: 25px;
  }

  .text-field {
    width: 75%;
  }

  .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
    > .v-input__control
    > .v-input__slot {
    box-shadow: 0 9px 18px rgba(123, 123, 123, 0.16) !important;
    height: 55px;
    font-size: 16px;
  }

  .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
    > .v-input__control
    > .v-input__slot:focus-within {
    border-left: 8px solid #ffc100;
  }

  .forgot-pass {
    text-decoration: none;
    color: #ffc100;
    display: block;
    font-size: 20px;
    margin-bottom: 1em;
    // font-weight: bold;
  }

  .login-btn {
    width: 75%;
    background-color: #ffc100 !important;
    color: #fff;
    text-transform: none;
    margin: 0px !important;
  }

  .v-btn--contained {
    box-shadow: 0 9px 20px rgba(255, 193, 0, 0.44) !important;
  }

  .v-btn:not(.v-btn--round).v-size--default {
    height: 50px;
  }

  .v-btn.v-size--default,
  .v-btn.v-size--large {
    font-size: 20px;
  }
}

@media (max-width: 1200px) {
  .login-page .v-image__image--cover {
    background-size: 100% 100%;
    /* margin-top: -11em; */
  }
}

@media (max-width: 800px) {
  @media (min-width: 700px) {
    .login-page {
      height: 770px;
      overflow: hidden;
    }

    .login-page .v-image__image--cover {
      background-size: 70% 70%;
      margin-top: -10em;
    }

    .login-side {
      margin-top: 120px;
      margin-left: 215px;
    }
  }

  .image-side {
    height: 40px;

    h2 {
      display: none;
    }
  }

  .login-page .v-image__image--cover {
    background-size: 182px 163px;
    margin-top: -11em;
  }

  .login-form {
    margin-top: 120px;

    h1 {
      margin-left: -40px;
      width: 290px;
      font-size: 31px;
      font-weight: 600;
    }

    h3 {
      margin-left: -40px;
      margin-bottom: 2em;
      padding: 4px;
      width: 200px;
      color: #8b8b8b;
      font-weight: 400;
      font-size: 21px;
    }

    .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
      > .v-input__control
      > .v-input__slot {
      box-shadow: 0 9px 18px rgba(123, 123, 123, 0.16) !important;
      width: 300px;
      height: 45px;
      margin-left: -70px;
      font-size: 16px;
    }

    .v-btn:not(.v-btn--round).v-size--default {
      height: 45px;
    }

    .forgot-pass {
      margin: 0 -3em 1em;
      width: 200px;
    }

    .login-btn {
      width: 300px;
      margin-left: -70px;
    }
  }
}
</style>