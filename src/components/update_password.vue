<template>
  <v-container fluid class="pa-0 upate_password">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1500.999"
      height="314"
      viewBox="0 0 1500.999 314"
    >
      <path
        id="Subtraction_6"
        data-name="Subtraction 6"
        d="M-6253.017,8263c-29.985,0-60.194-.533-89.788-1.583-29.229-1.035-58.641-2.6-87.418-4.652-28.407-2.025-56.9-4.576-84.676-7.581-27.456-2.971-54.9-6.458-81.556-10.365-26.374-3.867-52.635-8.244-78.054-13.009-25.2-4.725-50.159-9.943-74.182-15.511-23.883-5.533-47.409-11.546-69.925-17.867-22.478-6.311-44.446-13.069-65.3-20.083-16.429-5.527-32.608-11.365-48.088-17.352V7949h1501V8083.74c-8.56,5.6-17.578,11.145-26.8,16.488-15.285,8.855-31.816,17.562-49.135,25.877-17.276,8.293-35.748,16.4-54.9,24.088s-39.427,15.14-60.287,22.156c-20.875,7.023-42.843,13.78-65.293,20.083-22.489,6.314-46.016,12.326-69.926,17.867-24.043,5.572-49,10.791-74.18,15.511-25.394,4.761-51.655,9.138-78.053,13.009-26.7,3.912-54.138,7.4-81.558,10.365-27.764,3-56.253,5.554-84.676,7.581-28.774,2.053-58.187,3.617-87.42,4.652C-6192.823,8262.468-6223.031,8263-6253.017,8263Z"
        transform="translate(6931.999 -7949.001)"
        fill="rgba(38,128,235,0.37)"
      />
    </svg>

    <v-row class="form_container d-flex">
      <v-col class="col-10 col-md-4 pa-0">
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
  .form_container {
    margin-top: -15em;
    justify-content: center;
  }
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