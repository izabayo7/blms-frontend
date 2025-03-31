<template>
  <div class="live-class">
    <div class="live-class--wrapper">
      <!--    <div id="container">-->
      <!--      <div id="wrapper">-->
      <!--        <div id="join" class="animate join">-->
      <!--          <h1>Join a Room</h1>-->
      <!--          <form @submit.prevent="register" accept-charset="UTF-8">-->
      <!--            <p>-->
      <!--              <input type="text" name="name" value="" id="name"-->
      <!--                placeholder="Username" required>-->
      <!--            </p>-->
      <!--            <p>-->
      <!--              <input type="text" name="room" value="" id="roomName"-->
      <!--                placeholder="Room" required>-->
      <!--            </p>-->
      <!--            <p class="submit">-->
      <!--              <input type="submit" name="commit" value="Join!">-->
      <!--            </p>-->
      <!--          </form>-->
      <!--        </div>-->
      <!--        <div id="room" style="display: none;">-->
      <!--          <h2 id="room-header"></h2>-->
      <!--          <div id="participants"></div>-->
      <!--          <input type="button" id="button-leave" onmouseup="leaveRoom();"-->
      <!--            value="Leave room">-->
      <!--        </div>-->
      <!--      </div>-->
      <!--    </div>-->

      <div class="live-class--video">
        <div class="head">
          <div class="text">
            <h2>Economics Basics: Chapter 8 part II</h2>
            <span class="live">Live</span>
          </div>
          <div class="time">
            00 : 00 : 36
          </div>
        </div>
        <div class="video">
          <div class="video--wrapper">
            <div class="video-el" @mouseenter="toggleMenu(true)" @mouseleave="toggleMenu(false)">
              <div class="no-video" v-if="noVideo">
                <div class="no-video--wrapper" :class="{presenting:isPresenting}">
                  <div class="instructor-info">
                    <img
                        src="https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png"
                        alt="profile picture" class="picture">
                    <h2 class="course">Economics Basics: Chapter 8 part II</h2>
                    <span class="source">by instuctor</span>
                    <h2 class="name">Rubogora Emanuel</h2>
                  </div>
                  <div class="screen-sharing-video" v-if="isPresenting">
                    <div class="screen-sharing-video--wrapper">
                      <h4>You are presenting your screen</h4>
                      <video id="video_feed_screen" autoplay>
                        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
                      </video>
                    </div>
                  </div>
                </div>
              </div>
              <video v-else autoplay id="video_feed">
                <!--                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" >-->
              </video>
              <transition name="fade">
                <div class="video-controls" v-if="showMenu || noVideo">
                  <div class="video-controls--wrapper">
                    <button @click="toogleVideo" class="start-mute-video">
                      <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                                              height="24"><path fill="none" d="M0 0h24v24H0z"/><path
                          d="M16 4a1 1 0 0 1 1 1v4.2l5.213-3.65a.5.5 0 0 1 .787.41v12.08a.5.5 0 0 1-.787.41L17 14.8V19a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h14zm-1 2H3v12h12V6zM7.4 8.829a.4.4 0 0 1 .215.062l4.355 2.772a.4.4 0 0 1 0 .674L7.615 15.11A.4.4 0 0 1 7 14.77V9.23c0-.221.18-.4.4-.4zM21 8.84l-4 2.8v.718l4 2.8V8.84z"/></svg></span>
                      <span class="text">{{ videoEnabled ? 'Stop video' : 'Start video' }}</span>
                    </button>
                    <button @click="toogleAudio" class="start-mute-mic">
                      <span class="icon">
                        <svg v-if="!audioEnabled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                             height="24"><path fill="none" d="M0 0h24v24H0z"/><path
                            d="M16.425 17.839A8.941 8.941 0 0 1 13 18.945V23h-2v-4.055A9.004 9.004 0 0 1 3.055 11H5.07a7.002 7.002 0 0 0 9.87 5.354l-1.551-1.55A5 5 0 0 1 7 10V8.414L1.393 2.808l1.415-1.415 19.799 19.8-1.415 1.414-4.767-4.768zm-7.392-7.392l2.52 2.52a3.002 3.002 0 0 1-2.52-2.52zm10.342 4.713l-1.443-1.442c.509-.81.856-1.73.997-2.718h2.016a8.95 8.95 0 0 1-1.57 4.16zm-2.91-2.909l-1.548-1.548c.054-.226.083-.46.083-.703V6a3 3 0 0 0-5.818-1.032L7.686 3.471A5 5 0 0 1 17 6v4a4.98 4.98 0 0 1-.534 2.251z"/></svg>
<svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none"
                                                                                                d="M0 0h24v24H0z"/><path
    d="M12 3a3 3 0 0 0-3 3v4a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zm0-2a5 5 0 0 1 5 5v4a5 5 0 0 1-10 0V6a5 5 0 0 1 5-5zM3.055 11H5.07a7.002 7.002 0 0 0 13.858 0h2.016A9.004 9.004 0 0 1 13 18.945V23h-2v-4.055A9.004 9.004 0 0 1 3.055 11z"/></svg>

                      </span>
                      <span class="text">{{ audioEnabled ? 'Mute' : 'Unmute' }}</span>
                    </button>
                    <button class="start-mute-sound">
                      <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                                              height="24"><path fill="none" d="M0 0h24v24H0z"/><path
                          d="M10 7.22L6.603 10H3v4h3.603L10 16.78V7.22zM5.889 16H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h3.889l5.294-4.332a.5.5 0 0 1 .817.387v15.89a.5.5 0 0 1-.817.387L5.89 16zm14.525-4l3.536 3.536-1.414 1.414L19 13.414l-3.536 3.536-1.414-1.414L17.586 12 14.05 8.464l1.414-1.414L19 10.586l3.536-3.536 1.414 1.414L20.414 12z"/></svg></span>
                      <span class="text">Mute</span>
                    </button>
                    <button class="start-share-screen">
                      <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                                              height="24"><path fill="none" d="M0 0h24v24H0z"/><path
                          d="M9 3v2H4v14h16v-9h2v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6zm9.95 2L16 2.05 17.414.636l5.34 5.34A.6.6 0 0 1 22.33 7H14a2 2 0 0 0-2 2v6h-2V9a4 4 0 0 1 4-4h4.95z"/></svg></span>
                      <span class="text">Share screen</span>
                    </button>
                    <button class="start-settings">
                      <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                                              height="24"><path fill="none" d="M0 0h24v24H0z"/><path
                          d="M2.213 14.06a9.945 9.945 0 0 1 0-4.12c1.11.13 2.08-.237 2.396-1.001.317-.765-.108-1.71-.986-2.403a9.945 9.945 0 0 1 2.913-2.913c.692.877 1.638 1.303 2.403.986.765-.317 1.132-1.286 1.001-2.396a9.945 9.945 0 0 1 4.12 0c-.13 1.11.237 2.08 1.001 2.396.765.317 1.71-.108 2.403-.986a9.945 9.945 0 0 1 2.913 2.913c-.877.692-1.303 1.638-.986 2.403.317.765 1.286 1.132 2.396 1.001a9.945 9.945 0 0 1 0 4.12c-1.11-.13-2.08.237-2.396 1.001-.317.765.108 1.71.986 2.403a9.945 9.945 0 0 1-2.913 2.913c-.692-.877-1.638-1.303-2.403-.986-.765.317-1.132 1.286-1.001 2.396a9.945 9.945 0 0 1-4.12 0c.13-1.11-.237-2.08-1.001-2.396-.765-.317-1.71.108-2.403.986a9.945 9.945 0 0 1-2.913-2.913c.877-.692 1.303-1.638.986-2.403-.317-.765-1.286-1.132-2.396-1.001zM4 12.21c1.1.305 2.007 1.002 2.457 2.086.449 1.085.3 2.22-.262 3.212.096.102.195.201.297.297.993-.562 2.127-.71 3.212-.262 1.084.45 1.781 1.357 2.086 2.457.14.004.28.004.42 0 .305-1.1 1.002-2.007 2.086-2.457 1.085-.449 2.22-.3 3.212.262.102-.096.201-.195.297-.297-.562-.993-.71-2.127-.262-3.212.45-1.084 1.357-1.781 2.457-2.086.004-.14.004-.28 0-.42-1.1-.305-2.007-1.002-2.457-2.086-.449-1.085-.3-2.22.262-3.212a7.935 7.935 0 0 0-.297-.297c-.993.562-2.127.71-3.212.262C13.212 6.007 12.515 5.1 12.21 4a7.935 7.935 0 0 0-.42 0c-.305 1.1-1.002 2.007-2.086 2.457-1.085.449-2.22.3-3.212-.262-.102.096-.201.195-.297.297.562.993.71 2.127.262 3.212C6.007 10.788 5.1 11.485 4 11.79c-.004.14-.004.28 0 .42zM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></svg></span>
                      <span class="text">settings</span>
                    </button>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
        <div class="live-comments">
          <div class="live-comments--wrapper">
            <div class="student-new-comment">
              <student-new-comment-with-photo v-model="comment"/>
            </div>
            <div class="student-comments">
              <!--            <discussion-->
              <!--              :content="comment"-->
              <!--              :verified="comment.sender.category !== 'STUDENT'"-->
              <!--              @replied="replied"-->
              <!--            />-->

            </div>
          </div>
        </div>
      </div>
      <div class="live-class--attendance">
        <div class="live-class--attendance--wrapper">
          <h3>ONLINE USERS : 60 </h3>
          <div class="online-users">
            <online-user v-for="user in users" :user="user" :key="`${(Date.now() * Math.random())}${user.name}`"/>
          </div>
        </div>
        <div class="live-class--actions">
          <div class="live-class--action attendance">
            <button>
            <span class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none"
                                                                                                       d="M0 0h24v24H0z"/><path
                  d="M21 8v12.993A1 1 0 0 1 20.007 22H3.993A.993.993 0 0 1 3 21.008V2.992C3 2.455 3.449 2 4.002 2h10.995L21 8zm-2 1h-5V4H5v16h14V9zM8 7h3v2H8V7zm0 4h8v2H8v-2zm0 4h8v2H8v-2z"/></svg>
            </span>
              <span class="text">CHECK ATTENDANCE</span>
            </button>
          </div>
          <div class="live-class--action release-quiz">
            <button>
            <span class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none"
                                                                                                       d="M0 0h24v24H0z"/><path
                  d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"/></svg>
            </span>
              <span class="text">RELEASE QUIZ</span>
            </button>
          </div>
          <div class="live-class--action end-class">
            <button>
            <span class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none"
                                                                                                       d="M0 0h24v24H0z"/><path
                  d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-11.414L9.172 7.757 7.757 9.172 10.586 12l-2.829 2.828 1.415 1.415L12 13.414l2.828 2.829 1.415-1.415L13.414 12l2.829-2.828-1.415-1.415L12 10.586z"
                  fill="rgba(255,255,255,1)"/></svg>
            </span>
              <span class="text">END CLASS</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import * as kurentoUtils from "../../../plugins/kurentoLive/kurento-utils.js"
