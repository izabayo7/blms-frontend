<template>
  <v-container fluid id="student-regist" class="pa-0">
    <v-row>
      <v-col class="col-3 col-md-3 pa-0 svg-side">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="491"
          height="107vh"
          viewBox="0 0 491 100vh"
        >
          <g id="Group_71" data-name="Group 71" transform="translate(98 41)">
            <path
              id="Path_1778"
              data-name="Path 1778"
              d="M0,0H393V1082H0Z"
              fill="#6daefc"
            />
            <circle
              id="Ellipse_144"
              data-name="Ellipse 144"
              cx="108.5"
              cy="108.5"
              r="108.5"
              transform="translate(142 421)"
              fill="#fff"
              opacity="0.89"
            />
            <circle
              id="Ellipse_145"
              data-name="Ellipse 145"
              cx="72"
              cy="72"
              r="72"
              transform="translate(152 994)"
              fill="#fff"
              opacity="0.81"
            />
            <circle
              id="Ellipse_146"
              data-name="Ellipse 146"
              cx="72"
              cy="72"
              r="72"
              transform="translate(-98 396)"
              fill="#fff"
              opacity="0.81"
            />
            <circle
              id="Ellipse_147"
              data-name="Ellipse 147"
              cx="72"
              cy="72"
              r="72"
              transform="translate(125 -41)"
              fill="#fff"
              opacity="0.57"
            />
          </g>
        </svg>
      </v-col>
      <v-col class="col-9 col-md-9 form-side customScroll">
        <v-form>
          <v-row>
            <v-col class="col-12">
              <h1 class="font-weight-bold form-title pt-5">
                {{
                  `${
                    $route.name.includes("Student") ? "Student" : "Instructor"
                  }`
                }}
                Registration
              </h1>
            </v-col>
            <v-col class="col-12 col-md-6">
              <label>First Name</label>
              <v-text-field v-model="surName" type="text" solo />
            </v-col>
            <v-col class="col-12 col-md-6">
              <label>Last Name</label>
              <v-text-field v-model="otherNames" type="text" solo />
            </v-col>
            <v-col class="col-12">
              <label>Email</label>
              <v-text-field v-model="email" type="email" solo />
            </v-col>
            <v-col class="col-12">
              <label>Phone number</label>
              <div
                class="v-input theme--light v-text-field v-text-field--single-line v-text-field--solo v-text-field--is-booted v-text-field--enclosed"
              >
                <div class="v-input__control">
                  <div class="v-input__slot">
                    <div class="v-input__prepend-inner">
                      <div
                        class="v-input__icon v-input__icon--prepend-inner mx-2"
                      >
                        +25
                      </div>
                    </div>
                    <div class="v-text-field__slot">
                      <input v-model="phone" type="number" placeholder="xxxx" />
                    </div>
                  </div>
                  <div class="v-text-field__details">
                    <div class="v-messages theme--light">
                      <div class="v-messages__wrapper"></div>
                    </div>
                  </div>
                </div>
              </div>
            </v-col>
            <v-col class="col-12">
              <label>National Id</label>
              <div
                class="v-input theme--light v-text-field v-text-field--single-line v-text-field--solo v-text-field--is-booted v-text-field--enclosed"
              >
                <div class="v-input__control">
                  <div class="v-input__slot">
                    <div class="v-text-field__slot">
                      <input
                        class="id-inputs"
                        max="10000"
                        @keyup="checkLength(0)"
                        type="number"
                        placeholder="xxxx"
                      />
                      <input
                        class="id-inputs"
                        max="10000"
                        @keyup="checkLength(1)"
                        type="number"
                        placeholder="xxxx"
                      />
                      <input
                        class="id-inputs"
                        max="10000"
                        @keyup="checkLength(2)"
                        type="number"
                        placeholder="xxxx"
                      />
                      <input
                        class="id-inputs"
                        max="10000"
                        @keyup="checkLength(3)"
                        type="number"
                        placeholder="xxxx"
                      />
                    </div>
                  </div>
                  <div class="v-text-field__details">
                    <div class="v-messages theme--light">
                      <div class="v-messages__wrapper"></div>
                    </div>
                  </div>
                </div>
              </div>
            </v-col>
            <v-col v-if="$route.name.includes('Student')" class="col-12">
              <label>Faculty</label>
              <v-select
                v-model="selectedFacultyCollegeYearName"
                :items="facultyCollegeYearNames"
                solo
                class="group-select"
              ></v-select>
            </v-col>
            <v-col class="col-12">
              <label>Gender</label>
              <v-row>
                <v-col class="col-4" v-for="(gender, n) in genders" :key="n">
                  <v-icon
                    :color="selectedGender === gender ? primary : '#B4B4B4'"
                    @click="selectedGender = gender"
                    >mdi-checkbox-{{
                      selectedGender === gender ? "marked" : "blank"
                    }}-circle{{
                      selectedGender === gender ? "" : "-outline"
                    }}</v-icon
                  >
                  {{ gender }}
                </v-col>
              </v-row>
            </v-col>
            <v-col v-if="$route.name.includes('Student')" class="col-12">
              <v-date-picker
                v-model="DOB"
                year-icon="mdi-calendar-blank"
                prev-icon="mdi-skip-previous"
                next-icon="mdi-skip-next"
                :color="primary"
                landscape
              ></v-date-picker>
            </v-col>
            <v-col class="col-12 mx-auto">
              <v-btn
                rounded
                x-large
                class="action-button px-12"
                @click="saveUser"
              >
                Create account
              </v-btn>
              <v-btn
                color="transparent"
                class="cancel-quiz mt-n2 ml-4 py-6 px-16"
                @click="$router.push('/administration/register/users')"
              >
                Cancel
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import colors from "@/assets/sass/imports/_colors.scss";
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    selectedFacultyCollegeYearName: "",
    primary: colors.primary,
    selectedGender: "Male",
    genders: ["Male", "Female"],
    surName: "",
    otherNames: "",
    DOB: "",
    email: "",
    nationalId: undefined,
    phone: "",
  }),
  computed: {
    ...mapGetters("faculties", ["facultyCollegeYearNames"]),
    selectedFacultyCollegeYearCode() {
      return this.$store.getters["faculties/facultyCollegeYear"](
        this.selectedFacultyCollegeYearName
      )._id;
    },
  },
  methods: {
    ...mapActions("users", ["createUser"]),
    ...mapActions("faculties", ["getFacultyCollegeYears"]),
    saveUser() {
      this.createUser({
        user: {
          surName: this.surName,
          otherNames: this.otherNames,
          phone: this.phone,
          gender: this.selectedGender,
          DOB: this.DOB,
          email: this.email,
          nationalId: this.nationalId,
          college: this.$store.state.user.user.college,
        },
        category: this.$route.path.split('/')[this.$route.path.split('/').length -1],
        facultyCollegeYear: this.selectedFacultyCollegeYearCode
      }).then(() => {
        this.$router.push('/administration')
      });
    },
    checkLength(index) {
      const nationalIdInputs = document.querySelectorAll(".id-inputs");
      if (parseInt(nationalIdInputs[index].value) > 10000) {
        nationalIdInputs[index].style.color = "red";
      } else {
        nationalIdInputs[index].style.color = "inherit";
        if (index === 3) {
          this.nationalId = `${nationalIdInputs[0].value}${nationalIdInputs[1].value}${nationalIdInputs[2].value}${nationalIdInputs[3].value}`;
        }
      }
    },
    resetFields() {
      this.surName = "";
      this.otherNames = "";
      this.DOB = "";
      this.email = "";
      this.nationalId = undefined;
      this.phone = "";
      this.selectedGender = "";
      this.faculty = "";
    },
  },
  created() {
    this.getFacultyCollegeYears(this.$store.state.user.user.college);
  },
};
</script>

