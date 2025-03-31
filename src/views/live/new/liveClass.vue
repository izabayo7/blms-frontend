<template>
<div class="live-class">
  <div class="live-class--wrapper">
    <div id="container">
      <div id="wrapper">
        <div id="join" class="animate join">
          <h1>Join a Room</h1>
          <form onsubmit="register(); return false;" accept-charset="UTF-8">
            <p>
              <input type="text" name="name" value="" id="name"
                placeholder="Username" required>
            </p>
            <p>
              <input type="text" name="room" value="" id="roomName"
                placeholder="Room" required>
            </p>
            <p class="submit">
              <input type="submit" name="commit" value="Join!">
            </p>
          </form>
        </div>
        <div id="room" style="display: none;">
          <h2 id="room-header"></h2>
          <div id="participants"></div>
          <input type="button" id="button-leave" onmouseup="leaveRoom();"
            value="Leave room">
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import "../../../plugins/kurentoLive/kurento-utils"
  import Participant from "../../../plugins/kurentoLive/participants";
  import "../../../plugins/kurentoLive/"

export default {
  name: "liveClass",
  data(){
    return{
      ws:null,
      name:"",
      room:"",
      participants:[],
    }
  },
  methods:{
     register() {
      this.name = document.getElementById('name').value;
      let room = document.getElementById('roomName').value;

      document.getElementById('room-header').innerText = 'ROOM ' + room;
      document.getElementById('join').style.display = 'none';
      document.getElementById('room').style.display = 'block';

      let message = {
        id : 'joinRoom',
        name : this.name,
        room : room,
      }
      this.sendMessage(message);
    },
    sendMessage(message) {
      let jsonMessage = JSON.stringify(message);
      console.log('Sending message: ' + jsonMessage);
      this.this.ws.send(jsonMessage);
    },

    onNewParticipant(request) {
      this.receiveVideo(request.name);
    },

    receiveVideoResponse(result) {
      this.participants[result.name].rtcPeer.processAnswer (result.sdpAnswer, function (error) {
        if (error) return console.error (error);
      });
    },

    callResponse(message) {
      if (message.response != 'accepted') {
        console.info('Call not accepted by peer. Closing call');
        stop();
      } else {
        webRtcPeer.processAnswer(message.sdpAnswer, function (error) {
          if (error) return console.error (error);
        });
      }
    },

    onExistingParticipants(msg) {
      let constraints = {
        audio : true,
        video : {
          mandatory : {
            maxWidth : 320,
            maxFrameRate : 15,
            minFrameRate : 15
          }
        }
      };

      console.log(this.name + " registered in room " + room);
      let participant = new Participant(this.name);
      this.participants[this.name] = participant;
      let video = participant.getVideoElement();

      let options = {
            localVideo: video,
            mediaConstraints: constraints,
            onicecandidate: participant.onIceCandidate.bind(participant)
          }
      participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options,
        function (error) {
          if(error) {
            return console.error(error);
          }
          this.generateOffer (participant.offerToReceiveVideo.bind(participant));
      });

      msg.data.forEach(this.receiveVideo);
    },

    leaveRoom() {
      this.sendMessage({
        id : 'leaveRoom'
      });

      for ( let key in this.participants) {
        this.participants[key].dispose();
      }

      document.getElementById('join').style.display = 'block';
      document.getElementById('room').style.display = 'none';

      this.ws.close();
    },

    receiveVideo(sender) {
      let participant = new Participant(sender);
      this.participants[sender] = participant;
      let video = participant.getVideoElement();

      let options = {
          remoteVideo: video,
          onicecandidate: participant.onIceCandidate.bind(participant)
        }

      participant.rtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options,
          function (error) {
            if(error) {
              return console.error(error);
            }
            this.generateOffer (participant.offerToReceiveVideo.bind(participant));
      })

    },

    onParticipantLeft(request) {
      console.log('Participant ' + request.name + ' left');
      let participant = this.participants[request.name];
      participant.dispose();
      delete this.participants[request.name];
    }
  },
  created(){

  const host = 'https://198.211.107.132:8443/'
    
    this.ws = new WebSocket('wss://' + host + '/groupcall');
    
    window.onbeforeunload = function() {
      this.ws.close();
    };
    
    this.ws.onmessage = function(message) {
      let parsedMessage = JSON.parse(message.data);
      console.info('Received message: ' + message.data);
    
      switch (parsedMessage.id) {
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
    

  }
}
</script>

<style lang="scss" >
.live-class{
  &--wrapper{

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
      background: url(http://www.quilor.com/i/select.png) no-repeat right
        center, -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fbfbfb),
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
      -webkit-box-shadow: 0 0 200px rgba(255, 255, 255, 0.5), 0 1px 2px
        rgba(0, 0, 0, 0.3);
      box-shadow: 0 0 200px rgba(255, 255, 255, 0.5), 0 1px 2px
        rgba(0, 0, 0, 0.3);
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
      border-radius: 4px;
      /* border: 2px groove; */
      margin-left: 5;
      margin-right: 5;
      width: 150;
      text-align: center;
      overflow: hide;
      float: left;
      padding: 5px;
      border-radius: 10px;
      -webkit-box-shadow: 0 0 200px rgba(255, 255, 255, 0.5), 0 1px 2px
        rgba(0, 0, 0, 0.3);
      box-shadow: 0 0 200px rgba(255, 255, 255, 0.5), 0 1px 2px
        rgba(0, 0, 0, 0.3);
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
      background-color: 0A33B6;
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
        -webkit-transform:
        translateX(200%);
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
}

</style>