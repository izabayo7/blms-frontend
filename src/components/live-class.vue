<template>
  <v-container>
      <v-row
        id="liveClass"
      >
          <v-btn @click="showActions=true" class="hidden-md-and-up mr-n8 white--text" color="#FFC100" right bottom rounded fixed><v-icon>mdi-arrow-left</v-icon></v-btn>
          <kurious-page-actions v-on:hideActions="showActions = false" :visible="showActions" class="hidden-md-and-up"> 
            <kurious-discussion-board  v-if="$store.state.user.type === 'student'" />
            <kurious-instructor-action-board  v-else />
          </kurious-page-actions>
          <v-col
            class="col-12 col-md-8 course-content pa-md-10"
          >
            <v-row>
              <v-col class="col-12" id="video">
                <kurious-video
                  poster="http://127.0.0.1:5500/Kurious-Frontend/src/assets/images/live.png"
                  src="http://localhost:7070/kurious/file/video/animals.mp4"
                />
              </v-col>
              <v-col class=" col-12 course-title d-block">{{courseName}}</v-col>
              <v-col  v-if="$store.state.user.type === 'student'" class="col-12 description">
                <p>JavaScript, often abbreviated as JS, is a programming language that conforms to the ECMAScript specification. JavaScript is high-level, often just-in-time compiled, and multi-paradigm. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions.</p>
              </v-col>
              <v-col class="col-12">
                  <v-row>
                    <v-col v-if="$store.state.user.type === 'student'" class="col-6">
                        <v-btn color="#FFC100" class="white--text next-chapter px-12" rounded>Take quiz</v-btn>
                    </v-col>
                    <v-col v-else class="col-12">
                        <kurious-comments />
                    </v-col>
                  </v-row>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            class="col-4 hidden-sm-and-down chapters pt-md-12"
          >
            <kurious-discussion-board  v-if="$store.state.user.type === 'student'" />
            <kurious-instructor-action-board  v-else />
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
export default {
    name: 'LiveClass',
    data:() =>({
        power: 78,
        courseName: 'Economy Basics',
        items: [
            { finished: true, title: 'Photos' },
            { title: 'Recipes' },
            { title: 'Work' },
            { finished: true, title: 'Photos' },
            { title: 'Recipes' },
            { title: 'Work' },
        ],
        showActions: true,
    }),
//  props: {
//      image: {
//          type: String,
//          default: 'https://randomuser.me/api/portraits/men/81.jpg'
//      },
//      title: {
//          type: String,
//          required: true
//      },
//      instructor: {
//          type: String,
//          required: true
//      },
//      description: {
//          type: String,
//          required: true
//      },
//      category: {
//          type: String,
//          required: true
//      }
//  },
}
</script>