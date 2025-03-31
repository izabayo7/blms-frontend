<template>
  <v-dialog v-model="show" :persistent="false">
    <!-- mds => media sources selection-->
    <div class="mds">
      <div class="mds--wrapper">
        <h4>Media Sources selection settings</h4>
        <div class="mds--panel" v-if="devices.video">

          <!--        media selection col-->
          <div class="mds--panel--selection">

            <!--          select video input-->
            <div class="mds--panel--selection--media mds--panel--selection--media--video">
              <div class="name-of-selection">
                <span class="media name">Video device</span>
                <span class="media-icon">
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M5.68572 0.976562H0.841818C0.628914 0.976562 0.42473 1.06114 0.274184 1.21168C0.123638 1.36223 0.0390625 1.56641 0.0390625 1.77932L0.0390625 6.62322C0.0390625 6.72864 0.0598264 6.83302 0.100169 6.93042C0.140511 7.02781 0.199641 7.11631 0.274184 7.19085C0.348727 7.26539 0.437222 7.32453 0.534617 7.36487C0.632012 7.40521 0.736399 7.42597 0.841818 7.42597H5.68572C5.79114 7.42597 5.89552 7.40521 5.99292 7.36487C6.09031 7.32453 6.17881 7.26539 6.25335 7.19085C6.32789 7.11631 6.38703 7.02781 6.42737 6.93042C6.46771 6.83302 6.48847 6.72864 6.48847 6.62322V1.77932C6.48847 1.56641 6.4039 1.36223 6.25335 1.21168C6.10281 1.06114 5.89862 0.976563 5.68572 0.976562ZM8.86633 1.6098L7.02592 2.87703V5.52019L8.86633 6.78818C8.94646 6.84407 9.04028 6.87711 9.13775 6.88373C9.23522 6.89036 9.33265 6.87034 9.4196 6.82581C9.50655 6.78128 9.57975 6.71392 9.63133 6.63096C9.68292 6.54799 9.71095 6.45255 9.71242 6.35487V2.04082C9.71029 1.94344 9.68181 1.84846 9.63001 1.76598C9.5782 1.68349 9.50502 1.61659 9.41823 1.57237C9.33144 1.52816 9.23429 1.50829 9.13711 1.51488C9.03994 1.52147 8.94636 1.55427 8.86633 1.6098Z"
                      fill="#646464"/>
                </svg>
              </span>
              </div>
              <div class="selection">
                <select-ui id="mds-vid-input" v-model="selectedDevices.video" name="mds-vid-input"
                           @input="handleDeviceChange('videoinput')"
                           :options="devices.video.map(device => device.label)"/>
              </div>
            </div>

            <!--          select audio input-->
            <div class="mds--panel--selection--media mds--panel--selection--media--audio-in">
              <div class="name-of-selection">
                <span class="media name">Audion input</span>
                <span class="media-icon">
                  <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M5.70766 0.620117V10.1612H6.90039V0.620117H5.70766ZM3.32296 1.81285V8.96847H4.51569V1.81285H3.32296ZM8.09312 3.00558V7.77574H9.28585V3.00558H8.09312ZM0.9375 4.19831V6.58301H2.13023V4.19831H0.9375Z"
                        fill="#646464"/>
                  </svg>
              </span>
              </div>
              <div class="selection">
                <select-ui id="mds-audio-in" v-model="selectedDevices.audioInput" name="mds-audio-in"
                           @input="handleDeviceChange('audioinput')"
                           :options="devices.audioInput.map(device => device.label)"/>
              </div>
            </div>

            <!--          select audio output-->
            <div class="mds--panel--selection--media mds--panel--selection--media--audio-out">
              <div class="name-of-selection">
                <span class="media name">Audio output</span>
                <span class="media-icon">
                <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M5.70766 0.620117V10.1612H6.90039V0.620117H5.70766ZM3.32296 1.81285V8.96847H4.51569V1.81285H3.32296ZM8.09312 3.00558V7.77574H9.28585V3.00558H8.09312ZM0.9375 4.19831V6.58301H2.13023V4.19831H0.9375Z"
                    fill="#646464"/>
                </svg>
              </span>
              </div>
              <div class="selection">
                <select-ui id="mds-audio-out" name="mds-audio-out" v-model="selectedDevices.audioOutput"
                           @input="handleDeviceChange('audio-output')"
                           :options="devices.audioOutput.map(device => device.label)"/>
              </div>
            </div>
            <div class="mds-go-live">
              <div class="mds-go-live--btn">
                <button-ui fill @click="$emit('closeSettings')">
                  <template #content>Go live</template>
                </button-ui>
              </div>
            </div>

          </div>

          <!--        preview col-->
          <div class="mds--panel--preview">
            <div class="mds--panel--preview--video">
              <video id="settings_video_preview" ref="md-video-preview" muted></video>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import SelectUi from "../reusable/ui/select-ui";
import ButtonUi from "../reusable/ui/button-ui";

