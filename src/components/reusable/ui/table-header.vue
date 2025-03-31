<template>


<div class="my-table-header">
  <div class="table-header-container d-flex justify-end pt-2">
    <div class="actions d-flex">
      <slot name="actions"></slot>
    </div>
  </div>
</div>
</template>

<script>

export default {
name: "table-header",
  components: {},
  methods:{
    click(action){
      this.$emit(action)
    }
  }
}
</script>

<style lang="scss" scoped>
  .my-table-header{
    width: 100%;
    .table-header-container{
      background-color: $main ;

      .actions{
        padding-right:10rem;
      }
    }
  }
</style>