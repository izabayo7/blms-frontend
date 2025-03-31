<template>
  <div class="my-navbar row">
    <div class="my-search col-5">
      <search />
    </div>
    <div v-if="$store.state.user.user.category === 'Instructor' && $route.name !== 'Create course'" class="create_course col-2">
      <v-btn
        rounded
        dark
        class="add_course mt-3 white--text"
        to="/courses/new-course"
      >
        <v-icon>mdi-plus</v-icon>Create new class
      </v-btn>
    </div>
    <div :class="`notification col-1 offset-${$store.state.user.user.category === 'Instructor' && $route.name !== 'Create course' ? 1 : 3}`">
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
    profile: () => import("@/components/reusable/Profile"),
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
    margin: auto;
  }
  .add_course{
    background-color: $primary !important;
  }
}
</style>