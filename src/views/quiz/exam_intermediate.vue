<template>
  <v-container id="preview-exam" class="px-6 pl-lg-14 pr-md-2 pt-6" fluid>
    <v-row>
      <div class="col-12">
        <back to="/assignments"/>
      </div>
      <div v-if="exam" class="col-12 content">
        <div class="title">{{ exam.name }}</div>
        <div class="subtitle">Before your attempt, Please read all the conditions bellow.
          This will prevent you from failing unexpectedly.
        </div>

        <div class="card mb-12 mb-lg-0">
          <div class="heading">CANDIDATE EXAM CONDUCT AND EXAM SECURITY AGREEMENT</div>
          <div class="body">
            <div>Before your attempt, Please read all the conditions bellow. <br>
              This will prevent you from failing unexpectedly.
            </div>
            <div>I understand, acknowledge, and agree that:
            </div>
            <ul>
              <li>state licensing boards and other licensing bodies rely on the results of NBEO Entry- Level Licensing
                Exams in assessing candidates’ qualification for a professional license to practice optometry, and
              </li>
              <li>the purpose of the NBEO examination is to protect the public health and safety by ensuring
                competence among the candidate population that passes the NBEO exam;
              </li>

              <li>pursuant to that purpose, NBEO has the responsibility to ensure that each candidate’s exam score
                accurately reflects the candidate’s actual knowledge base and competence, as it is crucial to the
              </li>

              <li>it is a violation of this Agreement and of the Ethics Policy to engage in any conduct before, during,
                or
                after the examination that subverts, contravenes, or is inconsistent with the purpose of ensuring that
                each candidate’s exam score accurately reflects the candidate’s actual knowledge base and
                competence; and any such conduct is considered cheating and is also considered “Improper
                Conduct” for purposes of the penalty provisions of this Agreement.
              </li>
            </ul>
          </div>
          <div class="text-center">
            <button @click="exam.type === 'Open-book examination' ? $router.push(`/assessments/exams/attempt/${exam._id}`)  : set_modal({
                        template: 'exam_constraints',
                        link: `/assessments/exams/attempt/${exam._id}`
                      })">I Accept
            </button>
          </div>
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "ExamIntermediate",
  data: () => ({
    exam: undefined
  }),
  components: {
    back: () => import("@/components/shared/back-button"),
  },
  methods: {
    ...mapActions("modal", ["set_modal"]),
    ...mapActions("quiz", ["getExam"]),
  },
  async created() {
    const {exam} = await this.getExam({id: this.$route.query.exam})
    this.exam = exam
  }
};
</script>

<style lang="scss">
#preview-exam {
  .content {
    margin-left: 38px;
  }

  .title {
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    margin: 16px 0px;
    color: #000000;
  }

  .subtitle {
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 18px;

    color: #000000;

  }

  .card {
    max-width: 854px;
    min-height: 511px;
    margin-top: 16px;
    background: #FFFFFF;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
    padding: 35px 70px;

    .heading {
      font-family: Inter;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
      margin-bottom: 16px;
      color: #193074;
    }

    .body {
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 15px;
      line-height: 18px;

      color: #000000;

      div, li {
        margin-bottom: 16px;
      }
    }

    button {
      margin-top: 16px;
      width: 145px;
      height: 38px;
      color: #FFFFFF;
      background: #193074;
      border-radius: 6px;
    }
  }
}
</style>