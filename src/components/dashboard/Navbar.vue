<template>
  <div class="my-navbar row">
    <div class="my-search col-5">
      <search />
    </div>
    <div v-if="showCreateCourseButton" class="create_course col-2">
      <v-btn
        rounded
        dark
        class="add_course mt-3 white--text hidden-md-and-down"
        to="/courses/new"
      >
        <v-icon>mdi-plus</v-icon>Create new course
      </v-btn>
      <v-btn
        dark
        icon
        class="add_course mt-3 white--text hidden-lg-and-up"
        to="/courses/new-course"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <div
      :class="`notification col-1 offset-1 ${
        !showCreateCourseButton ? 'offset-md-3' : ''
      }`"
    >
      <notifications />
    </div>
    <div class="profile col-3">
      <profile />
    </div>
  </div>
</template>
<script>
export default {
  name: "Navbar",
  components: {
    search: () => import("@/components/reusable/Search"),
    notifications: () => import("@/components/reusable/Notification"),
    profile: () => import("./Profile"),
  },
  computed: {
    showCreateCourseButton() {
      return (
        this.$store.state.user.user.category.name === "INSTRUCTOR" &&
        this.$route.name !== "Create course"
      );
    },
  },
};
</script>
<style lang="scss" scoped>
.my-navbar {
  background-color: $main;
  box-shadow: 10px 0 10px 0 lighten($color: $primary, $amount: 20);
  width: 100%;
  display: flex;
  padding: 0 !important;

  .my-search,
  .notification,
  .profile {
    padding: 0.4rem;
    // justify-content: center;
    align-items: center;
  }

  .my-search {
    // padding-left: 5rem;
    margin-top: auto;
    margin-bottom: auto;
  }
  .add_course {
    background-color: $primary !important;
  }
}
</style>