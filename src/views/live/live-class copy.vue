<template>
  <v-container class="live_video customScroll" fluid>
    <v-row id="liveClass">
      <v-btn
        @click="showActions = true"
        class="hidden-md-and-up mr-n8 white--text"
        color="#FFC100"
        right
        bottom
        rounded
        fixed
        ><v-icon>mdi-arrow-left</v-icon></v-btn
      >
      <kurious-page-actions
        v-on:hideActions="showActions = false"
        :visible="showActions"
        class="hidden-md-and-up"
      >
        <kurious-discussion-board v-if="$store.state.user.type === 'student'" />
        <kurious-instructor-action-board v-else />
      </kurious-page-actions>
      <v-col class="col-12 col-md-8">
        <v-row>
          <v-col class="col-12" id="video">
            <vue-plyr>
              <video ref="video-preview" controls loop></video>
            </vue-plyr>
          </v-col>
          <v-col class="col-12 course-title d-block">{{ courseName }}</v-col>
          <v-col
            v-if="$store.state.user.type === 'student'"
            class="col-12 description"
          >
            <p>
              JavaScript, often abbreviated as JS, is a programming language
              that conforms to the ECMAScript specification. JavaScript is
              high-level, often just-in-time compiled, and multi-paradigm. It
              has curly-bracket syntax, dynamic typing, prototype-based
              object-orientation, and first-class functions.
            </p>
          </v-col>
          <v-col class="col-12">
            <v-row>
              <v-col
                v-if="$store.state.user.user.category.name === 'STUDENT'"
                class="col-6"
              >
                <v-btn
                  color="#FFC100"
                  class="white--text next-chapter px-12"
                  rounded
                  >Take quiz</v-btn
                >
              </v-col>
              <v-col v-else class="col-12">
                <kurious-comments />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="col-4 hidden-sm-and-down pa-0">
        <kurious-discussion-board
          v-if="$store.state.user.user.category.name === 'STUDENT'"
        />
        <kurious-instructor-action-board
          v-else-if="$store.state.user.user.category.name === 'INSTRUCTOR'"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as io from "socket.io-client";
window.io = io;
import * as RTCMultiConnection from "../../assets/js/RTCMultiConnection";

