<template>
  <v-container fluid class="login-page">
    <v-row>
      <!-- the side of image -->
      <v-col cols="12" md="6" class="image-side">
        <h2 class="headline">KURIOUS.</h2>
        <v-img height="550px" :src="require('@/assets/images/image1.png')" class="welcome-image" />
      </v-col>
      <!-- the side of the form -->
      <v-col cols="12" md="6" class="login-side">
        <v-form ref="loginForm" v-model="valid" class="login-form" @submit.prevent="validate()">
          <h1>Welcome Back,</h1>
          <h3>Login To Continue</h3>
          <v-text-field
              v-model="email"
              required
              :rules="emailRules"
              placeholder="Example@gmail.com"
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
          <v-select
              class="text-field"
              v-model="userCategory"
              :items="userCategories"
              :rules="simpleRules"
              prefix="Login as "
              solo
          ></v-select>
          <router-link to="/recover-password" class="forgot-pass">Forgot Password?</router-link>
          <v-btn class="login-btn" type="submit">Login</v-btn>
        </v-form>
      </v-col>
    </v-row>
    <!-- the dialog for messages -->
    <kurious-dialog :show="show" :message="message" :status="status">
      <v-icon slot="icon" size="55" dark>mdi-barley</v-icon>
    </kurious-dialog>
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
    message: "",
    userCategory: "",
    email: "",
    showPassword: false,
    show: false,
    status: 200,
    userCategories: ["Student", "Instructor", "Admin", "Super admin"],
    emailRules: [
      (v) => !!v || "Email is required",
      (v) => /.+@.+/.test(v) || "Email must be valid",
    ],
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
        // format the user category
        this.userCategory = this.userCategory
            .toLowerCase()
            .split(" ")
            .join("-");
        const credentials = {
          email: this.email.toLowerCase(),
          password: this.password,
        };
        // call the login api
        let response = await Apis.login(this.userCategory, credentials);
        // set the token in axios headers
        axios.defaults.headers.common.Authorization = `${response.data}`;
        // start the session
        this.$session.start();
        // set the token in the session
        this.$session.set("jwt", response.data);
        // keep the decoded user in vuex
        this.$store.dispatch("user/setUser", jwt.decode(this.$session.get("jwt")));
        if (this.$route.query.redirect) {
          this.$router.push(this.$route.query.redirect);
        }
        // student and teacher land to courses
        else {
          if (
            this.userCategory === "student" ||
            this.userCategory === "instructor"
          ) {
            this.$router.push("/courses");
          }
          // others land to the dashboard
          else if (this.userCategory === "admin") {
            this.$router.push("/users");
          }
        }
      } catch (error) {
        console.log(error)
        // handle errors
        // the server responded
        if (error.response) {
          this.status = error.response.status;
          this.message = error.response.data;
        }
        // the server didn't respond
        else if (error.request) {
          this.status = 503;
          this.message = "Service Unavailable";
        }
        this.show = true;
        // hide the message after 3seconds
        setTimeout(() => {
          this.show = false;
        }, 3000);
      }
    },
  },
};
</script>
