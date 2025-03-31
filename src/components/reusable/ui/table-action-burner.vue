<template>
<div class="my-table-action-burner">
  <div class="table-action-burner-container flex">
    <div class="icon">
      <div class="icon-wrapper">
        <slot name="icon"></slot>
      </div>
    </div>
    <div class="text">
      <h6><slot name="text"></slot></h6>
    </div>
  </div>
</div>
</template>

<script>
export default {
name: "table-action-burner"
}
</script>

<style lang="scss" scoped>
  .my-table-action-burner{
    .table-action-burner-container{

    }
  }
</style>