<template>
  <v-app id="reports-page">
    <h1>My Reports</h1>
    <instructor-reports v-if="userCategory === 'INSTRUCTOR'" />
    <student-reports v-else />
  </v-app>
</template>
<script>
export default {
  components: {
    studentReports: () => import("@/views/reports/student.reports"),
    instructorReports: () => import("@/views/reports/instructor.reports"),
  },
  computed: {
    // get the userCategory
    userCategory() {
      return this.$store.state.user.user.category.name;
    },
  },
};
</script>