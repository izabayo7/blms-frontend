
<template>
<!--detailed course score card-->

  <div class="dcsc">
    <div class="dcsc--wrapper d-flex justify-space-between">
      <div class="dcsc--col dcsc--col__1 dcsc--title">
        <div class="dcsc--title--name">
          <h3>Bookkeeping basics</h3>
        </div>
        <div class="dcsc--title--start-date">
          <p>Started on 27 jan 2021</p>
        </div>
      </div>
      <div class="dcsc--col dcsc--col__2 dcsc--success-rate">
        <div class="dcsc--success-rate--title">
          <p>Overall success rate</p>
        </div>
        <div class="dcsc--completion--success-rate--progress">
          <h5>62 %</h5>
        </div>
      </div>
      <div class="dcsc--col dcsc--col__3 dcsc--last-quiz">
        <div class="dcsc--last-quiz--title">
          <p>Last quiz marks</p>
        </div>
        <div class="dcsc--last-quiz--score">
          <h5>15 /15</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "detailed-course-score-card"
}
</script>


<style lang="scss" scoped>
.dcsc{
  max-width:28rem;
  &--wrapper{
    background-color:lighten($primary,60);
    padding:1rem;
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

  &--success-rate{
    p{
      font-size:.75rem;
    }

    &--title{
      font-size:0.75rem;
    }
    &--progress{

    }

  }

  &--last-quiz{
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