export default {
  name: "LiveClass",
  data: () => ({
    connection: new RTCMultiConnection(),
    courseName: "Economy Basics",
    items: [
      { finished: true, title: "Photos" },
      { title: "Recipes" },
      { title: "Work" },
      { finished: true, title: "Photos" },
      { title: "Recipes" },
      { title: "Work" },
    ],
    showActions: true,
  }),
  mounted() {
    const vm = this;

    // ......................................................
    // ..................RTCMultiConnection Code.............
    // ......................................................

    // by default, socket.io server is assumed to be deployed on your own URL
    vm.connection.socketURL = `${process.env.VUE_APP_api_service_url}/`;

    // recording is disabled because it is resulting for browser-crash
    // if you enable below line, please also uncomment above "RecordRTC.js"
    // var enableRecordings = false;

    // https://www.rtcmulticonnection.org/docs/iceServers/
    // use your own TURN-server here!
    vm.connection.iceServers = [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:stun1.l.google.com:19302",
          "stun:stun2.l.google.com:19302",
          "stun:stun.l.google.com:19302?transport=udp",
        ],
      },
    ];

    // its mandatory in v3
    vm.connection.enableScalableBroadcast = true;

    // each relaying-user should serve only 1 users
    vm.connection.maxRelayLimitPerUser = 1;

    // we don't need to keep room-opened
    // scalable-broadcast.js will handle stuff itself.
    vm.connection.autoCloseEntireSession = true;

    // by default, socket.io server is assumed to be deployed on your own URL
    vm.connection.socketURL = "/";

    vm.connection.socketMessageEvent = "scalable-media-broadcast-demo";

    // document.getElementById('broadcast-id').value = vm.connection.userid;

    // user need to connect server, so that others can reach him.
    vm.connection.connectSocket(function (socket) {
      socket.on("logs", function (log) {
        document.querySelector("h1").innerHTML = log
          .replace(/</g, "----")
          .replace(/>/g, "___")
          .replace(/----/g, '(<span style="color:red;">')
          .replace(/___/g, "</span>)");
      });

      // this event is emitted when a broadcast is already created.
      socket.on("join-broadcaster", function (hintsToJoinBroadcast) {
        console.log("join-broadcaster", hintsToJoinBroadcast);

        vm.connection.session = hintsToJoinBroadcast.typeOfStreams;
        vm.connection.sdpConstraints.mandatory = {
          OfferToReceiveVideo: !!vm.connection.session.video,
          OfferToReceiveAudio: !!vm.connection.session.audio,
        };
        vm.connection.broadcastId = hintsToJoinBroadcast.broadcastId;
        vm.connection.join(hintsToJoinBroadcast.userid);
      });

      socket.on("rejoin-broadcast", function (broadcastId) {
        console.log("rejoin-broadcast", broadcastId);

        vm.connection.attachStreams = [];
        socket.emit("check-broadcast-presence", broadcastId, function (
          isBroadcastExists
        ) {
          if (!isBroadcastExists) {
            // the first person (i.e. real-broadcaster) MUST set his user-id
            vm.connection.userid = broadcastId;
          }

          socket.emit("join-broadcast", {
            broadcastId: broadcastId,
            userid: vm.connection.userid,
            typeOfStreams: vm.connection.session,
          });
        });
      });

      socket.on("broadcast-stopped", function (broadcastId) {
        // alert('Broadcast has been stopped.');
        // location.reload();
        console.error("broadcast-stopped", broadcastId);
        alert("This broadcast has been stopped.");
      });

      // this event is emitted when a broadcast is absent.
      socket.on("start-broadcasting", function (typeOfStreams) {
        console.log("start-broadcasting", typeOfStreams);

        // host i.e. sender should always use this!
        vm.connection.sdpConstraints.mandatory = {
          OfferToReceiveVideo: false,
          OfferToReceiveAudio: false,
        };
        vm.connection.session = typeOfStreams;

        // "open" method here will capture media-stream
        // we can skip this function always; it is totally optional here.
        // we can use "connection.getUserMediaHandler" instead
        console.log("ahoooooooooo");
        vm.connection.open(vm.connection.userid);
      });
    });

    window.onbeforeunload = function () {
      // Firefox is ugly.
      document.getElementById("open-or-join").disabled = false;
    };

    var videoPreview = document.getElementById("video-preview");

    vm.connection.onstream = function (event) {
      if (vm.connection.isInitiator && event.type !== "local") {
        return;
      }

      vm.connection.isUpperUserLeft = false;
      videoPreview.srcObject = event.stream;
      videoPreview.play();

      videoPreview.userid = event.userid;

      if (event.type === "local") {
        videoPreview.muted = true;
      }

      if (vm.connection.isInitiator == false && event.type === "remote") {
        // he is merely relaying the media
        vm.connection.dontCaptureUserMedia = true;
        vm.connection.attachStreams = [event.stream];
        vm.connection.sdpConstraints.mandatory = {
          OfferToReceiveAudio: false,
          OfferToReceiveVideo: false,
        };

        vm.connection.getSocket(function (socket) {
          socket.emit("can-relay-broadcast");

          if (vm.connection.DetectRTC.browser.name === "Chrome") {
            vm.connection.getAllParticipants().forEach(function (p) {
              if (p + "" != event.userid + "") {
                var peer = vm.connection.peers[p].peer;
                peer.getLocalStreams().forEach(function (localStream) {
                  peer.removeStream(localStream);
                });
                event.stream.getTracks().forEach(function (track) {
                  peer.addTrack(track, event.stream);
                });
                vm.connection.dontAttachStream = true;
                vm.connection.renegotiate(p);
                vm.connection.dontAttachStream = false;
              }
            });
          }

          if (vm.connection.DetectRTC.browser.name === "Firefox") {
            // Firefox is NOT supporting removeStream method
            // that's why using alternative hack.
            // NOTE: Firefox seems unable to replace-tracks of the remote-media-stream
            // need to ask all deeper nodes to rejoin
            vm.connection.getAllParticipants().forEach(function (p) {
              if (p + "" != event.userid + "") {
                vm.connection.replaceTrack(event.stream, p);
              }
            });
          }

          // Firefox seems UN_ABLE to record remote MediaStream
          // WebAudio solution merely records audio
          // so recording is skipped for Firefox.
          // if (vm.connection.DetectRTC.browser.name === "Chrome") {
          //   repeatedlyRecordStream(event.stream);
          // }
        });
      }

      // to keep room-id in cache
      localStorage.setItem(
        vm.connection.socketMessageEvent,
        vm.connection.sessionid
      );
    };

    // ask node.js server to look for a broadcast
    // if broadcast is available, simply join it. i.e. "join-broadcaster" event should be emitted.
    // if broadcast is absent, simply create it. i.e. "start-broadcasting" event should be fired.
    document.getElementById("open-or-join").onclick = function () {
      var broadcastId = document.getElementById("broadcast-id").value;
      if (broadcastId.replace(/^\s+|\s+$/g, "").length <= 0) {
        alert("Please enter broadcast-id");
        document.getElementById("broadcast-id").focus();
        return;
      }

      document.getElementById("open-or-join").disabled = true;

      vm.connection.extra.broadcastId = broadcastId;

      vm.connection.session = {
        audio: true,
        video: true,
        oneway: true,
      };

      vm.connection.getSocket(function (socket) {
        socket.emit("check-broadcast-presence", broadcastId, function (
          isBroadcastExists
        ) {
          if (!isBroadcastExists) {
            // the first person (i.e. real-broadcaster) MUST set his user-id
            vm.connection.userid = broadcastId;
          }

          console.log(
            "check-broadcast-presence",
            broadcastId,
            isBroadcastExists
          );

          socket.emit("join-broadcast", {
            broadcastId: broadcastId,
            userid: vm.connection.userid,
            typeOfStreams: vm.connection.session,
          });
        });
      });
    };

    vm.connection.onstreamended = function () {};

    vm.connection.onleave = function (event) {
      if (event.userid !== videoPreview.userid) return;

      vm.connection.getSocket(function (socket) {
        socket.emit("can-not-relay-broadcast");

        vm.connection.isUpperUserLeft = true;

        if (allRecordedBlobs.length) {
          // playing lats recorded blob
          var lastBlob = allRecordedBlobs[allRecordedBlobs.length - 1];
          videoPreview.src = URL.createObjectURL(lastBlob);
          videoPreview.play();
          allRecordedBlobs = [];
        } else if (vm.connection.currentRecorder) {
          var recorder = vm.connection.currentRecorder;
          vm.connection.currentRecorder = null;
          recorder.stopRecording(function () {
            if (!vm.connection.isUpperUserLeft) return;

            videoPreview.src = URL.createObjectURL(recorder.getBlob());
            videoPreview.play();
          });
        }

        if (vm.connection.currentRecorder) {
          vm.connection.currentRecorder.stopRecording();
          vm.connection.currentRecorder = null;
        }
      });
    };

    var allRecordedBlobs = [];

    // function repeatedlyRecordStream(stream) {
    //   if (!enableRecordings) {
    //     return;
    //   }

    //   vm.connection.currentRecorder = RecordRTC(stream, {
    //     type: "video",
    //   });

    //   vm.connection.currentRecorder.startRecording();

    //   setTimeout(function () {
    //     if (vm.connection.isUpperUserLeft || !connection.currentRecorder) {
    //       return;
    //     }

    //     vm.connection.currentRecorder.stopRecording(function () {
    //       allRecordedBlobs.push(connection.currentRecorder.getBlob());

    //       if (vm.connection.isUpperUserLeft) {
    //         return;
    //       }

    //       vm.connection.currentRecorder = null;
    //       repeatedlyRecordStream(stream);
    //     });
    //   }, 30 * 1000); // 30-seconds
    // }


    // ......................................................
    // ......................Handling broadcast-id................
    // ......................................................

    var broadcastId = "";
    if (localStorage.getItem(vm.connection.socketMessageEvent)) {
      broadcastId = localStorage.getItem(vm.connection.socketMessageEvent);
    } else {
      broadcastId = vm.connection.token();
    }
    var txtBroadcastId = document.getElementById("broadcast-id");
    txtBroadcastId.value = broadcastId;
    txtBroadcastId.onkeyup = txtBroadcastId.oninput = txtBroadcastId.onpaste = function () {
      localStorage.setItem(vm.connection.socketMessageEvent, this.value);
    };

    // below section detects how many users are viewing your broadcast

    vm.connection.onNumberOfBroadcastViewersUpdated = function (event) {
      if (!vm.connection.isInitiator) return;

      document.getElementById("broadcast-viewers-counter").innerHTML =
        "Number of broadcast viewers: <b>" +
        event.numberOfBroadcastViewers +
        "</b>";
    };
  },
};
</script>

<style lang="scss" scoped>
.live_video {
  background-color: #f6f6f6;
  max-height: calc(100vh - 76px);
  overflow-y: auto;
}
</style>