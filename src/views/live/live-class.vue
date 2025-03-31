<template>
  <v-container class="live_video customScroll" fluid>
    <v-row id="liveClass">
      <v-btn
        @click="showActions = true"
        class="hidden-md-and-up mr-n8 white--text"
        color="#FFC100"
        right
        bottom
        rounded
        fixed
        ><v-icon>mdi-arrow-left</v-icon></v-btn
      >
      <kurious-page-actions
        v-on:hideActions="showActions = false"
        :visible="showActions"
        class="hidden-md-and-up"
      >
        <kurious-discussion-board v-if="$store.state.user.type === 'student'" />
        <kurious-instructor-action-board v-else />
      </kurious-page-actions>
      <v-col class="col-12 col-md-8">
        <v-row>
          <v-col class="col-12" id="video">
            <vue-plyr>
              <video ref="video"></video>
            </vue-plyr>
          </v-col>
          <v-col class="col-12 course-title d-block">{{ courseName }}</v-col>
          <v-col
            v-if="$store.state.user.type === 'student'"
            class="col-12 description"
          >
            <p>
              JavaScript, often abbreviated as JS, is a programming language
              that conforms to the ECMAScript specification. JavaScript is
              high-level, often just-in-time compiled, and multi-paradigm. It
              has curly-bracket syntax, dynamic typing, prototype-based
              object-orientation, and first-class functions.
            </p>
          </v-col>
          <v-col class="col-12">
            <v-row>
              <v-col v-if="$store.state.user.user.category.name === 'STUDENT'" class="col-6">
                <v-btn
                  color="#FFC100"
                  class="white--text next-chapter px-12"
                  rounded
                  >Take quiz</v-btn
                >
              </v-col>
              <v-col v-else class="col-12">
                <kurious-comments />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="col-4 hidden-sm-and-down pa-0">
        <kurious-discussion-board v-if="$store.state.user.user.category.name === 'STUDENT'" />
        <kurious-instructor-action-board v-else-if="$store.state.user.user.category.name === 'INSTRUCTOR'" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "LiveClass",
  data: () => ({
    power: 78,
    courseName: "Economy Basics",
    items: [
      { finished: true, title: "Photos" },
      { title: "Recipes" },
      { title: "Work" },
      { finished: true, title: "Photos" },
      { title: "Recipes" },
      { title: "Work" },
    ],
    showActions: true,
  }),
};
</script>

<style lang="scss" scoped>
.live_video{
  background-color: #F6F6F6;
  max-height: calc(100vh - 76px);
  overflow-y: auto;
}
</style>