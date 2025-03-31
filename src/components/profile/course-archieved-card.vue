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
          <h5>18 Chapters</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "course-archieved-card",
}
</script>

<style lang="scss" scoped>
@import '../../assets/sass/imports/profile-course-cards';
</style>