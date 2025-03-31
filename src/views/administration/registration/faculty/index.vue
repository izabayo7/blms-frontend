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
                Faculty Registration
              </h1>
            </v-col>
            <v-col class="col-12 col-md-5">
              <label>Import Faculty</label>
              <v-select
                v-model="selectedFacultyName"
                :items="facultyNames"
                chips
                dense
                outlined
                class="user-select"
              >
                <template v-if="selectedFacultyName !== ''" v-slot:append-outer>
                  <v-slide-x-reverse-transition mode="out-in">
                    <v-icon
                      :color="'info'"
                      @click="selectedFacultyName = ''"
                      v-text="'mdi-close'"
                    />
                  </v-slide-x-reverse-transition>
                </template>
              </v-select>
            </v-col>
            <v-col class="col-12 col-md-2 vertically--centered"> Or </v-col>
            <v-col class="col-12 col-md-5">
              <label>Faculty Name</label>
              <v-text-field v-model="name" type="text" solo />
            </v-col>
            <v-col class="col-12">
              <h3>Dean</h3>
              <v-select
                v-model="selectedUserName"
                :items="userNames"
                chips
                dense
                outlined
                class="user-select"
              ></v-select>
              <v-row v-if="selectedUser" class="user-details pa-4 user-select">
                <v-col class="col-12 px-0">
                  Email
                  <span class="font-weight-bold caption">{{
                    selectedUser.email
                  }}</span>
                </v-col>
                <v-col class="col-12 px-0">
                  Phone number
                  <span class="font-weight-bold">{{ selectedUser.phone }}</span>
                </v-col>
              </v-row>
            </v-col>
            <v-col class="col-12 mx-auto">
              <v-btn
                rounded
                x-large
                class="action-button px-12"
                @click="saveFaculty"
              >
                Create faculty
              </v-btn>
              <v-btn
                color="transparent"
                class="cancel-user mt-n2 ml-4 py-6 px-16"
                @click="$router.push('/administration/faculties')"
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
    selectedUserName: "",
    selectedFacultyName: "",
    primary: colors.primary,
    name: "",
  }),
  computed: {
    // get users
    ...mapGetters("users", ["users", "loaded"]),
    // get the faculties
    ...mapGetters("faculties", ["importable_faculties", "i_loaded"]),
    selectedUser() {
      const result = this.users.filter(
        (user) => user.surName + " " + user.otherNames == this.selectedUserName
      )[0];
      return result ? result : undefined;
    },
    selectedFaculty() {
      const result = this.importable_faculties.filter(
        (d) => d.name == this.selectedFacultyName
      )[0];
      return result ? result : undefined;
    },
    userNames() {
      let result = [];
      for (const i in this.users) {
        result.push(`${this.users[i].surName} ${this.users[i].otherNames}`);
      }
      return result;
    },
    facultyNames() {
      let result = [];
      for (const i in this.importable_faculties) {
        result.push(this.importable_faculties[i].name);
      }
      return result;
    },
  },
  methods: {
    ...mapActions("faculties", [
      "createFaculty",
      "getImportableFaculties",
      "createFacultyCollege",
    ]),
    ...mapActions("users", ["getUsers"]),
    async saveFaculty() {
      if (!this.selectedFaculty) {
        await this.createFaculty({
          faculty: {
            name: this.name,
          },
        }).then((d) => {
          this.createFacultyCollege({
            faculty: d.data._id,
            college: this.$store.state.user.user.college,
          }).then(() => {
            this.$router.push("/administration/faculties");
          });
        });
      } else {
        this.createFacultyCollege({
          faculty: this.selectedFaculty._id,
          college: this.$store.state.user.user.college,
        }).then(() => {
          this.$router.push("/administration/faculties");
        });
      }
    },
  },
  created() {
    if (!this.loaded) {
      //get users on page load
      this.getUsers({
        collegeId: this.$store.state.user.user.college,
      });
    }
    if (!this.i_loaded) {
      //get importable faculties on page load
      this.getImportableFaculties({
        collegeId: this.$store.state.user.user.college,
      });
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