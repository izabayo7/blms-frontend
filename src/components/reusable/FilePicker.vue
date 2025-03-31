<style lang="scss">
.filePicker {
  text-align: center;
  border: 1px solid #d9d9d9;

  &.quiz-files, &.attachment-files {
    background: rgba(25, 48, 116, 0.07);
    border-radius: 3.39104px;
    max-width: 347.58px;
    width: 100%;
    min-height: 94.95px;
    display: flex;
    align-items: center;
  }

  &.attachment-files {
    max-width: 531px !important;
  }

  &.chat-files {
    background: transparent;
    border: none;

    .file-list-container {
      max-height: 136px;
      overflow-y: auto;
    }
  }

  form {
    border-radius: 4px;
    background: #ccc;
  }

  .quiz-details {
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 26px;
    /* identical to box height, or 175% */


    color: #193074;
    margin: auto;
  }

  div.file-listing {
    padding: 10px;
  }

  div.remove-container {
    text-align: center;
  }

  a.submit-button {
    display: block;
    margin: auto;
    text-align: center;
    width: 200px;
    padding: 10px;
    text-transform: uppercase;
    background-color: #ccc;
    color: white;
    font-weight: bold;
    margin-top: 20px;
  }

  progress {
    width: 400px;
    margin: auto;
    display: block;
    margin-top: 20px;
    margin-bottom: 20px;
  }
}

.absolute {
  margin-top: -40px;
  z-index: 999;
  position: absolute;
  margin-left: 7px;
  display: none;
}

.attachment {
  background-color: #f8f8f8;
  padding: 10px;
  border-radius: 5px;
  width: 140px;

  &.chat-files {
    width: 130px;
    height: 108px;
    border: 1px solid #193074;
  }

  &.quiz-files {
    width: 50.87px;
    height: 50.87px;
    box-shadow: 0px 6.78207px 6.78207px rgba(0, 0, 0, 0.25);
    border-radius: 5.08655px;
    object-fit: cover;

    &.rightChoice {
      border: 2px solid #42CB6B;
      box-shadow: none;
    }
  }
}

.hint {
  font-family: Inter;
  font-style: normal;
  font-weight: bold;
  font-size: 11.47759px;
  line-height: 26px;
  /* or 309% */


  color: #193074;
}

// style the attachment
div.remove-container a {
  color: red;
  cursor: pointer;
}

.remove--button {
  .v-icon {
    font-size: 12px !important;
  }

  height: 21px !important;
  width: 21px !important;
}

.file_figure {
  .preview {
    height: 40px;
    width: 40px;
    border-radius: 5px;
    overflow: hidden;
  }
}

.file_name {
  font-size: 12px;
  padding-left: 11px;
  width: 79px;
}

.file-list-container {
  display: flex;
  flex-wrap: wrap;
}

/* Portrait phones and smaller */
@media (max-width: 700px) {
  .attachment {
    &.chat-files {
      width: 100px;
      height: 78px;
    }
  }
}
</style>

