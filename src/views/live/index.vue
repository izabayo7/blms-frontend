<template>
  <v-container class="live_video customScroll" fluid>
    <v-row>
      <video-item v-for="(item, i) in videosList" :todo="item" :key="i">
      </video-item>
    </v-row>
    <v-row>
      <v-col class="col-6 text-center mx-auto">
        <v-text-field
          placeholder="Enter meeting name"
          class="text-field"
          solo
        />
        <v-btn :color="primary" class="white--text next-chapter px-12" rounded
          id="open-or-join-room">Open or join</v-btn
        ></v-col
      >
    </v-row>
  </v-container>
</template>

<script>
import colors from "@/assets/sass/imports/_colors.scss";
// eslint-disable-next-line no-unused-vars
import io from "socket.io-client";
import * as RTCMultiConnection from "../../assets/js/RTCMultiConnection";

const component = {
  name: "LiveClass",
  components: {
    videoItem: {
      props: ["video_obj"],
      template:
        '<video controls autoplay playsinline :srcObject.prop="video_obj.srcObject" :muted="video_obj.muted" :id="video_obj.id"></video>',
    },
  },
  data: () => ({
    primary: colors.primary,
    courseName: "Economy Basics",
    videosList: [],
  }),
  // mounted() {
  //   const socket_plugin = document.createElement("script");
  //   socket_plugin.setAttribute("src", `${process.env.VUE_APP_api_service_url}/socket.io/socket.io.js`);
  //   socket_plugin.async = true;
  //   document.head.appendChild(socket_plugin);

  //   const rtc_plugin = document.createElement("script");
  //   rtc_plugin.setAttribute("src", "../../assets/js/RTCMultiConnection.min.js");
  //   rtc_plugin.async = true;
  //   document.head.appendChild(rtc_plugin);

  // },
};

export default component;

// ......................................................
// ..................RTCMultiConnection Code.............
// ......................................................

// eslint-disable-next-line no-undef
var connection = new RTCMultiConnection();

// by default, socket.io server is assumed to be deployed on your own URL
connection.socketURL = `${process.env.VUE_APP_api_service_url}/socket.io/socket.io.js`;

connection.socketMessageEvent = "video-conference-demo";

connection.session = {
  audio: true,
  video: true,
};

console.log(this.courseName);

connection.sdpConstraints.mandatory = {
  OfferToReceiveAudio: true,
  OfferToReceiveVideo: true,
};

// https://www.rtcmulticonnection.org/docs/iceServers/
// use your own TURN-server here!
connection.iceServers = [
  {
    urls: [
      "stun:stun.l.google.com:19302",
      "stun:stun1.l.google.com:19302",
      "stun:stun2.l.google.com:19302",
      "stun:stun.l.google.com:19302?transport=udp",
    ],
  },
];

document.getElementById('open-or-join-room').onclick = function() {
    connection.openOrJoin(document.getElementById('room-id').value);
};

connection.autoCreateMediaElement = false;
connection.onstream = function (event) {
  this.videosList.push({
    id: event.streamid,
    srcObject: event.stream,
    muted: event.type === "local",
  });
};

connection.onstreamended = function (event) {
  var newList = [];
  this.videosList.forEach(function (item) {
    if (item.id !== event.streamid) {
      newList.push(item);
    }
  });
  this.videosList = newList;
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