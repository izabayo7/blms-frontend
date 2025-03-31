<template>
  <v-app id="school-page">
    <v-row>
      <v-col class="col-4 col-md-4 logo-side">
        <back class="ma-6" to="/administration" />
        <v-img
          v-if="college.logo"
          :alt="college.name + ' logo photo'"
          class="d-block preview-media"
          :src="college.logo"
          :lazy-src="college.logo"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <div v-else class="school-logo mt-12">
          <p>{{ college.name.toUpperCase()[0] }}</p>
        </div>
        <svg
          class="edit-logo"
          xmlns="http://www.w3.org/2000/svg"
          width="58"
          height="58"
          viewBox="0 0 58 58"
          @click="pickfile()"
        >
          <g
            id="Ellipse_207"
            data-name="Ellipse 207"
            fill="#fff"
            stroke="#707070"
            stroke-width="2"
          >
            <circle cx="29" cy="29" r="29" stroke="none" />
            <circle cx="29" cy="29" r="28" fill="none" />
          </g>
          <g
            id="Icon_feather-edit-3"
            data-name="Icon feather-edit-3"
            transform="translate(11.5 11.682)"
          >
            <path
              id="Path_1915"
              data-name="Path 1915"
              d="M18,30H31.5"
              fill="none"
              stroke="#000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
            />
            <path
              id="Path_1916"
              data-name="Path 1916"
              d="M24.75,5.25a3.182,3.182,0,0,1,4.5,4.5L10.5,28.5,4.5,30,6,24Z"
              fill="none"
              stroke="#000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
            />
          </g>
        </svg>
        <input
          ref="file"
          type="file"
          hidden
          accept="image/*"
          id="picture"
          class="d-none my-6"
          @change="handleFileUpload()"
        />
        <p class="text-center">{{ logo ? logo.name : "" }}</p>
      </v-col>
      <v-col class="col-8 col-md-8 form-side">
        <v-form class="mt-4">
          <p class="page-heading">School Details</p>
          <label>School Name</label>
          <v-text-field
            outlined
            solo
            class="input"
            v-model="college.name"
          ></v-text-field>
          <label>Email</label>
          <v-text-field
            outlined
            solo
            class="input"
            v-model="college.email"
          ></v-text-field>
          <label>School Phone</label>
          <v-text-field
            outlined
            solo
            class="input"
            v-model="college.phone"
          ></v-text-field>
          <label>School Location</label>
          <v-text-field
            outlined
            solo
            class="input"
            v-model="college.location"
          ></v-text-field>
          <v-btn class="save--changes mx-2 px-8" @click="saveCollegeChanges()"
            >Save</v-btn
          >
          <v-btn
            color="transparent"
            class="cancel-quiz mx-2"
            @click="$router.push('/administration')"
            >Cancel</v-btn
          >
        </v-form>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    back: () => import("@/components/shared/back-button"),
  },
  data: () => ({
    logo: undefined,
  }),
  computed: {
    // get the userCategory
    userCategory() {
      return this.$store.state.user.user.category;
    },
    // get users
    ...mapGetters("colleges", ["college", "c_loaded"]),
  },
  methods: {
    ...mapActions("colleges", ["findCollegeByName", "updateCollege"]),
    // pick logo
    pickfile() {
      document.getElementById("picture").click();
    },
    // keep the logo
    handleFileUpload() {
      this.logo = this.$refs.file.files[0];
    },
    saveCollegeChanges() {
      this.updateCollege({
        college: {
          name: this.college.name,
          email: this.college.email,
          phone: this.college.phone,
          location: this.college.location,
        },
        logo: this.logo,
      }).then(() => {
        this.$router.push(`/administration`);
      });
    },
  },
  created() {
    if (!this.c_loaded) {
      //get college on page load
      this.findCollegeByName({
        collegeName: this.$route.params.name,
      });
    }
  },
};
</script>

<style lang="scss">
#school-page {
  background-color: #f9faff;
  padding-top: 10px;
  height: 624px;
  overflow: hidden;
  .logo-side {
    .school-logo {
      background-color: $primary;
      width: 190px;
      height: 190px;
      margin-left: 50px;
      border-radius: 95px;
      p {
        text-align: center;
        font-size: 100px;
        padding-top: 12px;
        color: #000;
        font-weight: 500;
      }
    }
    .preview-media {
      border: 1px solid $primary;
      color: black;
      width: 190px;
      height: 190px;
      margin-left: 50px;
      border-radius: 95px;
      border-radius: 180px;
      padding: 0;
      align-self: stretch;
      object-fit: cover;
    }
    .edit-logo {
      font-size: 5px;
      position: absolute;
      padding: 12px;
      border-radius: 22px;
      margin: -39px 145px 0;
      cursor: pointer;
    }
  }
  .form-side {
    .page-heading {
      margin-bottom: 30px;
      font-size: 22px;
      font-weight: 500;
    }
    label {
      font-size: 18px;
      color: #747474;
      font-weight: 500;
    }
    .input {
      width: 400px;
      .v-input__control {
        .v-input__slot {
          box-shadow: none !important;
          fieldset {
            border: #d5d5d5 1px solid !important;
          }
        }
      }
    }
    .input:focus {
      outline: none;
    }
    .save--changes {
      background-color: $primary !important;
      color: white;
    }
  }
}
</style>