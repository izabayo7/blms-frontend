<template>
  <div>
    <Admin v-if="userCategory == 'ADMIN'" />
    <Instructor v-else-if="userCategory == 'INSTRUCTOR'" />
    <Student v-if="userCategory == 'STUDENT'" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Index",
  components: {
    Student: () => import("./student"),
    Instructor: () => import("./instructor"),
    Admin: () => import("./admin")
  },
  computed: {
    ...mapGetters("user", ["userCategory"]),
  },
};
</script>