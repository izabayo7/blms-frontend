<template>
  <v-container id="view-quiz" class="round smooth--background" fluid>
    <v-row v-if="userCategory === 'INSTRUCTOR'">
<!--      <v-col class="col-12">-->
<!--        <v-card-->
<!--            class="mx-auto elevation-0 pa-12 text-center smooth&#45;&#45;card"-->
<!--            max-width="344"-->
<!--        >-->
<!--          <v-avatar class="svg_container" size="100">-->
<!--            <svg-->
<!--                xmlns="http://www.w3.org/2000/svg"-->
<!--                width="55"-->
<!--                height="55"-->
<!--                viewBox="0 0 57.711 57.711"-->
<!--            >-->
<!--              <path-->
<!--                  id="Icon_metro-question"-->
<!--                  data-name="Icon metro-question"-->
<!--                  d="M27.382,40.917H34.47v7.089H27.382ZM41.559,16.106A3.544,3.544,0,0,1,45.1,19.65V30.283L34.47,37.372H27.382V33.828l10.633-7.089V23.194H20.293V16.106H41.559ZM30.926,7.245a23.039,23.039,0,1,0,16.291,6.748A22.888,22.888,0,0,0,30.926,7.245Zm0-5.317A28.355,28.355,0,1,1,2.571,30.283,28.355,28.355,0,0,1,30.926,1.928Z"-->
<!--                  transform="translate(-2.071 -1.428)"-->
<!--                  fill="#fff"-->
<!--              />-->
<!--            </svg>-->
<!--          </v-avatar>-->
<!--          <v-card-subtitle class="pa-1 text-h6">Quizes</v-card-subtitle>-->

<!--          <v-card-subtitle class="pa-1 text-h6">{{-->
<!--              formated_quiz.length-->
<!--            }}-->
<!--          </v-card-subtitle>-->
<!--        </v-card>-->
<!--      </v-col>-->
      <v-col class="col-12 mt-4">
        <v-card class="users-table mx-auto pa-4">
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
                <v-btn rounded to="/quiz/new">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" fill="rgba(255,255,255,1)"/>
                  </svg>
                  Add new quiz
                </v-btn>
              </v-col>
            </v-row>
          </v-card-title>
          <v-data-table
              :search="search"
              :headers="headers"
              :items="formated_quiz"
              sort-by="quizname"
              @click:row="handleRowClick"
          >
            <template v-slot:item.actions="{ item }">
              <div class="d-flex">
                <button @click.stop="
                  set_modal({
                    template: 'action_confirmation',
                    method: {
                      action: 'quiz/delete_quiz',
                      parameters: { id: item._id },
                    },
                    title: 'Delete Quiz',
                    message: 'Are you sure you want to delete this quiz?',
                  })
                ">
                  <svg
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path
                        d="M7 6V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5zm2-2v2h6V4H9z"
                        fill="rgba(231,76,60,1)"/>
                  </svg>
                </button>
                <button @click.stop="$router.push(`quiz/edit/${item.name}`)">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path
                        d="M9.243 19H21v2H3v-4.243l9.9-9.9 4.242 4.244L9.242 19zm5.07-13.556l2.122-2.122a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414l-2.122 2.121-4.242-4.242z"
                        fill="rgba(47,204,113,1)"/>
                  </svg>
                </button>
              </div>
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
import {mapActions, mapGetters} from "vuex";

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
      {text: "Course name", value: "course"},
      {text: "usage", value: "usage"},
      {text: "No of questions", value: "containedQuestions"},
      {text: "Duration", value: "duration"},
      {text: "Date Added", value: "date"},
      {text: "Action", value: "actions", sortable: false, align: "center"},
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
          course: quiz.course ? quiz.course.name : "Not yet Attached",
          usage: quiz.usage,
          containedQuestions: quiz.questions.length,
          duration: new Date(quiz.duration * 1000).toISOString().substr(11, 8),
          date: quiz.createdAt.split("T")[0].split("-").reverse().join("/"),
        });
      }
      return formated_quiz;
    },
    userCategory() {
      return this.$store.state.user.user.category.name;
    },
  },
  methods: {
    ...mapActions("quiz", ["getQuizes"]),
    ...mapActions("modal", ["set_modal"]),
    handleRowClick(value) {
      this.$router.push(`quiz/attempt/${value.name}`)
    },
  },
  created() {
    // load formated_quiz
    this.getQuizes({
      user_name: this.$store.state.user.user.user_name,
    });
  },
};
</script>

<style lang="scss">
#view-quiz {
  table {
    tbody {
      tr {
        cursor: pointer;
      }
    }
  }
}

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