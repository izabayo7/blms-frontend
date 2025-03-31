/* eslint-disable */

const PARTICIPANT_MAIN_CLASS = 'participant main';
const PARTICIPANT_CLASS = 'participant';

/**
 * Creates a video element for a new participant
 *
 * @param {String} name - the name of the new participant, to be used as tag
 *                        name of the video element.
 *                        The tag of the new element will be 'video<name>'
 * @param {Object} vm -    vue instance that contains send message method
 *
 *
 * @param {boolean} offeringCourse - if participant is the one who is offering course
 * @return
 */
export default function Participant(name, vm, offeringCourse = false, userInfo) {
    this.name = name;
    this.userInfo = userInfo;
    // let container = document.createElement('div');
    // container.className = isPresentMainParticipant() ? PARTICIPANT_CLASS : PARTICIPANT_MAIN_CLASS;
    // container.id = name;
    // let span = document.createElement('span');
    // let video = document.createElement('video');
    let video = document.getElementById("video_feed");
    let rtcPeer;
    // this.vm = vm;
    this.offeringCourse = offeringCourse

    // container.appendChild(video);
    // container.appendChild(span);
    // container.onclick = switchContainerClass;
    // document.getElementById('participants').appendChild(container);
    //
    // span.appendChild(document.createTextNode(name));
    //
    // video.id = 'video-' + name;
    console.log(userInfo)
    if (userInfo.category == "INSTRUCTOR") {
        video.autoplay = true;
        video.play();
    }
    // video.controls = false;


    // this.getElement = function () {
    //     return container;
    // }

    this.getVideoElement = function () {
        return video;
    }

    // function switchContainerClass() {
    //     if (container.className === PARTICIPANT_CLASS) {
    //         let elements = Array.prototype.slice.call(document.getElementsByClassName(PARTICIPANT_MAIN_CLASS));
    //         elements.forEach(function (item) {
    //             item.className = PARTICIPANT_CLASS;
    //         });
    //
    //         container.className = PARTICIPANT_MAIN_CLASS;
    //     } else {
    //         container.className = PARTICIPANT_CLASS;
    //     }
    // }

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
