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
    let video = document.getElementById("video_feed");
    let rtcPeer;
    this.vm = vm;
    this.offeringCourse = offeringCourse

    console.log(userInfo)
    if (userInfo.category == "INSTRUCTOR") {
        video.autoplay = true;
        // video.play();
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
        if (this.rtcpeer)
            this.rtcPeer.dispose();
    };
}
