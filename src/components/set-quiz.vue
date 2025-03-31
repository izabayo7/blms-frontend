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
    <v-text-field
      v-model="duration"
      placeholder="Enter the quiz maximum duration"
      class="question-options"
      solo
      required
    />
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
  </v-app>
</template>

<script>
import Apis from "@/services/apis";
export default {
  data: () => ({
    return: {
      time: "11:15",
      timeStep: "10:10",
    },
    methods: {
      allowedHours: (v) => v % 2,
      allowedMinutes: (v) => v >= 10 && v <= 50,
      allowedStep: (m) => m % 10 === 0,
    },
    name: "",
    duration: 0,
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
      let questions = []
      for (const question of this.questions) {
        if (!question.type.includes('select')) {
          question.options = undefined
        }
        question.type = question.type.toLowerCase().replace(' ','-')
        questions.push(question)
      }
      const response = await Apis.create("quiz", { name: this.name, duration: this.duration, instructor: this.$store.state.user._id, questions: questions });
      console.log(response);
    },
  },
};
</script>

<style>
</style>