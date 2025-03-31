<template>
  <!--detailed course score card-->

  <div class="dcsc">
    <div class="dcsc--wrapper d-flex justify-space-between">
      <!--      col 1 with tittle-->
      <div class="dcsc--col dcsc--col__1 dcsc--title col-4 pa-0">
        <div class="dcsc--title--name">
          <h3>{{ data.name }}</h3>
        </div>
        <div class="dcsc--title--start-date">
          <p>Started on {{ data.progress ? data.progress.createdAt : data.createdAt | formatDate }}</p>
        </div>
      </div>
      <!--      col 2 with success rate-->
      <div class="dcsc--col dcsc--col__2 dcsc--success-rate col-4 pa-0">
        <div class="dcsc--success-rate--title">
          <p>Overall {{ $store.state.user.user.category.name === 'INSTRUCTOR' ? 'attendance':'success' }} rate</p>
        </div>
        <div class="dcsc--completion--success-rate--progress text-center">
          <h5>{{ Math.round(data.successRate) || 0 }} %</h5>
        </div>
      </div>
      <!--      col 3 with last attempted quiz infos-->
      <div v-if="type === 'INSTRUCTOR'" class="dcsc--col dcsc--col__3 dcsc--last-quiz  col-4 pa-0">
        <div class="dcsc--last-quiz--title">
          <p>Last marks release</p>
        </div>
        <div class="dcsc--last-quiz--score">
          <h5>{{ data.latest_marks_release | formatDate }}</h5>
        </div>
      </div>
      <div v-else class="dcsc--col dcsc--col__3 dcsc--last-quiz  col-4 pa-0">
        <div class="dcsc--last-quiz--title">
          <p>{{ $store.state.user.user.category.name === 'INSTRUCTOR' ? 'Last Session' : 'Last quiz marks' }}</p>
        </div>
        <div class="dcsc--last-quiz--score">
          <h5 v-if="$store.state.user.user.category.name === 'INSTRUCTOR'">{{ type === 'STUDENT' ? data.attendanceLastSession === undefined ? 'Attended' : 'Missed' : '' }}</h5>
          <h5 v-else>{{ data.last_quiz }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detailed-course-score-card",
  props: {
    type: {
      type: String,
      required: true
    },
    data: {
      type: Object
    }
  }
}
</script>


<style lang="scss" scoped>
.dcsc {
  max-width: 28rem;

  &--wrapper {
    background-color: lighten($primary, 67);
    padding: .3rem 1rem;
    border-radius: 6.5px;
  }

  &--col {
    &__2 {

    }
  }

  &--title {
    &--name {
      h3 {
        color: $font;
        font-size: .9rem;
      }
    }

    &--start-date {
      font-size: .6rem;
    }
  }

  p {
    margin-bottom: .5rem;
  }

  &--success-rate {
    margin: 0 1rem;

    p {
      font-size: .65rem;
    }

    &--title {
      font-size: 0.65rem;
    }

    &--progress {

    }

  }

  &--last-quiz {
    p {
      font-size: .65rem;
    }

    &--title {

    }

    &--score {
      h5 {
        font-size: .65rem;
      }
    }
  }
}
</style>