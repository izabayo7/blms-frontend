<template>
  <section :class="{'hfull': isMobile && $route.name === 'chatingRoom' && state}" class="dashboard">
    <!-- navbar -->
    <div class="my-navbar">
      <navbar v-if="!(isMobile && $route.name === 'chatingRoom' && state)"/>
    </div>

    <transition name="fade">
      <div id="user-profile-card">
        <user-simple-card :loading="userByUsernameLoading" @close="mouseOutPic($event,'user-profile-card')">
          <template #name>{{ userByUsername.other_names + " " + userByUsername.sur_name }}</template>
          <template #type>{{ userByUsername.category }}</template>
          <template #image>
            <img v-if="userByUsername.profile" :src="userByUsername.profile + '?width=50'" alt=" profile pic">
            <v-avatar v-else :size="30" class="profile-avatar">
              {{ `${userByUsername.sur_name} ${userByUsername.other_names}` | computeText }}
            </v-avatar>
          </template>
        </user-simple-card>
      </div>
    </transition>

    <!-- sidebar and dashboard content -->
    <main class="contents">
      <main class="sidebar">
        <div class="hidden-md-and-up row">
          <mobile-sidebar v-if="$route.name !== 'chatingRoom' || !state"/>
        </div>
        <div class="hidden-sm-and-down row">
          <sidebar/>
        </div>
      </main>
      <div class="main-content customScroll">
        <notification/>
        <router-view v-if="showPage"/>
        <div v-if="!$route.path.includes('messages')" class="lower-space"></div>
      </div>
    </main>
  </section>
</template>
<script>
import sidebar from "@/components/dashboard/Sidebar";
import MobileSidebar from "@/components/dashboard/MobileSidebar";
import navbar from "@/components/dashboard/Navbar";
import {mapGetters, mapState} from "vuex";
import UserSimpleCard from "../../components/reusable/user-simple-card";
import userSimpleCard from "../../mixins/user-simple-card.mixin";
import userPayment from "../../mixins/user-payments.mixin";

export default {
  name: "Dashboard",
  components: {
    sidebar,
    MobileSidebar,
    navbar,
    UserSimpleCard,
    Notification: () => import("@/components/shared/Notification"),
  },
  mixins: [userSimpleCard, userPayment],
  created() {
    this.redirect()
  },
  computed: {
    ...mapState("sidebar_navbar", {state: "showChatMobileNavbar"}),
    ...mapGetters('users', ['userByUsername', 'userByUsernameLoading']),
    isMobile() {
      return this.$vuetify.breakpoint.width < 960
    },
  },
  watch: {
    $route() {
      this.redirect()
    }
  },
  data() {
    return {
      error: false,
    };
  },
};
</script>
<style lang="scss">
.dashboard {
  // display: flex;
  // flex-direction: row;
  width: 100%;
  height: 100vh;

  .my-navbar {
    width: 100%;
    z-index: 50;
    position: static;
    background: $main;
    box-shadow: 10px 0 10px 0 $secondary;
  }

  .sidebar {
    width: fit-content;
    z-index: 100;
    background: $main;
    // position: fixed;
  }

  .contents {
    width: 100%;
    display: flex;
    // flex-direction: row;
    .main-content {
      height: calc(100vh - 62px);
      width: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      background: $tertiary;

      .lower-space {
        height: 40px;
      }
    }
  }

  &.hfull {
    .contents {
      .main-content {
        height: 100vh;
      }
    }
  }
}

.error-enter-active,
.error-leave-active {
  transition: 0.3s ease-in-out;
}

.error-enter,
.error-leave-to {
  opacity: 0;
  transform: translateY(100px);
}

</style>
