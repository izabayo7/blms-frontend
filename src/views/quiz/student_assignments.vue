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
              :items="assignments"
              sort-by="title"
              @click:row="handleRowClick"
          >
            <template v-slot:item.target="{ item }">
              <div class="target">
                <div v-if="item.target.course" class="title">{{ item.target.course.name }}</div>
                <div v-if="item.target.chapter" class="subtitle">{{ item.target.chapter.name }}</div>
              </div>
            </template>
            <template v-slot:item.title="{ item }">
              <div class="assignment_title">
                {{ item.title }}
              </div>
            </template>
            <template v-slot:item.dueDate="{ item }">
              <div class="assignment_td">
                {{ item.dueDate | formatDate }}
              </div>
              <div class="assignment_td">
                {{ getTime(item.dueDate) }}
              </div>
            </template>
            <template v-slot:item.marks="{ item }">
              <div class="assignment_td">
                {{ item.total_marks }} Marks
              </div>
            </template>
            <template v-slot:item.status="{ item }">
              <div :class="'assignment_td' + item.submissionMode ? `status ${computeClass(item)}` : ''">
                {{
                  computeClass(item) === 'expired' ? 'Expired' : item.submission ? computeClass(item) === 'marked' ? 'Marked' : 'Submitted' : 'Not done'
                }}
              </div>
            </template>
            <template v-slot:item.grades="{ item }">
              <div class="assignment_td">
                {{ item.status === 'RELEASED' ? item.submission ? item.submission.total_marks : 'N/A' : 'N / A' }}
              </div>
            </template>
            <template v-slot:no-data>
              <span class="text-h6">Assignments list is empty</span>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col class="col-12 mt-4">
        <v-card class="users-table mx-auto pa-4">
          <v-card-title>
            <v-row>
              <div class="col-6">
                <div class="title">Exams</div>
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
              :headers="exam_headers"
              :items="exams"
              sort-by="title"
          >
            <template v-slot:item.course="{ item }">
              <div class="assignment_title">
                {{ item.course.name }}
              </div>
            </template>
            <template v-slot:item.duration="{ item }">
              <div>{{ new Date(item.duration * 1000).toISOString().substr(11, 8) }}</div>
            </template>
            <template v-slot:item.title="{ item }">
              <div class="assignment_title">
                {{ item.title }}
              </div>
            </template>
            <template v-slot:item.dueDate="{ item }">
              <div class="assignment_td">
                {{ item.starting_time | formatDate }}
              </div>
              <div class="assignment_td">
                {{ getTime(item.starting_time) }}
              </div>
            </template>
            <template v-slot:item.marks="{ item }">
              <div class="assignment_td">
                {{ item.total_marks }} Marks
              </div>
            </template>
            <template v-slot:item.status="{ item }">
              <div :class="'assignment_td' + item.submissionMode ? `status ${computeClass(item)}` : ''">
                {{
                  computeClass(item) === 'expired' ? 'Expired' : item.submission ? computeClass(item) === 'marked' ? 'Marked' : 'Submitted' : 'Not done'
                }}
              </div>
            </template>
            <template v-slot:item.grades="{ item }">
              <div class="assignment_td">
                {{ item.status === 'RELEASED' ? item.submission ? item.submission.total_marks : 'N/A' : 'N / A' }}
              </div>
            </template>
            <template v-slot:item.action="{ item }">
              <button class="attempt-exam" :class="{disabled : disabled || isExamDisabled(item) }"
                      :disabled="isExamDisabled(item)"
                      @click=" disabled ?
                      set_modal({
                        template: 'payment_err',
                      }) : $router.push('/assessments/exams/instructions?exam='+item._id)">
                Attempt
              </button>
            </template>
            <template v-slot:no-data>
              <span class="text-h6">Exams list is empty</span>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {getTime} from "../../services/global_functions";

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
      {text: "Status", value: "status", sortable: true},
      {text: "My grade", value: "grades", sortable: false, align: "center"},
    ],
    exam_headers: [
      {
        text: "Course",
        align: "start",
        sortable: false,
        value: "course",
      },
      {text: "Date", value: "dueDate"},
      {text: "Duration", value: "duration"},
      {text: "Marks", value: "marks"},
      {text: "Status", value: "status", sortable: true},
      {text: "My grade", value: "grades", sortable: false, align: "center"},
      {text: "Action", value: "action", sortable: false, align: "center"},
    ],
  }),
  computed: {
    // get the current course
    ...mapGetters("quiz", ["assignments", "exams"]),
    ...mapGetters("user", ["paymentStatus"]),
    disabled() {
      return this.paymentStatus.paid === false
    }
  },
  methods: {
    ...mapActions("quiz", ["getAssignments", "getExams"]),
    ...mapActions("modal", ["set_modal"]),
    handleRowClick(value) {
      this.$router.push(`/assessments/assignments/${value._id}`)
    },
    isExamDisabled(item) {
      if (item.submission)
        return true
      let date = new Date(item.starting_time)
      date.setHours(date.getHours() - 2)

      if (new Date() < date){
        return true
      }

      let endDate = new Date(date)
      endDate.setTime(endDate.getTime() + (item.duration * 1000))

      if (new Date() > endDate)
        return true
      return false
    },
    computeClass(item) {
      if (!item.submission) {
        let date = item.type ? new Date(item.starting_time) : new Date(item.dueDate)
        if (item.type) {
          date.setHours(date.getHours() - 2)
          let endDate = new Date(date)
          endDate.setTime(endDate.getTime() + (item.duration * 1000))
          date = endDate
        }

        if (new Date() > date)
          return 'expired'
        else
          return 'not_done'
      }
      if (!(item.status === 'RELEASED' && item.submission.marked))
        return 'pending'
      else
        return 'marked'
    },
    getTime,
  },
  created() {
    this.getAssignments()
    this.getExams()
  },
};
</script>

<style lang="scss">
#view-quiz {
  .tooltip svg {
    margin-right: 17px;
  }

  .tooltip-text {
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

  .status {
    width: 110px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    &.expired {
      background: #FC6767;
      color: #FFFFFF;
    }

    &.not_done {
      background: #BABABC;
    }

    &.pending {
      background: #FFD248;
    }

    &.marked {
      background: #3CE970;
    }
  }

  .assignment_title {
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

  .target {
    .title {
      font-family: Inter;
      font-style: normal;
      font-weight: bold;
      font-size: 15px !important;
      /* or 698% */

      display: flex;
      align-items: center;

      /* primary color / 50% */

      color: #2D3E70;
    }

    .subtitle {
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

  .attempt-exam {
    width: 104px;
    height: 34px;
    background: #193074;
    border-radius: 6px;
    color: #FFFFFF;
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