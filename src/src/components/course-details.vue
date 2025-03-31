<template>
  <v-container class="mx-0">
      <v-row
        id="courseDetails"
      >
          <v-btn @click="showActions=true" class="hidden-md-and-up mr-n8 white--text" color="#FFC100" right bottom rounded fixed><v-icon>mdi-arrow-left</v-icon></v-btn>
          <v-col
            class="col-3 hidden-sm-and-down"
          >
            <!-- <v-card fixed> -->
              <kurious-chapter-list />
            <!-- </v-card> -->
          </v-col>
          <kurious-page-actions v-on:hideActions="showActions = false" :visible="showActions" class="hidden-md-and-up" > <kurious-chapter-list /> </kurious-page-actions>
          <v-col
            class="col-12 col-md-9 course-content pa-md-10 pb-md-0  "
          >
            <v-row>
              <v-col class=" col-12 title d-block">{{courseName}}</v-col>
              <v-col class="col-12" id="video">
                  <video id="video" poster="@/assets/images/Mask Group 15.png"></video>
                  <v-icon size="45" dark class="play--button">mdi-play-circle-outline</v-icon>
              </v-col>
              <!-- <v-col class="col-12" id="video">
                  <div class="player-container">
                    <vue-core-video-player :src="'./video.mp4'"></vue-core-video-player>
                  </div>
              </v-col> -->
              <v-col class="col-12 title d-block">Introduction</v-col>
              <v-col class="col-12 description">
                <p class="my-4">JavaScript, often abbreviated as JS, is a programming language that conforms to the ECMAScript specification. JavaScript is high-level, often just-in-time compiled, and multi-paradigm. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions.</p>
                <p class="my-4">JavaScript, often abbreviated as JS, is a programming language that conforms to the ECMAScript specification. JavaScript is high-level, often just-in-time compiled, and multi-paradigm. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions.</p>
              </v-col>
              <v-col class="col-6 col-md-4 mx-auto">
                <span><v-icon color="#B4B4B4" class="mr-1">mdi-checkbox-blank-circle-outline</v-icon>Mark as complete</span>
              </v-col>
              <v-col class="col-12">
                  <v-row>
                    <v-col class="col-6">
                        <v-btn rounded elevation="0">Previous chapter</v-btn>
                    </v-col>
                    <v-col class="text-right col-6">
                        <v-btn color="#FFC100" class="white--text next-chapter" rounded>Previous chapter</v-btn>
                    </v-col>
                  </v-row>
              </v-col>
            </v-row>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
// import VueCoreVideoPlayer from 'vue-core-video-player';
export default {
    name: 'CourseDetails',
    components: {
     // VueCoreVideoPlayer
    },
    data:() =>({
        power: 78,
        courseName: 'Web development using Javascript',
        items: [
            { finished: true, title: 'Photos' },
            { title: 'Recipes' },
            { title: 'Work' },
            { finished: true, title: 'Photos' },
            { title: 'Recipes' },
            { title: 'Work' },
        ],
        showActions: false,
    }),
 props: {
     image: {
         type: String,
         default: 'https://randomuser.me/api/portraits/men/81.jpg'
     },
     title: {
         type: String,
         required: true
     },
     instructor: {
         type: String,
         required: true
     },
     description: {
         type: String,
         required: true
     },
     category: {
         type: String,
         required: true
     }
 },
}
</script>