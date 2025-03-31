<template>
  <v-container class="round smooth--background" fluid>
    <v-row v-if="userCategory === 'Instructor'">
      <v-col class="col-12">
        <v-card
          class="mx-auto elevation-0 pa-12 text-center smooth--card"
          max-width="344"
        >
          <v-avatar class="svg_container" size="100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="55"
              height="55"
              viewBox="0 0 57.711 57.711"
            >
              <path
                id="Icon_metro-question"
                data-name="Icon metro-question"
                d="M27.382,40.917H34.47v7.089H27.382ZM41.559,16.106A3.544,3.544,0,0,1,45.1,19.65V30.283L34.47,37.372H27.382V33.828l10.633-7.089V23.194H20.293V16.106H41.559ZM30.926,7.245a23.039,23.039,0,1,0,16.291,6.748A22.888,22.888,0,0,0,30.926,7.245Zm0-5.317A28.355,28.355,0,1,1,2.571,30.283,28.355,28.355,0,0,1,30.926,1.928Z"
                transform="translate(-2.071 -1.428)"
                fill="#fff"
              />
            </svg>
          </v-avatar>
          <v-card-subtitle class="pa-1 text-h6">Quizes</v-card-subtitle>

          <v-card-subtitle class="pa-1 text-h6">{{
            formated_quiz.length
          }}</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col class="col-12 mt-4">
        <v-card class="users-table mx-auto">
          <v-card-title>
            <v-row>
              <v-col class="col-12 col-md-2 py-0 px-md-6 px-10">Users</v-col>
              <v-col class="col-12 col-md-8 pa-0">
                <v-row>
                  <v-col class="col-10 col-md-4 ml-12 pa-0 mt-n3">
                    <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Search"
                      single-line
                      hide-details
                    />
                  </v-col>
                </v-row>
              </v-col>
              <v-col class="col-12 col-md-2 pa-md-0 px-4 pt-4">
                <v-btn rounded to="/quiz/new-quiz">
                  <v-icon class="pr-2">mdi-plus</v-icon>Add new quiz
                </v-btn>
              </v-col>
            </v-row>
          </v-card-title>
          <v-data-table
            :search="search"
            :headers="headers"
            :items="formated_quiz"
            sort-by="quizname"
          >
            <template v-slot:item.actions="{ item }">
              <v-icon
                color="error"
                @click="
                  set_modal({
                    template: 'action_confirmation',
                    method: {
                      action: 'quiz/delete_quiz',
                      parameters: { id: item._id },
                    },
                    title: 'Delete Quiz',
                    message: 'Are you sure you want to delete this quiz?',
                  })
                "
                >mdi-delete</v-icon
              >
              <v-icon
                color="warning"
                @click="$router.push(`quiz/view/${item.name}`)"
                >mdi-eye</v-icon
              >
              <v-icon
                color="success"
                @click="$router.push(`quiz/edit/${item.name}`)"
                >mdi-square-edit-outline</v-icon
              >
            </template>
            <template v-slot:no-data>
              <span class="text-h6">Oops You have not yet created a quiz.</span>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      Sorry this page is under construction, you can 
      <router-link :to="`/reports`">view your reports</router-link>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    search: "",
    headers: [
      {
        text: "Quiz name",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Course name", value: "course" },
      { text: "usage", value: "usage" },
      { text: "No of questions", value: "containedQuestions" },
      { text: "Duration", value: "duration" },
      { text: "Date Added", value: "date" },
      { text: "Action", value: "actions", sortable: false, align: "center" },
    ],
  }),
  computed: {
    // get the current course
    ...mapGetters("quiz", ["all_quiz"]),
    // format the quiz to fit in the table
    formated_quiz() {
      let formated_quiz = [];
      for (const quiz of this.all_quiz) {
        formated_quiz.push({
          _id: quiz._id,
          name: quiz.name,
          course: "under construction",
          usage: 0,
          containedQuestions: quiz.questions.length,
          duration: new Date(quiz.duration * 100).toISOString().substr(11, 8),
          date: quiz.createdAt.split("T")[0].split("-").reverse().join("/"),
        });
      }
      return formated_quiz;
    },
    userCategory() {
      return this.$store.state.user.user.category;
    },
  },
  methods: {
    ...mapActions("quiz", ["getQuizes"]),
    ...mapActions("modal", ["set_modal"]),
  },
  created() {
    // load formated_quiz
    this.getQuizes({
      userCategory: this.$store.state.user.user.category.toLowerCase(),
      userId: this.$store.state.user.user._id,
    });
  },
};
</script>

<style lang="scss">
.round {
  .v-card > *:first-child:not(.v-btn):not(.v-chip),
  .v-card > .v-card__progress + *:not(.v-btn):not(.v-chip) {
    border-top-left-radius: 50% !important;
    border-top-right-radius: 50% !important;
  }
}
.v-avatar.svg_container {
  background-color: $primary;
  svg {
    height: initial !important;
    width: initial !important;
  }
}
</style>