<template>
  <v-container class="live_video customScroll" fluid>
    <v-row>
      <vue-plyr v-for="(item, i) in videosList" :key="i">
        <video
          controls
          autoplay
          playsinline
          :srcObject.prop="item.srcObject"
          :muted="item.muted"
          :id="item.id"
        ></video>
      </vue-plyr>
    </v-row>
    <v-row>
      <v-col class="col-6 text-center mx-auto">
        <v-text-field
          v-model="name"
          placeholder="Enter meeting name"
          class="text-field"
          solo
        />
        <v-btn
          :color="primary"
          class="white--text next-chapter px-12"
          rounded
          @click="openOrJoinGroup"
          >Open or join</v-btn
        ></v-col
      >
    </v-row>
  </v-container>
</template>

<script>
import colors from "@/assets/sass/imports/_colors.scss";

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
  methods: {
    addVideos(video_obj) {
      console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", video_obj);
      this.videosList.push(video_obj);
    },
    resetVideos(videos) {
      this.videosList = videos;
    },
    openOrJoinGroup() {
      if (this.name == "") alert("name is required");
      this.connection.openOrJoin(this.name);
    },
  },
  mounted() {
    const vm = this;

    // ......................................................
    // ..................RTCMultiConnection Code.............
    // ......................................................

    // by default, socket.io server is assumed to be deployed on your own URL
    this.connection.socketURL = `${process.env.VUE_APP_api_service_url}/`;

    this.connection.socketMessageEvent = "video-conference-demo";

    this.connection.session = {
      audio: true,
      video: true,
    };

    this.connection.sdpConstraints.mandatory = {
      OfferToReceiveAudio: true,
      OfferToReceiveVideo: true,
    };

    // https://www.rtcmulticonnection.org/docs/iceServers/
    // use your own TURN-server here!
    this.connection.iceServers = [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
          "stun:stun.l.google.com:19302?transport=udp",
        ],
      },
    ];

    this.connection.autoCreateMediaElement = false;

    this.connection.onstream = (event) => {
      try {
        console.log(event);

        vm.addVideos({
          id: event.streamid,
          srcObject: event.stream,
          muted: event.type === "local",
        });
      } catch (error) {
        console.log(error);
      }
    };

    this.connection.onstreamended = function (event) {
      var newList = [];
      vm.data().videosList.forEach(function (item) {
        if (item.id !== event.streamid) {
          newList.push(item);
        }
      });
      vm.resetVideos(newList);
    };
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