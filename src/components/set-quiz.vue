<template>
  <v-app class="set-quiz-page">
    <h2>Economics Basics</h2>
    <v-text-field
      v-model="name"
      placeholder="Enter the quiz name"
      class="question-options"
      solo
      required
    />
    <vue-timepicker v-model="duration" format="hh:mm:ss" />
    <v-row v-for="(question, i) in questions" :key="i">
      <v-col cols="1" sm="1">
        <v-btn text @click="removeQuestion(i)">
          <h2>Q{{i+1}}</h2>
        </v-btn>
      </v-col>
      <v-col cols="4" sm="4">
        <h4>Question Type</h4>
        <v-select v-model="question.type" :items="questionTypes" label="Question Type" solo></v-select>
      </v-col>
      <v-col cols="4" sm="4">
        <h4>Question Details</h4>
        <v-text-field v-model="question.details" placeholder="Type question details" solo required></v-text-field>
        <div v-if="question.type === 'Single select' || question.type === 'Multiple select'">
          <v-text-field
            v-for="(option, k) in question.options.options"
            :key="k"
            v-model="option.text"
            :placeholder="`Option ${k+1}`"
            class="question-options"
            solo
            required
          >
            <template v-if="question.options.options.length > 1" v-slot:append-outer>
              <v-icon :color="'error'" @click="removeOption(i,k)" v-text="'mdi-close'" />
            </template>
          </v-text-field>
          <v-btn text class="add-option" @click="addOption(i)">
            <v-icon class="mr-2">mdi-plus</v-icon>Add Option
          </v-btn>
        </div>
      </v-col>
      <v-col cols="2" sm="2">
        <h4>Marks</h4>
        <v-text-field v-model="question.marks" suffix="Marks" solo required></v-text-field>
      </v-col>
    </v-row>
    <v-btn color="#707070" class="white--text" rounded @click="addQuestion()">
      <v-icon>mdi-plus</v-icon>Add a question
    </v-btn>
    <v-row>
      <v-btn color="#ffd248" class="white--text save-quiz" rounded @click="saveQuiz() ">Save</v-btn>
      <v-btn color="#707070" class="cancel-quiz" text>Cancel</v-btn>
    </v-row>
    <kurious-dialog :show="show" :message="message" :modal="modal" :status="status">
      <!-- <v-icon slot="icon" size="55" dark>mdi-clipboard-text-multiple-outline</v-icon> -->
      <v-icon slot="icon" size="55" dark>mdi-barley</v-icon>
      <v-row slot="actions">
        <v-col class="col-6 mx-auto my-0">
          <v-btn color="mx-2" to="/quiz">Go to Quizes</v-btn>
          <v-btn
            v-if="status !== 200"
            color="mx-2"
            @click="show = false"
          >Edit Quiz</v-btn>
          <v-btn v-else color="mx-2" @click="reset();show = false">Add Another Quiz</v-btn>
        </v-col>
      </v-row>
    </kurious-dialog>
  </v-app>
</template>

<script>
import Apis from "@/services/apis";
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";
export default {
  components: {
    VueTimepicker,
  },
  data: () => ({
    show: false,
    message: "",
    modal: true,
    status: 200,
    name: "",
    duration: { hh: "00", mm: "00", ss: "00" },
    questionTypes: [
      "Open ended",
      "Single select",
      "Multiple select",
      // "Matching",
      // "Filling Blanks",
      // "Image Selection",
      // "Audio Question",
    ],
    questions: [
      {
        type: "Multiple select",
        marks: 0,
        details: "",
        options: {
          options: [{ text: "" }, { text: "" }],
        },
      },
      {
        type: "Open ended",
        marks: 0,
        details: "",
        options: {
          options: [{ text: "" }, { text: "" }],
        },
      },
    ],
  }),
  methods: {
    reset() {
      this.questions = [
        {
          type: "Multiple select",
          marks: 0,
          details: "",
          options: {
            options: [{ text: "" }, { text: "" }],
          },
        },
        {
          type: "Open ended",
          marks: 0,
          details: "",
          options: {
            options: [{ text: "" }, { text: "" }],
          },
        },
      ];
      this.duration = { hh: "00", mm: "00", ss: "00" };
    },
    addQuestion() {
      this.questions.push({
        type: "Open ended",
        marks: 0,
        details: "",
        options: {
          options: [{ text: "" }, { text: "" }],
        },
      });
    },
    addOption(index) {
      this.questions[index].options.options.push({ text: "" });
    },
    removeOption(index, index1) {
      this.questions[index].options.options.splice(index1, 1);
    },
    removeQuestion(index) {
      this.questions.splice(index, 1);
    },
    async saveQuiz() {
      try {
        let questions = [];
        for (const question of this.questions) {
          if (!question.type.includes("select")) {
            question.options = undefined;
          }
          question.type = question.type.toLowerCase().replace(" ", "-");
          questions.push(question);
        }
        await Apis.create("quiz", {
          name: this.name,
          duration: this.duration,
          instructor: this.$store.state.user._id,
          questions: questions,
        });
        this.message = "Quiz was saved successfully";
        this.show = true;
      } catch (error) {
        if (error.response) {
          this.status = error.response.status;
          this.message = error.response.data;
        } else if (error.request) {
          this.status = 503;
          this.message = "Service Unavailable";
        }
        this.modal = false;
        this.show = true;
      }
    },
  },
};
</script>

<style>
</style>