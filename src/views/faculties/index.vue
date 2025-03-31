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
<!--              <search placeholder="Search user"/>-->
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
      <div class="tabular-faculties" v-if="formatedFaculties.length < 0">
        <div class="table-wrapper">

          <!--          list of faculties in table-->
          <div class="table">
            <table-ui :options="options">
              <template #tableHeaderRow>
                <table-head-row :showSelect="false" :cols="options.keysToShow"/>
              </template>

              <template #tableRows>
                <table-row :show-select="false" :data="faculty" :options="options"
                           v-for="faculty in formatedFaculties" :key="faculty._id" @click="$router.push(`/faculties/{${faculty._id}/details`)">
                  <template #cols>
                    <td>
                      <div class="first">{{ faculty.name }}</div>
                      <div class="second">Updated {{ faculty.updatedAt }}</div>
                    </td>
                    <td class="center">{{ faculty.total_student_groups }}</td>
                    <td>
                      <div class="first">{{ faculty.name }}</div>
                      <div class="second">{{ faculty.updatedAt }}</div>
                    </td>
                    <td>{{ faculty.createdAt }}</td>
                    <td class="center">{{ faculty.total_students }}</td>
                  </template>
                </table-row>
              </template>
            </table-ui>
          </div>
        </div>
      </div>
      <div v-else class="empty-faculties">
        <div class="wrapper">
          <div class="icon">
            <svg width="50" height="56" viewBox="0 0 50 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25.0001 55.7692C24.921 55.7692 24.8417 55.7623 24.7635 55.7485C10.1831 53.1912 0 44.4159 0 34.4085V1.3463C0 0.602805 0.608023 0 1.35795 0H48.642C49.392 0 50 0.602805 50 1.3463V34.4085C50 44.4159 39.8169 53.1912 25.2365 55.7485C25.1583 55.7623 25.0792 55.7692 25.0001 55.7692Z" fill="#BABABC"/>
              <path d="M25.5 16.1852L10 11V33.8148L25.5 39M25.5 16.1852L41 11V32.7778L25.5 39M25.5 16.1852V39M30.6667 21.3704L36.8667 19.2963M30.6667 27.5926L36.8667 25.5185M20.3333 27.5926L14.1333 25.5185M20.3333 21.3704L14.1333 19.2963" stroke="#F7F7F7" stroke-width="1.39569" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="title">No faculty</div>
          <div class="subtitle">Your school has no faculty for now
            create one by clicking on
          </div>
          <button @click="showFacultyModal = true" class="action">
            Create Faculty
          </button>
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
// import Search from "../../components/reusable/Search2";
import TableUi from "../../components/reusable/table/TableUi";
import TableRow from "../../components/reusable/table/TableRow";
import TableHeadRow from "../../components/reusable/table/TableHeadRow";
import moment from "moment";
import {mapGetters} from 'vuex'
import {elapsedDuration} from "../../services/global_functions";

export default {
  name: "Faculties",
  components: {
    TableUi,
    TableRow,
    // Search,
    buttonUi,
    TableHeadRow,
    FacultyDialog: () => import("@/components/dashboard/addFaculty"),
  },
  data() {
    return {
      // faculties:[],
      showFacultyModal: false,
      allSelected: false,
      options: {
        keysToShow: ["Faculty", "Student groups", "Assigned dean", "Date created", "Students"],
        link: {
          routeTo: "/faculties/{id}/details",
          paramPropertyName: "_id",

        }
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
        faculty.updatedAt = elapsedDuration(faculty.updatedAt)
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
@import '../../assets/sass/imports/tableEmptyState';
.my-faculties {
  height: 100%;
  width: 100%;

  .faculties-container {
    height: 100%;
    width: 90%;

    .header {
      @include admin-page-header;
    }

    td {
      &.center{
        padding-left: 2rem;
      }
      font-family: Mulish;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.2px;
      color: #252733;
      cursor: pointer;

      .first {
        margin-bottom: 6px;
        margin-top: 20px;
      }

      .second {
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
        margin-bottom: 20px;
        letter-spacing: 0.1px;
        color: #C5C7CD;
      }
    }

  }
}
/* Portrait phones and smaller */
@media (max-width: 700px) {
  .my-faculties {
    .users-page-container {
      .students-table{
        overflow: auto;
        .table-wrapper{
          min-width: 808px;
          overflow: auto;
        }
      }
    }
  }
}
</style>