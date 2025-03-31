<template>
  <v-container class="live_video customScroll" fluid>
    <v-row id="liveClass">
      <v-btn
        @click="toggle"
        class="hidden-md-and-up mr-n8 white--text"
        color="#FFC100"
        right
        bottom
        rounded
        fixed
        ><v-icon>mdi-arrow-left</v-icon></v-btn
      >
      <kurious-page-actions class="hidden-md-and-up">
        <kurious-discussion-board
          v-if="$store.state.user.user.category.name === 'STUDENT'"
          :host="sender"
        />
        <kurious-instructor-action-board
          v-else-if="$store.state.user.user.category.name === 'INSTRUCTOR'"
          :participants="room.participants"
        />
      </kurious-page-actions>
      <v-col class="col-12 col-md-8">
        <v-row>
          <h1></h1>
        </v-row>
        <v-row>
          <v-col class="col-12" id="video">
            <vue-plyr>
              <video id="video-preview" controls loop></video>
            </vue-plyr>
          </v-col>
          <v-col class="col-12 course-title d-block">{{ courseName }}</v-col>
          <v-col
            v-if="$store.state.user.type === 'student'"
            class="col-12 description"
          >
            <div id="broadcast-viewers-counter"></div>
            <div class="more_actions">
              <button>Mute sound</button>
              <button>Mute video</button>
              <button>Share screen</button>
              <button>Exit</button>
            </div>
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
          :host="sender"
        />
        <kurious-instructor-action-board
          v-else-if="$store.state.user.user.category.name === 'INSTRUCTOR'"
          :participants="room.participants"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import * as io from "socket.io-client";
window.io = io;
import * as RTCMultiConnection from "../../assets/js/RTCMultiConnection";

export default {
  name: "LiveClass",
  data: () => ({
    connection: new RTCMultiConnection(),
    courseName: "Economy Basics",
    sender: {},
  }),
  computed: {
    ...mapState("live", ["room"]),
  },
  methods: {
    ...mapMutations("sidebar_navbar", {
      toggle: "TOGGLE_PAGE_ACTIONS_VISIBILITY",
    }),

    // ask node.js server to look for a broadcast
    // if broadcast is available, simply join it. i.e. "join-broadcaster" event should be emitted.
    // if broadcast is absent, simply create it. i.e. "start-broadcasting" event should be fired.
    open_or_join_room() {
      var broadcastId = this.room.id;
      if (broadcastId.replace(/^\s+|\s+$/g, "").length <= 0) {
        alert("Please enter broadcast-id");
        return;
      }

      const vm = this;

      vm.connection.extra.broadcastId = broadcastId;

      vm.connection.session = {
        audio: true,
        video: true,
        oneway: true,
      };

      vm.connection.getSocket(function (socket) {
        socket.emit(
          "check-broadcast-presence",
          broadcastId,
          (isBroadcastExists) => {
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
          }
        );
      });
    },
  },
  mounted() {
    const vm = this;

    // ......................................................
    // ..................RTCMultiConnection Code.............
    // ......................................................

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

    vm.connection.extra.userFullName = `${vm.$store.state.user.user.sur_name} ${vm.$store.state.user.user.other_names}`;
    vm.connection.extra.userProfile = `${vm.$store.state.user.user.profile}`;

    /// make this room public
    vm.connection.publicRoomIdentifier = vm.room.id;

    // its mandatory in v3
    vm.connection.enableScalableBroadcast = true;

    // each relaying-user should serve only 1 users
    vm.connection.maxRelayLimitPerUser = 1;

    // we don't need to keep room-opened
    // scalable-broadcast.js will handle stuff itself.
    vm.connection.autoCloseEntireSession = true;

    vm.connection.socketMessageEvent = "scalable-media-broadcast-demo";

    // by default, socket.io server is assumed to be deployed on your own URL
    vm.connection.socketURL = `${process.env.VUE_APP_api_service_url}/`;

    // auto create or join default room
    vm.open_or_join_room();

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

    let videoPreview = document.getElementById("video-preview"),
      localStream;

    document.querySelector("#btn-get-mixed-stream").onclick = function () {
      // if (mixerOptions.value === 'camera-screen') {
      // updateMediaHTML('Capturing screen');
      // getMixedCameraAndScreen();
      // }
    };

    document.querySelector("#btn-get-video-stream").onclick = function () {
      // connection.addStream('video');
      localStream = vm.connection.streamEvents.selectFirst({
        local: true,
      }).stream;
      localStream.unmute("video");
    };

    document.querySelector("#btn-get-audio-stream").onclick = function () {
      // connection.addStream('audio');
      localStream = vm.connection.streamEvents.selectFirst({
        local: true,
      }).stream;
      localStream.unmute();
    };

    // remove screen
    document.querySelector("#btn-remove-mixed-stream").onclick = function () {
      // connection.removeStream(mixedStream.id);
      localStream = vm.connection.streamEvents.selectFirst({
        local: true,
      }).stream;
      localStream.mute("screen");
    };

    // remove video
    document.querySelector("#btn-remove-video-stream").onclick = function () {
      // connection.removeStream('video');
      localStream = vm.connection.streamEvents.selectFirst({
        local: true,
      }).stream;
      localStream.mute("video");
    };

    // remove video
    document.querySelector("#btn-remove-audio-stream").onclick = function () {
      // connection.removeStream('audio');
      localStream = vm.connection.streamEvents.selectFirst({
        local: true,
      }).stream;
      localStream.mute("audio");
    };

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

    // show participants
    vm.connection.onUserStatusChanged = function () {
      vm.room.participants = [];
      vm.connection.getAllParticipants().forEach(function (pid) {
        getFullName(pid);
      });
    };

    function getFullName(userid) {
      var _userFullName = userid,
        userProfile;
      if (
        vm.connection.peers[userid] &&
        vm.connection.peers[userid].extra.userFullName
      ) {
        _userFullName = vm.connection.peers[userid].extra.userFullName;
        userProfile = vm.connection.peers[userid].extra.userProfile;
      }

      if (vm.room.id == vm.connection.peers[userid].userid)
        vm.sender = {
          name: _userFullName,
          profile: userProfile != "undefined" ? userProfile : undefined,
        };
      else {
        const participant_found = vm.room.participants.filter(
          (p) => p.name == _userFullName
        );
        if (
          !participant_found.length &&
          _userFullName != vm.connection.extra.userFullName
        )
          vm.room.participants.push({
            name: _userFullName,
            profile: userProfile != "undefined" ? userProfile : undefined,
            attendance: 100,
          });
      }
    }

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
  max-height: calc(100vh - 5rem);
  overflow-y: auto;
  video {
    max-height: 355px;
  }
}
</style>