<template>
  <v-container id="view-quiz" class="round smooth--background" fluid>
    <v-row>
      <v-col class="col-12 mt-4">
        <v-card class="users-table mx-auto pa-4">
          <v-card-title>
            <v-row>
              <div class="col-6">
                <div class="title">Assignments</div>
              </div>
              <div class="col-6">
                <div class="text-right">
                  <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Search"
                      id="searchQuiz"
                      single-line
                      hide-details
                  />
                </div>
              </div>
            </v-row>
          </v-card-title>
          <v-data-table
              :search="search"
              :headers="headers"
              :items="[1,2,3,4]"
              sort-by="title"
              @click:row="handleRowClick"
          >
            <template v-slot:item.target="{ }">
              <div class="target">
                <div class="title">Course</div>
                <div class="subtitle">Chapter 1</div>
              </div>
            </template>
            <template v-slot:item.title="{ }">
              <div class="assignment_title">
                First assignment
              </div>
            </template>
            <template v-slot:item.created="{ }">
              <div class="assignment_td">
                June 22, 2021
              </div>
            </template>
            <template v-slot:item.dueDate="{ }">
              <div class="assignment_td">
                July 22, 2021
              </div>
            </template>
            <template v-slot:item.marks="{ }">
              <div class="assignment_td">
                15 Marks
              </div>
            </template>
            <template v-slot:item.status="{ }">
              <div class="assignment_td">
                Not done
              </div>
            </template>
            <template v-slot:item.grades="{ }">
              <div class="assignment_td">
                N/A
              </div>
            </template>
            <template v-slot:no-data>
              <span class="text-h6">Assignments list is empty</span>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
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
        text: "Title",
        align: "start",
        sortable: false,
        value: "title",
      },
      {text: "Target", value: "target"},
      {text: "Due date", value: "dueDate"},
      {text: "Marks", value: "marks"},
      {text: "Status", value: "status"},
      {text: "My grade", value: "grades", sortable: false, align: "center"},
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
  },
  methods: {
    ...mapActions("modal", ["set_modal"]),
    handleRowClick(value) {
      this.$router.push(`quiz/attempt/${value.name}`)
    },
  },
  created() {
    // load formated_quiz

  },
};
</script>

<style lang="scss">
#view-quiz {
  .tooltip svg {
    margin-right: 17px;
  }
  .tooltip-text{
    visibility: hidden;
    width: fit-content;
    background: #1c1e23;
    text-align: center;
    border-radius: 10px;
    padding: 7px;
    position: absolute;
    z-index: 1;
    bottom: 70%;
    left: 50%;
    margin-left: -5px;
    opacity: 0;
    transition: opacity 0.3s;
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 10.0903px;
    line-height: 15px;
    color: #FFFFFF;
  }
  .tooltip-text::after {
    border: none;
  }
  .tooltip:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
  }
  .assignment_title{
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    /* or 698% */

    display: flex;
    align-items: center;

    /* primary color / 50% */

    color: #2D3E70;
  }
  .target{
    .title{
      font-family: Inter;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      /* or 698% */

      display: flex;
      align-items: center;

      /* primary color / 50% */

      color: #2D3E70;
    }
    .subtitle{
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 13px;
      /* or 1256% */

      display: flex;
      align-items: center;

      /* primary color / 50% */

      color: #2D3E70;

    }
  }
  table {
    tbody {
      tr {
        cursor: pointer;
      }
    }
  }

  .v-input {
    max-width: 302px;
  }

  .create {
    width: 154px;
    height: 34px;
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;

    color: #FFFFFF;

    background: #193074;
    /* primary color / 50% */

    border: 1px solid #2D3E70;
    box-sizing: border-box;
    border-radius: 10px;
  }

  .nav {
    display: flex;

    .item {
      margin-right: 38px;
      display: flex;

      svg {
        margin-right: 9px;

        path {
          fill: #ABABAB;
        }
      }

      div {
        font-family: Inter;
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 24px;
        display: flex;
        align-items: center;
        text-align: center;

        color: #717171;
      }

      &.active {
        div {
          color: #193074 !important;
        }

        svg {
          path {
            fill: #193074;
          }
        }
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