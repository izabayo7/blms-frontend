<template>
  <!--course created card-->

  <div class="ccc">
    <div class="ccc--wrapper d-flex justify-space-between">
      <!--      col 1 with tittle-->
      <div class="ccc--col ccc--col__1 ccc--title">
        <div class="ccc--title--name">
          <h3>Bookkeeping basics</h3>
        </div>
        <div class="ccc--title--start-date">
          <p>Started on 27 jan 2021</p>
        </div>
      </div>
      <!--      col 2 with success rate-->
      <div class="ccc--col ccc--col__2 ccc--class">
        <div v-if="type === 'INSTRUCTOR'" class="ccc--class--name">
          <p>Communication design year1</p>
        </div>
        <div v-else class="ccc--class--name">
          <div class="text mx-auto">{{ Math.round(23.3) }} % completion</div>
          <progress :value="23.3" max="100"></progress>
        </div>
      </div>
      <!--      col 3 with last attempted quiz infos-->
      <div v-if="type === 'INSTRUCTOR'" class="ccc--col ccc--col__3 ccc--students">
        <div class="ccc--students--title">
          <p>Students</p>
        </div>
        <div class="ccc--students--number">
          <h5>62</h5>
        </div>
      </div>
      <div v-else class="ccc--col ccc--col__3 ccc--students">
        <div class="ccc--students--title">
          <p>Last chapter accessed</p>
        </div>
        <div class="ccc--students--number">
          <h5>4.2 Rounding</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "course-created-card",
  props: {
    type: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.ccc {
  max-width: 28rem;
  min-height: 100%;

  &--wrapper {
    padding: .5rem 0;
    border-radius: 6.5px;
  }

  &--col {
    &__2 {

    }
  }

  &--title {
    &--name {
      h3 {
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        font-size: 13.0102px;
        /* identical to box height */


        color: #3C3C3C;
      }
    }

    &--start-date {
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 9.80613px;
      line-height: 9px;

      color: #000000;
    }
  }

  p {
    margin-bottom: .5rem;
  }

  &--class {
    padding: 0 1rem;

    p {
      font-size: .65rem;
      color: lighten($primary, 10)
    }

    &--name {
      font-size: 0.65rem;
      .text{
        font-family: Roboto;
        font-style: normal;
        font-weight: 300;
        font-size: 11.7092px;
        line-height: 14px;

        color: #000000;
      }
      progress{
        height: 9px;
        background: #FFD0A7 !important;
        border-radius: 20px;
      }
      progress {
        color: #FFD0A7;
        border-radius: 20px;
      }

      progress::-webkit-progress-value {
        background: #FFD0A7;
        border-radius: 20px;
      }

      progress::-moz-progress-bar {
        background: #FF7700;
        border-radius: 20px;
      }

      progress::-webkit-progress-value {
        background: #FF7700;
        border-radius: 20px;
      }

      progress::-webkit-progress-bar {
        background: #FFD0A7;
        border-radius: 20px;
      }
    }

  }

  &--students {
    p {
      font-size: .65rem;
    }

    &--title {
      p{
        font-family: Roboto;
        font-style: normal;
        font-weight: 300;
        font-size: 11.7092px;
        line-height: 14px;
        /* identical to box height */


        color: #000000;
      }
      h5{
        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        font-size: 11.7092px;
        line-height: 14px;
        /* identical to box height */


        color: #000000;

      }
    }

    &--number {
      h5 {
        font-size: .65rem;
      }
    }
  }
}
</style>