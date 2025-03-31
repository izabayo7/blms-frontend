<template>
  <div class="class-view">
      <v-card :class="`class-card ${course.published ? '' : 'unpublished-card'}`">
          <v-row>
              <v-col
              cols="12"
              md="6"
              >
                <h3>{{course.name}}</h3>
                <h4>{{16}} chapter(s)</h4>
                <v-progress-linear
                    v-if="course.published"
                    v-model="power"
                    color="#ffd248"
                ></v-progress-linear>
                <p v-if="course.published" class="completion">67% Completion</p>
              </v-col>
              <v-col
                v-if="course.published"
                cols="12"
                md="6"
              >
                <v-btn rounded color="#ffd248" dark>Edit Class<v-icon class="arrow-icon">mdi-arrow-right</v-icon> </v-btn>
              </v-col>
          </v-row>
          <v-row
            v-if="!course.published"
            class="action-btns"
          >
              <v-col cols="12" md="4"><v-btn color="success" dark large class="publish-btn" v-on:click="$emit('childToParent','publish',course._id)">Publish Class</v-btn></v-col>
              <v-col cols="12" md="4"><v-btn color="#ffd248" dark large class="edit-btn">Edit Course</v-btn></v-col>
              <v-col cols="12" md="4"><v-btn color="error" dark large class="delete-btn" v-on:click="$emit('childToParent','delete',course._id)">Delete Course</v-btn></v-col>
          </v-row>
      </v-card>
  </div>
</template>

<script>
export default {
    data:() =>({
        power: 67,
    }),
    props: {
     course:{
         type: Object,
         required: true
     },
 }
}
</script>

<style>

</style>