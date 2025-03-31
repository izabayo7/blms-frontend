<template>
  <v-app id="reports-page" class="instructor_reports">
    <div v-if="course" class="table-one">
      <navigation title="Submissions" class="mb-6" :links="navigation_links"/>
      <v-data-table
          :headers="submissionHeaders"
          :items="course.submissions"
          :items-per-page="5"
          sort-by="dateOfSubmission"
          class="data-table"
          @click:row="handleRowClick"
      >
        <template v-slot:item.target="{ item }">
          <span class="d-block">{{
              item.quiz ? item.quiz.target.chapter.name :
                  item.exam ? item.exam.name :
                      item.assignment.target.chapter ? item.assignment.target.chapter.name : 'ALL'
            }}</span>
        </template>
        <template v-slot:item.date="{ item }">
          <span>{{ item.createdAt | formatDate }}</span>
        </template>
        <template v-slot:item.total_marks="{ item }">
          <span>{{
              `${item.marked ? item.total_marks : ""} / ${item.quiz ? item.quiz.total_marks : item.exam ? item.exam.total_marks : item.assignment.total_marks}`
            }}</span>
        </template>
        <template v-slot:item.marking_status="{ item }">
          <span
              :class="`normal--text ${item.marked ? 'marked' : 'not_marked'}`"
              to="/"
          >
            {{ item.marked ? "Marked" : "Not marked" }}
          </span>
        </template>
        <template v-slot:item.attachments="{ item }">
          <span>{{ item ? "0" : "" }}</span>
        </template>
        <template v-slot:item.feedback="{ item }">
          <span>
            {{ item.total_feedbacks }}
          </span>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21.214"
              height="21.214"
              viewBox="0 0 21.214 21.214"
          >
            <path
                id="Icon_material-feedback"
                data-name="Icon material-feedback"
                d="M22.092,3H5.121A2.119,2.119,0,0,0,3.011,5.121L3,24.214l4.243-4.243h14.85a2.128,2.128,0,0,0,2.121-2.121V5.121A2.128,2.128,0,0,0,22.092,3ZM14.668,15.728H12.546V13.607h2.121Zm0-4.243H12.546V7.243h2.121Z"
                transform="translate(-3 -3)"
                fill="#fc6767"
            />
          </svg>
        </template>
        <template v-slot:no-data>
          <span class="text-h6">Submission list is empty</span>
        </template>
      </v-data-table>
    </div>
    <div v-else class="err text-center">
      sorry the given submission id is invalid
      <back class="mt-0 mb-6 mx-auto" target="/reports"/>
    </div>
  </v-app>
</template>
<script>
import {mapActions} from "vuex";
import colors from "@/assets/sass/imports/_colors.scss";

export default {
  components: {
    navigation: () => import("@/components/shared/simple_navigation"),
    back: () => import("@/components/shared/back-button"),
  },
  data: () => ({
    primary: colors.primary,
    course: undefined,
  }),
  computed: {
    submissionHeaders() {
      const headers = [
        {
          text: "Date",
          value: "date",
          align: "center",
        },
        {
          text: "Attachments",
          value: "attachments",
          align: "center",
        },
        {text: "Status", value: "marking_status", align: "center"},
        {
          text: "Marks",
          value: "total_marks",
          align: "center",
        },
        {
          text: "Feedback",
          value: "feedback",
          align: "center",
          sortable: false,
        },
      ]
      headers.unshift(        {
        text: this.course.submissions[0].exam ? "Name" : "Chapter",
        align: "start",
        sortable: false,
        value: "target",
      },)
      return headers;
    },
    navigation_links() {
      let res = [
        {
          text: "reports",
          link: "/reports",
        },

      ]
      if (this.course)
        res.push({
          text: this.course.submissions[0].quiz ?
              this.course.submissions[0].quiz.target.course.name :
              this.course.submissions[0].exam ?
                  this.course.submissions[0].exam.course.name : this.course.submissions[0].assignment.target.course.name,
          link: "/reports/" + this.$route.params.target,
        })
      return res;
    },
    // get the userCategory
    userCategory() {
      return this.$store.state.user.user.category.name;
    },
  },
  methods: {
    handleRowClick(value) {
      this.$router.push(value.quiz ? `/quiz/${value.quiz.name}/${this.$store.state.user.user.user_name}` : `/assignments/${value.assignment._id}`)
    },
    ...mapActions("quiz_submission", ["getQuizSubmissionsInQuiz"]),
    guess() {
      return Math.random() > Math.random();
    },
  },
  created() {
    //get submissions on page load
    this.getQuizSubmissionsInQuiz({
      quiz_id: this.$route.params.target,
      isAssignments: this.$route.path.includes('assignments'),
      isExam: this.$route.path.includes('exams')
    }).then((d) => {
      this.course = d;
    });
  },
};
</script>
<style lang="scss">
.instructor_reports {
  // font-family: Poppins;
  .normal--text {
    font-size: 18px;
    font-weight: 500;

    &.small {
      font-size: 12px;
    }

    &.marked {
      color: #3ce970 !important;
    }

    &.not_marked {
      color: #fc6767 !important;
    }
  }

  .data-table {
    &.courses {
      .normal--text {
        font-size: 14px;
        font-weight: 500;
      }

      .semi_bold_text {
        font-weight: 700;
      }
    }
  }
}
</style>