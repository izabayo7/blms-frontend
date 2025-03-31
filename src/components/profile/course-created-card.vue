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
        <div class="ccc--class--name">
          <p>Communication design year1</p>
        </div>

      </div>
<!--      col 3 with last attempted quiz infos-->
      <div class="ccc--col ccc--col__3 ccc--students">
        <div class="ccc--students--title">
          <p>Students</p>
        </div>
        <div class="ccc--students--number">
          <h5>62</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "course-created-card"
}
</script>

<style lang="scss" scoped>
.ccc{
  max-width:28rem;
  min-height: 100%;
  &--wrapper{
    padding:.5rem 0;
    border-radius:6.5px;
  }
  &--col{
    &__2{

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

  p {
    margin-bottom: .5rem;
  }

  &--class{
    padding:0 1rem;
    p{
      font-size:.75rem;
      color:lighten($primary,10)
    }

    &--name{
      font-size:0.75rem;

    }

  }

  &--students{
    p{
      font-size:.75rem;
    }

    &--title{

    }

    &--score{

    }
  }
}
</style>