<template>
  <div id="faculty-page">
    <v-btn @click="$router.push(`/admin`)" class="back-btn">
      <v-icon>mdi-chevron-left</v-icon>Back
    </v-btn>
    <v-row>
      <v-col class="col-12 col-md-12">
        <h2>Facutly</h2>
        <v-card class="faculties-card">
          <v-row>
            <v-col class="col-12 col-md-12">
              <v-icon>mdi-table-chair</v-icon>
            </v-col>
            <v-col class="col-12 col-md-12">
              <h4 class="centered">Classes</h4>
              <p class="centered">
                <strong>79</strong>
              </p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-row>
        <v-card class="faculties-table">
          <v-card-title>
            Faculties
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search faculty"
              single-line
              hide-details
            ></v-text-field>
            <v-btn rounded @click="$router.push(`/register/faculty`)">
              <v-icon>mdi-plus</v-icon>Add new Faculty
            </v-btn>
          </v-card-title>
          <v-data-table :headers="headers" :items="faculties" sort-by="name">
            <template v-slot:item.actions="{ item }">
              <v-icon color="success" @click="editItem(item)">mdi-eye-outline</v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-row>
    </v-row>
  </div>
</template>

<script>
import Apis from "@/services/apis";
export default {
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
    faculties: [],
  }),
  beforeMount() {
    this.getFaculties();
  },
  methods: {
    async getFaculties() {
      try {
        const response = await Apis.get(
          `facility/college/${this.$store.state.user.college}`
        );
        for (const faculty of response.data) {
          this.faculties.push({
            name: faculty.name,
            attendants: 250,
            teacher: "Kankindi Marie",
          });
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
  },
};
</script>

<style lang="scss" scoped>
#faculty-page {
  height: 625px;
  background-color: whitesmoke;
  button.back-btn.v-btn.v-btn--contained.theme--light.v-size--default {
    height: 25px;
    border-radius: 20px;
    font-size: 11px;
    margin: 30px 50px 0;
  }
  h2 {
    font-weight: 400;
    margin: 0px 60px 0;
  }
  .faculties-card {
    width: 200px;
    margin: -20px auto;
    box-shadow: none;
    i.v-icon.notranslate.mdi.mdi-table-chair.theme--light {
      background-color: #ffd248;
      color: #fff;
      font-size: 50px;
      padding: 8px;
      border-radius: 35px;
      margin-left: 66px;
    }
    .centered {
      text-align: center;
    }
    h4 {
      font-weight: 300;
    }
  }
  .faculties-table {
    width: 800px;
    margin: 20px 300px 0;
    box-shadow: none;
    .v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
      background-color: #ffd248;
      color: #fff;
      font-size: 12px;
    }
    .mdi {
      margin-left: 15px;
    }
    button.v-icon.notranslate.v-icon--link.mdi.mdi-eye.theme--light {
      font-size: 20px !important;
    }
    .v-input__slot {
      width: 260px;
    }
  }
  .v-input.v-input--hide-details.theme--light.v-text-field.v-text-field--single-line.v-text-field--is-booted {
    margin-left: 200px;
  }
}
</style>