<template>
  <div>
    <form ref="fileform" :class="`filePicker picker${boundIndex} ${template? template : 'pa-4'}`">
      <v-row>
        <v-col v-if="files.length" class="col-10">
          <div class="file-list-container customScroll">
            <div
                v-for="(file, key) in files"
                :key="key"
                class="file-listing d-flex"
            >
              <v-badge v-if="template === 'quiz-files'" overlap color="transparent">
                <v-btn
                    fab
                    color="error"
                    class="ml-n2 mt-n2 remove--button"
                    slot="badge"
                    @click="removeFile(key)"
                >
                  <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M1.4789 8.05109C1.4789 8.59507 1.92397 9.04014 2.46795 9.04014H6.42416C6.96814 9.04014 7.41321 8.59507 7.41321 8.05109V2.11678H1.4789V8.05109ZM7.90774 0.633198H6.1769L5.68237 0.138672H3.20974L2.71522 0.633198H0.984375V1.62225H7.90774V0.633198Z"
                        fill="white"/>
                  </svg>

                </v-btn>

                <v-img
                    v-if="files[key].src"
                    @click="fileClicked(key)"
                    class="attachment vertically--centered"
                    :class="template + ` ${files[key].right ? 'rightChoice' : ''}`"
                    :src="`${files[key].src}?width=100&token=${$session.get('jwt')}`"
                    v-bind:ref="'preview' + parseInt(key)"
                />

                <v-img
                    v-else
                    @click="fileClicked(key)"
                    class="attachment vertically--centered"
                    :class="template"
                    v-bind:ref="'preview' + parseInt(key)"
                />
                <div class="absolute" :class="{'d-flex' : files[key].right}">
                  <svg width="38" height="39" viewBox="0 0 38 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_d)">
                      <circle cx="19.1714" cy="12.7837" r="11.8686" fill="white" fill-opacity="0.5"/>
                      <circle cx="19.1714" cy="12.7837" r="11.4447" stroke="#3CE970" stroke-width="0.847759"/>
                    </g>
                    <path d="M16.2031 10.24L19.3822 15.5385C22.9145 10.24 25.7404 7.06093 31.0389 3.88184"
                          stroke="black" stroke-width="1.81663" stroke-linecap="round"/>
                    <defs>
                      <filter id="filter0_d" x="0.520663" y="0.915039" width="37.3014" height="37.3014"
                              filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix"
                                       values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                        <feOffset dy="6.78207"/>
                        <feGaussianBlur stdDeviation="3.39104"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
                      </filter>
                    </defs>
                  </svg>

                </div>
              </v-badge>
              <v-badge v-else-if="template === 'chat-files'" overlap color="transparent">
                <v-btn
                    fab
                    color="error"
                    class="ml-n2 mt-n2 remove--button"
                    slot="badge"
                    @click="removeFile(key)"
                >
                  <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M1.4789 8.05109C1.4789 8.59507 1.92397 9.04014 2.46795 9.04014H6.42416C6.96814 9.04014 7.41321 8.59507 7.41321 8.05109V2.11678H1.4789V8.05109ZM7.90774 0.633198H6.1769L5.68237 0.138672H3.20974L2.71522 0.633198H0.984375V1.62225H7.90774V0.633198Z"
                        fill="white"/>
                  </svg>

                </v-btn>

                <v-img
                    v-if="imageTypes.includes(file.type)"
                    class="attachment vertically--centered"
                    :class="template"
                    v-bind:ref="'preview' + parseInt(key)"
                />
                <div
                    v-else
                    :class="template"
                    class="attachment vertically--centered"
                >
                  <div class="file_figure">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path fill="none" d="M0 0h24v24H0z"/>
                      <path
                          d="M9 2.003V2h10.998C20.55 2 21 2.455 21 2.992v18.016a.993.993 0 0 1-.993.992H3.993A1 1 0 0 1 3 20.993V8l6-5.997zM5.83 8H9V4.83L5.83 8zM11 4v5a1 1 0 0 1-1 1H5v10h14V4h-8z"/>
                    </svg>
                  </div>
                  <div class="file_name">
                    <span>{{ file.name | trimString(12) }}</span>
                  </div>
                </div>
              </v-badge>
              <v-badge v-else overlap color="transparent">
                <v-btn
                    fab
                    color="error"
                    class="ml-n2 mt-n2 remove--button"
                    slot="badge"
                    @click="removeFile(key)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path
                        d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
                        fill="rgba(255,255,255,1)"/>
                  </svg>
                </v-btn>
                <div
                    @click="fileClicked(key)"
                    class="attachment vertically--centered"
                >
                  <div class="file_figure">
                    <v-img
                        v-if="imageTypes.includes(file.type)"
                        class="preview"
                        v-bind:ref="'preview' +  parseInt(key)"
                    />
                    <v-icon v-else-if="file.type" color="#000000" x-large
                    >mdi-file{{ findIcon(file.type) }}-outline
                    </v-icon
                    >
                  </div>
                  <div class="file_name">
                    <span>{{ (file.name || file.src) | trimString(12) }}</span>
                  </div>
                </div>
              </v-badge>
            </div>
          </div>
        </v-col>
        <v-col
            v-if="files.length === 0 && (template === 'quiz-files' || template === 'attachment-files') && !defaultFiles.length"
            class="col-12 quiz-details">
          {{ template === 'quiz-files' ? 'Upload you images here' : 'Pick files' }}
          <svg @click="clickButton()" class="cursor-pointer" width="22" height="22" viewBox="0 0 22 22" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
                d="M21.0428 11.9339C20.4049 11.1356 19.5896 10.6182 18.5964 10.3814C18.9098 9.9078 19.0661 9.38069 19.0661 8.80017C19.0661 7.9904 18.7796 7.29915 18.2069 6.72617C17.634 6.15339 16.9427 5.86688 16.133 5.86688C15.4073 5.86688 14.7733 6.10371 14.2311 6.57736C13.7806 5.47731 13.0604 4.59506 12.0712 3.93058C11.0821 3.2659 9.99162 2.93359 8.79982 2.93359C7.18049 2.93359 5.79779 3.50665 4.65195 4.65249C3.50603 5.79805 2.93325 7.18084 2.93325 8.80029C2.93325 8.89958 2.94091 9.06384 2.95616 9.29292C2.05481 9.71308 1.33683 10.3432 0.80198 11.1834C0.267327 12.0239 0 12.9403 0 13.9336C0 15.3468 0.502346 16.5554 1.50676 17.5599C2.51121 18.5647 3.7201 19.0669 5.13326 19.0669H17.6C18.8144 19.0669 19.8514 18.637 20.7108 17.7778C21.5702 16.9186 22 15.8817 22 14.6668C21.9998 13.6432 21.6808 12.7324 21.0428 11.9339ZM14.5574 11.6247C14.4847 11.6971 14.399 11.7333 14.2998 11.7333H11.7331V15.7668C11.7331 15.866 11.6969 15.9519 11.6243 16.0244C11.5516 16.0972 11.4659 16.1332 11.3667 16.1332H9.16636C9.06707 16.1332 8.98114 16.0972 8.90858 16.0244C8.83618 15.9519 8.79974 15.866 8.79974 15.7668V11.7333H6.23307C6.12624 11.7333 6.0383 11.699 5.96968 11.6305C5.90093 11.5617 5.86662 11.4738 5.86662 11.367C5.86662 11.2752 5.90474 11.1835 5.98108 11.0918L10.0029 7.07011C10.0717 7.00132 10.1596 6.96697 10.2665 6.96697C10.3735 6.96697 10.4614 7.00132 10.53 7.07011L14.5634 11.1033C14.6322 11.172 14.6662 11.2598 14.6662 11.367C14.6662 11.4661 14.6299 11.5523 14.5574 11.6247Z"
                fill="#193074"/>
          </svg>

        </v-col>
        <v-col v-else-if="!template === 'quiz-files' && files.length === 0" class="col-10">
        <span
        >Drop the
          {{
            allowedTypes === undefined
                ? "files"
                : allowedTypes.includes("image")
                ? "images"
                : "video"
          }}
          here!</span
        >
        </v-col>
        <v-col
            v-if=" template === undefined || ((template === 'quiz-files' || template === 'attachment-files') && files.length)"
            class="col-2">
          <v-btn class="mt-n2" @click="clickButton()" large icon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path
                  d="M14.828 7.757l-5.656 5.657a1 1 0 1 0 1.414 1.414l5.657-5.656A3 3 0 1 0 12 4.929l-5.657 5.657a5 5 0 1 0 7.071 7.07L19.071 12l1.414 1.414-5.657 5.657a7 7 0 1 1-9.9-9.9l5.658-5.656a5 5 0 0 1 7.07 7.07L12 16.244A3 3 0 1 1 7.757 12l5.657-5.657 1.414 1.414z"
                  fill="rgba(149,164,166,1)"/>
            </svg>
          </v-btn>
        </v-col>
        <input
            type="file"
            :multiple="multiple"
            :id="inputId"
            :accept="allowedTypes"
            hidden
            @change="addFile()"
        />
      </v-row>
    </form>
    <div v-if="hint" class="hint">
      {{ hint }}
    </div>
  </div>
