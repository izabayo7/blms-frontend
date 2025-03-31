<template>
  <v-container class="live_video customScroll" fluid>
    <v-row>
      <v-col class="col-6 text-center mx-auto">
        <v-text-field
          v-model="id"
          placeholder="Enter your name"
          class="text-field"
          solo
        />
        <v-btn
          :color="primary"
          class="white--text next-chapter px-12"
          rounded
          :disabled="!id.length || id.length < 5"
          @click="setRoomId(id);$router.push(`/live/room/${id}`)"
          >Open or join room</v-btn
        ></v-col
      >
    </v-row>
  </v-container>
</template>

<script>
import colors from "@/assets/sass/imports/_colors.scss";
import { mapState, mapMutations } from "vuex";

export default {
  name: "LiveClass",
  data: () => ({
    primary: colors.primary,
    id: "",
    videosList: [],
  }),
  computed: {
    ...mapState("live", ["room"]),
  },
  methods: {
    ...mapMutations("live", {
      setRoomId: "SET_ROOM_ID",
    }),
  },
};
</script>

<style lang="scss" scoped>
.live_video {
  background-color: #f6f6f6;
  height: calc(100vh - 5rem);
  max-height: calc(100vh - 76px);
  overflow-y: auto;
  .row {
    height: inherit;
    place-items: center;
  }
}
</style>