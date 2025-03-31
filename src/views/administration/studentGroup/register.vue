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
                StudentGroup Registration
              </h1>
            </v-col>
            <v-col class="col-12">
              <label>Faculty</label>
              <v-select
                v-model="selectedFacultyName"
                :items="facultyNames"
                chips
                dense
                outlined
                class="user-select"
              >
              </v-select>
            </v-col>
            <v-col class="col-12">
              <label>Year</label>
              <v-select
                v-model="selectedYear"
                :items="years"
                chips
                dense
                outlined
                class="user-select"
              >
              </v-select>
            </v-col>
            <v-col class="col-12 mx-auto">
              <v-btn
                rounded
                x-large
                class="action-button px-12"
                @click="saveFacultyCollegeYear"
              >
                Create studentGroup
              </v-btn>
              <v-btn
                color="transparent"
                class="cancel-user mt-n2 ml-4 py-6 px-16"
                @click="$router.push('/administration/studentGroup')"
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
    selectedFacultyName: "",
    selectedYear: undefined,
    primary: colors.primary,
    name: "",
  }),
  computed: {
    // get the faculties
    ...mapGetters("faculties", [
      "faculties",
      "f_loaded",
      "facultyCollegeYears",
    ]),
    faculty_loaded() {
      return this.$store.getters["faculties/loaded"];
    },
    // get the years
    ...mapGetters("years", ["collegeYears", "loaded"]),
    selectedFaculty() {
      const result = this.faculties.filter(
        (d) => d.name == this.selectedFacultyName
      )[0];
      return result ? result : undefined;
    },
    facultyNames() {
      let result = [];
      for (const i in this.faculties) {
        result.push(this.faculties[i].name);
      }
      return result;
    },
    selectedCollegeYear() {
      const result = this.collegeYears.filter(
        (d) => d.digit == this.selectedYear
      )[0];
      return result ? result : undefined;
    },
    years() {
      let result = [];
      for (const i in this.collegeYears) {
        let yearUsed = false;
        if (this.selectedFaculty) {
          const relevant_collegeYears = this.facultyCollegeYears.filter(
            (d) => d.facultyCollege._id == this.selectedFaculty.facultyCollegeId
          );
          yearUsed = relevant_collegeYears.filter(
            (y) => y.collegeYear.digit == this.collegeYears[i].digit
          ).length;
        }
        if (!yearUsed) {
          result.push(this.collegeYears[i].digit);
        }
      }
      return result;
    },
  },
  methods: {
    ...mapActions("faculties", [
      "createFacultyCollegeYear",
      "getFacultyCollegeYears",
      "getFaculties",
    ]),
    ...mapActions("years", ["getCollegeYears"]),
    async saveFacultyCollegeYear() {
      this.createFacultyCollegeYear({
        facultyCollegeYear: {
          facultyCollege: this.selectedFaculty.facultyCollegeId,
          collegeYear: this.selectedCollegeYear._id,
        },
      }).then(() => {
        this.$router.push("/administration/studentGroup");
      });
    },
  },
  created() {
    if (!this.faculty_loaded) {
      this.getFacultyCollegeYears(this.$store.state.user.user.college);
    }
    if (!this.f_loaded) {
      // load faculties
      this.getFaculties(this.$store.state.user.user.college);
    }
    if (!this.loaded) {
      // load faculties
      this.getCollegeYears();
    }
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
      max-width: 545px;
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
  .user-details {
    background-color: #fff;
  }
}
</style>