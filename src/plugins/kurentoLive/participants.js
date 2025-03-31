/* eslint-disable */

const PARTICIPANT_MAIN_CLASS = 'participant main';

/**
 * Creates a video element for a new participant
 *
 * @param {String} name - the name of the new participant
 *
 * @param {Object} vm -    vue instance that contains send message method
 *
 *
 * @param {boolean} offeringCourse - if participant is the one who is offering course
 * @return
 */
export default function Participant(name, vm, offeringCourse = false, userInfo) {
    this.name = name;
    this.userInfo = userInfo;
    let video = document.getElementById(name.includes("_screen") ? vm.participationInfo.isOfferingCourse ? "video_screen_feed" : "viewer_screen_feed" : "video_feed");
    let rtcPeer;
    this.vm = vm;
    this.offeringCourse = offeringCourse

    console.log(userInfo)
    if (userInfo.category == "INSTRUCTOR") {
        // video.setAttribute('poster','https://apis.kurious.rw/assets/images/video-loader.gif')
        video.setAttribute('poster','https://apis.kurious.rw/assets/images/kurious_logos2.gif')

        video.onloadedmetadata = function(e) {

            video.play();

            setTimeout(function(){
                console.log(video.paused)
                if(video.paused){
                    video.removeAttribute('poster')
                    let button  = document.querySelector('.play_button')
                    button.style.display = 'initial'
                    // button.click()
                }
            }, 1500)
        };

    }

    this.getVideoElement = function () {
        return video;
    }

    function isPresentMainParticipant() {
        return ((document.getElementsByClassName(PARTICIPANT_MAIN_CLASS)).length !== 0);
    }

    this.offerToReceiveVideo = function (error, offerSdp, wp) {
        if (error) return console.error("sdp offer error")
        console.log('Invoking SDP offer callback function');
        let msg = {
            id: "receiveVideoFrom",
            sender: name,
            sdpOffer: offerSdp
        };

        vm.sendMessage(msg);
    }


    this.onIceCandidate = (candidate, wp) => {
        console.log("Local candidate" + JSON.stringify(candidate));

        let message = {
            id: 'onIceCandidate',
            candidate: candidate,
            name: name
        };

        vm.sendMessage(message);
    }

    Object.defineProperty(this, 'rtcPeer', {writable: true});

    this.dispose = function () {
        console.log('Disposing participant ' + this.name);
        if (this.rtcPeer)
            this.rtcPeer.dispose();
    };
}
