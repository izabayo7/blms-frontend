<template>
<!--enrol course card-->
  <div class="ecc">
    <div class="ecc--wrapper d-flex">
<!--      col 1 with course title-->
      <div class="ecc--col ecc--col__1 ecc--title">
        <div class="ecc--title--name">
          <h3>Bookkeeping basics</h3>
        </div>
        <div class="ecc--title--start-date">
          <p>Started on 27 jan 2021</p>
        </div>
      </div>

<!--      col 2 with course completion progress bar-->
      <div class="ecc--col ecc--col__2 ecc--completion">
        <div class="ecc--completion--text">
          <p>45 % Completion</p>
        </div>
        <div class="ecc--completion--progress-bar">
          <div class="ecc--completion--progress-bar--bar">
            <div class="ecc--completion--progress-bar--bar--value"></div>
          </div>
        </div>
      </div>

<!--      col 3 with last course access -->
      <div class="ecc--col ecc--col__3 ecc--last-access">
        <div class="ecc--last-access--chapter-name">
          <p>Last chapter accessed</p>
        </div>
        <div class="ecc--last-access--latest-step">
          <h5>4.2 Rounding</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "enrol-course-card"
}
</script>

<style lang="scss" scoped>
.ecc{
  &--wrapper{

  }
  &--col{
    &__2{
      margin-left:1rem;
      margin-right:1rem;
    }
  }

  &--title{
    &--name{
      font-size:.9rem;
    }
    &--start-date{
      font-size:.6rem;
    }
  }

  p{
    margin-bottom:.5rem;
  }

  &--completion{
    &--text{
      font-size:0.75rem;
    }
    &--progress-bar{
      &--bar{
        width:8rem;
        height:.7rem;
        background-color: lighten($warn,30);
        border-radius:10rem;

        &--value{
          height:100%;
          width:70%;
          border-radius:10rem;
          background-color:$warn;
        }
      }
    }

  }

  &--last-access{
    &--chapter-name{
      p{
        font-size:.75rem;
      }
    }

    &--latest-step{
      h5{
        font-size:.75rem;
      }
    }
  }
}
</style>