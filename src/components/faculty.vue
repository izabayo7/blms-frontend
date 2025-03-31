<template>
  <div id="faculty-page">
    <back class="ma-6" to="/administration" />
    <v-row>
      <v-col class="col-12 col-md-12">
        <h2>Facutly</h2>
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
                  fill="#ffd24a"
                />
                <g id="school-bench-alt" transform="translate(21.909 29.304)">
                  <path
                    id="Path_1903"
                    data-name="Path 1903"
                    d="M52.09,15.7a1.585,1.585,0,0,0-1.664,1.664v4.93h-9.86A3.288,3.288,0,0,0,37.3,25.56v3.266A3.142,3.142,0,0,0,38.964,31.6v5.423a1.664,1.664,0,0,0,3.328,0v-4.93h8.2v4.93a1.664,1.664,0,0,0,3.328,0V17.364A1.671,1.671,0,0,0,52.09,15.7ZM40.628,28.826V25.56h9.86v3.266Z"
                    transform="translate(-14.313 -12.803)"
                    fill="#fff"
                  />
                  <path
                    id="Path_1904"
                    data-name="Path 1904"
                    d="M19.042,15.19l-15.1-4.067a3.023,3.023,0,0,0-2.65.493A3.425,3.425,0,0,0,0,14.389v3.143a3.275,3.275,0,0,0,2.28,3.143l.986.308v14.3a1.537,1.537,0,0,0,1.664,1.6,1.585,1.585,0,0,0,1.664-1.664V21.969l8.2,2.28V35.281a1.664,1.664,0,1,0,3.328,0V24.927H18.3a2.412,2.412,0,0,0,1.787-.678,3.549,3.549,0,0,0,1.294-2.65V18.457A3.589,3.589,0,0,0,19.042,15.19ZM18.056,21.6,3.266,17.471V14.328l14.79,4.129Z"
                    transform="translate(0 -11)"
                    fill="#fff"
                  />
                </g>
              </svg>
            </v-col>
            <v-col class="col-12 col-md-12">
              <h4>Classes</h4>
              <p>
                <strong>79</strong>
              </p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-row>
        <v-card class="users-table pa-4 mx-auto mt-12">
          <v-card-title>
            <v-row>
              <v-col class="col-3"
                ><span class="table--title">Faculties</span></v-col
              >
              <v-col class="col-4 offset-2">
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                  class="search-field"
                ></v-text-field>
              </v-col>
              <v-col class="col-2 offset-1">
                <v-btn rounded to="/administration/register/faculty">
                  <v-icon color="#fff">mdi-plus</v-icon>Add new Faculty
                </v-btn>
              </v-col>
            </v-row>
          </v-card-title>
          <v-data-table :headers="headers" :items="faculties" sort-by="name">
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
        value: "name",
      },
      { text: "Attendants", value: "attendants" },
      { text: "Teacher", value: "teacher" },
      { text: "Action", value: "actions", sortable: false, align: "center" },
    ],
  }),
  computed: {
    // get the faculties
    ...mapGetters("faculties", ["faculties"]),
  },
  methods: {
    ...mapActions("faculties", ["getFaculties"]),
  },
  created() {
    // load faculties
    this.getFaculties(this.$store.state.user.user.college);
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
    padding: 12px;
    border-radius: 18px;
    margin: -20px auto;
    box-shadow: none;
    .centered {
      text-align: center;
    }
    h4 {
      font-weight: 300;
      margin-bottom: 12px;
    }
  }
}
</style>