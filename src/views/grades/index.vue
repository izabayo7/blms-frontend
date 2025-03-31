<template>
  <v-app id="grades-page">
    <h1>My grades</h1>
    <instructor-grades v-if="userCategory === 'INSTRUCTOR'" />
    <student-grades v-else />
  </v-app>
</template>
<script>
export default {
  components: {
    studentgrades: () => import("@/views/grades/student/main.grades"),
    instructorgrades: () => import("@/views/grades/instructor/main.grades"),
  },
  computed: {
    // get the userCategory
    userCategory() {
      return this.$store.state.user.user.category.name;
    },
  },
};
</script>