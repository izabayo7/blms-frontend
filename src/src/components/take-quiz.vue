<template>
<v-app class="quiz-page">
    <h2>Economics Basics</h2>
    <v-row>
        <v-col class="col-12 col-md-7 questions-side">
            <v-row class="col-12 col-md-12">
                <p class="question-details col-md-12 col-12">1. {{questions.details[0]}}</p>
                <textarea cols="50" rows="5" placeholder="Type your answer here" class="answer-field"></textarea>
            </v-row>
            <v-row class="col-12 col-md-12">
                <p class="question-details col-md-12 col-12">2. {{questions.details[0]}}</p>
                <div class="radio-btn1">
                    <v-btn name="radio-btn" class="radio-btn" color="transparent">A. Shantanu Kumar</v-btn>
                </div>
                <div class="d-block">
                    <v-btn name="radio-btn" class="radio-btn" color="transparent">B. Assam</v-btn>
                </div>
            </v-row>
            <v-row class="col-12 col-md-12">
                <p class="question-details col-md-12 col-12">3. {{questions.details[0]}}</p>
                <v-btn rounded color="#ffd248" class="white--text">
                <v-icon>mdi-arrow-expand-up</v-icon>Upload file</v-btn>
            </v-row>
            <v-row class="col-12 col-md-12">
                <p class="question-details col-md-12 col-12">4. {{questions.details[0]}}</p>
                <v-card>
                    <v-container fluid>
                    <v-row>
                        <v-col
                        v-for="n in 4"
                        :key="n"
                        class="d-flex child-flex"
                        cols="6"
                        >
                        <v-card flat tile class="d-flex">
                            <v-img
                            :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                            :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                            aspect-ratio="1"
                            class="grey lighten-2"
                            >
                            <template v-slot:placeholder>
                                <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                                >
                                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                </v-row>
                            </template>
                            </v-img>
                        </v-card>
                        </v-col>
                    </v-row>
                    </v-container>
                    </v-card>
            </v-row>
        </v-col>
        <v-col class="col-12 col-md-5 timer-side">
            <div class="timer">
                <p>00 : 59</p>
            </div>
        </v-col>
    </v-row>
</v-app>
</template>

<script>
export default {
    data: () => ({
      questions: {
        number: '',
        details: [
            'Among the following states of india , which one has the oldest rock formations int the country',
            ]
      }

    }),

}
</script>

<style>

</style>