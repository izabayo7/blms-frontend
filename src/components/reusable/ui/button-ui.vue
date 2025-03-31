<template>
<div class="my-button">
  <div @click="clicked" class="button-container px-10 py-3" :class="classList">
    <button :type="type">
      <slot name="content"></slot>
    </button>
  </div>
</div>
</template>

<script>
export default {
  name: "button-ui",
  props:{
    type:{default:"button"},
    classList:{default:""},
  },
  methods:{
    clicked(e){
      this.$emit('click',e)
    }
  }
}
</script>

<style lang="scss" scoped>
.my-button{
  .button-container{
    border-radius:4.5px;
    cursor:pointer;
    background-color:$primary;
    transition:.3s ease;


    &:hover{
      background-color:lighten($primary,10)
    }

    &:active{
      border:3px solid lighten($primary,40)
    }
    &:focus{
      border:3px solid lighten($primary,40)
    }

    button{
      color:$main;
      display:flex;
      align-items:center;

      span{
        margin:0 .3rem;
        display:flex;
        justify-content:center;
        align-items:center;
      }

    }
  }
}
</style>