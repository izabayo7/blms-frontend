<template>
  <v-app id="admin-dashboard">
    <h2>
      Welcome,
      <strong>Ahmed Mugu</strong>
    </h2>
    <v-row>
      <v-col class="col-md-3 col-12">
        <v-card class="details-card">
          <v-row>
            <v-col class="col-4 px-0">
              <svg
                class="small-icons"
                xmlns="http://www.w3.org/2000/svg"
                width="57"
                height="53"
                viewBox="0 0 57 53"
              >
                <rect
                  id="Rectangle_1057"
                  data-name="Rectangle 1057"
                  width="57"
                  height="53"
                  rx="10"
                  fill="#ff5858"
                />
                <g id="user" transform="translate(9.039 10.718)">
                  <g
                    id="Group_102"
                    data-name="Group 102"
                    transform="translate(8.886 0)"
                  >
                    <path
                      id="Path_1897"
                      data-name="Path 1897"
                      d="M26.2,25.494a10.1,10.1,0,1,1,10.1-10.1A10.127,10.127,0,0,1,26.2,25.494Zm0-16.787A6.721,6.721,0,1,0,32.95,15.4,6.76,6.76,0,0,0,26.2,8.708Z"
                      transform="translate(-16.1 -5.3)"
                      fill="#fff"
                    />
                  </g>
                  <g
                    id="Group_103"
                    data-name="Group 103"
                    transform="translate(-0.001 21.078)"
                  >
                    <path
                      id="Path_1898"
                      data-name="Path 1898"
                      d="M1.661,52.8A1.377,1.377,0,0,1,.418,52.1,1.638,1.638,0,0,1,.6,49.768,27.954,27.954,0,0,1,19.056,42.7a27.169,27.169,0,0,1,18.283,7.068,1.71,1.71,0,0,1,.177,2.335,1.467,1.467,0,0,1-2.189.189,24.361,24.361,0,0,0-32.719.126A1.617,1.617,0,0,1,1.661,52.8Z"
                      transform="translate(-0.01 -42.7)"
                      fill="#fff"
                    />
                  </g>
                </g>
              </svg>
            </v-col>
            <v-col class="col-8 pl-6">
              <h4>Users</h4>
              <p>
                <strong>{{ users.length + 1 }}</strong>
              </p>
            </v-col>
          </v-row>
        </v-card>
        <v-card class="details-card" to="/administration/faculties">
          <v-row>
            <v-col class="col-4 px-0">
              <svg
                class="small-icons"
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="55"
                viewBox="0 0 60 55"
              >
                <rect
                  id="Rectangle_1063"
                  data-name="Rectangle 1063"
                  width="60"
                  height="55"
                  rx="10"
                  fill="#ffd24a"
                />
                <g id="school-bench-alt" transform="translate(8.929 13.75)">
                  <path
                    id="Path_1903"
                    data-name="Path 1903"
                    d="M53.014,15.7a1.684,1.684,0,0,0-1.768,1.768v5.238H40.77a3.493,3.493,0,0,0-3.47,3.47v3.47a3.339,3.339,0,0,0,1.768,2.946v5.762a1.768,1.768,0,0,0,3.536,0V33.117h8.708v5.238a1.768,1.768,0,1,0,3.536,0V17.468A1.775,1.775,0,0,0,53.014,15.7ZM40.836,29.646v-3.47H51.312v3.47Z"
                    transform="translate(-12.877 -12.622)"
                    fill="#fff"
                  />
                  <path
                    id="Path_1904"
                    data-name="Path 1904"
                    d="M20.232,15.452,4.19,11.131a3.212,3.212,0,0,0-2.815.524A3.639,3.639,0,0,0,0,14.6V17.94A3.48,3.48,0,0,0,2.423,21.28l1.048.327V36.8a1.633,1.633,0,0,0,1.768,1.7,1.684,1.684,0,0,0,1.768-1.768V22.655l8.708,2.423V36.8a1.768,1.768,0,1,0,3.536,0v-11h.2a2.562,2.562,0,0,0,1.9-.72,3.771,3.771,0,0,0,1.375-2.815V18.923A3.814,3.814,0,0,0,20.232,15.452Zm-1.048,6.81L3.47,17.875V14.536l15.714,4.387Z"
                    transform="translate(0 -11)"
                    fill="#fff"
                  />
                </g>
              </svg>
            </v-col>
            <v-col class="col-8 pl-6">
              <h4>Faculties</h4>
              <p>
                <strong>20</strong>
              </p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col class="col-md-3 col-12">
        <v-card class="details-card" to="/administration/studentGroup">
          <v-row>
            <v-col class="col-4 px-0">
              <svg
                class="small-icons"
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="55"
                viewBox="0 0 60 55"
              >
                <rect
                  id="Rectangle_1059"
                  data-name="Rectangle 1059"
                  width="60"
                  height="55"
                  rx="10"
                  fill="#4592ee"
                />
                <g id="users" transform="translate(8.929 13.75)">
                  <path
                    id="Path_1899"
                    data-name="Path 1899"
                    d="M16.708,28.117a8.708,8.708,0,0,0,0-17.417,8.708,8.708,0,0,0,0,17.417Zm0-13.946a5.238,5.238,0,1,1-5.238,5.238A5.171,5.171,0,0,1,16.708,14.17Z"
                    transform="translate(-2.746 -10.7)"
                    fill="#fff"
                  />
                  <path
                    id="Path_1900"
                    data-name="Path 1900"
                    d="M13.938,40A18.914,18.914,0,0,0,.515,45.762a1.628,1.628,0,0,0,0,2.423,1.68,1.68,0,0,0,2.423,0,15.88,15.88,0,0,1,11-4.714,16.249,16.249,0,0,1,11,4.714,1.916,1.916,0,0,0,1.244.524,1.789,1.789,0,0,0,1.244-.524,1.628,1.628,0,0,0,0-2.423A19.413,19.413,0,0,0,13.938,40Z"
                    transform="translate(0.025 -20.816)"
                    fill="#fff"
                  />
                  <path
                    id="Path_1901"
                    data-name="Path 1901"
                    d="M45.238,31.776A5.238,5.238,0,1,0,40,26.538,5.171,5.171,0,0,0,45.238,31.776Zm0-6.94A1.768,1.768,0,1,1,43.47,26.6,1.65,1.65,0,0,1,45.238,24.836Z"
                    transform="translate(-13.793 -14.36)"
                    fill="#fff"
                  />
                  <path
                    id="Path_1902"
                    data-name="Path 1902"
                    d="M55.217,44.022A14.659,14.659,0,0,0,41.4,40.552a1.723,1.723,0,1,0,.851,3.339A11.277,11.277,0,0,1,52.925,46.51a1.676,1.676,0,0,0,1.244.524,1.789,1.789,0,0,0,1.244-.524A2.055,2.055,0,0,0,55.217,44.022Z"
                    transform="translate(-13.82 -20.844)"
                    fill="#fff"
                  />
                </g>
              </svg>
            </v-col>
            <v-col class="col-8 pl-6">
              <h4>Student Groups</h4>
              <p>
                <strong>8</strong>
              </p>
            </v-col>
          </v-row>
        </v-card>
        <v-card class="details-card">
          <v-row>
            <v-col class="col-4 px-0">
              <svg
                class="small-icons"
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="55"
                viewBox="0 0 60 55"
              >
                <rect
                  id="Rectangle_1065"
                  data-name="Rectangle 1065"
                  width="60"
                  height="55"
                  rx="10"
                  fill="#fe9438"
                />
              </svg>
            </v-col>
            <v-col class="col-8 pl-6">
              <h4>Courses</h4>
              <p>
                <strong>16</strong>
              </p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col class="col-md-3 col-12">
        <v-card class="details-card">
          <v-row>
            <v-col class="col-4 px-0">
              <svg
                class="small-icons"
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="55"
                viewBox="0 0 60 55"
              >
                <rect
                  id="Rectangle_1061"
                  data-name="Rectangle 1061"
                  width="60"
                  height="55"
                  rx="10"
                  fill="#72fb9b"
                />
                <path
                  id="wallet"
                  d="M31.109,13.613h-.573V7.933a2.016,2.016,0,0,0-.99-1.824,1.85,1.85,0,0,0-1.928-.261L1.511,13.613c-.261.156-.573.261-.677.417A1.959,1.959,0,0,0,0,15.7V30.861A2.224,2.224,0,0,0,2.241,33.1H31.162A2.224,2.224,0,0,0,33.4,30.861V15.853A2.3,2.3,0,0,0,31.109,13.613Zm-3.335-5v5H11.256ZM2.762,30.288V16.427H30.536v2.762h-6.1a4.169,4.169,0,1,0,0,8.338h6.1v2.762H2.762ZM30.588,21.95v2.762H24.439a1.407,1.407,0,0,1,0-2.814h6.149Z"
                  transform="translate(13.187 7.778)"
                  fill="#fff"
                />
              </svg>
            </v-col>
            <v-col class="col-8 pl-6">
              <h4>Payment history</h4>
              <p>
                <strong>16</strong>
              </p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col class="col-md-3 col-12">
        <v-card v-if="college" class="school-card">
          <v-row>
            <v-col class="col-12">
              <img
                v-if="college.logo"
                :alt="college.name + ' logo photo'"
                class="preview-media"
                :src="college.logo"
              />
              <h1 v-else>{{ college.name.toUpperCase()[0] }}</h1>
            </v-col>
            <v-col class="col-12">
              <h5>{{ college.name | trimString(25) }}</h5>
              <v-btn
                rounded
                @click="
                  $router.push(`/administration/colleges/${college.name}`)
                "
                class="mt-2"
                >View school details</v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-card class="users-table pa-4">
        <v-card-title>
          <v-row>
            <v-col class="col-3"><span class="table--title">Users</span></v-col>
            <v-col class="col-4 offset-2">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                class="search-field"
              ></v-text-field
            ></v-col>
            <v-col class="col-2 offset-1">
              <v-btn rounded to="/administration/register/users">
                <v-icon color="#fff" class="mr-2">mdi-account-plus-outline</v-icon>Add new user
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="users"
          :search="search"
          sort-by="name"
        >
          <template v-slot:item.name="{ item }">
            {{ `${item.surName} ${item.otherNames}` }}
          </template>
          <template v-slot:item.faculty="{ item }">
            {{
              item.category === "Instructor"
                ? "-"
                : item.studentFacultyCollegeYear.facultyCollegeYear
                    .facultyCollege.faculty.name
            }}
          </template>
          <template v-slot:item.group="{ item }">
            {{
              item.category === "Instructor"
                ? "Teachers"
                : `Year ${item.studentFacultyCollegeYear.facultyCollegeYear.collegeYear.digit}`
            }}
          </template>
          <template v-slot:item.date="{ item }">
            {{ item.createdAt | formatDate }}
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              color="success"
              @click="$router.push(`reports/submissions/${item.name}`)"
              >mdi-account-edit</v-icon
            >
            <v-icon
              small
              color="error"
              @click="$router.push(`reports/submissions/${item.name}`)"
              >mdi-delete</v-icon
            >
            <v-icon
              small
              color="warning"
              @click="$router.push(`reports/submissions/${item.name}`)"
              >mdi-eye</v-icon
            >
          </template>
          <template v-slot:no-data>
            <span class="text-h6">Oops You have not yet created a user.</span>
          </template>
        </v-data-table>
      </v-card>
    </v-row>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    search: "",
    headers: [
      {
        text: "Names",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "User type", value: "category" },
      { text: "User gender", value: "gender" },
      { text: "User's faculty", value: "faculty" },
      { text: "Group", value: "group" },
      { text: "Date added", value: "date" },
      { text: "Action", value: "actions", sortable: false, align: "center" },
    ],
  }),
  computed: {
    // get the userCategory
    userCategory() {
      return this.$store.state.user.user.category;
    },
    // get users
    ...mapGetters("users", ["users", "loaded"]),
    ...mapGetters("colleges", ["college", "c_loaded"]),
  },
  methods: {
    ...mapActions("users", ["getUsers"]),
    ...mapActions("colleges", ["getCollegeById"]),
  },
  created() {
    if (!this.loaded) {
      //get users on page load
      this.getUsers({
        collegeId: this.$store.state.user.user.college,
      });
    }
    if (!this.c_loaded) {
      //get college on page load
      this.getCollegeById({
        collegeId: this.$store.state.user.user.college,
      });
    }
  },
};
</script>
<style lang="scss" scoped>
.preview-media {
  margin-left: 27%;
  border: 1px solid $primary;
  color: black;
  width: 100px;
  padding: 6px;
  height: 100px;
  border-radius: 180px;
  padding: 0;
  align-self: stretch;
  object-fit: cover;
}
</style>