<template>
  <section class="dashboard">
    <!-- sidebar -->
    <main class="sidebar">
      <sidebar />
    </main>

    <!-- navbar and dashboard content -->
    <main class="contents">
      <div class="my-navbar">
        <navbar />
      </div>
      <div class="main-content customScroll">
        <router-view />
      </div>
    </main>
  </section>
</template>
<script>
import sidebar from "@/components/Sidebar-new";
import navbar from "@/components/Navbar-new";

export default {
  name: "Sidebar",
  components: {
    sidebar,
    navbar,
  },
};
</script>
<style lang="scss">
.dashboard {
  display: flex;
  flex-direction: row;
  width: 100%;

  .my-navbar {
    width: 100%;
    z-index: 50;
    position: static;
    background: $main;
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
    flex-direction: column;
    .main-content {
      height: calc(100vh - 76px);
      overflow-y: auto;
      // overflow-x: hidden;
    }
  }
}
</style>