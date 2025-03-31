<template>
  <v-container fluid class="py-0">
    <v-row id="user_profile">
      <v-col class="col-12 pa-md-16 py-md-6"> General Info </v-col>
      <v-col class="col-12 col-md-5 course-content px-md-6 py-md-0">
        <v-row>
          <v-col class="col-7 mx-auto">
            <v-avatar
              v-if="user.profile"
              width="auto"
              height="245"
              class="mt-4 d-block"
              id="user_pic"
            >
              <img :src="user.profile" alt="avatar" />
            </v-avatar>
            <v-avatar
              v-else
              size="245"
              class="mt-4 d-block text-h1 avatar py-16"
            >
              {{ `${$store.state.user.user.sur_name}` | computeText }}
            </v-avatar>
          </v-col>
          <v-col :class="`col-12 col-md-${user.profile ? 6 : 12} text-center`">
            <v-btn
              :color="primary"
              class="white--text mt-6 px-6 py-5 profile_button"
              @click="pickfile()"
              >Upload photo</v-btn
            ></v-col
          >
          <v-col class="col-12 col-md-6 text-center">
            <v-btn
              v-if="user.profile"
              color="black"
              class="mt-6 px-6 py-5 profile_button"
              outlined
              @click="pickfile()"
              >Remove photo</v-btn
            ></v-col
          >
          <v-col class="col-12">
            <p class="description text-center text-md-left">
              Photo will be shown to users wherever you send messages or comment
              on any course, live class or group chat. Max photo size 1MB.
            </p>
          </v-col>
        </v-row>

        <input
          ref="file"
          type="file"
          id="picture"
          hidden
          @change="handleFileUpload()"
        />
      </v-col>
      <v-col class="col-12 col-md-7 text-center text-md-left">
        <div class="title text-h5">My Details</div>
        <div class="user_info col-12 col-md-6">
          <p class="lable font-weight-medium mt-2">Sur name</p>
          <input v-model="user.sur_name" type="text" class="course_input" />
          <p class="lable font-weight-medium mt-2">Other names</p>
          <input v-model="user.other_names" type="text" class="course_input" />
          <p class="lable font-weight-medium mt-2">Email</p>
          <input v-model="user.email" type="text" class="course_input" />
          <p class="lable font-weight-medium mt-5">Phone number</p>
          <input v-model="user.phone" type="text" class="course_input" />
          <p class="lable font-weight-medium mt-5">User name</p>
          <input v-model="user.user_name" type="text" class="course_input" />
        </div>
        <div v-if="user.category.name == 'STUDENT'" class="title text-h5 mt-5">Enrolled courses</div>
        <div v-if="user.category.name == 'STUDENT'" class="enrolled_courses">
          <v-row>
            <v-col class="col-12 col-md-8">
              <v-row>
                <v-col
                  class="col-6"
                  v-for="(course, i) in started_courses"
                  :key="i"
                >
                  <v-btn
                    width="100%"
                    class="py-5"
                    :to="`/courses/preview/${course.name}`"
                    color="white"
                  >
                    {{ course.name }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col class="col-12 col-md-5 text-center text-md-left">
        <v-btn
          color="black"
          class="mt-6 px-6 py-5 profile_button"
          outlined
          to="/update/password"
          >Change password</v-btn
        >
      </v-col>
      <v-col class="col-12 col-md-7 text-center text-md-left">
        <v-row>
          <v-col class="col-6 col-md-4">
            <v-btn
              :color="primary"
              class="white--text mt-3 px-6 py-6 profile_button"
              @click="pickfile()"
              >Save changes</v-btn
            ></v-col
          >
          <v-col class="col-6">
            <v-btn
              color="black"
              class="mt-3 px-6 py-5 profile_button"
              outlined
              to="/"
              >Cancel</v-btn
            ></v-col
          >
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import colors from "@/assets/sass/imports/_colors.scss";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "UserProfile",
  data: () => ({
    tab: null,
    primary: colors.primary,
    tabs: [
      { tab: "General Info", content: "Tab 1 Content" },
      { tab: "Security", content: "Tab 2 Content" },
    ],
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) =>
        (/([ !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])/.test(v) &&
          /(?=.*\d)/.test(v) &&
          /(?=.*[A-Z])/.test(v) &&
          /(?=.*[a-z])/.test(v)) ||
        "Password must contain uppercase characters, lowercase characters, numbers and symbols",
      (v) => (v && v.length >= 8) || "Password must atleast have 8 characters",
      (v) => (v && v.length <= 15) || "Password must not exceed 15 characters",
    ],
    passwordMatch: [
      (v) =>
        (v && v === this.newPassword) ||
        "confirm password must match with new password",
    ],
    showActions: false,
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  }),
  computed: {
    user() {
      const user = JSON.stringify(this.$store.state.user.user);
      return JSON.parse(user);
    },
    ...mapGetters("courses", ["started_courses"]),
  },
  methods: {
    ...mapActions("users", ["updateUser"]),
    ...mapActions("courses", ["getCourses"]),
    comparePassword() {
      this.passwordMatch = this.newPassword === this.confirmNewPassword;
    },
    pickfile() {
      document.getElementById("picture").click();
    },
    handleFileUpload() {
      this.user.profile = this.$refs.file.files[0];
    },
    async updateProfile() {
      if (this.oldPassword !== "") {
        this.passwordValid = await bcrypt.compare(
          this.oldPassword,
          this.$store.state.user.password
        );
        if (!this.passwordValid) {
          alert("old password is incorrect");
          return 0;
        }
      }
      const category =
        this.$store.state.user.category === "SuperAdmin"
          ? "superAdmin"
          : this.$store.state.user.category.toLowerCase();
      const formData = new FormData();

      formData.append("surName", this.user.surName);
      formData.append("otherNames", this.user.otherNames);
      formData.append("gender", this.user.gender);
      formData.append("nationalId", this.user.nationalId);
      formData.append("phone", this.user.phone);
      formData.append("email", this.user.email);

      if (this.newPassword !== "") {
        formData.append("password", this.newPassword);
      }

      if (this.$store.state.user.category === "Student") {
        formData.append("DOB", this.user.DOB);
      }
      if (this.$store.state.user.category !== "SuperAdmin") {
        formData.append("college", this.user.college);
      }

      if (this.user.profile) {
        formData.append("profile", this.user.profile);
      }

      const response = await axios.put(
        `http://161.35.199.197:7070/kurious/${category}/${this.$store.state.user._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.data._id) {
        // success message needed
        const updatedUser = {
          _id: response.data._id,
          surName: response.data.surName,
          otherNames: response.data.otherNames,
          gender: response.data.gender,
          nationalId: response.data.nationalId,
          phone: response.data.phone,
          email: response.data.email,
          password: response.data.password,
          category: this.$store.state.user.category,
        };

        if (response.data.profile) {
          updatedUser.profile = response.data.profile;
        }

        if (this.$store.state.user.category !== "SuperAdmin") {
          // updatedUser.isActive = response.data.isActive
          updatedUser.college = response.data.college;
        }

        if (this.$store.state.user.category === "Student") {
          // for non student
          updatedUser.DOB = response.data.DOB;
        }

        const ONE_DAY = 60 * 60 * 24;
        this.$session.remove("jwt");
        this.$session.set(
          "jwt",
          jwt.sign(updatedUser, "KurichTech01", { expiresIn: ONE_DAY })
        );
        this.$store.dispatch("setUser", updatedUser);
      } else {
        //  error message needed
      }
    },
  },
  created() {
    //get courses on page load
    this.getCourses({
      user_name: this.$store.state.user.user.user_name,
    });
  },
};
</script>

<style lang="scss">
#user_profile {
  background-color: #fcfcfc;
  .title {
    color: black;
  }
  .lable {
    color: #747474;
  }
  .profile_button {
    max-width: 1;
  }
  .description {
    color: #747474;
    font-size: 0.8rem;
    font-weight: 800;
  }
  #user_pic {
    background-color: inherit;
  }
  .avatar {
    margin-top: 0px;
    background-color: $primary;
    color: white;
    cursor: pointer;
  }
  .course_input {
    border: 2px solid #d5d5d5;
    background-color: white;
    width: 100%;
    padding: 10px;
  }
}
</style>