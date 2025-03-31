<template>
  <v-container class="round smooth--background">
    <v-row class="d-none">student</v-row>
    <v-row>
      <v-col class="col-12">
        <v-card class="mx-auto elevation-0 pa-12 text-center smooth--card" max-width="344">
          <v-avatar size="100" color="#4592ee">
            <v-icon size="55" dark>mdi-clipboard-text-multiple-outline</v-icon>
          </v-avatar>
          <v-card-subtitle class="pa-1 text-h6">Quizes</v-card-subtitle>

          <v-card-subtitle class="pa-1 text-h6">{{quizes.length}}</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col class="col-12">
        <v-card class="users-table">
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
          <v-data-table :headers="headers" :items="quizes" sort-by="quizname">
            <template v-slot:item.actions="{ item }">
              <v-icon small color="error" @click="deleteQuiz(item._id)">mdi-delete</v-icon>
              <v-icon small color="warning" @click="$router.push(`quiz/view/${item._id}`)">mdi-eye</v-icon>
              <v-icon
                small
                color="success"
                @click="$router.push(`quiz/edit/${item._id}`)"
              >mdi-square-edit-outline</v-icon>
            </template>
          </v-data-table>
        </v-card>
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
  data: () => ({
    search: "",
    show: false,
    status: 200,
    message: "just testing",
    quizes: [],
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
    items: [
      {
        quizname: "Quiz 1",
        coursename: "Teacher",
        usage: "2 times",
        questionslength: "8",
        duration: "00:10:00",
        date: "02/12/2020",
      },
      {
        quizname: "Quiz 2",
        coursename: "Student",
        usage: "4 times",
        questionslength: "4",
        duration: "00:15:00",
        date: "26/12/2020",
      },
      {
        quizname: "Quiz 3",
        coursename: "Student",
        usage: "1 time",
        questionslength: "6",
        duration: "00:05:00",
        date: "22/11/2020",
      },
      {
        quizname: "Quiz 4",
        coursename: "Teacher",
        usage: "0 time",
        questionslength: "10",
        duration: "00:25:00",
        date: "13/11/2020",
      },
    ],
  }),
  beforeMount() {
    this.getQuizes();
  },
  methods: {
    async getQuizes() {
      try {
        this.quizes = [];
        const response = await Apis.get("quiz");
        for (const quiz of response.data) {
          const newQuiz = {
            _id: quiz._id,
            name: quiz.name,
            course: "nyuma",
            usage: 0,
            containedQuestions: quiz.questions.length,
            duration: `${quiz.duration.hh === "" ? "00" : quiz.duration.hh}:${
              quiz.duration.mm === "" ? "00" : quiz.duration.mm
            }:${quiz.duration.ss === "" ? "00" : quiz.duration.ss}`,
            date: quiz.createdAt.split("T")[0].split("-").reverse().join("/"),
          };
          this.quizes.push(newQuiz);
        }
      } catch (error) {
        if (error.request) {
          this.status = 503;
          this.message = "Service Unavailable";
        }
        this.show = true;
      }
    },
    async deleteQuiz(id) {
      try {
        await Apis.delete("quiz", id);
        for (const i in this.quizes) {
          if (this.quizes[i]._id === id) {
            this.quizes.splice(i, 1);
            break;
          }
        }
      } catch (error) {
        if (error.response) {
          this.status = error.response.status;
          this.message = error.response.data;
        } else if (error.request) {
          this.status = 503;
          this.message = "Service Unavailable";
        }
        this.show = true;
      }
    },
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
</style>