<template>





<div class="my-table-action-burner">
  <div class="table-action-burner-container py-1 px-2 d-flex align-center">
    <div class="icon">
      <div class="icon-wrapper">
        <slot name="icon"></slot>
      </div>
    </div>
    <div class="text pl-2">
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
      background-color: $bg-one;
      border-radius: 4.2px;
      cursor: pointer;
      &:hover{
        background-color: darken($bg-one,5);
      }
      .icon{
        .icon-wrapper{
          svg{
            transform:scale(1.1);
          }
        }
      }
      .text{
        h6{
          font-size:.8rem;
          color:$primary;
        }
      }
    }
  }
</style>