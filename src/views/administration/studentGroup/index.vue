<template>
  <div id="faculty-page">
    <back class="ma-6" to="/administration" />
    <v-row>
      <v-col class="col-12 col-md-12">
        <h2>Student Group</h2>
        <v-card class="faculties-card">
          <v-row>
            <v-col class="col-12 col-md-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="86"
                height="86"
                viewBox="0 0 86 86"
              >
                <circle
                  id="Ellipse_203"
                  data-name="Ellipse 203"
                  cx="43"
                  cy="43"
                  r="43"
                  fill="#4592ee"
                />
                <g id="users" transform="translate(23.178 29.887)">
                  <path
                    id="Path_1899"
                    data-name="Path 1899"
                    d="M16.112,26.924a8.112,8.112,0,0,0,0-16.224,8.112,8.112,0,1,0,0,16.224Zm0-12.991a4.879,4.879,0,1,1-4.879,4.879A4.817,4.817,0,0,1,16.112,13.933Z"
                    transform="translate(-3.106 -10.7)"
                    fill="#fff"
                  />
                  <path
                    id="Path_1900"
                    data-name="Path 1900"
                    d="M12.982,40a17.619,17.619,0,0,0-12.5,5.367,1.516,1.516,0,0,0,0,2.257,1.565,1.565,0,0,0,2.257,0,14.793,14.793,0,0,1,10.247-4.391,15.136,15.136,0,0,1,10.247,4.391,1.784,1.784,0,0,0,1.159.488,1.666,1.666,0,0,0,1.159-.488,1.516,1.516,0,0,0,0-2.257A18.083,18.083,0,0,0,12.982,40Z"
                    transform="translate(0.025 -22.129)"
                    fill="#fff"
                  />
                  <path
                    id="Path_1901"
                    data-name="Path 1901"
                    d="M44.879,31.059A4.879,4.879,0,1,0,40,26.179,4.817,4.817,0,0,0,44.879,31.059Zm0-6.465a1.647,1.647,0,1,1-1.647,1.647A1.537,1.537,0,0,1,44.879,24.594Z"
                    transform="translate(-15.588 -14.835)"
                    fill="#fff"
                  />
                  <path
                    id="Path_1902"
                    data-name="Path 1902"
                    d="M54.18,43.752a13.656,13.656,0,0,0-12.87-3.233A1.605,1.605,0,1,0,42.1,43.63a10.505,10.505,0,0,1,9.942,2.44,1.562,1.562,0,0,0,1.159.488,1.666,1.666,0,0,0,1.159-.488A1.914,1.914,0,0,0,54.18,43.752Z"
                    transform="translate(-15.618 -22.161)"
                    fill="#fff"
                  />
                </g>
              </svg>
            </v-col>
            <v-col class="col-12 col-md-12">
              <h4>Student Groups</h4>
              <p>
                <strong>{{formatedFacultyCollegeYears.length}}</strong>
              </p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-row>
        <v-card class="users-table pa-4 mx-auto mt-12">
          <v-card-title>
            <v-row>
              <v-col class="col-3"><span class="table--title">Student Group</span></v-col>
              <v-col
              class="col-4 offset-2"
                ><v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                  class="search-field"
                ></v-text-field
              ></v-col>
              <v-col
              class="col-2 offset-1"
                ><v-btn rounded to="/register/faculty">
                  <v-icon color="#fff">mdi-plus</v-icon>Add new Faculty
                </v-btn></v-col
              >
            </v-row>
          </v-card-title>
          <v-data-table :headers="headers" :items="formatedFacultyCollegeYears" sort-by="name">
            <template v-slot:item.actions="{ item }">
              <v-icon color="success" @click="editItem(item)"
                >mdi-eye-outline</v-icon
              >
            </template>
          </v-data-table>
        </v-card>
      </v-row>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    back: () => import("@/components/shared/back-button"),
  },
  data: () => ({
    search: "",
    headers: [
      {
        text: "Faculty",
        align: "start",
        sortable: false,
        value: "faculty_name",
      },
      {
        text: "Year",
        sortable: false,
        value: "year",
      },
      { text: "Attendants", value: "attendants" },
      { text: "Teacher", value: "teacher" },
      { text: "Action", value: "actions", sortable: false, align: "center" },
    ],
  }),
  computed: {
    // get the faculties
    ...mapGetters("faculties", ["facultyCollegeYears"]),
    formatedFacultyCollegeYears(){
      let results = []
      for (const i in this.facultyCollegeYears) {
        results.push({
          faculty_name: this.facultyCollegeYears[i].facultyCollege.faculty.name,
          year:  `year ${this.facultyCollegeYears[i].collegeYear.digit}`,
          attendants: this.facultyCollegeYears[i].attendants
        })
      }
      return results
    }
  },
  methods: {
    ...mapActions("faculties", ["getFacultyCollegeYears"]),
  },
  created() {
    // load faculties
    this.getFacultyCollegeYears(this.$store.state.user.user.college);
  },
};
</script>

<style lang="scss" scoped>
#faculty-page {
  height: 625px;
  background-color: #f9faff;
  h2 {
    font-weight: 400;
    margin: 0px 60px 0;
  }
  .faculties-card {
    width: 25%;
    text-align: center;
    border-radius: 18px;
    padding: 12px;
    margin: -20px auto;
    box-shadow: none;
    h4 {
      font-weight: 300;
      margin-bottom: 12px;
    }
  }
}
</style>