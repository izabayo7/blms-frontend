<template>
<div class="my-switch">
  <div class="switch-holder" :class="{'active':active}" @click="changeStatus">
    <div class="circle" :class="{'right':active,'left':!active}"></div>
  </div>
</div>
</template>

<script>
export default {
  name: "switcher",
  data(){
    return{
      active:false
    }
  },
  methods:{
    changeStatus(){
      this.active = !this.active
      this.$emit('input',this.active)
    }
  }
}
</script>

<style lang="scss" scoped>
.my-switch{
  height: fit-content;
  width: fit-content;
  position: relative;

  .switch-holder{
    background-color: $secondary;
    cursor: pointer;
    width: 45px;
    height: 20px;
    border-radius: 15px;
    position:relative;
    transition:.3s;

    &.active{
      background-color: lighten($primary,15);

      .circle{
        box-shadow: 0px 0px 4px #6daefc00;
        background-color: $primary;

      }
    }

    .circle{
      height: 17px;
      width:17px;
      top: 50%;
      transform: translateY(-50%);
      background-color: darken($secondary,10);
      border-radius: 15px;
      transition:.3s;
      position: absolute;
      padding:0;
      margin: .5px 0;

    }
    .right{
      left: calc(100% - 19px);
    }
    .left{
      left: 2px;
    }

  }
}
//@keyframes move {
//  0%{
//    width: 25px;
//  }
//  100%{
//    width: 17px;
//  }
//}
</style>
