<style lang="scss">
.filePicker {
  text-align: center;
  border: 1px solid #d9d9d9;
  form {
    border-radius: 4px;
    background: #ccc;
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
.attachment {
  background-color: #f8f8f8;
  padding: 10px;
  border-radius: 5px;
  width: 140px;
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
</style>

<template>
  <form ref="fileform" :class="`filePicker picker${boundIndex}`">
    <v-row>
      <v-col class="col-10">
        <div class="file-list-container">
          <div
            v-for="(file, key) in files"
            :key="key"
            class="file-listing d-flex"
          >
            <v-badge overlap color="transparent">
              <v-btn
                fab
                color="error"
                class="ml-n2 mt-n2 remove--button"
                slot="badge"
                @click="removeFile(key)"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" fill="rgba(255,255,255,1)"/></svg>
              </v-btn>

              <div
                @click="fileClicked(key)"
                class="attachment vertically--centered"
              >
                <div class="file_figure">
                  <v-img
                    v-if="imageTypes.includes(file.type)"
                    class="preview"
                    v-bind:ref="'preview' + parseInt(key)"
                  />
                  <v-icon v-else color="#000000" x-large
                    >mdi-file{{ findIcon(file.type) }}-outline</v-icon
                  >
                </div>
                <div class="file_name">
                  <span>{{ file.name | trimString(12) }}</span>
                </div>
              </div>
            </v-badge>
          </div>
        </div>
      </v-col>
      <v-col v-if="files.length === 0" class="col-10">
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
      <v-col class="col-2">
        <v-btn class="mt-n2" @click="clickButton()" large icon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M14.828 7.757l-5.656 5.657a1 1 0 1 0 1.414 1.414l5.657-5.656A3 3 0 1 0 12 4.929l-5.657 5.657a5 5 0 1 0 7.071 7.07L19.071 12l1.414 1.414-5.657 5.657a7 7 0 1 1-9.9-9.9l5.658-5.656a5 5 0 0 1 7.07 7.07L12 16.244A3 3 0 1 1 7.757 12l5.657-5.657 1.414 1.414z" fill="rgba(149,164,166,1)"/></svg>
        </v-btn>
        <input
          type="file"
          :multiple="multiple"
          :id="inputId"
          :accept="
            allowedTypes === undefined
              ? undefined
              : allowedTypes.includes('video')
              ? 'video/*'
              : allowedTypes.includes('image')
              ? 'image/*'
              : undefined
          "
          hidden
          @change="addFile()"
        />
      </v-col>
    </v-row>
  </form>
</template>

<script>
export default {
  /*
      Variables used by the drag and drop component
    */
  props: {
    allowedTypes: {
      type: Array,
    },
    boundIndex: {
      type: Number,
    },
    multiple: {
      type: Boolean,
      default: false,
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

          if (indexFound.length > 0) divs[i].style.border = "1px solid green";
          else divs[i].style.border = "none";
        }
      }
    },
    clickButton() {
      document.getElementById(this.inputId).click();
    },
    addFile() {
      for (const file of document.getElementById(this.inputId).files) {
        if (!this.files.includes(file)) {
          if (this.files.length > 0 && !this.multiple) {
            this.removeFile(0);
          }
          this.files.push(file);
          this.$emit("addFile", file, this.boundIndex);
        }
      }
      this.getImagePreviews();
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
      this.files.splice(key, 1);
      this.$emit("removeFile", key, this.boundIndex);
    },
  },
};
</script>