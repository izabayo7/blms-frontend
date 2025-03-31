<template>
  <v-container class="mx-0">
    <v-row id="courseDetails">
      <v-btn
        @click="showActions=true"
        class="hidden-md-and-up mr-n8 white--text"
        color="#FFC100"
        right
        bottom
        rounded
        fixed
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-col class="col-3 hidden-sm-and-down">
        <kurious-chapter-list @changeChapter="changeActiveChapter" :chapters="chapters" />
      </v-col>
      <kurious-page-actions
        v-on:hideActions="showActions = false"
        :visible="showActions"
        class="hidden-md-and-up"
      >
        <kurious-chapter-list :chapters="chapters" />
      </kurious-page-actions>
      <v-col class="col-12 col-md-9 course-content pa-md-10 pb-md-0">
        <v-row>
          <!-- <v-col class="col-12 title d-block">{{course.name}}</v-col> -->
          <v-col v-if="1===0" class="col-12" id="video">
            <kurious-video
              poster="http://127.0.0.1:5500/Kurious-Frontend/src/assets/images/live.png"
              src="https://player.vimeo.com/external/194837908.sd.mp4?s=c350076905b78c67f74d7ee39fdb4fef01d12420&profile_id=164"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <span v-if="course !== undefined">{{course.name}}</span>
            <v-tabs background-color="white" color="#ffd248" right>
              <v-tab id="content-tab">
                <v-icon class="mx-2">mdi-book-open-variant</v-icon>Chapter
              </v-tab>
              <v-tab>
                <v-icon class="mx-2">mdi-chat-outline</v-icon>Discussions
              </v-tab>
              <v-tab @click="getAttachments()">
                <v-icon class="mx-2">mdi-file-download-outline</v-icon>Downloads
              </v-tab>

              <v-tab-item v-for="n in 3" :key="n">
                <v-container fluid>
                  <v-row v-if="chapters.length > 0 && n===1">
                    <v-col class="col-12 title d-block">Chapter 1: {{chapters[activeIndex].name }}</v-col>
                    <v-col class="col-12 description">
                      <p class="my-4">{{chapters[activeIndex].description}}</p>
                    </v-col>
                    <v-col class="col-12">
                      <kurious-editor v-if="editorContent !== ''" :defaultContent="editorContent" />
                    </v-col>
                    <v-col class="col-6 col-md-4 mx-auto">
                      <v-btn color="green" class="white--text">Mark as complete</v-btn>
                    </v-col>
                    <v-col class="col-12">
                      <v-row>
                        <v-col class="col-6">
                          <v-btn rounded elevation="0">Previous chapter</v-btn>
                        </v-col>
                        <v-col class="text-right col-6">
                          <v-btn
                            color="#FFC100"
                            class="white--text next-chapter"
                            rounded
                          >Previous chapter</v-btn>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row v-else-if="chapters.length === 0">There are no chapters</v-row>
                  <v-row v-else-if="n === 2">
                    <kurious-comments />
                  </v-row>
                  <v-row v-else-if="n === 3">
                    <div v-if="attachments.length > 0" class="attachments">
                      <div
                        v-for="(attachment, key) in attachments"
                        :key="key"
                        class="file-listing d-flex"
                      >
                        <img
                          v-if="imageTypes.includes(attachment.type)"
                          class="preview"
                          v-bind:ref="'preview'+parseInt( key )"
                        />
                        <v-btn
                          v-else
                          class="pa-6 mb-4"
                          color="deep-purple accent-4"
                          outlined
                          @click="downloadAttachment(attachment._id)"
                        >
                          <v-icon
                            color="#ffd248"
                            x-large
                          >mdi-file{{findIcon(attachment.name)}}-outline</v-icon>
                          <span class="filename text-truncate">{{attachment.name}}</span>
                        </v-btn>
                      </div>
                    </div>
                  </v-row>
                </v-container>
              </v-tab-item>
            </v-tabs>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <kurious-dialog :show="show" :message="message" :status="status">
      <!-- <v-icon slot="icon" size="55" dark>mdi-clipboard-text-multiple-outline</v-icon> -->
      <v-icon slot="icon" size="55" dark>mdi-barley</v-icon>
      <v-row slot="actions">
        <v-col class="col-6 mx-auto my-0">
          <v-btn color="mx-2" @click="show = false">Go to Back</v-btn>
          <v-btn color="mx-2" @click="show = false">Reload</v-btn>
        </v-col>
      </v-row>
    </kurious-dialog>
  </v-container>
</template>

<script>
import Apis from "@/services/apis";
export default {
  name: "CourseDetails",
  data: () => ({
    power: 78,
    activeIndex: 1,
    show: false,
    message: "",
    modal: true,
    attachments: [],
    imageTypes: ["image/jpeg", "image/png"],
    status: 200,
    course: undefined,
    chapters: [],
    showActions: false,
    editorContent: "",
  }),
  beforeMount() {
    this.getEsssentials();
  },
  methods: {
    async downloadAttachment(id) {
      const url = `http://localhost:7070/kurious/file/downloadAttachment/${id}`;
      window.location.href = url;
    },
    async getEsssentials() {
      try {
        const course = await Apis.get(`course/${this.$route.params.id}`);
        this.course = course.data;
        const chapters = await Apis.get(`chapter/course/${this.course._id}`);
        this.chapters = chapters.data;
        this.getChapterDocument();
      } catch (error) {
        if (error.response) {
          this.status = error.response.status;
          this.message = "Course No Found";
        } else if (error.request) {
          this.status = 503;
          this.message = "Service Unavailable";
        }
        this.show = true;
      }
    },
    async getAttachments() {
      this.attachments = [];
      try {
        const response = await Apis.get(
          `file/getAttachments/${this.chapters[this.activeIndex]._id}`
        );
        this.attachments = response.data;
      } catch (error) {
        if (error.response) {
          this.status = error.response.status;
          this.message = error.response.data;
        } else if (error.request) {
          this.status = 503;
          this.message = "Service Unavailable";
        }
        this.modal = false
        this.show = true;
      }
    },
    findIcon(name) {
      const type = name.split(".")[name.split(".").length - 1];
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
    changeActiveChapter(index) {
      this.activeIndex = index;
      this.getChapterDocument(index);
      console.log("sawa");
      document.getElementById("content-tab").click();
    },
    async getChapterDocument() {
      try {
        this.editorContent = "";
        const response = await Apis.get(
          `file/chapterDocument/${this.chapters[this.activeIndex]._id}`
        );
        this.editorContent = response.data;
      } catch (error) {
        if (error.response) {
          this.status = 404;
          this.message = "Content Was Not Found";
        } else if (error.request) {
          this.status = 503;
          this.message = "Service Unavailable";
        }
        this.modal = false
        this.show = true;
      }
    },
  },
};
</script>