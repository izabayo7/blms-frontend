<template>
  <div class="live-class">
    <div v-if="loaded && !error" class="live-class--wrapper">
      <div class="live-class--video" :class="`--${$vuetify.breakpoint.name}`">
        <back v-if="!participationInfo.isOfferingCourse" class="mt-6 hidden-sm-and-down"/>
        <div class="head hidden-sm-and-down">
          <div class="text">
            <h2>{{ live_session.course.name }}: Chapter </h2>
            <span class="live" v-if="participationInfo.isOfferingCourse">Live</span>
          </div>
          <div v-if="participationInfo.isOfferingCourse" class="time">
            {{ elapsed_time }}
          </div>
          <div v-else class="users">
            {{ participants.length }} watching
          </div>
        </div>
        <div class="video">
          <div class="video--wrapper">
            <div class="video-el"
                 :class="`--${$vuetify.breakpoint.name} ${sidebarOpen ? '' : 'viewer'}`"
                 @mouseenter="toggleMenu(true)"
                 @mouseleave="toggleMenu(false)">
              <div class="no-video"
                   v-show="(noVideo && !isPresenting) || (isPresenting && participationInfo.isOfferingCourse)">
                <div class="no-video--wrapper" :class="{presenting:isPresenting}">
                  <div v-if="instructor" class="instructor-info">
                    <img
                        v-if="instructor.profile"
                        :src="instructor.profile + '?width=100'"
                        alt="profile picture" class="picture">
                    <v-avatar v-else class="avatar">
                      {{ instructor.sur_name | computeText }}
                    </v-avatar>
                    <h2 class="course">{{ live_session.course.name }}: {{ live_session.chapter.name }}</h2>
                    <span class="source">by instuctor</span>
                    <h2 class="name">{{
                        participationInfo.isOfferingCourse ? "YOU" : `${instructor ? instructor.sur_name + ' ' + instructor.other_names : ''}`
                      }}</h2>
                  </div>
                  <div class="screen-sharing-video" v-if="isPresenting">
                    <div class="screen-sharing-video--wrapper">
                      <h4>You are presenting your screen</h4>
                      <video id="video_screen_feed">
                        <!--                        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">-->
                      </video>
                    </div>
                  </div>
                </div>
              </div>
              <video v-show="!noVideo && !isPresenting" id="video_feed">
                <!--                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" >-->
              </video>
              <button @click="playVideo" class="play_button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="64" height="64">
                  <path fill="none" d="M0 0h24v24H0z"/>
                  <path
                      d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM10.622 8.415a.4.4 0 0 0-.622.332v6.506a.4.4 0 0 0 .622.332l4.879-3.252a.4.4 0 0 0 0-.666l-4.88-3.252z"
                      fill="rgba(255,255,255,1)"/>
                </svg>
              </button>
              <video v-if="!participationInfo.isOfferingCourse" v-show="isPresenting"
                     id="viewer_screen_feed">
                <!--                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" >-->
              </video>
              <transition name="fade">
                <div :class="`overlay ${noVideo? 'none' : ''}`" v-show="(showMenu || noVideo)">
                  <div class="video-controls" v-if="participationInfo.isOfferingCourse">
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
                      <!--                      <button class="start-mute-sound">-->
                      <!--                      <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"-->
                      <!--                                              height="24"><path fill="none" d="M0 0h24v24H0z"/><path-->
                      <!--                          d="M10 7.22L6.603 10H3v4h3.603L10 16.78V7.22zM5.889 16H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h3.889l5.294-4.332a.5.5 0 0 1 .817.387v15.89a.5.5 0 0 1-.817.387L5.89 16zm14.525-4l3.536 3.536-1.414 1.414L19 13.414l-3.536 3.536-1.414-1.414L17.586 12 14.05 8.464l1.414-1.414L19 10.586l3.536-3.536 1.414 1.414L20.414 12z"/></svg></span>-->
                      <!--                        <span class="text">Mute</span>-->
                      <!--                      </button>-->
                      <button class="start-share-screen" @click="shareScreen">
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
                  <div class="video-controls" v-else>
                    <div class="video-controls--wrapper viewer">
                      <span class="live">Live</span>
                      <div class="time">
                        {{ elapsed_time }}
                      </div>
                      <button @click="toogleFullScreen" class="ml-auto">
                        <svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.72526 1H1.30859V6.41667" stroke="white" stroke-width="1.26923"/>
                          <path d="M15.8906 1H21.3073V6.41667" stroke="white" stroke-width="1.26923"/>
                          <path d="M21.3073 10.25V15.6667H15.8906" stroke="white" stroke-width="1.26923"/>
                          <path d="M1.30859 10.25V15.6667H6.72526" stroke="white" stroke-width="1.26923"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </transition>
              <!--              <div class="speaking-user">-->
              <!--                <div class="d-flex">-->
              <!--                  <div class="profile">-->
              <!--                    <img-->
              <!--                        :src="instructor ? instructor.profile + '?width=100' : ''"-->
              <!--                        alt="profile picture" class="picture">-->
              <!--                  </div>-->
              <!--                  <div class="user">-->
              <!--                    <div class="names">{{-->
              <!--                        participationInfo.isOfferingCourse ? "YOU" : `${instructor ? instructor.sur_name + ' ' + instructor.other_names : ''}`-->
              <!--                      }}</div>-->
              <!--                    <div class="vocal"></div>-->
              <!--                  </div>-->
              <!--                </div>-->
              <!--              </div>-->
            </div>
          </div>
        </div>
        <div v-if="participationInfo.isOfferingCourse" class="live-comments"
             :class="`--${$vuetify.breakpoint.name} ${sidebarOpen ? '' : 'viewer'}`">
          <div class="live-comments--wrapper">
            <div class="_title">LIVE COMMENTS</div>
            <div class="student-new-comment">
              <student-new-comment-with-photo @sent="addComment" :isLive="true"/>
            </div>
            <div class="live-comments-container">
              <discussion
                  v-for="(comment, i) in comments"
                  :key="i"
                  :content="comment"
                  :verified="comment.sender.category !== 'STUDENT'"
                  :is-live="true"
                  @replied="replied"
              />

            </div>
          </div>
        </div>
        <div v-else class="live-class-details">
          <div class="live-class-details--wrapper">
            <h2 class="hidden-md-and-up">{{ live_session.course.name }}: Chapter </h2>
            <div class="description">{{ live_session.chapter.description }}
            </div>
            <div v-if="displayQuiz && quiz" class="quiz ml-auto ">
              <button @click="
