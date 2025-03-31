<template>
  <v-container fluid class="py-0">
    <v-row id="user_profile">
      <cropper :img="img" @change="imageCropped" />
      <v-col class="col-12 pa-md-16 py-md-6"><h2>General Info</h2> </v-col>
      <v-col class="col-12 col-md-6 course-content px-md-6 py-md-0">
        <v-row>
          <v-col class="col-7 mx-auto">
            <v-avatar
              v-if="profile || user.profile"
              width="auto"
              :height="largeDevices.includes($vuetify.breakpoint.name) ? 200 : 120"
              class="mt-4 d-block"
              id="user_pic"
            >
              <img :src="profile || user.profile + `?width=${largeDevices.includes($vuetify.breakpoint.name) ? 200 : 120}`" alt="avatar" />
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
            >
            <p class="mt-3">{{ profile ? profile.name : "" }}</p>
          </v-col>
          <v-col class="col-12 col-md-6 text-center">
            <v-btn
              v-if="user.profile"
              color="black"
              class="mt-6 px-6 py-5 profile_button"
              outlined
              @click="
                set_modal({
                  template: 'action_confirmation',
                  method: {
                    action: 'user/removeProfilePicture',
                  },
                  title: 'Remove profile picture',
                  message:
                    'Are you sure you want to remove your profile picture?',
                })
              "
              >Remove photo</v-btn
            >
          </v-col>
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
          @change="handleFileUpload"
        />
      </v-col>
      <v-col class="col-12 col-md-6 text-center text-md-left">
        <div class="title text-h5">My Details</div>
        <div class="user_info col-12 col-md-8">
          <p class="lable font-weight-medium mt-2">Sur name</p>
          <input v-model="user.sur_name" type="text" class="course_input" />
          <p class="lable font-weight-medium mt-2">Other names</p>
          <input v-model="user.other_names" type="text" class="course_input" />
          <p class="lable font-weight-medium mt-2">Email</p>
          <input v-model="user.email" type="text" class="course_input" />
          <p class="lable font-weight-medium mt-5">Phone number</p>
          <input v-model="user.phone" type="text" class="course_input" />
        </div>
      </v-col>
      <div v-if="user.category.name == 'STUDENT'" class="col-12 px-6">
        <div v-if="user.category.name == 'STUDENT'" class="title text-h5 mt-5">
          Enrolled courses
        </div>
        <v-row class="enrolled_courses">
          <v-col class="col-12">
            <v-row>
              <v-col
                  class="col-12 col-md-4"
                  v-for="(course, i) in started_courses"
                  :key="i"
              >
                <button
                    width="100%"
                    class="pa-5 course-button"
                    @click="$router.push(`/courses/preview/${course.name}`)"
                    color="white"
                >
                  {{ course.name }}
                </button>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
      <v-col class="col-12 col-md-5 text-center text-md-left">
        <v-btn
          color="black"
          class="mt-6 px-6 py-5 profile_button"
          outlined
          to="/update/password"
          >Change password</v-btn
        >
      </v-col>
      <v-col class="col-12 col-md-7 text-center text-md-left mb-14">
        <v-row>
          <v-col class="col-6 col-md-4">
            <v-btn
              :color="primary"
              class="white--text mt-3 px-6 py-6 profile_button"
              @click="validate()"
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
import jwt from "jsonwebtoken";
import Apis from "@/services/apis";
import { mapGetters, mapActions } from "vuex";
import { cropperMixin } from "../services/mixins";

export default {
  name: "UserProfile",
  components: {
    cropper: () => import("@/components/reusable/ui/ImageCropper"),
  },
  mixins: [cropperMixin],
  data: () => ({
    tab: null,
    error: "",
    primary: colors.primary,
    largeDevices: ['md','lg','xl'],
    tabs: [
      { tab: "General Info", content: "Tab 1 Content" },
      { tab: "Security", content: "Tab 2 Content" },
    ],
    passwordMatch: [
      (v) =>
        (v && v === this.newPassword) ||
        "confirm password must match with new password",
    ],
    showActions: false,
    oldPassword: "",
    newPassword: "",
    profile: undefined,
    img: "",
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
    ...mapActions("courses", ["getCourses"]),
    ...mapActions("modal", ["set_modal"]),
    comparePassword() {
      this.passwordMatch = this.newPassword === this.confirmNewPassword;
    },
    pickfile() {
      document.getElementById("picture").click();
    },
    validate() {
      if (this.user.sur_name === "") {
        return (this.error = "sur_name is required");
      } else if (this.user.sur_name.length < 3) {
        return (this.error = "sur_name is too short");
      }
      if (this.user.other_names === "") {
        return (this.error = "other_names is required");
      } else if (this.user.other_names.length < 3) {
        return (this.error = "other_names is too short");
      }

      if (this.user.email === "") {
        return (this.error = "email is required");
      } else if (this.user.email.length < 3) {
        return (this.error = "email is too short");
      }
      if (this.user.phone) {
        if (this.user.phone.length < 3) {
          return (this.error = "phone is too short");
        }
      }
      if (this.user.user_name === "") {
        return (this.error = "user_name is required");
      } else if (this.user.user_name.length < 3) {
        return (this.error = "user_name is too short");
      }

      this.saveChanges();
    },
    async removeProfilePicture() {
      const splited = this.$store.state.user.user.profile.split("/");
      // set the dialog
      const response = await Apis.remove_user_profile(
        splited[splited.length - 1]
      );

      // set the token in the session
      this.$session.set("jwt", response.data.data);

      const user = await jwt.decode(this.$session.get("jwt"));
      this.$store.dispatch("user/setUser", user);
    },
    async saveChanges() {
      let response = await Apis.update_user({
        sur_name: this.user.sur_name,
        other_names: this.user.other_names,
        phone: this.user.phone,
        email: this.user.email,
        user_name: this.user.user_name,
      });

      if (this.profile) {
        // set the dialog
        this.$store.dispatch("modal/set_modal", {
          template: "display_information",
          title: "Updating Profile",
          message: `uploading profile`,
        });
        response = await Apis.update_user_profile(
          {
            profile: this.profile,
          },
          {
            onUploadProgress: (progressEvent) => {
              this.$store.dispatch(
                "modal/set_progress",
                parseInt(
                  Math.round((progressEvent.loaded / progressEvent.total) * 100)
                )
              );
            },
          }
        );
      }

      // set the token in the session
      this.$session.set("jwt", response.data.data);

      const user = await jwt.decode(this.$session.get("jwt"));
      const category = user.category.name;
      // keep the decoded user in vuex
      this.$store.dispatch("user/setUser", user);

      if (category === "STUDENT" || category === "INSTRUCTOR") {
        this.$router.push("/courses");
      }
      // others land to the dashboard
      else if (category === "ADMIN") {
        this.$router.push("/administration");
      }
    },
  },
  created() {
    //get courses on page load
    this.getCourses();
    // this.profile = this.user.profile;
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
