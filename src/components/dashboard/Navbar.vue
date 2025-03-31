<template>
  <div class="my-navbar row">
    <div
      :class="`col-6 py-0 col-md-${
        showCreateCourseButton ? '7' : '8'
      } d-flex top-left-contents mt-n6`"
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
        <img :src="college_logo" class="logo" />
      </div>
    </div>
    <div :class="`py-0 col-${showCreateCourseButton ? '5' : '4'} d-flex`">
      <div class="hidden-md-and-up vertically--centered">
        <v-btn
          dark
          icon
          class="add_course white--text hidden-lg-and-up"
          to="/courses/new"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"
              fill="#fff"
            />
          </svg>
        </v-btn>
      </div>
      <div
        v-if="showCreateCourseButton"
        class="create_course vertically--centered mt-n6"
      >
        <v-btn
          rounded
          dark
          class="add_course white--text hidden-md-and-down"
          to="/courses/new"
        >
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
        <v-btn
          dark
          icon
          class="add_course white--text ma-auto hidden-lg-and-up"
          to="/courses/new"
        >
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
        </v-btn>
      </div>
      <v-spacer></v-spacer>
      <div class="vertically--centered mt-n6">
        <notifications />
      </div>
      <div class="profile">
        <profile />
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
      fill: $primary;
    }
  }
}
</style>