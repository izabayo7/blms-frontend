<template>
  <v-container fluid class="login-page">
    
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

<style lang="scss">
.login-page{
  background: radial-gradient(50% 50% at 50% 50%, #541974 0%, rgba(25, 48, 116, 0.96) 100%);
}
</style>