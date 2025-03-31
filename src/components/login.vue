<template>
  <v-container fluid class="login-page">
    <v-row>
      <v-col cols="12" md="6" class="image-side">
        <h2 class="headline">KURIOUS.</h2>
        <v-img height="550px" :src="require('@/assets/images/image1.png')" class="welcome-image" />
      </v-col>
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
            type="password"
            placeholder="Password"
            class="text-field"
            :rules="passwordRules"
            solo
          />
          <router-link to="/recover-password" class="forgot-pass">Forgot Password?</router-link>
          <v-btn class="login-btn" @click.native="validate()" type="submit">Login</v-btn>
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
    message: "",
    email: "",
    emailRules: [
      (v) => !!v || "Email is required",
      (v) => /.+@.+/.test(v) || "Email must be valid",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      // v => (/([ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])/.test(v) && /(?=.*\d)/.test(v) && /(?=.*[A-Z])/.test(v) && /(?=.*[a-z])/.test(v)) || 'Password must contain uppercase characters, lowercase characters, numbers and symbols',
      // v => (v && v.length >= 8) || 'Password must atleast have 8 characters',
      // v => (v && v.length <= 15) || 'Password must not exceed 15 characters',
    ],
  }),
  methods: {
    // umukura@gmail.com
    // Kurious@2020
    async validate() {
      this.message = "";
      if (this.$refs.loginForm.validate()) {
        let userCategory ;
        // = "student";
        const errorMessage = "Invalid Email or Password";
        const credentials = {
          email: this.email.toLowerCase(),
          password: this.password,
        };
        // let response = await Apis.login(userCategory, credentials);
        // if (response.data === errorMessage) {
          userCategory = "instructor";
          let response = await Apis.login(userCategory, credentials);
          // if (response.data === errorMessage) {
            // userCategory = "admin";
            // response = await Apis.login(userCategory, credentials);
            // if (response.data === errorMessage) {
              // userCategory = "superAdmin";
              // response = await Apis.login(userCategory, credentials);
            // }
          // }
        // }
        if (response.data === errorMessage) {
          this.message = "Invalid passcode or password";
          alert(this.message);
        } else {
          axios.defaults.headers.common.Authorization = `${response.data}`;
          this.$session.start();
          this.$session.set("jwt", response.data);
          this.$store.commit("user/SET_USER", jwt.decode(this.$session.get("jwt")));

          // if (userCategory === "student" || userCategory === "instructor") {
          //   this.$router.push({ name: "Courses" });
          // } else {
          //   alert("not in mvp");
          // }
        }
      }
    },
  },
};
</script>
