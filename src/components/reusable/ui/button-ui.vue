<template>
<div class="my-button" :class="{rounded:rounded, fill:fill}">
  <div @click="clicked" class="button-container " :class="classList">
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
    classList:{default:"px-10 py-3"},
    size:{type:Number,default:3},
    rounded:{default:false,type:Boolean},
    fill:{default:false,type:Boolean}
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

  &.rounded{
    .button-container{
      border-radius: 10rem;
    }
  }

  &.fill{
    .button-container{
      background-color:$primary;
      border:none;

      button{
        color:$main;
      }
    }
  }

  .button-container{
    border:2px solid $primary;
    border-radius:4.5px;
    cursor:pointer;
    transition:.3s ease;
    display:flex;
    justify-content: center;
    align-items: center;



    button{
      display:flex;
      align-items:center;
      font-weight:400 ;
      font-size: .9rem;
      color:$primary;
      *{
        font-weight:400 ;
      }

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