<template>
  <main class="profile">
    <main class="profile--wrapper">
      <div class="profile--user-profile-card profile--user-profile-card__1">
        <div class="profile--user-profile-card--profile">
          <user-profile-card :user="user" />
        </div>
        <div class="profile--user-profile-card--course-created">
          <div class="head mt-4 mb-1">
            <h3>Course {{ user.category === 'STUDENT' ?  'enroled' : 'created' }}</h3>
          </div>
          <div class="course-card" v-for="i in 4" :key="i">
            <course-created-card :type="user.category"/>
          </div>
        </div>
      </div>
      <div v-if="$store.state.user.user.category.name !== 'STUDENT'" class="profile--user-profile-card profile--user-profile-card__2">
        <div v-if="$store.state.user.user.category.name !== 'INSTRUCTOR' || user.category === 'STUDENT'" class="profile--user-profile-card--success-rate ">
          <div class="head ">
            <h3>Students success rate</h3>
          </div>
          <div class="success-stats-card d-flex justify-center">
            <success-score-chart/>
          </div>
        </div>
        <div class="profile--user-profile-card--performing-class">
          <div class="head mb-1">
            <h3>{{ user.category === 'STUDENT' ? $store.state.user.user.category.name === 'INSTRUCTOR' ? 'Live class attendance status' : 'Detailed course scores' : 'Top 3 performing classes' }}</h3>
          </div>
          <div class="enrol-course-card mt-1 mb-1" v-for="i in 3" :key="i">
            <detailed-course-score-card :type="user.category"/>
          </div>
        </div>
        <div v-if="$store.state.user.user.category.name === 'INSTRUCTOR' && user.category === 'INSTRUCTOR'" class="profile--user-profile-card--performing-class mt-6">
          <div class="head mb-1">
            <h3>Archived courses ( Not in use)</h3>
          </div>
          <div class="enrol-course-card mt-1 mb-1" v-for="i in 3" :key="i">
            <course-archieved-card/>
          </div>
        </div>
        <!--          <enrol-course-card />-->


      </div>
    </main>
  </main>
</template>

<script>
import UserProfileCard from "../../../components/profile/user-profile-card";
// import EnrolCourseCard from "../../../components/profile/enrol-course-card";
import DetailedCourseScoreCard from "../../../components/profile/detailed-course-score-card";
import SuccessScoreChart from "../../../components/profile/success-score-chart";
import CourseCreatedCard from "../../../components/profile/course-created-card";
import apis from "../../../services/apis";
import CourseArchievedCard from "../../../components/profile/course-archieved-card";

export default {
  name: "profile",
  components: {CourseArchievedCard, CourseCreatedCard, SuccessScoreChart, DetailedCourseScoreCard, UserProfileCard},
  data: () => ({
    user: undefined
  }),
  methods: {
    loadUser() {
      apis.get(`user/${this.$route.params.username}`)
          .then(({data: {data}}) => {
            this.user = data
          })
          .catch(err => {
            console.log(err)
          })
    }
  },
  beforeMount() {
    this.loadUser();
  }
}
</script>

<style lang="scss" scoped>
.profile {
  &--wrapper {
    display: flex;
    justify-content: space-evenly;
    padding-top: 1.5rem;
  }

  &--user-profile-card {
    border: 2px solid lighten($font, 70);
    padding: .5rem 2rem;
    background: $main;
    max-width: 450px;
    width: 100%;

    .head {
      h3 {
        color: lighten($primary, 20);
      }
    }

    &--course-created {


    }
  }
}
</style>