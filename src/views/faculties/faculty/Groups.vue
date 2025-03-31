<template>
  <div class="my-faculties bg-one d-flex justify-center">
    <div class="faculties-container  row">
      <div v-for="item in facultyCollegeYears" :key="item._id" class="col-12 col-md-4">
        <StudentGroupCard :item="item"/>
      </div>
    </div>
  </div>
</template>

<script>
import StudentGroupCard from "../../../components/dashboard/StudentGroupCard";
import {mapGetters} from "vuex";


export default {
  //TODO add dynamic facalty groups
  name: "FacultyGroups",
  components: {StudentGroupCard},
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
  background-color: #FFFFFF;
  padding: 30px;
  min-height: 66.3vh;

  .faculties-container {
    height: 100%;
    width: 90%;

    .header {
      @include admin-page-header;
    }
  }
}

/* Portrait phones and smaller */
@media (max-width: 700px) {
  .my-faculties {
    padding-left: 10px;
  }
}
</style>