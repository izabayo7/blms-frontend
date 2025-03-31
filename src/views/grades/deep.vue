<template>
    <instructor-deep-grades v-if="userCategory === 'INSTRUCTOR'" />
    <student-deep-grades v-else />
</template>
<script>
export default {
  components: {
    studentDeepgrades: () => import("@/views/grades/student/deep.grades"),
    instructorDeepgrades: () => import("@/views/grades/instructor/deep.grades"),
  },
  computed: {
    // get the userCategory
    userCategory() {
      return this.$store.state.user.user.category.name;
    },
  },
};
</script>