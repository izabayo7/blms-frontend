<template>
  <main class="my-send-message">
    <div v-show="files.length" class="files-area">
      <div class="header row">
        <div class="cursor-pointer col-6 col-md-4 py-0" @click="pickFile">
          <svg width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M6.04545 3.18182V10.5C6.04545 11.9064 4.90636 13.0455 3.5 13.0455C2.09364 13.0455 0.954545 11.9064 0.954545 10.5V2.54545C0.954545 1.66727 1.66727 0.954545 2.54545 0.954545C3.42364 0.954545 4.13636 1.66727 4.13636 2.54545V9.22727C4.13636 9.57727 3.85 9.86364 3.5 9.86364C3.15 9.86364 2.86364 9.57727 2.86364 9.22727V3.18182H1.90909V9.22727C1.90909 10.1055 2.62182 10.8182 3.5 10.8182C4.37818 10.8182 5.09091 10.1055 5.09091 9.22727V2.54545C5.09091 1.13909 3.95182 0 2.54545 0C1.13909 0 0 1.13909 0 2.54545V10.5C0 12.4345 1.56545 14 3.5 14C5.43455 14 7 12.4345 7 10.5V3.18182H6.04545Z"
                fill="black"/>
          </svg>
          Attachments
        </div>
        <div class="col-1 py-0 ml-auto">
          <svg @click="clearFiles" class="cursor-pointer" width="25" height="25" viewBox="0 0 25 25" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M21 4L3.99992 21.0001" stroke="#343434" stroke-width="5" stroke-linecap="round"/>
            <path d="M4 4.00024L21.0001 21.0003" stroke="#343434" stroke-width="5" stroke-linecap="round"/>
          </svg>
        </div>
      </div>
      <div class="files">
        <FilePicker
            ref="picker"
            template="chat-files"
            :multiple="true"
            @addFile="addFile"
            @removeFile="removeFile"
        />
      </div>
    </div>
    <div class="msg-box row">
      <div v-if="!files.length" class="attach">
        <div @click="pickFile" class="icon">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27.99"
              height="33.481"
              viewBox="0 0 27.99 33.481"
          >
            <path
                id="Icon_material-attach-file"
                data-name="Icon material-attach-file"
                d="M12.955,6.818V22.5a5.455,5.455,0,1,1-10.909,0V5.455a3.409,3.409,0,1,1,6.818,0V19.773a1.364,1.364,0,1,1-2.727,0V6.818H4.091V19.773a3.409,3.409,0,1,0,6.818,0V5.455A5.455,5.455,0,1,0,0,5.455V22.5a7.5,7.5,0,1,0,15,0V6.818Z"
                transform="translate(15) rotate(30)"
            />
          </svg>
        </div>
      </div>
      <div class="msg-input" :class="{long:files.length}">
        <div v-if="recordingMode" class="recorder">
          <div class="d-none"></div>
          <div id="closeRecording" class="text-right">
            <svg @click="toogleRecorder" class="cursor-pointer" width="11" height="12" viewBox="0 0 11 12" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M10 1.50024L1.00057 10.4997" stroke="#343434" stroke-width="2" stroke-linecap="round"/>
              <path d="M1 1.50031L9.99943 10.4997" stroke="#343434" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="text-center no-edit" contenteditable="false">Record your one time audio message</div>
          <div class="text-center">
            <div class="before d-none">
              <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M15.9994 20.4998C18.2127 20.4998 19.986 18.7131 19.986 16.4998L19.9994 8.49976C19.9994 6.28642 18.2127 4.49976 15.9994 4.49976C13.786 4.49976 11.9994 6.28642 11.9994 8.49976V16.4998C11.9994 18.7131 13.786 20.4998 15.9994 20.4998ZM23.066 16.4998C23.066 20.4998 19.6794 23.2998 15.9994 23.2998C12.3194 23.2998 8.93268 20.4998 8.93268 16.4998H6.66602C6.66602 21.0598 10.2927 24.8064 14.666 25.4598V29.8331H17.3327V25.4598C21.706 24.8198 25.3327 21.0598 25.3327 16.4998H23.066Z"
                    fill="#BC7E7E"/>
              </svg>

            </div>
            <div class="after d-flex justify-center align-center">
              <div @click="toogleRecorder" class="close cursor-pointer">
                <svg width="33" height="31" viewBox="0 0 33 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M22.6647 10.8414L21.4897 9.66644L16.8314 14.3248L12.173 9.66644L10.998 10.8414L15.6564 15.4998L10.998 20.1581L12.173 21.3331L16.8314 16.6748L21.4897 21.3331L22.6647 20.1581L18.0064 15.4998L22.6647 10.8414Z"
                      fill="#FC6767"/>
                  <rect x="1.49805" y="0.999756" width="30.6667" height="29" rx="4.5" stroke="#FC6767"/>
                </svg>

              </div>
              <div class="duration">
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="9.69509" cy="9.49977" r="9.02907" fill="#FC6767"/>
                </svg>

                00:16
              </div>
              <div class="send cursor-pointer">
                <svg width="33" height="31" viewBox="0 0 33 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M20.62 11.5512L19.5284 10.4998L14.62 15.2276L15.7116 16.279L20.62 11.5512ZM23.9026 10.4998L15.7116 18.3894L12.4755 15.2798L11.3839 16.3312L15.7116 20.4998L25.002 11.5512L23.9026 10.4998ZM7.00195 16.3312L11.3297 20.4998L12.4213 19.4483L8.10131 15.2798L7.00195 16.3312Z"
                      fill="#21833F"/>
                  <rect x="0.501953" y="0.999756" width="31" height="29" rx="4.5" stroke="#21833F"/>
                </svg>

              </div>
            </div>
          </div>
        </div>
        <div
            v-else
            class="input d-flex"
            @click="inputClicked"
            @input="inputMsg"
            @keydown.prevent.enter="sendMessage"
        >
          <div class="placeholder">
            Type something..
          </div>
          <div ref="input" contenteditable="true" class="input-box">
          </div>
          <div v-if="msg === ''" @click="toogleRecorder" class="start-recording">
            <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M9.99935 16C12.2127 16 13.986 14.2133 13.986 12L13.9994 4C13.9994 1.78667 12.2127 0 9.99935 0C7.78602 0 5.99935 1.78667 5.99935 4V12C5.99935 14.2133 7.78602 16 9.99935 16ZM17.066 12C17.066 16 13.6794 18.8 9.99935 18.8C6.31935 18.8 2.93268 16 2.93268 12H0.666016C0.666016 16.56 4.29268 20.3067 8.66602 20.96V25.3333H11.3327V20.96C15.706 20.32 19.3327 16.56 19.3327 12H17.066Z"
                  fill="#71757D"/>
            </svg>
          </div>
        </div>
        <div class="filePreview"></div>
      </div>
      <div class="send">
        <div class="icon" @click="sendMessage">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="45.928"
              height="45.079"
              viewBox="0 0 45.928 45.079"
          >
            <g
                id="Icon_feather-send"
                data-name="Icon feather-send"
                transform="translate(15.951 -2.049) rotate(30)"
            >
              <path
                  id="Path_1919"
                  data-name="Path 1919"
                  d="M33.129,3,16.5,19.629"
                  transform="translate(-0.129 0)"
                  fill="none"
                  stroke="#fff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
              />
              <path
                  id="Path_1920"
                  data-name="Path 1920"
                  d="M33,3,22.5,33l-6-13.5L3,13.5Z"
                  transform="translate(0 0)"
                  fill="none"
                  stroke="#fff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import {emit} from "@/services/event_bus";
