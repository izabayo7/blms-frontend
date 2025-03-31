<template>
  <main class="my-send-message">
    <div v-show="files.length" class="files-area">
      <div class="header row">
        <div class="cursor-pointer col-4 py-0" @click="pickFile">
          <svg width="7" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M6.04545 3.18182V10.5C6.04545 11.9064 4.90636 13.0455 3.5 13.0455C2.09364 13.0455 0.954545 11.9064 0.954545 10.5V2.54545C0.954545 1.66727 1.66727 0.954545 2.54545 0.954545C3.42364 0.954545 4.13636 1.66727 4.13636 2.54545V9.22727C4.13636 9.57727 3.85 9.86364 3.5 9.86364C3.15 9.86364 2.86364 9.57727 2.86364 9.22727V3.18182H1.90909V9.22727C1.90909 10.1055 2.62182 10.8182 3.5 10.8182C4.37818 10.8182 5.09091 10.1055 5.09091 9.22727V2.54545C5.09091 1.13909 3.95182 0 2.54545 0C1.13909 0 0 1.13909 0 2.54545V10.5C0 12.4345 1.56545 14 3.5 14C5.43455 14 7 12.4345 7 10.5V3.18182H6.04545Z"
                fill="black"/>
          </svg>
          Attachments
        </div>
        <div class="col-1 py-0 ml-auto">
          <svg @click="clearFiles" class="cursor-pointer" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <div
            class="input"
            @click="inputClicked"
            @input="inputMsg"
            @keydown.prevent.enter="sendMessage"
        >
          <div ref="placeholder" contenteditable="false" class="placeholder">
            Type something..
          </div>
          <div ref="input" contenteditable="true" class="input-box"></div>
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

export default {
  name: "Send-message",
  data() {
    return {
      msg: "",
      files: []
    };
  },
  components:{
    FilePicker: () => import("@/components/reusable/FilePicker"),
  },
  computed: {
    ...mapGetters("chat", ["socket"]),
    ...mapState("chat", ["currentDisplayedUser"]),
  },
  methods: {
    pickFile(){
      this.$refs["picker"].clickButton()

    },
    clearFiles(){
      this.$refs["picker"].clearFiles()
      this.files = []
    },
    inputClicked() {
      let input = this.$refs["input"];
      // let placeholder = this.$refs['placeholder']
      input.focus();
    },
    sendMessage() {
      if (this.msg.length <= 0) return;
      this.socket.emit("message/create", {
        receiver: this.currentDisplayedUser.id,
        content: this.msg,
      });

      //after sending message let us make the div empty
      this.$refs["input"].textContent = "";
      this.p("Type something..");

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
      this.$refs["placeholder"].textContent = t;
    },
    addFile(file){
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
      svg{
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
</style>
