<style lang="scss">
#kurious--drag {
  background-color: #f8f8f8 !important;
  text-align: center;
  .filename {
    max-width: 160px;
  }
  form {
    border-radius: 4px;
    background: #ccc;
  }

  div.file-listing {
    padding: 10px;
  }

  div.file-listing img {
    height: 100px;
  }

  div.remove-container {
    text-align: center;
  }

  div.remove-container a {
    color: red;
    cursor: pointer;
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
</style>

<template>
  <form ref="fileform" id="kurious--drag" class="yellow">
    <v-row>
      <v-col class="col-12">
        <div class="file-list-container d-flex">
          <div v-for="(file, key) in files" :key="key" class="file-listing d-flex">
            <v-badge overlap color="transparent">
              <v-btn
                fab
                x-small
                color="error"
                class="ml-n2 mt-n2"
                slot="badge"
                @click="removeFile( key )"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <img
                v-if="imageTypes.includes(file.type)"
                class="preview"
                v-bind:ref="'preview'+parseInt( key )"
              />
              <v-btn v-else width="200px" class="pa-6" color="deep-purple accent-4" outlined>
                <v-icon color="#ffd248" x-large>mdi-file{{findIcon(file.type)}}-outline</v-icon>
                <span class="filename text-truncate">{{file.name}}</span>
              </v-btn>
            </v-badge>
          </div>
        </div>
      </v-col>
      <v-col v-if="files.length === 0" class="col-12">
        <span>Drop the files here!</span>
      </v-col>
    </v-row>
  </form>
</template>

<script>
import axios from "axios";
export default {
  /*
      Variables used by the drag and drop component
    */
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
              this.$emit('addFile',e.dataTransfer.files[i])
            this.files.push(e.dataTransfer.files[i]);
            this.getImagePreviews();
          }
        }.bind(this)
      );
    }
  },

  methods: {
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
        Submits the files to the server
      */
    submitFiles() {
      /*
          Initialize the form data
        */
      let formData = new FormData();

      /*
          Iteate over any file sent over appending the files
          to the form data.
        */
      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];

        formData.append("files[" + i + "]", file);
      }

      /*
          Make the request to the POST /file-drag-drop URL
        */
      axios
        .post("/file-drag-drop", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: function (progressEvent) {
            this.uploadPercentage = parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
          }.bind(this),
        })
        .then(function () {
          console.log("SUCCESS!!");
        })
        .catch(function () {
          console.log("FAILURE!!");
        });
    },

    /*
        Removes a select file the user has uploaded
      */
    removeFile(key) {
      this.files.splice(key, 1);
      this.$emit('removeFile',key)
    },
  },
};
</script>