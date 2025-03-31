<template>
  <v-container id="quiz" class="smooth--background">
    <v-row class="d-none">student</v-row>
    <v-row>
      <v-col class="col-12">
        <v-card class="mx-auto elevation-0 pa-12 text-center smooth--card" max-width="344">
          <v-avatar size="100" color="#4592ee">
            <v-icon size="55" dark>mdi-clipboard-text-multiple-outline</v-icon>
          </v-avatar>
          <v-card-subtitle class="pa-1">Quizes</v-card-subtitle>

          <v-card-subtitle class="pa-1">8</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col class="col-12">
        <v-card class="users-table">
          <v-card-title>
            <v-row>
              <v-col class="col-12 col-md-2 py-0 px-md-6 px-10">Users</v-col>
              <v-col class="col-12 col-md-8 pa-0">
                <v-row>
                  <v-col class="col-12 col-md-4 ml-12 pa-0 mt-n3">
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
                  <v-icon>mdi-account-plus-outline</v-icon>Add new quiz
                </v-btn>
              </v-col>
            </v-row>
          </v-card-title>
          <v-data-table :headers="headers" :items="items" sort-by="quizname">
            <template v-slot:item.actions="{ item }">
              <v-icon
                small
                color="success"
                @click="$router.push(`reports/submissions/${item.quizname}`)"
              >mdi-account-edit</v-icon>
              <v-icon
                small
                color="error"
                @click="$router.push(`reports/submissions/${item.quizname}`)"
              >mdi-delete</v-icon>
              <v-icon
                small
                color="warning"
                @click="$router.push(`reports/submissions/${item.quizname}`)"
              >mdi-eye</v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    headers: [
      {
        text: "Quiz name",
        align: "start",
        sortable: false,
        value: "quizname",
      },
      { text: "Course name", value: "coursename" },
      { text: "usage", value: "usage" },
      { text: "No of questions", value: "questionslength" },
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
};
</script>

<style lang="scss">
#quiz {
  .v-card > *:first-child:not(.v-btn):not(.v-chip),
  .v-card > .v-card__progress + *:not(.v-btn):not(.v-chip) {
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
  }
}
</style>