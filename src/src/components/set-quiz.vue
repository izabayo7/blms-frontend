<template>
  <v-app class="set-quiz-page">
      <h2>Economics Basics</h2>
      <v-row>
        <v-col cols="1" sm="1">
          <h2>Q1</h2>
        </v-col>
        <v-col cols="4" sm="4">
          <h4>Question Type</h4>
          <v-select
          :items="questions.type"
          label="Question Type"
          solo
        ></v-select>
        </v-col>
        <v-col  cols="4" sm="4">
          <h4>Question Details</h4>
          <div class="multiple-choice">
           <v-text-field
             placeholder="Type question details"
             solo
             required
           >
           </v-text-field>
           <div>
             <v-text-field
              placeholder="Option 1"
              class="question-options"
              solo
              required
             >
             </v-text-field>
             <v-text-field
              placeholder="Option 2"
              class="question-options"
              solo
              required
             >
             </v-text-field>
             <router-link to="" class="add-option"><v-icon>mdi-plus</v-icon> Add Option</router-link>
           </div>
          </div>
        </v-col>
        <!-- <v-col>
          <h4>Duration</h4>
          <v-time-picker
            v-model="time"
            :allowed-hours="allowedHours"
            :allowed-minutes="allowedMinutes"
            class="mt-4"
            format="24hr"
            scrollable
            min="9:30"
            max="22:15"
          ></v-time-picker>
        </v-col> -->
        <v-col  cols="2" sm="2">
          <h4>Marks</h4>
          <v-text-field
          suffix="Marks"
          solo
          required
        ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1" sm="1">
          <h2>Q2</h2>
        </v-col>
        <v-col cols="4" sm="4">
          <h4>Question Type</h4>
          <v-select
          :items="questions.type"
          label="Question Type"
          solo
        ></v-select>
        </v-col>
        <v-col  cols="4" sm="4">
          <h4>Question Details</h4>
          <div>
           <v-text-field
             placeholder="Type question details"
             solo
             required
           >
           </v-text-field>
          </div>
        </v-col>
        <v-col  cols="2" sm="2">
          <h4>Marks</h4>
          <v-text-field
          suffix="Marks"
          solo
          required
        ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="1" sm="1">
          <h2>Q3</h2>
        </v-col>
        <v-col cols="4" sm="4">
          <h4>Question Type</h4>
          <v-select
          :items="questions.type"
          label="Question Type"
          solo
        ></v-select>
        </v-col>
        <v-col  cols="4" sm="4">
          <h4>Question Details</h4>
          <div>
           <v-text-field
             placeholder="Type question details"
             solo
             required
           >
           </v-text-field>
          </div>
        </v-col>
        <v-col  cols="2" sm="2">
          <h4>Marks</h4>
          <v-text-field
          suffix="Marks"
          solo
          required
        ></v-text-field>
        </v-col>
      </v-row>
      <v-btn color="#707070" class="white--text" rounded><v-icon>mdi-plus</v-icon> Add a question</v-btn>
      <v-row>
        <v-btn color="#ffd248" class="white--text save-quiz" rounded>Save</v-btn>
        <v-btn color="#707070" class="cancel-quiz" text>Cancel</v-btn>
      </v-row>
  </v-app>
</template>

<script>
export default {
  data: () => ({
      return: {
        time: '11:15',
        timeStep: '10:10',
      },
       methods: {
        allowedHours: v => v % 2,
        allowedMinutes: v => v >= 10 && v <= 50,
        allowedStep: m => m % 10 === 0,
    },
      questions: {
        type: ['Multiple Choice', 'Text Answer', 'Matching', 'Filling Blanks','Image Selection','Audio Question'],
      }

    }),

}
</script>

<style>

</style>