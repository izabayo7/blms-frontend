<template>
  <div class="my-navbar row">
    <div class="col-2 d-flex top-left-contents">
      <div class="toggle ml-2">
        <v-icon large @click="toggle">mdi-menu</v-icon>
      </div>
      <div class="vertically--centered">
        <img :src="college_logo" class="logo" />
      </div>
    </div>
    <!-- <div class="col-3 vertically--centered">
      <img :src="college_logo" class="logo" />
    </div> -->
    <div class="my-search col-6">
      <search />
    </div>
    <div
      :class="`notification  offset-lg-1 col-1${
        !showCreateCourseButton ? '' : ''
      }`"
    >
      <notifications />
    </div>
    <div class="profile col-2">
      <profile />
    </div>
  </div>
</template>
<script>
import Apis from "@/services/apis";
import { mapMutations } from "vuex";
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
  data: () => ({
    college_logo: "https://apis.kurious.rw/assets/images/image%204.png",
  }),
  methods: {
    ...mapMutations("sidebar_navbar", { toggle: "TOGGLE_SIDEBAR_EXPANSION" }),
  },
  async created() {
    const res = await Apis.get(
      `college/${this.$store.state.user.user.college}`
    );
    this.college_logo = res.data.data.logo || this.college_logo;
  },
};
</script>
<style lang="scss" scoped>
.my-navbar {
  background-color: $main;
  // box-shadow: 10px 0 10px 0 $secondary;
  width: 100%;
  display: flex;
  padding: 0 !important;
  z-index: 100;
  .top-left-contents div {
    width: 50%;
  }
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
  .logo {
    max-width: 100%;
    max-height: 50px;
  }
}
</style>