import Participant from "../../../plugins/kurentoLive/participants";
import {WebRtcPeer} from 'kurento-utils'
import {mapGetters} from 'vuex'
import OnlineUser from "../../../components/Live/OnlineUser";
import StudentNewCommentWithPhoto from "../../../components/Live/StudentNewCommentWithPhoto";

export default {
  name: "liveClass",
  components: {StudentNewCommentWithPhoto, OnlineUser},
  data() {
    return {
      ws: null,
      participants: [],
      me: null,
      id: "",
      comment: "",
      noVideo: false,
      isPresenting: false,
      participationInfo: {name: "", room: "", isOfferingCourse: false},
      showMenu: false,
      videoEnabled: true,
      audioEnabled: true,
      users: [
        {
          img: 'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
          name: 'Ntwari liberi',
          attendance: 89,
        },
        /*
      {
        img:'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
        name:'Ntwari liberi',
        attendance:45,
      },{
        img:'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
        name:'Ntwari liberi',
        attendance:37,
      },{
        img:'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
        name:'Ntwari liberi',
        attendance:16,
      },{
        img:'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
        name:'Ntwari liberi',
        attendance:78,
      },{
        img:'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
        name:'Ntwari liberi',
        attendance:44,
      },{
        img:'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
        name:'Ntwari liberi',
        attendance:58
      },{
        img:'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
        name:'Ntwari liberi',
        attendance:74,
      },{
        img:'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
        name:'Ntwari liberi',
        attendance:89,
      },{
        img:'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
        name:'Ntwari liberi',
        attendance:89,
      },{
        img:'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
        name:'Ntwari liberi',
        attendance:89,
      },{
        img:'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
        name:'Ntwari liberi',
        attendance:89,
      },{
        img:'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
        name:'Ntwari liberi',
        attendance:2,
      },{
        img:'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
        name:'Ntwari liberi',
        attendance:89,
      },{
        img:'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
        name:'Ntwari liberi',
        attendance:59,
      },{
        img:'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
        name:'Ntwari liberi',
        attendance:42,
      },{
        img:'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
        name:'Ntwari liberi',
        attendance:90,
      },{
        img:'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
        name:'Ntwari liberi',
        attendance:34,
      },{
        img:'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
        name:'Ntwari liberi',
        attendance:89,
      },{
        img:'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
        name:'Ntwari liberi',
        attendance:55,
      },{
        img:'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
        name:'Ntwari liberi',
        attendance:7,
      },{
        img:'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
        name:'Ntwari liberi',
        attendance:23,
      },{
        img:'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
        name:'Ntwari liberi',
        attendance:0,
      },{
        img:'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
        name:'Ntwari liberi',
        attendance:76,
      },{
        img:'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
        name:'Ntwari liberi',
        attendance:76,
      },{
        img:'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
        name:'Ntwari liberi',
        attendance:45,
      },{
        img:'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
        name:'Ntwari liberi',
        attendance:87,
      },{
        img:'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
        name:'Ntwari liberi',
        attendance:66,
      },{
        img:'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
        name:'Ntwari JOhn',
        attendance:12,
      },{
        img:'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
        name:'Ntwari liberi',
        attendance:99,
      },{
        img:'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
        name:'Ntwari umwe',
        attendance:54,
      },{
        img:'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
        name:'Nomi Kazungu',
        attendance:32,
      },*/
      ]
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
    // videoStatus(){
    //   let muted = false;
    //   if (this.me){
    //     muted = !this.me.rtcPeer.videoEnabled
    //   }
    //   return muted ? 'Mute video' : 'Unmute video'
    // }
  },
  methods: {
    toggleMenu(status) {
      this.showMenu = status
      const self = this;
      if (status) {
        setTimeout(() => {
          self.showMenu = false
        }, 4000)
      }
    },
    register() {
      console.log("harahiye")
      // document.getElementById('room-header').innerText = 'ROOM ' + this.participationInfo.room;
      // document.getElementById('join').style.display = 'none';
      // document.getElementById('room').style.display = 'block';

      let message = {
        id: 'joinRoom',
        name: this.participationInfo.name,
        room: this.participationInfo.room,
        offeringCourse: this.participationInfo.isOfferingCourse
      }
      this.sendMessage(message);
    },
    sendMessage(message) {
      let jsonMessage = JSON.stringify(message);
      console.log('Sending message: ', message, this.participants);
      this.ws.send(jsonMessage);
    },

    onNewParticipant(request) {
      console.log('new participant', request, this.participants)
      this.receiveVideo(request.name);
    },

    receiveVideoResponse(result) {
      console.log('receiving video', result, this.participants)
      this.participants[result.name].rtcPeer.processAnswer(result.sdpAnswer, function (error) {
        if (error) return console.error(error);
      });
    },

    callResponse(message) {
      console.log('call response', message, this.participants)
      if (message.response != 'accepted') {
        console.info('Call not accepted by peer. Closing call');
        stop();
      } else {
        WebRtcPeer.processAnswer(message.sdpAnswer, function (error) {
          if (error) return console.error(error);
        });
      }
    },

    onExistingParticipants(msg) {
      const self = this
      console.log('existing participant', msg, this.participants)
      let constraints = {
        audio: true,
        video: {
          mandatory: {
            maxWidth: 320,
            maxFrameRate: 15,
            minFrameRate: 15
          }
        }
      };

      if (this.participationInfo.isOfferingCourse) {
        console.log('\n\n\n\n\n instructor joined \n\n\n\n\n')
      } else {
        console.log('\n\n\n\n\n student joined \n\n\n\n\n')
        constraints = {audio: false, video: false}
      }

      console.log(this.participationInfo.name + " registered in room " + this.participationInfo.room);


      let participant = new Participant(this.participationInfo.name, this, true);

      this.participants[this.participationInfo.name] = participant;


      let video = participant.getVideoElement();

      let options = {
        localVideo: video,
        mediaConstraints: constraints,
        onicecandidate: participant.onIceCandidate.bind(participant)
      }
      participant.rtcPeer = new WebRtcPeer.WebRtcPeerSendonly(options,
          function (error) {
            if (error) {
              return console.error(error);
            }
            self.me = participant;
            this.generateOffer(participant.offerToReceiveVideo.bind(participant));

          });


      msg.data.forEach(console.log)
      msg.data.forEach(this.receiveVideo);

    },

    toogleVideo() {
      this.me.rtcPeer.videoEnabled = !this.me.rtcPeer.videoEnabled;
      this.videoEnabled = !this.videoEnabled;
    },
    toogleAudio() {
      this.me.rtcPeer.audioEnabled = !this.me.rtcPeer.audioEnabled
      this.audioEnabled = !this.audioEnabled;
    },
    leaveRoom() {
      alert('leaving room')
      this.sendMessage({
        id: 'leaveRoom'
      });

      for (let key in this.participants) {
        this.participants[key].dispose();
      }

      document.getElementById('join').style.display = 'block';
      document.getElementById('room').style.display = 'none';

      this.ws.close();
    },

    receiveVideo(sender) {
      console.log(`\n\n\n\n\n receiving video for ${sender} \n\n\n\n\n`)
      let participant = new Participant(sender, this);
      this.participants[sender] = participant;
      let video = participant.getVideoElement();

      let options = {
        remoteVideo: video,
        onicecandidate: participant.onIceCandidate.bind(participant)
      }

      participant.rtcPeer = new WebRtcPeer.WebRtcPeerRecvonly(options,
          function (error) {
            if (error) {
              return console.error(error);
            }
            this.generateOffer(participant.offerToReceiveVideo.bind(participant));
          })

    },

    onParticipantLeft(request) {
      console.log('Participant ' + request.name + ' left');
      let participant = this.participants[request.name];
      participant.dispose();
      delete this.participants[request.name];
    }
  },
  created() {
    //know if this user has ability to give live class
    this.participationInfo.isOfferingCourse = this.user.category.name === 'INSTRUCTOR'
    console.log(this.user)

    const self = this
    this.participationInfo.name = `${this.user.other_names} ${this.user.sur_name}`
    this.participationInfo.room = this.$route.params.courseId


    const host = '198.211.107.132:8080'
    // const host = '169.254.107.40:8081'

    this.ws = new WebSocket('wss://' + host + '/kurious_stream'+`?token=${this.$session.get("jwt")}`);

    this.ws.addEventListener('open', () => {
      self.register();
    })

    this.ws.onerror = function (evt) {
      console.log("ERR: ", evt);
    };

    window.onbeforeunload = () => {
      this.ws.close();
    };

    this.ws.onmessage = (message) => {
      let parsedMessage = JSON.parse(message.data);
      console.info('Received message: ', message);

      switch (parsedMessage.id) {
        case 'userId':
          self.id = parsedMessage.data;
          self.participationInfo.name = self.id;
          break;
        case 'existingParticipants':
          this.onExistingParticipants(parsedMessage);
          break;
        case 'newParticipantArrived':
          this.onNewParticipant(parsedMessage);
          break;
        case 'participantLeft':
          this.onParticipantLeft(parsedMessage);
          break;
        case 'receiveVideoAnswer':
          this.receiveVideoResponse(parsedMessage);
          break;
        case 'iceCandidate':
          this.participants[parsedMessage.name].rtcPeer.addIceCandidate(parsedMessage.candidate, function (error) {
            if (error) {
              console.error("Error adding candidate: " + error);
              return null;
            }
          });
          break;
        default:
          console.error('Unrecognized message', parsedMessage);
      }
    }
    this.ws.onclose = ()=>{
      console.log("\n\n\n\nclosed\n\n\n\n")
    }

  },
  beforeDestroy() {
    this.ws.close();
  },
  watch:{
    videoEnabled(){
      this.noVideo = !this.videoEnabled
      console.log(this.noVideo, this.videoEnabled)
    }
  }
}
</script>

<style lang="scss">
.live-class {
  &--wrapper {
    display: flex;

    input[type=checkbox], input[type=radio] {
      border: 1px solid #c0c0c0;
      margin: 0 0.1em 0 0;
      padding: 0;
      font-size: 16px;
      line-height: 1em;
      width: 1.25em;
      height: 1.25em;
      background: #fff;
      background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#ededed),
          to(#fbfbfb));
      -webkit-appearance: none;
      -webkit-box-shadow: 1px 1px 1px #fff;
      -webkit-border-radius: 0.25em;
      vertical-align: text-top;
      display: inline-block;
    }

    input[type=radio] {
      -webkit-border-radius: 2em; /* Make radios round */
    }

    input[type=checkbox]:checked::after {
      content: "✔";
      display: block;
      text-align: center;
      font-size: 16px;
      height: 16px;
      line-height: 18px;
    }

    input[type=radio]:checked::after {
      content: "●";
      display: block;
      height: 16px;
      line-height: 15px;
      font-size: 20px;
      text-align: center;
    }

    select {
      border: 1px solid #D0D0D0;
      background: url(http://www.quilor.com/i/select.png) no-repeat right center, -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fbfbfb),
          to(#ededed));
      background: -moz-linear-gradient(19% 75% 90deg, #ededed, #fbfbfb);
      -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, .05);
      -moz-box-shadow: 0 1px 2px rgba(0, 0, 0, .05);
      -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, .05);
      color: #444;
    }

    .container {
      margin: 50px auto;
      width: 640px;
    }

    .join {
      position: relative;
      margin: 0 auto;
      padding: 20px 20px 20px;
      width: 310px;
      background: white;
      border-radius: 3px;
      -webkit-box-shadow: 0 0 200px rgba(255, 255, 255, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3);
      box-shadow: 0 0 200px rgba(255, 255, 255, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3);
      /*Transition*/
      -webkit-transition: all 0.3s linear;
      -moz-transition: all 0.3s linear;
      -o-transition: all 0.3s linear;
      transition: all 0.3s linear;
    }

    .join:before {
      content: '';
      position: absolute;
      top: -8px;
      right: -8px;
      bottom: -8px;
      left: -8px;
      z-index: -1;
      background: rgba(0, 0, 0, 0.08);
      border-radius: 4px;
    }

    .join h1 {
      margin: -20px -20px 21px;
      line-height: 40px;
      font-size: 15px;
      font-weight: bold;
      color: #555;
      text-align: center;
      text-shadow: 0 1px white;
      background: #f3f3f3;
      border-bottom: 1px solid #cfcfcf;
      border-radius: 3px 3px 0 0;
      background-image: -webkit-linear-gradient(top, whiteffd, #eef2f5);
      background-image: -moz-linear-gradient(top, whiteffd, #eef2f5);
      background-image: -o-linear-gradient(top, whiteffd, #eef2f5);
      background-image: linear-gradient(to bottom, whiteffd, #eef2f5);
      -webkit-box-shadow: 0 1px whitesmoke;
      box-shadow: 0 1px whitesmoke;
    }

    .join p {
      margin: 20px 0 0;
    }

    .join p:first-child {
      margin-top: 0;
    }

    .join input[type=text], .join input[type=password] {
      width: 278px;
    }

    .join p.submit {
      text-align: center;
    }

    :-moz-placeholder {
      color: #c9c9c9 !important;
      font-size: 13px;
    }

    ::-webkit-input-placeholder {
      color: #ccc;
      font-size: 13px;
    }

    input {
      font-family: 'Lucida Grande', Tahoma, Verdana, sans-serif;
      font-size: 14px;
    }

    input[type=text], input[type=password] {
      margin: 5px;
      padding: 0 10px;
      width: 200px;
      height: 34px;
      color: #404040;
      background: white;
      border: 1px solid;
      border-color: #c4c4c4 #d1d1d1 #d4d4d4;
      border-radius: 2px;
      outline: 5px solid #eff4f7;
      -moz-outline-radius: 3px;
      -webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.12);
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.12);
    }

    input[type=text]:focus, input[type=password]:focus {
      border-color: #7dc9e2;
      outline-color: #dceefc;
      outline-offset: 0;
    }

    input[type=button], input[type=submit] {
      padding: 0 18px;
      height: 29px;
      font-size: 12px;
      font-weight: bold;
      color: #527881;
      text-shadow: 0 1px #e3f1f1;
      background: #cde5ef;
      border: 1px solid;
      border-color: #b4ccce #b3c0c8 #9eb9c2;
      border-radius: 16px;
      outline: 0;
      -webkit-box-sizing: content-box;
      -moz-box-sizing: content-box;
      box-sizing: content-box;
      background-image: -webkit-linear-gradient(top, #edf5f8, #cde5ef);
      background-image: -moz-linear-gradient(top, #edf5f8, #cde5ef);
      background-image: -o-linear-gradient(top, #edf5f8, #cde5ef);
      background-image: linear-gradient(to bottom, #edf5f8, #cde5ef);
      -webkit-box-shadow: inset 0 1px white, 0 1px 2px rgba(0, 0, 0, 0.15);
      box-shadow: inset 0 1px white, 0 1px 2px rgba(0, 0, 0, 0.15);
    }

    input[type=button]:active, input[type=submit]:active {
      background: #cde5ef;
      border-color: #9eb9c2 #b3c0c8 #b4ccce;
      -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2);
      box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2);
    }

    .lt-ie9 input[type=text], .lt-ie9 input[type=password] {
      line-height: 34px;
    }

    #room {
      width: 100%;
      text-align: center;
    }

    #button-leave {
      text-align: center;
      position: absolute;
      bottom: 10px;
    }

    .participant {
      /* border: 2px groove; */
      margin-left: 5;
      margin-right: 5;
      width: 150;
      text-align: center;
      overflow: hide;
      float: left;
      padding: 5px;
      border-radius: 10px;
      -webkit-box-shadow: 0 0 200px rgba(255, 255, 255, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3);
      box-shadow: 0 0 200px rgba(255, 255, 255, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3);
      /*Transition*/
      -webkit-transition: all 0.3s linear;
      -moz-transition: all 0.3s linear;
      -o-transition: all 0.3s linear;
      transition: all 0.3s linear;
    }

    .participant:before {
      content: '';
      position: absolute;
      top: -8px;
      right: -8px;
      bottom: -8px;
      left: -8px;
      z-index: -1;
      background: rgba(0, 0, 0, 0.08);
      border-radius: 4px;
    }

    .participant:hover {
      opacity: 1;
      background-color: 0 A33B6;
      -webkit-transition: all 0.5s linear;
      transition: all 0.5s linear;
    }

    .participant video, .participant.main video {
      width: 100% ! important;
      height: auto !important;
    }

    .participant span {
      color: PapayaWhip;
    }

    .participant.main {
      width: 20%;
      margin: 0 auto;
    }

    .participant.main video {
      height: auto;
    }

    .animate {
      -webkit-animation-duration: 0.5s;
      -webkit-animation-fill-mode: both;
      -moz-animation-duration: 0.5s;
      -moz-animation-fill-mode: both;
      -o-animation-duration: 0.5s;
      -o-animation-fill-mode: both;
      -ms-animation-duration: 0.5s;
      -ms-animation-fill-mode: both;
      animation-duration: 0.5s;
      animation-fill-mode: both;
    }

    .removed {
      -webkit-animation: disapear 1s;
      -webkit-animation-fill-mode: forwards;
      animation: disapear 1s;
      animation-fill-mode: forwards;
    }

    @-webkit-keyframes disapear {
      50% {
        -webkit-transform: translateX(-5%);
        transform: translateX(-5%);
      }

      100% {
        -webkit-transform: translateX(200%);
        transform: translateX(200%);
      }
    }

    @keyframes disapear {
      50% {
        -webkit-transform: translateX(-5%);
        transform: translateX(-5%);
      }

      100% {
        -webkit-transform: translateX(200%);
        transform: translateX(200%);
      }
    }

    a.hovertext {
      position: relative;
      width: 500px;
      text-decoration: none !important;
      text-align: center;
    }

    a.hovertext:after {
      content: attr(title);
      position: absolute;
      left: 0;
      bottom: 0;
      padding: 0.5em 20px;
      width: 460px;
      background: rgba(0, 0, 0, 0.8);
      text-decoration: none !important;
      color: #fff;
      opacity: 0;
      -webkit-transition: 0.5s;
      -moz-transition: 0.5s;
      -o-transition: 0.5s;
      -ms-transition: 0.5s;
    }

    a.hovertext:hover:after, a.hovertext:focus:after {
      opacity: 1.0;
    }
  }

  &--video {
    flex-basis: 70%;
    padding-left: 3rem;
    padding-right: 3rem;

    .head {
      display: flex;
      padding: .3rem 0;
      margin-top: .5rem;
      margin-bottom: .5rem;
      justify-content: space-between;

      .text {
        display: flex;
        align-items: center;

        h2 {
          font-size: 1.3rem;
        }

        span {
          margin-left: 2rem;
          padding: 0 1rem;
          text-align: center;
          border-radius: 10rem;
          background-color: $danger;
          height: fit-content;
          color: $main;
        }
      }
    }

    .video {
      width: 100%;

      &--wrapper {
        width: 100%;

        .video-el {
          //width: fit-content;
          max-height: 25rem;
          position: relative;
          background-color: #000;

          video {
            height: 100%;
            max-height: 20rem;
            width: 100%;
          }

          //animations
          .fade-enter-active, .fade-leave-active {
            transition: opacity .5s;
          }

          .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
          {
            opacity: 0;
          }

          //video controls
          .video-controls {
            position: absolute;
            display: block;
            width: 100%;
            bottom: 0;

            &--wrapper {
              display: flex;
              justify-content: space-evenly;
              background-color: transparentize(#000, .4);
              padding: .3rem 1rem;
              padding-top: .5rem;

              button {
                display: flex;
                align-items: center;
                padding: .3rem .6rem;
                border-radius: 5px;
                box-sizing: border-box;
                border: 1.5px solid transparent;

                &:hover {
                  border: 1.5px solid $main;
                  background-color: transparentize($main, .8);
                }

                span {
                  padding: 0 .2rem;
                  color: $main;
                  display: block;
                  font-weight: 300;
                  text-transform: capitalize;
                  font-size: .9rem;

                  svg {
                    width: 13px;
                    height: 13px;
                    fill: $main;
                  }
                }
              }
            }
          }

          //no video card
          .no-video {
            &--wrapper {

              &.presenting {
                display: flex;
                align-items: center;
                justify-content: space-evenly;

                .instructor-info {
                  align-items: start;

                  img {
                    border-radius: 50%;
                  }

                  h2 {
                    font-size: 1rem;

                    &.name {
                      font-size: .8rem;
                      margin: .2rem 0;
                    }
                  }

                  span {
                    font-size: .8rem;
                  }
                }
              }

              .instructor-info {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding-top: 5rem;
                padding-bottom: 6.9rem;

                img {
                  width: 3.9rem;
                  height: 3.9rem;
                  border-radius: 50%;
                }

                h2 {
                  color: $main;
                  margin: .4rem 0;
                }

                span {
                  color: $main;
                }
              }

              .screen-sharing-video {
                &--wrapper {
                  display: grid;
                  place-items: center;

                  video {
                    width: 13.125rem;
                    border: 2px solid $main;
                  }

                  h4 {
                    color: $main;
                    font-weight: 500;
                    margin: .4rem 0;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .live-comments {
    &--wrapper {
      margin-top: 1rem;
    }
  }

  &--attendance {
    flex-basis: 30%;

    &--wrapper {
      padding: .5rem;
      background-color: $main;
      width: 20rem;
      border-radius: 4px;
      margin-top: 1rem;

    }

    h3 {
      text-align: center;
      font-size: 1.1rem;
      text-transform: capitalize;
      margin-bottom: 1rem;
    }

    .online-users {
      max-height: 19rem;
      overflow-y: auto;

      @include scroll-bar;
    }

  }

  &--actions {
    margin-top: 2rem;
  }

  &--action {
    border-radius: 3px;
    margin: 1rem 0;
    max-width: 18rem;

    button {
      display: flex;
      align-items: center;
      padding-left: 1rem;
      width: 100%;

      span {
        display: flex;
        align-items: center;
        font-size: .9rem;
        padding: .5rem 1rem;

        svg {
          width: 1.3rem;
          height: 1.3rem;
        }
      }
    }

    &.attendance,
    &.release-quiz {
      button {
        span {
          color: $primary;

          svg {
            fill: $primary;
          }
        }
      }
    }

    &.attendance {
      background-color: $warn;
    }

    &.release-quiz {
      background-color: $success;
    }

    &.end-class {
      background-color: $danger;

      button {
        span {
          color: $main;

          svg {
            fill: $main;
          }
        }
      }
    }
  }


}

</style>