export default {
  name: "MediaSourcesSelection",
  props: {
    show: Boolean,
    stream: MediaStream,
    peerConnection: RTCPeerConnection,
  },
  components: {ButtonUi, SelectUi},
  data() {
    return {
      devices: {
        video: null,
        audioInput: null,
        audioOutput: null,
      },
      selectedDevices: {
        video: null,
        audioInput: null,
        audioOutput: null,
      }
    }
  },
  methods: {
    handleDeviceChange(type) {
      let deviceid = this.filterDeviceId(this.selectedDevices[type.includes('video') ? 'video' : `audio${type.includes('input') ? 'Input' : 'Output'}`], type)

      if ((type === 'videoinput' && this.stream.getVideoTracks()[0].getSettings().deviceId == deviceid) || (type === 'audioinput' && this.stream.getAudioTracks()[0].getSettings().deviceId == deviceid))
        return

      if (type.includes('input')) {
        navigator.mediaDevices
            .getUserMedia(type.includes('video') ? {
              video: {
                deviceId: {
                  exact: deviceid
                }
              }
            } : {
              audio: {
                deviceId: {
                  exact: deviceid
                }
              }
            })
            .then((stream) => {
              if (type.includes('video')) {
                let videoTrack = stream.getVideoTracks()[0];
                let oldVideoTrack = this.stream.getVideoTracks()[0];

                this.stream.removeTrack(oldVideoTrack);
                this.stream.addTrack(videoTrack);

                let sender = this.peerConnection.getSenders().find(function (s) {
                  return s.track.kind == videoTrack.kind;
                });
                sender.replaceTrack(videoTrack);
              } else if (type.includes('input')) {
                let audioTrack = stream.getAudioTracks()[0];
                let oldAudioTrack = this.stream.getAudioTracks()[0];

                this.stream.removeTrack(oldAudioTrack);
                this.stream.addTrack(audioTrack);

                let sender = this.peerConnection.getSenders().find(function (s) {
                  return s.track.kind == audioTrack.kind;
                });
                sender.replaceTrack(audioTrack);
              }
            })
            .catch(function (err) {
              console.error('Error happens:', err);
            });
      }

      console.log(`\n\n\n ${type} Device changed\n\n\n`)
    },
    // handling stream on video element
    handleStream(stream) {
      // console.clear()
      setTimeout(() => {
        const videoEl = document.getElementById("settings_video_preview")
        if (videoEl) {
          videoEl.srcObject = stream;
          videoEl.play()
        }
      }, 500)
    },

    // filter devices by name and return device id
    filterDeviceId(name, type) {
      let device;

      if (type === 'videoinput')
        device = this.devices.video.filter(device => device.label === name)

      if (type === 'audiooutput')
        device = this.devices.audioOutput.filter(device => device.label === name)

      if (type === 'audioinput')
        device = this.devices.audioInput.filter(device => device.label === name)
      if (!device)
        return undefined
      //let us use first device since filter return array
      device = device[0]

      return device.deviceId
    },

    //initiate stream
    async initiateStream() {
      // const constraints = {
      //   audio: true,
      //   video: {width: 315, height: 190},
      //   deviceId: {
      //     exact: this.filterDeviceId(this.selectedDevices.video, 'videoinput')
      //   }
      // }
      //
      //
      // navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
      //     navigator.msGetUserMedia || navigator.oGetUserMedia
      //
      //
      // const stream = await navigator.mediaDevices.getUserMedia(constraints)
      if (this.stream)
        this.handleStream(this.stream)
    }
  },
  watch: {
    show() {
      if (this.show)
        this.initiateStream()
    },
    selectedDevices() {
      console.log(this.selectedDevices)
    }
  },
  async created() {
    const devices = await navigator.mediaDevices.enumerateDevices()
    this.devices.video = devices.filter(dvc => dvc.kind === 'videoinput')
    this.devices.audioInput = devices.filter(dvc => dvc.kind === 'audioinput')
    this.devices.audioOutput = devices.filter(dvc => dvc.kind === 'audiooutput')

    // wait for this instance to update again since
    // selectedDevices values will be updated after other values have been assigned to values
    this.$nextTick(() => {
      this.initiateStream()
    })

  }
}
</script>

<style lang="scss" scoped>
.mds {
  //@include fit-content;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;

  &--wrapper {
    background-color: $color-white;
    padding: 2.75rem;

    h4 {
      text-align: center;
      font-weight: 500;

    }

  }

  //panel
  &--panel {
    display: flex;
    margin-top: 1rem;

    &--selection {
      &--media {
        margin: 1rem 0;
        display: flex;

        .name-of-selection {
          .media-icon {
            margin: 0 1rem;
          }
        }

        .selection {
          width: 14.25rem;
        }
      }

    }

    &--preview {
      width: 328.28px;
      height: 184.6575px;

      margin-left: 3rem;

      &--video {
        padding: .5rem;
        border: 2px solid lighten($grayish, 30);

        video {
          width: 100%;
        }
      }

    }
  }

  &-go-live {
    display: grid;
    place-items: center;
    margin-top: .5rem;

    &--btn {
      width: 9rem;
    }
  }
}
</style>