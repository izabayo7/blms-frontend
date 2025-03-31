<template>
<!--enrol course card-->
  <div class="ecc">
    <div class="ecc--wrapper">
      <div class="ecc--col ecc--col1 ecc--title">
        <div class="ecc--title--name">
          <h3>Bookkeeping basics</h3>
        </div>
        <div class="ecc--title--start-date">
          <p>Started on 27 jan 2021</p>
        </div>
      </div>
      <div class="ecc--col ecc--col2 ecc--completion">
        <div class="ecc--completion--text">
          <p>45 % Completion</p>
        </div>
        <div class="ecc--completion--progress-bar">
          <div class="ecc--completion--progress-bar--bar">
            <div class="ecc--completion--progress-bar--bar--value"></div>
          </div>
        </div>
      </div>
      <div class="ecc--col ecc--col3 ecc--last-access"></div>
    </div>
  </div>
</template>

<script>
export default {
name: "enrol-course-card"
}
</script>

<style scoped>

</style>