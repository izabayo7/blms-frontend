<template>
  <v-navigation-drawer
    :v-model="$store.state.sidebar.visible"
    app
    mobile-breakpoint="960"
    :mini-variant.sync="miniVariant"
    :mini-variant-width="99"
    id="sidebar"
    :width="breakPoint === 'xs' ? '50%' : breakPoint === 'sm' ? '25%' : '15%'"
    height="100%"
  >
    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
        <v-list-item-icon>
          <v-icon medium>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  components: {
    // KuriousLibrary : () => import('@/assets/icons/library.svg'),
  },
  data() {
    return {
      // items: this.sidebarItems(),
      sideBar: true,
      right: null,
      smallDevices: ["xs", "sm", "md"],
    };
  },
  computed: {
    visible() {
      return this.$store.state.sidebar.visible;
    },
    miniVariant() {
      return ["xs", "sm", "md"].includes(this.$vuetify.breakpoint.name)
        ? false
        : this.$store.state.sidebar.minivariant;
    },
    breakPoint() {
      return this.$vuetify.breakpoint.name;
    },
    items() {
      if (this.$store.state.user.category === "Student") {
        return [
          { title: "Courses", icon: "mdi-projector-screen", to: "/courses" },
          { title: "Reports", icon: "mdi-file-chart", to: "/reports" },
          { title: "My Library", icon: "mdi-bookshelf", to: "/library" },
          { title: "Messages", icon: "mdi-message", to: "/messages" },
        ];
      } else if (this.$store.state.user.category === "Instructor") {
        return [
          { title: "Courses", icon: "mdi-projector-screen", to: "/courses" },
          { title: "Submissions", icon: "mdi-image", to: "/reports" },
          { title: "My Library", icon: "mdi-help-box", to: "/library" },
          { title: "Messages", icon: "mdi-message", to: "/messages" },
          { title: "Quiz", icon: "mdi-clipboard-text", to: "/quiz" },
        ];
      } else if (this.$store.state.user.category === "Admin") {
        return [
          { title: "Users", icon: "mdi-account-multiple", to: "/users" },
          { title: "Messages", icon: "mdi-message", to: "/messages" },
        ];
      } else {
        return [];
      }
    },
  },
};
</script>