<style lang="scss" scoped>
#student-regist {
  .action-button {
    background-color: $primary !important;
    color: white !important;
  }
  .v-text-field.v-text-field--solo .v-input__control {
    min-height: 40px;
    padding: 0;
  }
  .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
    > .v-input__control
    > .v-input__slot:focus-within {
    border-bottom: 4px solid $primary;
  }
  .v-text-field input.id-inputs {
    flex: 1 1 auto;
    // border: 1px solid;
    line-height: 20px;
    padding: 8px 0 8px;
    margin: 4px 12px;
    max-width: 20%;
    min-width: 0px;
    /* width: 48% !important; */
    text-align: center !important;
  }
  .svg-side {
    height: 100vh;
    overflow-x: hidden;
    overflow-y: hidden;
    svg {
      margin: -41px 0 0 -100px;
    }
  }
  .form-side {
    height: 100vh;
    overflow-y: auto;
    background-color: #f9faff;
    label {
      color: #6a6a6a;
      font-size: 17px;
    }
    form.v-form {
      max-width: 500px;
      margin-left: 135px;
      .form-title {
        color: #3d3d3d;
      }
      .v-input.theme--light.v-text-field.v-text-field--single-line.v-text-field--solo.v-text-field--is-booted.v-text-field--enclosed {
        margin-bottom: -23px;
      }
      .phone {
        width: 300px;
      }
      .inputs {
        width: 260px;
      }
      button.yellow.white--text.px-16.v-btn.v-btn--contained.v-btn--rounded.theme--light.v-size--large {
        width: 320px;
      }
    }
  }
}
</style>