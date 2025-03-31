<template>
  <v-container fluid class="py-0 upate_password">
    <svg
      class="d-none"
      xmlns="http://www.w3.org/2000/svg"
      width="2254"
      height="1565"
      viewBox="0 0 2254 1565"
    >
      <ellipse
        id="Ellipse_135"
        data-name="Ellipse 135"
        cx="1127"
        cy="782.5"
        rx="1127"
        ry="782.5"
        fill="rgba(38,128,235,0.37)"
      />
    </svg>
    <v-row>
      <v-col class="col-10 col-md-5 mx-auto">
        <div class="form pa-6">
          <div class="title text-center">Change password</div>
          <div class="inputs">
            <p class="lable font-weight-medium mt-5">Old password</p>
            <input v-model="oldPassword" type="password" class="course_input" />
            <p class="lable font-weight-medium mt-5">New password</p>
            <input v-model="newPassword" type="password" class="course_input" />
            <p class="lable font-weight-medium mt-5">Confirm new password</p>
            <input
              v-model="confirmNewPassword"
              type="password"
              class="course_input"
            />
          </div>
          <div class="save text-center">
            <v-btn
              :color="primary"
              class="white--text mt-3 px-6 py-6 profile_button"
              @click="validate()"
              >Change password</v-btn
            >
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import colors from "@/assets/sass/imports/_colors.scss";
import Apis from "@/services/apis";
import { mapActions } from "vuex";

export default {
  name: "UserProfile",
  data: () => ({
    tab: null,
    error: "",
    primary: colors.primary,
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  }),
  methods: {
    ...mapActions("courses", ["getCourses"]),
    validate() {
      if (
        this.oldPassword === "" ||
        this.newPassword == "" ||
        this.confirmNewPassword == ""
      ) {
        return (this.error = "all fields are required is required");
      } else if (this.oldPassword.length < 8) {
        return (this.error = "old password is too short");
      } else if (this.newPassword.length < 8) {
        return (this.error = "new password is too short");
      } else if (this.confirmNewPassword.length < 3) {
        return (this.error = "confirm new password is too short");
      } else if (this.newPassword !== this.confirmNewPassword) {
        return (this.error = "passwords must match");
      }
      this.saveChanges();
    },
    async saveChanges() {
      let response = await Apis.update_user_password({
        current_password: this.oldPassword,
        new_password: this.confirmNewPassword,
      });
      console.log(response.data);
    },
  },
};
</script>

<style lang="scss">
.upate_password {
  font-family: Poppins !important;
  background-color: #fcfcfc;
  .form {
    background-color: #ffff;
  }
  .lable {
    font-weight: 600;
    color: #747474;
    font-size: 20px;
  }
  .course_input {
    border: 2px solid #d5d5d5;
    background-color: white;
    width: 80%;
    padding: 10px;
  }
}
</style>