</template>

<script>
export default {
  /*
      Variables used by the drag and drop component
    */
  props: {
    allowedTypes: {
      type: String,
    },
    boundIndex: {
      type: Number,
    },
    defaultFiles: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    template: {
      type: String,
    },
    hint: {
      type: String,
    },
  },
  data() {
    return {
      dragAndDropCapable: false,
      files: [],
      imageTypes: ["image/jpeg", "image/png"],
      // otherFiles: [
      //   {type: '', icon: ''},
      //   {type: '', icon: ''},
      //   {type: '', icon: ''},
      // ],
      uploadPercentage: 0,
    };
  },
  computed: {
    inputId() {
      return `file_input_${this.boundIndex + Math.random() * 10}`;
    },
  },
  mounted() {
    /*
        Determine if drag and drop functionality is capable in the browser
      */
    this.dragAndDropCapable = this.determineDragAndDropCapable();

    /*
        If drag and drop capable, then we continue to bind events to our elements.
      */
    if (this.dragAndDropCapable) {
      /*
          Listen to all of the drag events and bind an event listener to each
          for the fileform.
        */
      [
        "drag",
        "dragstart",
        "dragend",
        "dragover",
        "dragenter",
        "dragleave",
        "drop",
      ].forEach(
          function (evt) {
            /*
              For each event add an event listener that prevents the default action
              (opening the file in the browser) and stop the propagation of the event (so
              no other elements open the file in the browser)
            */
            this.$refs.fileform.addEventListener(
                evt,
                function (e) {
                  e.preventDefault();
                  e.stopPropagation();
                }.bind(this),
                false
            );
          }.bind(this)
      );

      /*
          Add an event listener for drop to the form
        */
      this.$refs.fileform.addEventListener(
          "drop",
          function (e) {
            /*
              Capture the files from the drop event and add them to our local files
              array.fileform
            */
            for (let i = 0; i < e.dataTransfer.files.length; i++) {
              this.$emit("addFile", e.dataTransfer.files[i], this.boundIndex);
              this.files.push(e.dataTransfer.files[i]);
              this.getImagePreviews();
            }
          }.bind(this)
      );
    }

    if (this.defaultFiles.length && !this.files.length)
      this.files = this.defaultFiles.filter(e => e.src)
  },
  methods: {
    fileClicked(index) {
      this.$emit(
          "fileClicked",
          this.boundIndex,
          index,
          this.$route.name === "Edit Quiz" ? this.files[index].name : undefined
      );
    },
    showRightFiles(index, indices) {
      if (index == this.boundIndex) {
        let divs = document.querySelectorAll(`.picker${index} .attachment`);
        for (const i in this.files) {
          const indexFound = indices.filter((_i) => _i == i);
          if (indexFound.length > 0) {
            divs[i].className += " rightChoice";
            document.querySelectorAll(`.picker${index} .absolute`)[i].style.display = 'flex'
          } else {
            divs[i].className = divs[i].className.replace(" rightChoice", "");
            document.querySelectorAll(`.picker${index} .absolute`)[i].style.display = 'none'
          }
        }
      }
    },
    clickButton() {
      if (!(this.template === "quiz-files" && this.files.length > 3) || this.template !== "quiz-files") {
        document.getElementById(this.inputId).click();
      } else {
        this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: "You reached the limit of files on this question",
          status: "info",
          uptime: 2000,
        })
      }
    },
    clearFiles() {
      this.files = []
    },
    addFile() {
      for (const file of document.getElementById(this.inputId).files) {
        let found = false
        for (const i in this.files) {
          if (this.files[i].name === file.name && this.files[i].lastModified === file.lastModified) {
            found = true
            break
          }
        }
        if (!found) {
          if (this.files.length > 0 && !this.multiple) {
            this.removeFile(0);
          }
          this.files.push(file);
          this.$emit("addFile", file, this.boundIndex);
        }
      }
      this.getImagePreviews();
      document.getElementById(this.inputId).value = ""
    },
    findIcon(type) {
      if (type.includes("video")) {
        return "-video";
      } else if (type.includes("audio")) {
        return "-music";
      } else if (type.includes("word")) {
        return "-word";
      } else {
        return "";
      }
    },
    /*
        Determines if the drag and drop functionality is in the
        window
      */
    determineDragAndDropCapable() {
      /*
          Create a test element to see if certain events
          are present that let us do drag and drop.
        */
      var div = document.createElement("div");

      /*
          Check to see if the `draggable` event is in the element
          or the `ondragstart` and `ondrop` events are in the element. If
          they are, then we have what we need for dragging and dropping files.

          We also check to see if the window has `FormData` and `FileReader` objects
          present so we can do our AJAX uploading
        */
      return (
          ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
          "FormData" in window &&
          "FileReader" in window
      );
    },

    /*
        Gets the image preview for the file.
      */
    getImagePreviews() {
      /*
          Iterate over all of the files and generate an image preview for each one.
        */
      for (let i = 0; i < this.files.length; i++) {
        /*
            Ensure the file is an image file
          */
        if (/\.(jpe?g|png|gif)$/i.test(this.files[i].name)) {
          /*
              Create a new FileReader object
            */
          let reader = new FileReader();

          /*
              Add an event listener for when the file has been loaded
              to update the src on the file preview.
            */
          reader.addEventListener(
              "load",
              function () {
                this.$refs["preview" + parseInt(i)][0].src = reader.result;
              }.bind(this),
              false
          );

          /*
              Read the data for the file in through the reader. When it has
              been loaded, we listen to the event propagated and set the image
              src to what was loaded from the reader.
            */
          reader.readAsDataURL(this.files[i]);
        }
      }
    },
    /*
        Removes a select file the user has uploaded
      */
    removeFile(key) {
      if (this.defaultFiles.indexOf(this.files[key]) !== -1) {
        this.defaultFiles.splice(key, 1);
      }
      this.files.splice(key, 1);
      this.$emit("removeFile", key, this.boundIndex);
    },
  },
};
</script>