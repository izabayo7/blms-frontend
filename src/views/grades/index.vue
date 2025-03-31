<template>
  <v-app id="grades-page">
    <h1>My grades</h1>
    <instructor-reports v-if="userCategory === 'INSTRUCTOR'" />
    <student-reports v-else />
  </v-app>
</template>
<script>
export default {
  components: {
    studentReports:() => import("@/views/grades/student/main.grades"),
    instructorReports: () => import("@/views/grades/instructor/main.grades"),
  },
  computed: {
    // get the userCategory
    userCategory() {
      return this.$store.state.user.user.category.name;
    },
  },
};
</script>