import apis from "@/services/apis";

export default {
  name: "Send-message",
  data() {
    return {
      msg: "",
      files: [],
      recording: false,
      recordingMode: false
    };
  },
  components: {
    FilePicker: () => import("@/components/reusable/FilePicker"),
  },
  computed: {
    ...mapGetters("chat", ["socket"]),
    ...mapState("chat", ["currentDisplayedUser"]),
  },
  methods: {
    pickFile() {
      this.$refs["picker"].clickButton()

    },
    toogleRecorder() {
      this.recordingMode = !this.recordingMode
    },
    clearFiles() {
      this.$refs["picker"].clearFiles()
      this.files = []
    },
    inputClicked() {
      let input = this.$refs["input"];
      // let placeholder = this.$refs['placeholder']
      input.focus();
    },
    makeAttachments() {
      const res = []
      if (this.files.length)
        for (const i in this.files) {
          res.push(this.files[i].name)
        }
      return res
    },
    sendMessage() {

      const attachments = this.makeAttachments()

      if (this.msg.length <= 0 && !attachments.length) return;

      if (attachments.length) {
        // set the dialog
        this.$store.dispatch('modal/set_modal', {
          template: 'display_information',
          title: 'Creating Message',
          message: `uploading attachments`
        })
        const formData = new FormData()
        for (const k in this.files) {
          formData.append("files[" + k + "]", this.files[k]);
        }
        let str = ""
        if (this.msg.length)
          str = `content=${this.msg}`
        str += attachments.length ? `${str.length ? '&' : ''}attachments=${attachments.join('&attachments=')}` : ''

        apis.update('message', `${this.currentDisplayedUser.id}/attachements?${str}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            this.$store.dispatch('modal/set_progress', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)))
          }
        }).then(() => {
          this.clearFiles()
        })
      } else {
        this.socket.emit("message/create", {
          receiver: this.currentDisplayedUser.id,
          content: this.msg
        });
      }

      //after sending message let us make the div empty
      this.$refs["input"].textContent = "";
      this.p("Type something..");
      this.msg = ""
      //emit that we are message sent
      emit("message-sent");
      // console.log(this.$store.state.chat.incomingMessages)
    },
    inputMsg() {
      let input = this.$refs["input"];
      let length = input.textContent.length;
      this.msg = input.textContent;
      //emit that we are typing
      this.socket.emit("message/typing", {
        conversation_id: this.currentDisplayedUser.id,
      });

      // check if the msg input is filled with something and then make placeholder empty and vice-versa
      if (length > 0) this.p("");
      else this.p("Type something..");
    },
    //function to set text content of placeholder
    p(t) {
      document.querySelector('.input .placeholder').innerHTML = t;
      console.log(document.querySelector('.placeholder'))
    },
    addFile(file) {
      this.files.push(file)
    },
    removeFile(key) {
      this.files.splice(key, 1)
    }
  },
};
</script>

<style lang="scss" scoped>
.my-send-message {
  padding: 0.1rem;
  position: relative;

  .files-area {
    position: absolute;
    width: 90%;
    height: 215px;
    margin: 0 .8rem;
    background: #F4F7FF;
    padding: 17px 48px;
    border-radius: 5px;
    bottom: 10px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;

    .header {
      svg {
        margin-right: 6px;
      }

      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 15px;
      line-height: 1px;
      /* or 5% */

      display: flex;
      align-items: center;

      /* Type color / Default */

      color: #343434;

    }
  }

  .msg-box {
    width: 100%;
    margin: auto;
    padding: 0.5rem 0;
    display: flex;
    align-content: flex-end;
    justify-content: space-evenly;

    .msg-input {
      width: 80%;

      &.long {
        width: 90%;
      }

      .recorder {
        background-color: $secondary;
        width: 80%;
        height: 106px;
        position: absolute;
        bottom: 0;
        padding: 14px 51px;
        font-family: Inter;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 17px;
        /* identical to box height, or 138% */
        border-radius: 20px;

        #closeRecording:focus {
          outline: none;
        }

        color: #ABABAB;

        .after {
          margin-top: 8px;

          div {
            &.duration {
              font-family: Inter;
              font-style: normal;
              font-weight: 500;
              font-size: 24.0775px;
              line-height: 33px;
              /* or 138% */

              svg {
                margin-right: 8px;
              }

              color: #ABABAB;
            }

            margin-right: 10px;
            display: flex;
            align-items: center;
          }
        }
      }

      div.input {
        background-color: $secondary;
        position: relative;
        font-size: 14px;
        padding: 5px 14px;
        border-radius: 20px;

        .input-box {
          width: 100%;
          height: 100%;
          font-weight: 400;
          outline: none;
          padding: 0;
          max-height: 5rem;
          min-height: 1.2rem;
          overflow-y: auto;
          overflow-x: hidden;

          @include scroll-bar;
        }

        .start-recording {
          position: absolute;
          cursor: pointer;
          right: 12px;
          top: 2px;

          svg {
            width: 16px;
          }
        }

        .placeholder {
          opacity: 0.7;
          top: 5px;
          position: absolute;
          font-weight: 400;
        }
      }
    }

    .attach {
      display: flex;
      height: fit-content;
      width: fit-content;
      cursor: pointer;
      justify-content: center;
      padding: 0;
      align-self: flex-end;

      .icon {
        width: fit-content;
        height: fit-content;

        svg {
          height: 20px;
          fill: $font;
          transform: rotate(-30deg);
        }
      }
    }

    .send {
      padding: 0;
      display: flex;
      justify-content: center;
      height: fit-content;
      width: fit-content;
      cursor: pointer;
      align-self: flex-end;

      .icon {
        border-radius: 50%;
        width: 2rem;
        height: 2rem;
        background-color: $primary;
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
          width: 20px;
          height: 20px;
          transform: rotate(-30deg);
        }
      }
    }
  }
}

/* Portrait phones and smaller */
@media (max-width: 700px) {
  .my-send-message {
    .files-area {
      padding: 17px;
      margin: 0;
    }
  }
}
</style>
