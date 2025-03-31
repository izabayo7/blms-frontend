<template>
    <instructor-deep-reports v-if="userCategory === 'INSTRUCTOR'" />
    <student-deep-reports v-else />
</template>
<script>
export default {
  components: {
    studentDeepReports: () => import("@/views/reports/student/deep.reports"),
    instructorDeepReports: () => import("@/views/reports/instructor/deep.reports"),
  },
  computed: {
    // get the userCategory
    userCategory() {
      return this.$store.state.user.user.category.name;
    },
  },
};
</script>