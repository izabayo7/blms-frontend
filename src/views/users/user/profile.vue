<template>
  <main class="profile">
    <main v-if="info" class="profile--wrapper">
      <div class="profile--user-profile-card profile--user-profile-card__1">
        <div class="profile--user-profile-card--profile">
          <user-profile-card :user="info.user"/>
        </div>
        <div class="profile--user-profile-card--course-created">
          <div class="head mt-4 mb-1">
            <h3>Course {{ info.user.category === 'STUDENT' ? 'enroled' : 'created' }}</h3>
          </div>
          <div class="holder customScroll">
            <div class="course-card" v-for="course in info.courses" :key="course._id">
              <course-created-card :data="course" :type="info.user.category"/>
            </div>
          </div>
        </div>
      </div>
      <div v-if="$store.state.user.user.category.name !== 'STUDENT'"
           class="profile--user-profile-card profile--user-profile-card__2">
        <div v-if="$store.state.user.user.category.name !== 'INSTRUCTOR' || info.user.category === 'STUDENT'"
             class="profile--user-profile-card--success-rate ">
          <div class="head ">
            <h3>Students success rate</h3>
          </div>
          <div class="success-stats-card d-flex justify-center">
            <success-score-chart :courses="info.courses"/>
          </div>
        </div>
        <div class="profile--user-profile-card--performing-class">
          <div class="head mb-1">
            <h3>{{
                info.user.category === 'STUDENT' ? $store.state.user.user.category.name === 'INSTRUCTOR' ? 'Live class attendance status' : 'Detailed course scores' : 'Top 3 performing classes'
              }}</h3>
          </div>
          <div class="holder customScroll">
            <div class="enrol-course-card mt-1 mb-1" v-for="course in info.courses" :key="course._id">
              <detailed-course-score-card :data="course" :type="info.user.category"/>
            </div>
          </div>
        </div>
        <div v-if="$store.state.user.user.category.name === 'INSTRUCTOR' && info.user.category === 'INSTRUCTOR'"
             class="profile--user-profile-card--performing-class mt-6">
          <div class="head mb-1">
            <h3>Archived courses ( Not in use)</h3>
          </div>
          <div class="holder customScroll">
            <div class="enrol-course-card mt-1 mb-1" v-for="course in info.courses" :key="course._id">
              <course-archieved-card :data="course"/>
            </div>
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
    info: undefined
  }),
  methods: {
    loadUser() {
      apis.get(`user/${this.$route.params.username}?measure=extended`)
          .then(({data: {data}}) => {
            this.info = data
            this.info.user.user_groups = this.info.user_groups
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
      .holder {
        max-height: 240px;
        overflow-y: auto;
      }
    }
    &--performing-class{
      .holder {
        max-height: 200px;
        overflow-y: auto;
        overflow-x: hidden;
      }
    }
  }
}

/* Portrait phones and smaller */
@media (max-width: 700px) {
  .profile {
    &--user-profile-card {
      padding: 1rem;
      &.profile--user-profile-card__2{
        margin-bottom: 4rem;
      }
    }
    &--wrapper {
      display: block;
      justify-content: space-evenly;
      padding-top: 0rem;
    }
  }
}
</style>