<!--faculties list page-->
<template>
  <div class="my-faculties bg-one d-flex justify-center">
    <div class="faculties-container  ">

      <!--    faculty header-->
      <div class="header">
        <div class="header-wrapper d-flex ">
          <!--          header title-->
          <div class="heading col d-flex align-center">
            <div class="icon">
              <div class="icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="49" height="38" viewBox="0 0 49 38" fill="none">
                  <rect x="36.2266" y="10.3643" width="9.34646" height="9.34646" rx="4.67323" fill="#193074"/>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M32.916 28.3897H48.8837C48.5444 24.2775 45.0995 21.046 40.8998 21.046C36.7002 21.046 33.2553 24.2775 32.916 28.3897Z"
                        fill="#193074"/>
                  <rect x="26.8804" y="0.350098" width="9.34646" height="9.34646" rx="4.67323" fill="#193074"/>
                  <rect x="14.1958" y="0.350098" width="9.34646" height="9.34646" rx="4.67323" fill="#193074"/>
                  <rect x="4.18213" y="10.3643" width="9.34646" height="9.34646" rx="4.67323" fill="#193074"/>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M0.871582 28.3895H16.8392C16.5 24.2774 13.0551 21.0459 8.85541 21.0459C4.65574 21.0459 1.21083 24.2774 0.871582 28.3895Z"
                        fill="#193074"/>
                  <rect x="20.2056" y="19.0428" width="9.34646" height="9.34646" rx="4.67323" fill="#193074"/>
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M16.8926 37.0682H32.8602C32.521 32.956 29.0761 29.7245 24.8764 29.7245C20.6767 29.7245 17.2318 32.956 16.8926 37.0682Z"
                        fill="#193074"/>
                </svg>
              </div>
            </div>
            <div class="text-content">
              <h4>Dashboard</h4>
              <h2>Faculties List</h2>
            </div>
          </div>

          <!--          search bar-->
          <div class="search col">
            <div class="search-wrapper">
              <search placeholder="Search user"/>
            </div>
          </div>

          <!--          add user button-->
          <div class="add-user d-flex justify-end col">
            <div class="add-user-button">
              <button-ui @click="showFacultyModal = true">
                <template #content>Create faculty</template>
              </button-ui>
            </div>
          </div>
        </div>
      </div>


      <!--    table of faculties-->
      <div class="tabular-faculties">
        <div class="table-wrapper" v-if="formatedFaculties.length > 0">

          <!--          table header-->
          <div class="table-header">
            <table-header>
              <template #actions>
                <div class="action mx-2" @click="click('notify')">
                  <table-action-burner>
                    <template #icon>
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path
                            d="M3.14576 1.55151L2.41437 0.80361C1.18685 1.76071 0.378734 3.23559 0.307129 4.90921H1.33006C1.40678 3.52324 2.10237 2.30987 3.14576 1.55151ZM9.48281 4.90921H10.5057C10.429 3.23559 9.62091 1.76071 8.39851 0.80361L7.67223 1.55151C8.70539 2.30987 9.40609 3.52324 9.48281 4.90921ZM8.47523 5.17071C8.47523 3.56508 7.63642 2.22096 6.17363 1.86531V1.50967C6.17363 1.07557 5.83095 0.725159 5.40644 0.725159C4.98192 0.725159 4.63924 1.07557 4.63924 1.50967V1.86531C3.17133 2.22096 2.33765 3.55985 2.33765 5.17071V7.78574L1.31472 8.83175V9.35476H9.49816V8.83175L8.47523 7.78574V5.17071ZM5.40644 10.9238C5.47804 10.9238 5.54453 10.9185 5.61102 10.9029C5.94347 10.8296 6.21455 10.5995 6.34753 10.2857C6.39868 10.1602 6.42425 10.0242 6.42425 9.87776H4.37839C4.38351 10.4531 4.83871 10.9238 5.40644 10.9238Z"
                            fill="#193074"/>
                      </svg>
                    </template>
                    <template #text>send notification</template>
                  </table-action-burner>
                </div>
                <div class="action mx-2" @click="click('editUserGroup')">
                  <table-action-burner>
                    <template #icon>
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0.875 9.78135V12.1251H3.21875L10.1312 5.2126L7.7875 2.86885L0.875 9.78135ZM11.9437 3.4001C12.1875 3.15635 12.1875 2.7626 11.9437 2.51885L10.4813 1.05635C10.2375 0.812598 9.84375 0.812598 9.6 1.05635L8.45625 2.2001L10.8 4.54385L11.9437 3.4001Z"
                            fill="#193074"/>
                      </svg>
                    </template>
                    <template #text>Edit user group</template>
                  </table-action-burner>
                </div>
              </template>
            </table-header>
          </div>

          <!--          list of faculties in table-->
          <div class="table">
            <table-ui :options="options" :data="formatedFaculties"/>
          </div>
        </div>
      </div>
    </div>
    <faculty-dialog
        v-if="showFacultyModal"
        @closeModal="showFacultyModal = false"
    />
  </div>
</template>

<script>
import buttonUi from '@/components/reusable/ui/button-ui'
import Search from "../../components/reusable/Search2";
import TableHeader from "../../components/reusable/ui/table-header";
import TableUi from "../../components/reusable/ui/table-ui";
import moment from "moment";
import {mapGetters} from 'vuex'
import TableActionBurner from "../../components/reusable/ui/table-action-burner";

export default {
  name: "Faculties",
  components: {
    TableActionBurner,
    TableUi,
    TableHeader,
    Search,
    buttonUi,
    FacultyDialog: () => import("@/components/dashboard/addFaculty"),
  },
  data() {
    return {
      // faculties:[],
      showFacultyModal: false,
      options: {
        keysToShow: ["name", "attendants", "total_courses", "total_student_groups", "total_students"],
        link: {
          routeTo: "/faculties/{id}/details",
          paramPropertyName: "_id",

        },
        showSelect: true
      },
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
    ...mapGetters('faculties', ['faculties']),
    formatedFaculties() {
      let filteredFaculties = [];

      this.faculties.map(faculty => {

        faculty.createdAt = moment(faculty.createdAt).format("DD MMM  YYYY")
        faculty.updatedAt = moment(faculty.updatedAt).format("DD MMM YYYY")
        //TODO finalising faculties

        filteredFaculties.push(faculty)
      })

      return filteredFaculties;
    }
  },
  methods: {},
  async created() {
    await this.$store.dispatch('faculties/getFaculties');
  },
}
</script>

<style lang="scss" scoped>
.my-faculties {
  height: 100%;
  width: 100%;

  .faculties-container {
    height: 100%;
    width: 90%;

    .header {
      @include admin-page-header;
    }

  }
}
</style>