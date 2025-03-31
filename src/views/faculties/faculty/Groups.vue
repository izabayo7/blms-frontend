<template>
  <div class="my-faculties bg-one d-flex justify-center">
    <div class="faculties-container  ">
      <div class="tabular-users">
        <div class="table-wrapper mt-6" v-if="facultyCollegeYears.length > 0">
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
                    <template #text>Notify</template>
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
          <div class="table">
            <table-ui :options="options" :data="facultyCollegeYears"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableHeader from "../../../components/reusable/ui/table-header";
import TableUi from "../../../components/reusable/ui/table-ui";
import tableActionBurner from '../../../components/reusable/ui/table-action-burner'
import {mapGetters} from "vuex";


export default {
  //TODO add dynamic facalty groups
  name: "FacultyGroups",
  components: {TableUi, TableHeader, tableActionBurner},
  data() {
    return {
      facultyId: this.$route.params.facultyId,
      options: {
        keysToShow: ["name", "total_courses", "total_instructors", "total_students"]
      }
    }
  },
  computed: {
    ...mapGetters('faculties', ['faculty']),
    ...mapGetters('faculty_college_year', ['facultyCollegeYears']),
  },
  async mounted() {
    await this.$store.dispatch('faculties/getFaculty', this.facultyId);
    await this.$store.dispatch('faculty_college_year/getFacultyCollegeYearsByFaculty', {facultyId: this.facultyId})
    await this.$store.dispatch('faculties/changeHeader', {title: "Student Groups List"})
  }
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