<template>
  <section class="dashboard">
    <!-- navbar -->
    <div class="my-navbar">
      <navbar />
    </div>

    <!-- sidebar and dashboard content -->
    <main class="contents">
      <main class="sidebar">
        <div class="hidden-md-and-up row">
          <mobile-sidebar />
        </div>
        <div class="hidden-sm-and-down row">
          <sidebar />
        </div>
      </main>
      <div class="main-content customScroll">
        <notification :message="'Advanced aerobics course just went live'" :status="'warn'" />
        <router-view />
      </div>
    </main>
    <transition name="error">
      <error-tooltip v-if="error" />
    </transition>
  </section>
</template>
<script>
import sidebar from "@/components/dashboard/Sidebar";
import MobileSidebar from "@/components/dashboard/MobileSidebar";
import navbar from "@/components/dashboard/Navbar";

export default {
  name: "Dashboard",
  components: {
    sidebar,
    MobileSidebar,
    navbar,
    ErrorTooltip: () => import("@/components/reusable/ErrorTooltip"),
    Notification: () => import("@/components/shared/Notification"),
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
      height: calc(100vh - 76px);
      width: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      background: $tertiary;
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