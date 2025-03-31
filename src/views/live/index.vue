<template>
  <v-container class="live_video customScroll" fluid>
    <v-row>
      <v-col class="col-6 text-center mx-auto">
        <v-text-field
          v-model="name"
          placeholder="Enter your name"
          class="text-field"
          solo
        />
        <v-btn
          :color="primary"
          class="white--text next-chapter px-12"
          rounded
          @click="openOrJoinGroup"
          >Open or join Default room</v-btn
        ></v-col
      >
    </v-row>
  </v-container>
</template>

<script>
import colors from "@/assets/sass/imports/_colors.scss";
import { mapState, mapMutations } from "vuex";
import * as io from "socket.io-client";
window.io = io;
import * as RTCMultiConnection from "../../assets/js/RTCMultiConnection";

export default {
  name: "LiveClass",
  data: () => ({
    connection: new RTCMultiConnection(),
    primary: colors.primary,
    name: "",
    videosList: [],
  }),
  computed: {
    ...mapState("live", ["room"]),
  },
  methods: {
    ...mapMutations("live", {
      addParticipant: "ADD_PARTICIPANT",
    }),
    openOrJoinGroup() {
      const vm = this;
      if (this.name == "") alert("name is required");
      this.connection.extra.userFullName = name;
      // this.connection.openOrJoin(this.name);
      vm.connection.checkPresence(this.room.id, function (isRoomExist) {
        vm.connection.isInitiator = false;
        vm.addParticipant({
          name: vm.name,
          isInitiator: !isRoomExist,
        });
        vm.$router.push("/live/room");
      });
    },
  },
  mounted() {
    const vm = this;

    // ......................................................
    // ..................RTCMultiConnection Code.............
    // ......................................................

    // by default, socket.io server is assumed to be deployed on your own URL
    vm.connection.socketURL = `${process.env.VUE_APP_api_service_url}/`;

    vm.connection.socketMessageEvent = this.room.id;

    // keep room opened even if owner leaves
    vm.connection.autoCloseEntireSession = true;

    vm.connection.connectSocket(function (socket) {
      socket.on("disconnect", function () {
        location.reload();
      });
    });
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