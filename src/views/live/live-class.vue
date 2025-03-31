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
      <v-col class="col-12 px-2 px-md-12 col-md-8 pt-0">
        <v-row>
          <h1></h1>
        </v-row>
        <v-row>
          <v-col class="col-12" id="video">
            <div class="player_container">
              <vue-plyr id="player">
                <video ref="video_preview" id="video-preview" loop></video>
              </vue-plyr>
              <div
                :class="`overlay ${playerHovered ? 'hovered' : ''}`"
                @dblclick="enterFullScreen"
              ></div>
              <div :class="`controls ${playerHovered ? 'hovered' : ''}`">
                <button
                  id="toogleScreenShare"
                  :class="`round top_right ${state ? '' : 'expanded'} ${
                    isScreenShared ? 'muted' : ''
                  }`"
                >
                  <svg
                    v-if="!isScreenShared"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24.056"
                    height="16.038"
                    viewBox="0 0 24.056 16.038"
                  >
                    <path
                      id="Icon_material-screen-share"
                      data-name="Icon material-screen-share"
                      d="M20.047,20.033a2,2,0,0,0,1.995-2L22.052,8a2,2,0,0,0-2-2H4.009A2,2,0,0,0,2,8V18.028a2,2,0,0,0,2,2H0v2H24.056v-2Zm-7.016-3.538V14.3c-2.787,0-4.621.852-6.014,2.726.561-2.676,2.115-5.343,6.014-5.884V9.007l4.009,3.739Z"
                      transform="translate(0 -6)"
                      fill="#fff"
                    />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    width="20.318"
                    height="17.778"
                    viewBox="0 0 20.318 17.778"
                  >
                    <path
                      id="Icon_material-stop-screen-share"
                      data-name="Icon material-stop-screen-share"
                      d="M17.965,16.386l1.693,1.693h.66V16.386Zm.652-1.693.008-8.466a1.693,1.693,0,0,0-1.693-1.693H6.112L10.54,8.961c.152-.034.3-.059.466-.085v-1.8l3.386,3.158-1.338,1.244,4.69,4.69a1.678,1.678,0,0,0,.872-1.473ZM2.023,2.595.94,3.67l1.3,1.3a1.679,1.679,0,0,0-.55,1.253v8.466a1.693,1.693,0,0,0,1.693,1.693H0v1.693H15.349l2.294,2.294L18.718,19.3Zm3.9,11.251a6.54,6.54,0,0,1,1.752-3.437l1.346,1.346A5.271,5.271,0,0,0,5.926,13.846Z"
                      transform="translate(0 -2.595)"
                      fill="#fff"
                    />
                  </svg>
                </button>
                <button
                  @click="toogleVideo"
                  :class="{ muted: !videoMuted && videoMuted !== undefined }"
                >
                  <svg
                    v-if="!videoMuted"
                    xmlns="http://www.w3.org/2000/svg"
                    width="19.781"
                    height="13.188"
                    viewBox="0 0 19.781 13.188"
                  >
                    <path
                      id="Icon_awesome-video"
                      data-name="Icon awesome-video"
                      d="M11.546,4.5h-9.9A1.642,1.642,0,0,0,0,6.142v9.9a1.642,1.642,0,0,0,1.642,1.642h9.9a1.642,1.642,0,0,0,1.642-1.642v-9.9A1.642,1.642,0,0,0,11.546,4.5Zm6.5,1.295-3.764,2.6V13.8l3.764,2.593a1.1,1.1,0,0,0,1.731-.886V6.681A1.1,1.1,0,0,0,18.05,5.795Z"
                      transform="translate(0 -4.5)"
                      fill="#fff"
                    />
                  </svg>

                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    width="23.022"
                    height="18.67"
                    viewBox="0 0 23.022 18.67"
                  >
                    <g
                      id="Group_175"
                      data-name="Group 175"
                      transform="translate(-596.198 -253.075)"
                    >
                      <rect
                        id="Rectangle_2705"
                        data-name="Rectangle 2705"
                        width="2.701"
                        height="25.351"
                        rx="1.351"
                        transform="matrix(0.656, -0.755, 0.755, 0.656, 596.198, 255.113)"
                        fill="#fff"
                      />
                      <path
                        id="Subtraction_3"
                        data-name="Subtraction 3"
                        d="M12.215,13.951H1.736A1.738,1.738,0,0,1,0,12.215V2.361L13.072,13.725A1.735,1.735,0,0,1,12.215,13.951Zm7.544-1.164a1.166,1.166,0,0,1-.664-.209L15.114,9.835V4.117L19.1,1.37a1.166,1.166,0,0,1,1.831.937v9.334A1.16,1.16,0,0,1,19.759,12.787ZM13.951,9.257h0L3.3,0h8.914a1.739,1.739,0,0,1,1.736,1.737v7.52Z"
                        transform="translate(598.293 255.399)"
                        fill="#fff"
                      />
                    </g>
                  </svg>
                </button>
                <button
                  @click="toogleSound"
                  :class="{ muted: !muted && muted !== undefined }"
                >
                  <svg
                    v-if="!muted"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16.778"
                    height="24.404"
                    viewBox="0 0 16.778 24.404"
                  >
                    <path
                      id="Icon_awesome-microphone-alt"
                      data-name="Icon awesome-microphone-alt"
                      d="M16.015,9.152h-.763a.762.762,0,0,0-.763.763V12.2a6.108,6.108,0,0,1-6.711,6.072A6.286,6.286,0,0,1,2.288,11.93V9.914a.762.762,0,0,0-.763-.763H.763A.762.762,0,0,0,0,9.914v1.914a8.652,8.652,0,0,0,7.245,8.66v1.628H4.576a.762.762,0,0,0-.763.763v.763a.762.762,0,0,0,.763.763H12.2a.762.762,0,0,0,.763-.763v-.763a.762.762,0,0,0-.763-.763H9.533v-1.61a8.4,8.4,0,0,0,7.245-8.3V9.914A.762.762,0,0,0,16.015,9.152ZM8.389,16.778A4.576,4.576,0,0,0,12.965,12.2V4.576a4.576,4.576,0,0,0-9.152,0V12.2A4.576,4.576,0,0,0,8.389,16.778Z"
                      fill="#fff"
                    />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    width="20.757"
                    height="21.391"
                    viewBox="0 0 20.757 21.391"
                  >
                    <g
                      id="Group_174"
                      data-name="Group 174"
                      transform="translate(-356.198 -240.16)"
                    >
                      <path
                        id="Subtraction_2"
                        data-name="Subtraction 2"
                        d="M10.7,21.391H4.01a.669.669,0,0,1-.668-.669v-.669a.669.669,0,0,1,.668-.668H6.35V17.959A7.565,7.565,0,0,1,0,10.368V8.69a.667.667,0,0,1,.3-.56l1.7,1.481v.846a5.524,5.524,0,0,0,4.813,5.56c.177.017.357.026.534.026a5.325,5.325,0,0,0,1.724-.285l1.672,1.453a7.3,7.3,0,0,1-2.392.763v1.411H10.7a.669.669,0,0,1,.669.668v.669A.669.669,0,0,1,10.7,21.391ZM13.4,14.87h0l-1.524-1.325A5.323,5.323,0,0,0,12.7,10.7V8.69a.669.669,0,0,1,.669-.669h.669a.669.669,0,0,1,.668.669V10.7a7.291,7.291,0,0,1-1.3,4.174Zm-6.048-.164a4.01,4.01,0,0,1-4.01-3.931l4.489,3.9A4.076,4.076,0,0,1,7.353,14.706Zm3.5-2.05h0L3.343,6.127V4.01a4.011,4.011,0,0,1,8.022,0V10.7a4.011,4.011,0,0,1-.51,1.959Z"
                        transform="translate(359.228 240.16)"
                        fill="#fff"
                      />
                      <rect
                        id="Rectangle_2702"
                        data-name="Rectangle 2702"
                        width="2.682"
                        height="25.171"
                        rx="1.341"
                        transform="matrix(0.656, -0.755, 0.755, 0.656, 356.198, 244.849)"
                        fill="#fff"
                      />
                    </g>
                  </svg>
                </button>
              </div>
            </div>
          </v-col>
          <v-col class="col-12">
            <div class="more_actions d-none">
              <button @click="toogleSound">Mute sound</button>
              <button>Mute video</button>
              <button>Share screen</button>
              <button>Exit</button>
            </div>
          </v-col>
          <v-col
            v-if="$store.state.user.user.category.name === 'STUDENT'"
            class="col-12 description"
          >
            <div id="broadcast-viewers-counter"></div>
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
      <v-col class="col-4 hidden-sm-and-down px-12 pt-2">
        <h4 v-if="$store.state.user.user.category.name === 'STUDENT'">
          Discussion Board
        </h4>
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
import * as MultiStreamsMixer from "../../assets/js/MultiStreamsMixer.min.js";

export default {
  name: "LiveClass",
  data: () => ({
    connection: new RTCMultiConnection(),
    courseName: "Economy Basics",
    sender: {},
    muted: undefined,
    videoMuted: undefined,
    localVideoStream: undefined,
    screenSharingStream: undefined,
    isScreenShared: undefined,
    playerHovered: false,
  }),
  computed: {
    ...mapState("live", ["room"]),
    ...mapState("sidebar_navbar", { state: "sidebar_expanded" }),
  },
  methods: {
    ...mapMutations("sidebar_navbar", {
      toggle: "TOGGLE_PAGE_ACTIONS_VISIBILITY",
    }),
    enterFullScreen() {
      const player = this.$refs.video_preview;
      player.plyr.fullscreen.enter();
    },

    toogleSound() {
      const enabled = this.localVideoStream.getAudioTracks()[0].enabled;
      this.muted = !enabled;
      this.localVideoStream.getAudioTracks()[0].enabled = this.muted;
    },
    // ask node.js server to look for a broadcast
    // if broadcast is available, simply join it. i.e. "join-broadcaster" event should be emitted.
    // if broadcast is absent, simply create it. i.e. "start-broadcasting" event should be fired.
    toogleVideo() {
      let enabled = this.localVideoStream.getVideoTracks()[0].enabled;
      console.log(enabled);
      this.videoMuted = !enabled;
      this.localVideoStream.getVideoTracks()[0].enabled = this.videoMuted;
    },

    shareScreen() {
      this.getMixedCameraAndScreen();
      this.isScreenShared = true;
    },

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
    let mixer;
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
        vm.connection.open(vm.connection.userid);
      });
    });

    let videoPreview = document.getElementById("video-preview");

    vm.connection.onstream = function (event) {
      if (vm.connection.isInitiator && event.type !== "local") {
        return;
      }

      vm.connection.isUpperUserLeft = false;
      videoPreview.srcObject = event.stream;
      vm.localVideoStream = event.stream;
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
    /**
     * codes for screen sharing
     */

    function getMixedCameraAndScreen() {
      if (navigator.getDisplayMedia) {
        navigator
          .getDisplayMedia({
            video: true,
          })
          .then((screenStream) => {
            afterScreenCaptured(screenStream);
          });
      } else if (navigator.mediaDevices.getDisplayMedia) {
        navigator.mediaDevices
          .getDisplayMedia({
            video: true,
            audio: true,
          })
          .then((screenStream) => {
            afterScreenCaptured(screenStream);
          });
      } else {
        alert("getDisplayMedia API is not supported by this browser.");
      }
    }

    document.querySelector("#toogleScreenShare").onclick = function () {
      console.log(vm.screenSharingStream)
      if (vm.isScreenShared) {
        vm.screenSharingStream.getTracks().forEach(function (track) {
          console.log(track)
          track.stop();
        });
        vm.isScreenShared = false;
      } else {
        getMixedCameraAndScreen(); // hello ladies vp abajama banjye
        vm.isScreenShared = true;
      }
    };

    function afterScreenCaptured(screenStream) {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
        .then(function (cameraStream) {
          screenStream.fullcanvas = true;
          screenStream.width = screen.width; // or 3840
          screenStream.height = screen.height; // or 2160

          cameraStream.width = parseInt((30 / 100) * screenStream.width);
          cameraStream.height = parseInt((30 / 100) * screenStream.height);
          cameraStream.top = screenStream.height - cameraStream.height;
          cameraStream.left = screenStream.width - cameraStream.width;

          mixer = new MultiStreamsMixer([screenStream, cameraStream]);

          mixer.frameInterval = 1;
          mixer.startDrawingFrames();

          videoPreview.srcObject = mixer.getMixedStream();
          // videoPreview.id = event.stream.id;
          videoPreview.play();

          addStreamStopListener(screenStream, function () {
            mixer.releaseStreams();
            videoPreview.pause();
            videoPreview.srcObject = cameraStream;
            videoPreview.play();

            // cameraStream.getTracks().forEach(function (track) {
            //     track.stop();
            // });
          });
          vm.screenSharingStream = mixer.getMixedStream();
          vm.connection.addStream(vm.screenSharingStream);
        });
    }

    function addStreamStopListener(stream, callback) {
      stream.addEventListener(
        "ended",
        function () {
          callback();
          callback = function () {};
        },
        false
      );
      stream.addEventListener(
        "inactive",
        function () {
          callback();
          callback = function () {};
        },
        false
      );
      stream.getTracks().forEach(function (track) {
        track.addEventListener(
          "ended",
          function () {
            callback();
            callback = function () {};
          },
          false
        );
        track.addEventListener(
          "inactive",
          function () {
            callback();
            callback = function () {};
          },
          false
        );
      });
    }

    /*******************************************************************/
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

<style lang="scss">
.live_video {
  background-color: #f6f6f6;
  max-height: calc(100vh - 5rem);
  overflow-y: auto;
  .player_container {
    position: relative;
    padding-bottom: 56.25%; /* 16:9, for an aspect ratio of 1:1 change to this value to 100% */
  }
  .plyr {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .plyr--video {
    .plyr__controls,
    .plyr__control {
      opacity: 0;
      & > * {
        pointer-events: none;
        cursor: auto;
      }
    }
  }
  .controls {
    width: inherit;
    bottom: 0;
    color: #fff;
    left: 0;
    padding: 20px 5px 5px;
    position: absolute;
    right: 0;
    z-index: 3;
    align-items: left;
    display: flex;
    opacity: 0;
    // &.hovered {
    //   display: flex;
    // }
    transition: opacity 0.3s ease-in-out 0.3s;
    button {
      border: 1px solid white;
      width: 40px;
      height: 40px;
      border-radius: 7px;
      margin: 10px;
      &.muted {
        background-color: #9e0000;
      }
      &.round {
        border-radius: 45px;
      }
      &.top_right {
        left: 91%;
        position: absolute;
        top: 46%;
        transform: translate(-91%, -50%);
      }
    }
    button:hover {
      background-color: #ffffff59;
    }
    .muted:hover {
      background-color: #9e0000;
    }
  }
  .overlay {
    position: absolute;
    height: 100%;
    background-image: radial-gradient(#fff0, rgb(0 0 0 / 53%));
    opacity: 0;
    transition: opacity 0.3s ease-in-out 0.3s;
    width: 100%;
    // &.hovered {
    //   opacity: 1;
    // }
  }
  .player_container:hover {
    .overlay,
    .controls {
      opacity: 1;
    }
  }
}
</style>