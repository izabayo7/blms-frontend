<template>
<v-container fluid>
  <v-card @click="$router.push({ name: 'CourseDetails', params: { id: course._id } })" class="course" v-if="category=='ongoing'">
      <v-row>
          <v-col cols="5" id="cover-pic">
              <v-img
              class="course-image"
              v-bind:src="''+image"
              ></v-img>
          </v-col>
          <v-col cols="7">
              <span class="title d-block mb-2 mb-sm-1">{{ course.name }}</span>
              <span class="subtitle mb-3 mb-sm-1 d-block">By <span class="caption">{{ course.instructor }}</span></span>
              <span class="course-description text-caption d-block text-truncate mb-6 mb-sm-1">{{ course.description }}</span>
                <v-progress-linear
                v-model="power"
                color="#ffc100"
                height="25"
                />
                <p class="text-caption font-weight-bold">15% completion</p>
          </v-col>
      </v-row>
  </v-card>
  <v-card @click="$router.push({ name: 'CourseDetails', params: { id: course._id } })"  class="course completed" v-else>
      <v-row>
          <v-col cols="12" id="cover-pic">
              <v-img
              class="course-image"
              v-bind:src="''+image"
              ></v-img>
          </v-col>
          <v-col cols="12" class="completed-results">
              <span class="title d-block text-truncate mb-2 mb-sm-1">{{ course.name }}</span>
              <span class="course-description text-caption d-block mb-6">{{ course.description }}</span>
            <h4> 
                <v-avatar size="30" class="user-profile">
                    <img
                        src="https://cdn.vuetifyjs.com/images/john.jpg"
                        alt="avatar"
                    >
                </v-avatar>
                Instructor {{ course.instructor }}</h4>
            <h4> <v-icon color="#ffd248">mdi-star-outline</v-icon> 4.2</h4>
          </v-col>
      </v-row>
  </v-card>
</v-container>
</template>

<script>
export default {
    data:() =>({
        power: 78,
        knowledge: 45
    }),
 props: {
     image: {
         type: String,
         default: 'https://media.inmobalia.com/imgV1/B8vEv5Xh~OlgGrmOOeWCtYHtdv2TGtX20HosCpYxDmKApRO9fqu6aebRr_kOYwWZUUBuTZKwOZPzAYj7tZulyLOn1CMNcFuV2RqXoT28SJ2OnPhaGG~JUijtTYAgMuK~95K_MTLY7d8_mFzQgU5qCIR0acc49iB4a7RKlRbhA4L7nCLwQUoy~55Chgn65VnEfSbkn8wPAPU65wNYna0WPiwq3DO5FR3ZyC4GVH6cISHb5qeFj9bXdaLtSafxK6JAQUDjvlHmu11lcAZR0m_DzjaXII2SqzhJKqZGy8Wosxgange8oRKNfl1fRhzEUpEtTw8_MfQPTjpPx4wbxN_lreBfVwnD1tE-.jpg'
     },
     course: {
         type: Object,
         required: true
     },
     category: {
         type: String,
         required: true
     }
 },
}
</script>

<style>

</style>/