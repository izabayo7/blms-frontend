<template>
<div class="my-group-header">
  <div class="group-header-container">
    <div class="icon"><slot name="pic"></slot></div>
    <div class="title">
      <p class="text-title">Group settings</p>
      <p class="members"> <slot name="num-members"></slot> </p>
    </div>
  </div>
</div>
</template>

<script>
export default {
name: "Group-header"
}
</script>

<style lang="scss" scoped>
.my-group-header{
  border-bottom: 2px solid lighten($font,50);
  .group-header-container{
    padding: .3rem;
    display: flex;
    .title{
      padding-left: 1rem;
      display: flex;
      flex-direction: column;

      p{
        height: fit-content;
        width: fit-content;
        margin: 0;
      }
      .text-title{
        font-size: 1.1rem;
        font-weight: 600;
      }

      .members{
        font-size: .8rem;
        font-weight: 300;
      }
    }
  }
}
</style>