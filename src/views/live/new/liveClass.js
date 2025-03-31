import {WebRtcPeer} from "../../../plugins/kurentoLive/kurento-utils.js"
import Participant from "../../../plugins/kurentoLive/participants";
import {downloadAttachment} from "@/services/global_functions"
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'
import Discussion from "../../../components/Live/Discussion";
import {elapsedDuration, toLocal} from "@/services/global_functions"
import OnlineUser from "../../../components/Live/OnlineUser";
import StudentNewCommentWithPhoto from "../../../components/Live/StudentNewCommentWithPhoto";
import Apis from '../../../services/apis'
import {convertUTCDateToLocalDate, playSound} from "../../../services/global_functions";
import MediaSourcesSelection from "@/components/Live/MediaSourcesSelection";

const sound = require("../../../assets/audio/com.mp3");

export default {
  name: "liveClass",
  components: {
    Discussion,
    StudentNewCommentWithPhoto,
    OnlineUser,
    MediaSourcesSelection,
    back: () => import("@/components/shared/back-button"),
  },
  data() {
    return {
      displaySettings: false,
      ws: null,
      isHandRaised: false,
      newCommentAvailable: false,
      participants: [],
      presenter_id: undefined,
      currentPresenter: undefined,
      comments: [],
      me: null,
      interval: null,
      id: "",
      displayQuiz: false,
      elapsed_time: "",
      quiz: null,
      comment: "",
      noVideo: false,
      showComments: false,
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

            if (this.sidebarOpen)
              this.toggle()

            await Apis.create('user_logs', {live_session_id: d.data.data._id})

            this.live_session = d.data.data
            this.startCounting(d.data.data);

            this.initialiseSession()
            this.loadComments()
            let span = document.querySelector('.message-row span')
            if (!this.participationInfo.isOfferingCourse) {
              let div = document.querySelector('.main-content')
              div.style.background = 'radial-gradient(87.57% 87.57% at 59.46% 43.68%, #193074 0%, rgba(0, 0, 0, 0.92) 100%)';
              if (span)
                span.className = "stud_span";
            }

          }
        }
      }
      this.loaded = true
    })
  },
  computed: {
    ...mapGetters('user', ['user']),
    ...mapGetters("chat", ["socket"]),
    ...mapGetters("live_session", ["live_session_confirmation"]),

    ...mapState("sidebar_navbar", {sidebarOpen: "sidebar_expanded"}),
    instructorParticipant() {
      const el = this.participants.filter(e => e.userInfo.category == "INSTRUCTOR" && e.userInfo._id == this.live_session.course.user)
      return el[0]
    },
    instructor() {
      return this.instructorParticipant ? this.instructorParticipant.userInfo : undefined
    },
    userCategory() {
      return this.$store.state.user.user.category.name;
    },
    isStudentPresenting() {
      return this.participationInfo.isOfferingCourse && this.userCategory == 'STUDENT'
    }
  },
  methods: {
    handleRoomClosed(){
      if (!this.participationInfo.isOfferingCourse)
        this.set_modal({
          template: 'live_related_ended',
          title: 'Live class ended',
          message: 'Hey user, the class you were attending has ended.',
        })
      else {
        this.finishSession();
        this.onCloseRoom();
      }
    },
    goodbye(e) {
      if (!e) e = window.event;
      //e.cancelBubble is supported by IE - this will kill the bubbling process.
      e.cancelBubble = true;
      e.returnValue = 'You sure you want to leave?'; //This is displayed on the dialog

      //e.stopPropagation works in Firefox.
      if (e.stopPropagation) {
        e.stopPropagation();
        e.preventDefault();
      } else {
        this.sendMessage({
          id: 'leaveRoom'
        });
        this.ws.close();
      }
    },
    create_videoElement(id) {
      let element = document.querySelector(`#video_feed${id}`)
      if (!element) {
        element = document.createElement('video')
        element.setAttribute('id', `video_feed${id}`)
        document.querySelector('.video-container').appendChild(element)
      }
      return element
    },
    stop_presenter() {
      let id = this.currentPresenter._id;
      this.socket.emit("live/presentation_request", {
        receiver: {id},
        message: 'cancel_presenting'
      });
      this.currentPresenter = undefined
      this.onViewerStopedPresenting()
    },
    async hideVideos() {
      const video = document.getElementById("video_feed");
      if (video.className != '' && this.instructor)
        video.className = ''

      let displayedVideos = document.querySelectorAll('video.show')
      for (const i in displayedVideos) {
        if (displayedVideos[i].id ? !displayedVideos[i].id.includes('_screen') : false)
          displayedVideos[i].className = '';
      }
    },
    async displaySrcVideo() {
      if (this.me) {

        await this.hideVideos();

        if ((this.currentPresenter ? this.currentPresenter._id == this.me.userInfo._id : this.me.userInfo._id == this.live_session.course.user) || this.isStudentPresenting) {
          console.log('\n\n\ninner\n\n\n')
          let video = this.me.getVideoElement()
          video.muted = true
          video.setAttribute('class', 'show')
        } else {
          console.log('twageze aha')
          for (let i in this.participants) {
            console.log(`\n\nparticipantId: ${this.participants[i].userInfo._id}\ncurrentPresenter: ${this.currentPresenter ? this.currentPresenter._id : this.instructor._id}\n`)
            if (this.participants[i].userInfo._id == (this.currentPresenter ? this.currentPresenter._id : this.instructor._id)) {
              console.log('twageze mo imbere')
              console.log(`\n\nparticipantId: ${this.participants[i].userInfo._id}\ncurrentPresenter: ${this.currentPresenter ? this.currentPresenter._id : this.instructor._id}\n`)
              const video = this.participants[i].getVideoElement();
              video.muted = false
              video.setAttribute('class', 'show')
              break;
            }
          }
        }
      }
    },
    stopped_presenting(forced) {
      if (forced) {
        this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: 'Sorry your the instructor canceled your presentation',
          status: "info",
          uptime: 5000,
        })
        if (this.isPresenting) {
          this.shareScreen();
        }
      }
      this.isPresenting = false;
      this.participationInfo.isOfferingCourse = false
      this.me.rtcPeer.enabled = false
      this.displaySrcVideo()
    },
    presenterChanged(id) {
      console.log(`\n\n\nYahindutse wlh ${id}\n\n\n`)
      document.querySelector('video.show').className = ''
      if (this.me.userInfo._id == this.live_session.course.user) {
        this.me.rtcPeer.enabled = false
        if (this.isPresenting) {
          this.shareScreen();
        }
      }

      for (let i in this.participants) {
        if (this.participants[i].userInfo._id == id) {
          let vid = document.querySelector(`video#video_feed${id}`)
          vid.setAttribute('class', 'show')
          setTimeout(() => {
            vid.play()
          }, 500)
          this.currentPresenter = this.participants[i].userInfo;
          break;
        }
      }
    },
    onHandRaisedOrLowerd(sender, raisedHand) {
      for (const i in this.participants) {
        if (this.participants[i].userInfo._id == sender) {
          this.participants[i].userInfo.raisedHand = raisedHand
          break;
        }
      }
    },
    handlePresentationResponse(sender, allowed) {
      this.isHandRaised = false;
      if (allowed) {
        if (!this.isStudentPresenting)
          this.set_modal({
            template: 'presentation_request',
            method: {action: 'live_session/change_confirmation', parameters: {value: 'accept_presenting'}},
          })
      } else
        this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: 'Sorry your request to present was denied',
          status: "danger",
          uptime: 2000,
        })
    },
    accept_presenter(id) {
      this.socket.emit("live/presentation_request", {
        receiver: {id},
        message: 'accept_presenting'
      });
      this.onHandRaisedOrLowerd(id, false)
      // let me = this.me
      // me.rtcPeer = new WebRtcPeer.WebRtcPeerRecvonly({},
      //     function (error) {
      //       if (error) {
      //         return console.error(error);
      //       }
      //       this.generateOffer(me.offerToReceiveVideo.bind(me));
      //
      //     });
    },
    requestPresenting(raiseHand, id) {
      this.socket.emit("live/presentation_request", {
        receiver: {id},
        message: raiseHand ? 'request_presenting' : 'revert_presenting_request'
      });
      this.onHandRaisedOrLowerd(id, false)
    },
    deny_presenter(id) {
      this.socket.emit("live/presentation_request", {
        receiver: {id},
        message: 'deny_presenting'
      });
      this.onHandRaisedOrLowerd(id, false)
    },
    onViewerStopedPresenting() {
      this.start_presenting()
    },
    start_presenting() {
      this.participationInfo.isOfferingCourse = true;
      this.isPresenting = false
      // live/presenterChanged
      const session_id = this.live_session._id;
      const receivers = []
      this.participants.map(x => {
        if (x.name != this.me.name) {
          receivers.push({id: x.userInfo._id})
        } else {
          this.me.rtcPeer.enabled = true

          if (!this.audioEnabled)
            this.me.rtcPeer.audioEnabled = false

          if (!this.videoEnabled)
            this.me.rtcPeer.videoEnabled = false

          this.displaySrcVideo()
          // this.me.getVideoElement().play()
        }
      })
      console.log(receivers, session_id)
      this.socket.emit("live/presenterChanged", {
        receivers,
        session_id
      });
      this.currentPresenter = this.me.userInfo
    },
    stop_presenting() {
      let id = this.instructor._id;
      this.socket.emit("live/presentation_request", {
        receiver: {id},
        message: 'finished_presenting'
      });
    },
    toogleComments() {
      this.showComments = !this.showComments;
    },
    ...mapMutations("sidebar_navbar", {toggle: "TOGGLE_SIDEBAR_EXPANSION"}),
    toogleFullScreen() {
      document.getElementById("video_feed").requestFullscreen()
    },
    playVideo() {
      document.querySelector("video.show").play()
      document.querySelector('.play_button').style.display = 'none'
    },
    ...mapActions("modal", ["set_modal"]),
    downloadAttachment,
    openQuiz() {
      let route = this.$router.resolve(`/assessments/quiz/preview/${this.quiz.name}`);
      this.downloadAttachment(route.href)
    },
    ...mapActions("live_session", ["addParticipant"]),
    async loadComments() {
      Apis.get(`comment/live_session/${this.$route.params.liveSessionId}`).then(d => {
        this.comments = d.data.data
        if(this.comments.length)
          this.newCommentAvailable = true
      })
    },
    initialiseSession() {
      //know if this user has ability to give live class
      this.participationInfo.isOfferingCourse = this.user.category.name === 'INSTRUCTOR'

      const self = this
      this.participationInfo.name = `${this.user.other_names} ${this.user.sur_name}`
      this.participationInfo.room = this.$route.params.liveSessionId

      this.ws = new WebSocket(process.env.VUE_APP_stream_service_url + `?token=${this.$session.get("jwt")}`);

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


      // window.onbeforeunload = () => {
      //   this.sendMessage({
      //     id: 'leaveRoom'
      //   });
      //   this.ws.close();
      //   // this.handleMediaTracks();
      // };

      window.addEventListener('beforeunload', this.goodbye)

      this.ws.onmessage = (message) => {
        let parsedMessage = JSON.parse(message.data);
        console.info('Received message: ', message);

        switch (parsedMessage.id) {
          case 'userId':
            self.id = parsedMessage.data;
            self.participationInfo.name = self.id;
            break;
          case 'roomClosed':
            self.handleRoomClosed();
            break;
          case 'screenAllowed':
            this.onExistingParticipants({data: []});
            break;
          case 'initialScreenOff':
            this.noVideo = true;
            break;
          case 'existingParticipants': {
            this.onExistingParticipants(parsedMessage);
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
            if (!this.isStudentPresenting) {
              this.isPresenting = parsedMessage.screenStatus;
            }
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
      self.socket.on("live/classEnded", () => {
        self.handleRoomClosed()
      })
      self.socket.on("res/live/presentation_request/sent", ({message}) => {
        if (['request_presenting', 'revert_presenting_request'].includes(message)) {
          this.isHandRaised = !this.isHandRaised;
        } else if (message == 'finished_presenting') {
          self.stopped_presenting()
        }
      })
      self.socket.on("res/live/presentation_request", ({message, sender}) => {
        // [request_presenting, revert_presenting_request, accept_presenting, deny_presenting
        if (message === 'request_presenting')
          this.onHandRaisedOrLowerd(sender, true)
        else if (message === 'revert_presenting_request')
          this.onHandRaisedOrLowerd(sender, false)
        else if (message === 'accept_presenting')
          this.handlePresentationResponse(sender, true)
        else if (message === 'deny_presenting')
          this.handlePresentationResponse(sender, false)
        else if (message === 'cancel_presenting')
          this.stopped_presenting(true)
        else if (message === 'currentPresenter')
          this.presenter_id = sender
        else
          this.onViewerStopedPresenting()
        console.log(message)
      })
      self.socket.on("live/presenterChanged", ({id, session_id}) => {
        console.log('\n\n', {id, session_id}, '\n\n')
        if (session_id == self.live_session._id) {
          self.presenterChanged(id)
        }
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
        if (!self.showComments) {
          self.newCommentAvailable = true
        }
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
    },
    shareScreen() {
      console.log('called !!!!!!!')
      // if (!this.isPresenting) {
      //   setTimeout(() => {
      //     document.getElementById("video_screen_feed").srcObject.getVideoTracks()[0].addEventListener('ended', () =>
      //         this.shareScreen())
      //   }, 5000)
      // }
      // console.clear()
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
      console.log(message)
      let jsonMessage = JSON.stringify(message);
      this.ws.send(jsonMessage);
    },

    onNewParticipant(request) {
      if (request.name != this.participationInfo.name + '_screen') {
        console.log(request.name)
        this.receiveVideo(request.name);
      }
    },
    participantIndex(name) {
      const result = this.participants.filter(e => e.name == name)
      return this.participants.indexOf(result[0]);
    },
    removeParticipant(index) {
      if (!this.participants[index].name.includes('_screen') && (this.currentPresenter ? (this.currentPresenter._id == this.participants[index].userInfo._id) : this.instructor._id == this.participants[index].userInfo._id)) {
        this.currentPresenter = undefined
        if (this.live_session.course.user == this.me.userInfo._id) {
          this.onViewerStopedPresenting()
        } else {
          document.querySelector('video').setAttribute('class', 'show')
        }
      }
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

      // if (!this.participationInfo.isOfferingCourse) {
      //   constraints = null
      // }
      let userInfo = await this.getUserInfo(this.participationInfo.name.split('_')[0])
      let participant = new Participant(self.isPresenting ? `${this.participationInfo.name}_screen` : this.participationInfo.name, this, true, userInfo, this.create_videoElement(userInfo._id));

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
      } else {
        console.log("isPresenting mf: " + self.isPresenting)
      }

      participant.rtcPeer = new WebRtcPeer.WebRtcPeerSendonly(options,
          function (error) {
            if (error) {
              console.error(error);
            }
            if (self.me === null)
              self.me = participant;

            video.muted = true

            this.generateOffer(participant.offerToReceiveVideo.bind(participant));
            if (self.presenter_id) {
              // console.clear()
              console.log('tumusanzemo wlh')
              self.presenterChanged(self.presenter_id)
              self.presenter_id = undefined
            } else {
              if (!self.participationInfo.isOfferingCourse) {
                if (self.instructorParticipant) {
                  participant.rtcPeer.enabled = false
                  self.displaySrcVideo();
                }
              } else {
                self.displaySrcVideo();
              }
            }
            if (self.isPresenting) {
              document.getElementById("video_screen_feed").srcObject.getVideoTracks()[0].addEventListener('ended', () =>
                  self.shareScreen())
            }
          })

      // participant.rtcPeer = this.participationInfo.isOfferingCourse ? new WebRtcPeer.WebRtcPeerSendonly(options,
      //     function (error) {
      //       if (error) {
      //         return console.error(error);
      //       }
      //       if (self.me === null)
      //         self.me = participant;
      //       this.generateOffer(participant.offerToReceiveVideo.bind(participant));
      //
      //     }) : new WebRtcPeer.WebRtcPeerRecvonly(options,
      //     function (error) {
      //       if (error) {
      //         return console.error(error);
      //       }
      //       if (self.me === null)
      //         self.me = participant;
      //       this.generateOffer(participant.offerToReceiveVideo.bind(participant));
      //
      //     });

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

      this.ws.close();
      this.handleMediaTracks();
      this.$router.push('/')
    },
    async receiveVideo(sender) {
      let participant;
      if (sender == this.participationInfo.name)
        participant = this.participants[this.participantIndex(sender)]
      else {
        let userInfo = await this.getUserInfo(sender.split('_')[0]);
        participant = new Participant(sender, this, false, userInfo, this.create_videoElement(userInfo._id));
        console.log(participant)
      }
      // if (participant.userInfo.category == "INSTRUCTOR") {
      let video = participant.getVideoElement();
      let options = {
        remoteVideo: video,
        onicecandidate: participant.onIceCandidate.bind(participant)
      }
      // let self = this
      participant.rtcPeer = new WebRtcPeer.WebRtcPeerRecvonly(options,
          function (error) {
            if (error) {
              return console.error(error);
            }
            this.generateOffer(participant.offerToReceiveVideo.bind(participant));
          })
      // }
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

          if (this.isStudentPresenting)
            this.socket.emit("live/presentation_request", {
              receiver: {id: participant.userInfo._id},
              message: 'currentPresenter'
            });

          // notify new user if quiz was released
          if (this.displayQuiz)
            this.socket.emit("live/releaseQuiz", {
              quiz: this.live_session.quiz,
              receivers: [{id: participant.userInfo._id}]
            });
        } else if (participant.userInfo.category == 'INSTRUCTOR' && !this.isStudentPresenting) {
          this.me.rtcPeer.enabled = false
          this.displaySrcVideo()
        }
      }
    },

    onParticipantLeft(request) {
      this.displaySrcVideo();
      console.log(this.participants, this.participantIndex(request.name))
      this.participants[this.participantIndex(request.name)].dispose();
      console.log(this.participants)
      this.removeParticipant(this.participantIndex(request.name))
      console.log(this.participants)
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
    if (this.ws) {
      this.sendMessage({
        id: 'leaveRoom'
      });
      this.ws.close();
    }
    this.handleMediaTracks();
    clearInterval(this.interval)
    next();
  }
  ,
  watch: {
    presenter_id() {
      if (this.presenter_id != undefined && this.me) {
        console.log('tumusanzemo wlh')
        this.presenterChanged(this.presenter_id)
        this.presenter_id = undefined
      }
    },
    videoEnabled() {
      this.noVideo = !this.videoEnabled
    },
    showComments() {
      if (this.showComments && this.newCommentAvailable) {
        this.newCommentAvailable = false
      }
    },
    live_session_confirmation() {
      if (this.live_session_confirmation == 'end_class')
        this.leaveRoom()
      else {
        if (this.live_session_confirmation == 'accept_presenting') {
          this.start_presenting()
        }
        if (this.live_session_confirmation !== '') {
          this.$store
              .dispatch(
                  'live_session/change_confirmation', {value: ''}
              )
        }
      }
    },
    participants() {
      if (!this.instructor) {
        let video = document.getElementById("video_feed");
        video.setAttribute('poster', 'https://apis.kurious.rw/assets/images/video-loader.gif')
      }
    }
  }
}
