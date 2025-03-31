<template>
  <div>
    <Admin v-if="userCategory == 'ADMIN'" />
    <Instructor v-else-if="userCategory == 'INSTRUCTOR'" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Index",
  components: {
    Instructor: () => import("./instructor"),
    Admin: () => import("./admin")
  },
  computed: {
    ...mapGetters("user", ["userCategory"]),
  },
};
</script>