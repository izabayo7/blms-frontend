<template>
  <router-view />
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "Index",
  computed: {
    ...mapGetters("chat", ["socket"]),
  },
  methods: {
    ...mapMutations("notification", ["addNotification"]),
    ...mapMutations("courses", ["addCourse"]),
  },
  mounted() {
    // listen to new notifications
    this.socket.on("new-notification", ({ notification }) => {
      this.addNotification(notification);
    });
    // listen to new course
    this.socket.on("new-course", (course) => {
      this.addCourse(course);
    });
  },
};
</script>