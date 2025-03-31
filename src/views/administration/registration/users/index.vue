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
                        +250
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
                v-model="faculty"
                :items="facilityCollegeYearNames"
                solo
                class="group-select"
              ></v-select>
            </v-col>
            <v-col class="col-12">
              <label>Gender</label>
              <v-row>
                <v-col class="col-4" v-for="(gender, n) in genders" :key="n">
                  <v-icon
                    :color="selectedGender === gender ? '#FFD248' : '#B4B4B4'"
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
                color="#653737"
                landscape
              ></v-date-picker>
            </v-col>
            <v-col class="col-8 mx-auto">
              <v-btn
                v-if="$route.name.includes('Student')"
                rounded
                x-large
                class="yellow white--text px-16"
                @click="saveStudent"
                >Create account</v-btn
              >
              <v-btn
                v-else
                rounded
                x-large
                class="yellow white--text px-16"
                @click="saveInstructor"
                >Create account</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
    <kurious-dialog
      :show="show"
      :message="message"
      :modal="modal"
      color="#ffd248"
      :status="status"
    >
      <!-- <v-icon slot="icon" size="55" dark>mdi-clipboard-text-multiple-outline</v-icon> -->
      <v-icon slot="icon" size="55" dark>mdi-check</v-icon>
      <v-row slot="actions">
        <v-col class="col-10 mx-auto my-0">
          <v-btn
            rounded
            x-large
            color="#ffd248"
            class="white--text px-16 mx-2"
            @click="
              resetFields();
              show = false;
            "
            >Add New Student</v-btn
          >
          <v-btn
            id="panel--btn"
            rounded
            x-large
            color="#ffd248"
            class="orange--text px-16 mx-2"
            to="/register/users"
            >Back To Panel</v-btn
          >
        </v-col>
      </v-row>
    </kurious-dialog>
  </v-container>
</template>

<script>
import Apis from "@/services/apis";
export default {
  data: () => ({
    message: "",
    show: false,
    status: 200,
    modal: true,
    facilityCollegeYearNames: [],
    facilityCollegeYearCodes: [],
    selectedGender: "Male",
    genders: ["Male", "Female"],
    surName: "",
    otherNames: "",
    DOB: "",
    email: "",
    nationalId: undefined,
    phone: "",
    faculty: "",
  }),
  beforeMount() {
    if (this.$route.name.includes("Student")) {
      this.getFaculties();
    }
  },
  methods: {
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
    async getFaculties() {
      try {
        const response = await Apis.get(
          `facility-college-year/college/${this.$store.state.user.college}`
        );
        for (const facultyCollegeYear of response.data) {
          this.facilityCollegeYearNames.push(facultyCollegeYear.name);
          this.facilityCollegeYearCodes.push(facultyCollegeYear._id);
        }
      } catch (error) {
        if (error.request && !error.response) {
          this.status = 503;
          this.message = "Service Unavailable";
          this.modal = false;
          this.show = true;
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
    async saveStudent() {
      try {
        this.faculty = this.facilityCollegeYearCodes[
          this.facilityCollegeYearNames.indexOf(this.faculty)
        ];
        const response = await Apis.create("student", {
          surName: this.surName,
          otherNames: this.otherNames,
          phone: `0${this.phone}`,
          gender: this.selectedGender,
          DOB: this.DOB,
          email: this.email,
          nationalId: this.nationalId,
          college: this.$store.state.user.college,
        });

        await Apis.create("student-facility-college-year", {
          student: response.data._id,
          facilityCollegeYear: this.faculty,
        });
        this.message = "Student Registered";
        this.show = "true";
      } catch (error) {
        if (error.response) {
          this.status = error.response.status;
          this.message = error.response.data;
        } else if (error.request) {
          this.status = 503;
          this.message = "Service Unavailable";
        }
        this.modal = false;
        this.show = true;
      }
    },
    async saveInstructor() {
      try {
        await Apis.create("instructor", {
          surName: this.surName,
          otherNames: this.otherNames,
          phone: `0${this.phone}`,
          gender: this.selectedGender,
          email: this.email,
          nationalId: this.nationalId,
          college: this.$store.state.user.college,
        });
        this.message = "Instructor Registered";
        this.show = "true";
      } catch (error) {
        if (error.response) {
          this.status = error.response.status;
          this.message = error.response.data;
        } else if (error.request) {
          this.status = 503;
          this.message = "Service Unavailable";
        }
        this.modal = false;
        this.show = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#student-regist {
  .v-text-field.v-text-field--solo .v-input__control {
    min-height: 40px;
    padding: 0;
  }
  .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
    > .v-input__control
    > .v-input__slot:focus-within {
    border-bottom: 4px solid #ffc100;
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
      color: #6A6A6A;
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