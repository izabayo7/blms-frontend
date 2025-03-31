<template>
    <instructor-deep-reports v-if="userCategory === 'INSTRUCTOR'" />
    <student-deep-reports v-else />
</template>
<script>
export default {
  components: {
    studentDeepReports: () => import("@/views/grades/student/deep.grades"),
    instructorDeepReports: () => import("@/views/grades/instructor/deep.grades"),
  },
  computed: {
    // get the userCategory
    userCategory() {
      return this.$store.state.user.user.category.name;
    },
  },
};
</script>