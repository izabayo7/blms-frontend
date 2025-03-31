<template>
<div class="my-switch">




  <div class="switch-holder" :class="{'active':active}" @click="active=!active">
    <div class="circle" :class="{'right':active,'left':!active}"></div>
  </div>
</div>
</template>

<script>
export default {
  name: "switch",
  data(){
    return{
      active:true
    }
  }
}
</script>

<style lang="scss" scoped>
.my-switch{
  height: fit-content;
  width: fit-content;
  .switch-holder{
    background-color: $secondary;
    cursor: pointer;
    width: 450px;
    height: 200px;
    border-radius: 150px;
    position:relative;
    transition:.3s ease-out;

    &.active{
      background-color: lighten($primary,15);

      .circle{
        box-shadow: 0px 0px 40px #6daefc00;
        background-color: $primary;

      }
    }

    .circle{
      height: 170px;
      width:170px;
      top: 50%;
      transform: translateY(-50%);
      background-color: darken($secondary,10);
      border-radius: 150px;
      transition:.3s ease-out;
      position: absolute;
      padding:0;

    }
    .right{
      left: calc(100% - 190px);
    }
    .left{
      left: 20px;
    }

  }
}

</style>