openQuiz">
                Take quiz
              </button>
            </div>
            <div class="quiz ml-auto" v-else>
              <button disabled class="disabled">
                Take quiz
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="participationInfo.isOfferingCourse" class="live-class--attendance">
        <div class="live-class--attendance--wrapper">
          <h3>ONLINE USERS : {{ participants.length }} </h3>
          <div class="online-users">
            <online-user v-for="user in participants" :user="user.userInfo"
                         :key="`${(Date.now() * Math.random())}${user.name}`"/>
          </div>
        </div>
        <div class="live-class--actions">
          <div class="live-class--action attendance">
            <button @click="checkAttandance">
            <span class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none"
                                                                                                       d="M0 0h24v24H0z"/><path
                  d="M21 8v12.993A1 1 0 0 1 20.007 22H3.993A.993.993 0 0 1 3 21.008V2.992C3 2.455 3.449 2 4.002 2h10.995L21 8zm-2 1h-5V4H5v16h14V9zM8 7h3v2H8V7zm0 4h8v2H8v-2zm0 4h8v2H8v-2z"/></svg>
            </span>
              <span class="text">CHECK ATTENDANCE</span>
            </button>
          </div>
          <div v-if="live_session.quiz" class="live-class--action release-quiz">
            <button v-if="!displayQuiz" @click="releaseQuiz">
            <span class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none"
                                                                                                       d="M0 0h24v24H0z"/><path
                  d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"/></svg>
            </span>
              <span class="text">RELEASE QUIZ</span>
            </button>
          </div>
          <div class="live-class--action end-class">
            <button @click="                      set_modal({
                        template: 'action_confirmation',
                        method: { action: 'live_session/change_confirmation',parameters: { value: true} },
                        title: 'End live session',
                        message: 'Are you sure you want to end this live session?'
                      })">
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
      <div v-else class="live-class--attendance">
        <div class="live-class--attendance--wrapper long">
          <h3>DISCUSSION BOARD </h3>
          <h3 class="hidden-md-and-up">ONLINE USERS : {{ participants.length }} </h3>
          <div class="live-comments-container viewer">
            <discussion
                v-for="(comment, i) in comments"
                :key="i"
                :content="comment"
                :verified="comment.sender.category !== 'STUDENT'"
                :is-live="true"
                @replied="replied"
            />
          </div>
          <div class="student-new-comment">
            <student-new-comment-with-photo @sent="addComment" :isLive="true"/>
          </div>
        </div>
        <div v-if="participationInfo.isOfferingCourse" class="live-class--actions">
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
            <button @click="leaveRoom">
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
    <div class="no-live" v-else>
      <div v-if="!loaded" class="loading">Loading</div>
      <div v-else class="not-found">Sorry {{ error }}</div>
    </div>
  </div>
