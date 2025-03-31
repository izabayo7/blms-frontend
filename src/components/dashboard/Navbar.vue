<template>
  <div class="my-navbar">
    <div class="hidden-md-and-up row">
      <div class="col-8 logo_container">
        <img :src="college_logo" class="logo my-auto" />
      </div>
      <div class="col-4 vertically--centered">
        <div class="profile mt-n4">
          <profile />
        </div>
      </div>
    </div>
    <div class="hidden-sm-and-down row">
      <div
        :class="`col-6 py-0 col-md-${
          showCreateCourseButton ? '7' : '8'
        } d-flex top-left-contents`"
      >
        <div class="toggle ml-2 my-auto">
          <button class="toogle" @click="toggle">
            <svg
              v-if="state"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M3 4h18v2H3V4zm0 7h12v2H3v-2zm0 7h18v2H3v-2z" />
            </svg>
          </button>
        </div>
        <div class="vertically--centered">
          <img :src="college_logo" class="logo" @click="$router.push('live/class/course/test')" />
        </div>
      </div>
      <div :class="`py-0 col-${showCreateCourseButton ? '5' : '4'} d-flex`">
        <div
          v-if="showCreateCourseButton"
          class="create_course vertically--centered"
        >
          <v-btn rounded dark class="add_course white--text" to="/courses/new">
            <svg
              id="add-line"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                id="Path_1632"
                data-name="Path 1632"
                d="M0,0H24V24H0Z"
                fill="none"
              />
              <path
                id="Path_1633"
                data-name="Path 1633"
                d="M11,11V5h2v6h6v2H13v6H11V13H5V11Z"
                fill="#fff"
              />
            </svg>
            Create new course
          </v-btn>
        </div>
        <v-spacer></v-spacer>
        <div class="vertically--centered">
          <notifications />
        </div>
        <div class="profile">
          <profile />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Apis from "@/services/apis";
import { mapMutations, mapState } from "vuex";
export default {
  name: "Navbar",
  components: {
    notifications: () => import("@/components/reusable/Notification"),
    profile: () => import("./Profile"),
  },
  computed: {
    ...mapState("sidebar_navbar", { state: "sidebar_expanded" }),
    showCreateCourseButton() {
      return (
        this.$store.state.user.user.category.name === "INSTRUCTOR" &&
        this.$route.path !== "/courses/new"
      );
    },
  },
  data: () => ({
    college_logo: "https://apis.kurious.rw/assets/images/image%204.png",
  }),
  methods: {
    ...mapMutations("sidebar_navbar", {
      toggle: "TOGGLE_SIDEBAR_EXPANSION",
      set_college: "SET_COLLEGE_INFO",
    }),
  },
  async created() {
    const res = await Apis.get(
      `college/${this.$store.state.user.user.college}`
    );
    this.set_college(res.data.data);
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
  max-height: 69px;
  padding: 0 !important;
  z-index: 100;
  .top-left-contents div {
    width: 10%;
  }
  .top-left-contents div:nth-child(2) {
    // width: 80%;
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
  .toogle {
    svg {
      width: 30px;
      height: 30px;
      fill: $primary;
    }
  }
  .logo_container {
    display: flex;
    justify-content: left;
    align-items: left;
  }
}
</style>