</template>

<script>
import {WebRtcPeer} from "../../../plugins/kurentoLive/kurento-utils.js"
import Participant from "../../../plugins/kurentoLive/participants";
import {downloadAttachment} from "@/services/global_functions"
import {mapActions, mapGetters, mapState} from 'vuex'
import Discussion from "../../../components/Live/Discussion";
import {elapsedDuration, toLocal} from "@/services/global_functions"
import OnlineUser from "../../../components/Live/OnlineUser";
import StudentNewCommentWithPhoto from "../../../components/Live/StudentNewCommentWithPhoto";
import Apis from '../../../services/apis'
import {convertUTCDateToLocalDate, playSound} from "../../../services/global_functions";

const sound = require("../../../assets/audio/com.mp3");

export default {
  name: "liveClass",
  components: {
    Discussion,
    StudentNewCommentWithPhoto,
    OnlineUser,
    back: () => import("@/components/shared/back-button"),
  },
  data() {
    return {
      ws: null,
      participants: [],
      comments: [],
      me: null,
      interval: null,
      id: "",
      displayQuiz: false,
      elapsed_time: "",
      quiz: null,
      comment: "",
      noVideo: false,
      isPresenting: false,
      participationInfo: {name: "", room: "", isOfferingCourse: false},
      showMenu: false,
      videoEnabled: true,
      audioEnabled: true,
      live_session: null,
      error: null,
      loaded: false
    }
  },
  beforeMount() {
    Apis.get(`live_session/${this.$route.params.liveSessionId}`).then(async d => {
      if (d.data.status == 404) {
        this.error = d.data.message
      } else {
        const date = toLocal(new Date(d.data.data.date))
        const remainingTime = elapsedDuration(date)

        if (d.data.data.status == "FINISHED") {
          this.error = "The meeting expired " + elapsedDuration(toLocal(new Date(d.data.data.updatedAt)))
        } else {

          if (remainingTime.includes('day') && remainingTime.includes('ago')) {
            this.error = "The meeting expired " + remainingTime
            this.finishSession()
          } else if (remainingTime.includes("in ")) {
            // if (remainingTime.includes("day")) {
            this.error = remainingTime
            // }
          } else {

            await Apis.create('user_logs', {live_session_id: d.data.data._id})

            this.live_session = d.data.data
            this.startCounting(d.data.data);

            this.initialiseSession()
            this.loadComments()
            let span = document.querySelector('.message-row span')
            if (!this.participationInfo.isOfferingCourse && span)
              span.className = "stud_span";
          }
        }
      }
      this.loaded = true
    })
  },
  computed: {
    ...mapGetters('user', ['user']),
    ...mapGetters("chat", ["socket"]),
    ...mapGetters("live_session", ["end_class"]),

    ...mapState("sidebar_navbar", {sidebarOpen: "sidebar_expanded"}),
    instructor() {
      const el = this.participants.filter(e => e.userInfo.category == "INSTRUCTOR")
      return el[0] ? el[0].userInfo : undefined
    },
    userCategory() {
      return this.$store.state.user.user.category.name;
    },
  },
  methods: {
    toogleFullScreen() {
      document.getElementById("video_feed").requestFullscreen()
    },
    playVideo() {
      document.getElementById("video_feed").play()
      document.querySelector('.play_button').style.display = 'none'
    },
    ...mapActions("modal", ["set_modal"]),
    downloadAttachment,
    openQuiz() {
      let route = this.$router.resolve(`/quiz/preview/${this.quiz.name}`);
      this.downloadAttachment(route.href)
    },
    ...mapActions("live_session", ["addParticipant"]),
    async loadComments() {
      Apis.get(`comment/live_session/${this.$route.params.liveSessionId}`).then(d => {
        this.comments = d.data.data
      })
    },
    initialiseSession() {
      //know if this user has ability to give live class
      this.participationInfo.isOfferingCourse = this.user.category.name === 'INSTRUCTOR'

      const self = this
      this.participationInfo.name = `${this.user.other_names} ${this.user.sur_name}`
      this.participationInfo.room = this.$route.params.liveSessionId

      const host = 'test.stream.kurious.rw'
      // const host = 'localhost:8080'

      this.ws = new WebSocket('wss://' + host + '/kurious_stream' + `?token=${this.$session.get("jwt")}`);

      this.ws.addEventListener('open', () => {
        self.register();
      })

      this.ws.onerror = function (evt) {
        this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: evt,
          status: "danger",
          uptime: 2000,
        })
      };


      window.onbeforeunload = () => {
        this.ws.close();
        this.handleMediaTracks();
      };

      this.ws.onmessage = (message) => {
        let parsedMessage = JSON.parse(message.data);
        console.info('Received message: ', message);

        switch (parsedMessage.id) {
          case 'userId':
            self.id = parsedMessage.data;
            self.participationInfo.name = self.id;
            break;
          case 'roomClosed':
            if (!self.participationInfo.isOfferingCourse)
              self.set_modal({
                template: 'live_related_ended',
                title: 'Live class ended',
                message: 'Hey user, the class you were attending has ended.',
              })
            else {
              self.finishSession();
            }

            this.onCloseRoom();
            break;
          case 'screenAllowed':
            this.onExistingParticipants({data: []});
            break;
          case 'initialScreenOff':
            this.noVideo = true;
            break;
          case 'existingParticipants': {
            this.onExistingParticipants(parsedMessage);
            this.socket.emit("live_session/joined", {
              session_id: this.live_session._id
            });
            break;
          }
          case 'newParticipantArrived':
            this.onNewParticipant(parsedMessage);
            break;
          case 'participantLeft':
            this.onParticipantLeft(parsedMessage);
            break;
          case 'toogleMedia':
            this.toogleMedia(parsedMessage);
            break;
          case 'notification':
            this.isPresenting = parsedMessage.screenStatus;
            this.videoEnabled = parsedMessage.videoStatus;
            this.audioEnabled = parsedMessage.audioStatus;
            break;
          case 'receiveVideoAnswer':
            this.receiveVideoResponse(parsedMessage);
            break;
          case 'iceCandidate':
            if (self.participantIndex(parsedMessage.name) != -1) {
              self.participants[self.participantIndex(parsedMessage.name)].rtcPeer.addIceCandidate(parsedMessage.candidate, function (error) {
                if (error) {
                  console.error("Error adding candidate: " + error);
                  return null;
                }
              });
            }
            break;
          default:
            console.error('Unrecognized message', parsedMessage);
        }
      }
      this.ws.onclose = () => {
        console.trace();
        this.socket.emit("live_session/left", {
          session_id: this.live_session._id
        });
      }
      self.socket.on("live/quizReleased", (quiz) => {
        self.quiz = quiz;
        self.displayQuiz = true
        this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: self.participationInfo.isOfferingCourse ? 'Quiz was released' : 'Quiz time !',
          status: "info",
          uptime: 5000,
        });
      })

      self.socket.on("res/live/checkAttendance", ({code}) => {
        this.set_modal({
          template: 'live_related',
          method: {
            action: 'live_session/answerAttendance',
            parameters: {user: {id: self.instructor._id}, session_id: self.$route.params.liveSessionId}
          },
          title: 'ATTENDANCE CHECK',
          message: 'Hey user, are you there ? Type the code bellow to confirm ',
          code: code,
        })
      })

      self.socket.on("res/live/studentAnswered", ({id, attendance}) => {

        for (const i in self.participants) {
          if (self.participants[i].userInfo._id == id)
            self.participants[i].userInfo.attendance = attendance
        }

        self.participants.sort((a, b) => {
              return b.userInfo.attendance - a.userInfo.attendance
            }
        )
      })

      self.socket.on("comment/new", (result) => {
        // this.$store.commit(
        //     "courses/SET_TOTAL_COMMENTS_ON_A_CHAPTER",
        //     this.totalComments == "" ? 1 : this.totalComments + 1
        // );
        if (result.reply) {
          const comments = self.comments.filter(e => e._id == result.reply)
          if (comments.length) {
            if (comments[0].replies == undefined) {
              comments[0].replies = []
            }
            const replies = comments[0].replies.filter(e => e._id == result._id)
            if (!replies.length) {
              playSound(sound)
              self.replied({_id: result.reply, data: result});
            }
          }
        } else {
          const comments = self.comments.filter(e => e._id == result._id)
          if (!comments.length) {
            playSound(sound)
            self.comments.unshift(result);
          }
        }
      });
    },
    async finishSession() {
      await Apis.put(`live_session/${this.$route.params.liveSessionId}/status/FINISHED`)
      this.onCloseRoom()
      this.$router.push('/courses')
    },
    addComment(comment) {
      this.comments.unshift(comment)
    },
    replied(data) {
      this.comments.map((comment) => {
        if (comment._id === data._id) {
          if (!comment.replies) {
            comment.replies = []
          }
          comment.replies.unshift(data.data)
        }
      });
    },
    async getUserInfo(id) {
      const response = await Apis.get(`user/byId/${id}`)
      response.data.data.attendance = 20
      return response.data.data
    },
    toggleMenu(status) {
      this.showMenu = status
      const self = this;
      if (status) {
        setTimeout(() => {
          self.showMenu = false
        }, 4000)
      }
    },
    shareScreen() {
      if (!this.isPresenting) {
        setTimeout(() => {
          document.getElementById("video_screen_feed").srcObject.getVideoTracks()[0].addEventListener('ended', () =>
              this.shareScreen())
        }, 5000)
      }
      let message = {
        id: this.isPresenting ? 'stopSharingScreen' : 'shareScreen',
      }

      this.sendMessage(message);
      this.isPresenting = !this.isPresenting;
      if (!this.isPresenting) {
        this.sendMessage({
          id: "notifyUser",
          receiver: "ALL",
          videoStatus: this.videoEnabled,
          audioStatus: this.audioEnabled,
          screenStatus: this.isPresenting
        })
      }
    },
    register() {
      // document.getElementById('room-header').innerText = 'ROOM ' + this.participationInfo.room;
      // document.getElementById('join').style.display = 'none';
      // document.getElementById('room').style.display = 'block';

      let message = {
        id: 'joinRoom',
        name: this.participationInfo.name,
        room: this.participationInfo.room,
        record_session: this.live_session.record_session || false,
        offeringCourse: this.participationInfo.isOfferingCourse
      }
      this.sendMessage(message);
    },
    sendMessage(message) {
      let jsonMessage = JSON.stringify(message);
      this.ws.send(jsonMessage);
    },

    onNewParticipant(request) {
      if (request.name != this.participationInfo.name + '_screen') {
        this.receiveVideo(request.name);
      }
    },
    participantIndex(name) {
      const result = this.participants.filter(e => e.name == name)
      return this.participants.indexOf(result[0]);
    },
    removeParticipant(index) {
      this.participants.splice(index, 1)
    },
    receiveVideoResponse(result) {

      this.participants[this.participantIndex(result.name)].rtcPeer.processAnswer(result.sdpAnswer, function (error) {
        if (error) return console.error(error);
      });
    },

    callResponse(message) {
      if (message.response != 'accepted') {
        stop();
      } else {
        WebRtcPeer.processAnswer(message.sdpAnswer, function (error) {
          if (error) return console.error(error);
        });
      }
    },

    async onExistingParticipants(msg) {
      const self = this
      let constraints = self.isPresenting ? {
        audio: true,
        video: true
      } : {
        audio: true,
        video: {
          mandatory: {
            maxWidth: 320,
            maxFrameRate: 15,
            minFrameRate: 15
          }
        }
      };

      if (!this.participationInfo.isOfferingCourse) {
        constraints = null
      }

      let participant = new Participant(self.isPresenting ? `${this.participationInfo.name}_screen` : this.participationInfo.name, this, true, await this.getUserInfo(this.participationInfo.name.split('_')[0]));

      this.participants.push(participant);
      this.addParticipant({id: participant.userInfo._id})

      let video = participant.getVideoElement();

      let options = {
        localVideo: video,
        mediaConstraints: constraints,
        onicecandidate: participant.onIceCandidate.bind(participant)
      }

      if (self.isPresenting) {
        options.sendSource = 'screen'
      }

      participant.rtcPeer = this.participationInfo.isOfferingCourse ? new WebRtcPeer.WebRtcPeerSendonly(options,
          function (error) {
            if (error) {
              return console.error(error);
            }
            if (self.me === null)
              self.me = participant;
            this.generateOffer(participant.offerToReceiveVideo.bind(participant));

          }) : new WebRtcPeer.WebRtcPeerRecvonly(options,
          function (error) {
            if (error) {
              return console.error(error);
            }
            if (self.me === null)
              self.me = participant;
            this.generateOffer(participant.offerToReceiveVideo.bind(participant));

          });

      msg.data.forEach(this.receiveVideo);

      if (self.isPresenting) {
        self.sendMessage({
          id: "notifyUser",
          receiver: "ALL",
          videoStatus: this.videoEnabled,
          audioStatus: this.audioEnabled,
          screenStatus: this.isPresenting
        })
      }

    },
    releaseQuiz() {
      this.displayQuiz = true
      this.socket.emit("live/releaseQuiz", {
        quiz: this.live_session.quiz,
        receivers: this.$store.getters['live_session/participants']
      });
    },
    checkAttandance() {
      this.socket.emit("live/checkAttendance", {
        receivers: this.$store.getters['live_session/participants'],
        session_id: this.$route.params.liveSessionId
      });
      this.$store.dispatch("app_notification/SET_NOTIFICATION", {
        message: 'Attendance popup sent',
        status: "info",
        uptime: 5000,
      });
    },
    toogleVideo() {
      let message = {
        id: 'toogleMedia',
        isVideo: true,
        enabled: this.me.rtcPeer.videoEnabled
      }
      this.sendMessage(message);
      this.me.rtcPeer.videoEnabled = !this.me.rtcPeer.videoEnabled;
      this.videoEnabled = !this.videoEnabled;
    },
    toogleAudio() {
      let message = {
        id: 'toogleMedia',
        isVideo: false,
        enabled: this.me.rtcPeer.audioEnabled
      }
      this.sendMessage(message);
      this.me.rtcPeer.audioEnabled = !this.me.rtcPeer.audioEnabled
      this.audioEnabled = !this.audioEnabled;
    },
    leaveRoom() {
      this.sendMessage({
        id: this.participationInfo.isOfferingCourse ? 'closeRoom' : 'leaveRoom'
      });
      if (!this.participationInfo.isOfferingCourse) {
        this.onCloseRoom();
      }
    },
    onCloseRoom() {
      for (let key in this.participants) {
        this.participants[key].dispose();
      }

      // this.ws.close();
      // this.handleMediaTracks();
      // this.$router.push('/')
    },
    async receiveVideo(sender) {
      let participant = sender == this.participationInfo.name ? this.participants[this.participantIndex(sender)] : new Participant(sender, this, false, await this.getUserInfo(sender.split('_')[0]));
      if (participant.userInfo.category == "INSTRUCTOR") {
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
      }
      if (sender != this.participationInfo.name) {
        this.participants.push(participant);
        this.addParticipant({id: participant.userInfo._id})
        if (this.participationInfo.isOfferingCourse) {
          this.sendMessage({
            id: "notifyUser",
            receiver: participant.name,
            videoStatus: this.videoEnabled,
            audioStatus: this.audioEnabled,
            screenStatus: this.isPresenting
          })

          // notify new user if quiz was released
          if (this.displayQuiz)
            this.socket.emit("live/releaseQuiz", {
              quiz: this.live_session.quiz,
              receivers: [{id: participant.userInfo._id}]
            });
        }
      }
    },

    onParticipantLeft(request) {
      this.participants[this.participantIndex(request.name)].dispose();
      this.removeParticipant(this.participantIndex(request.name))
      // let participant = this.participants[request.name];
      //
      // delete this.participants[request.name];
    },
    toogleMedia(obj) {
      if (obj.isVideo) {
        if (obj.enabled == this.noVideo) {
          this.noVideo = !this.noVideo
        }
      }
    },
    stopTracks(tracks) {
      for (const i in tracks) {
        tracks[i].stop()
      }
    },
    startCounting(live_session) {
      this.interval = setInterval(() => {
        this.elapsed_time = elapsedDuration(convertUTCDateToLocalDate(new Date(live_session.date.replace("00:00", live_session.time))));
      }, 1000)
    },
    handleMediaTracks() {
      const screen = document.getElementById("video_screen_feed");
      const video = document.getElementById("video_feed");
      if (video)
        if (video.srcObject) {
          this.stopTracks(video.srcObject.getTracks())
        }
      if (screen)
        if (screen.srcObject) {
          this.stopTracks(screen.srcObject.getTracks())
        }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.ws)
      this.ws.close();
    this.handleMediaTracks();
    clearInterval(this.interval)
    next();
  }
  ,
  watch: {
    videoEnabled() {
      this.noVideo = !this.videoEnabled
    },
    end_class() {
      if (this.end_class)
        this.leaveRoom()
    }
  }
}
</script>

<style lang="scss">
@import '../../../assets/sass/imports/live-class';
</style>
