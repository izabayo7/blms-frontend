<template>
<div class="my-button" :class="{fill:fill}">
  <div @click="clicked" class="button-container " :class="classList +' ' + category " >
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
    fill:{default:false,type:Boolean},
    category:{default:""}
  },
  methods:{
    clicked(e){
      this.$emit('click',e)
    },
  }
}
</script>

<style lang="scss" scoped>
.my-button{

    @mixin button-container{
      border-radius:4.5px;
      cursor:pointer;
      transition:.3s ease;
      display:flex;
      justify-content: center;
      align-items: center;
    }

  .button-container{
    border:2px solid $primary;
    @include button-container;

    &.warn{
      border-color: $warn;
    }

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

  &.fill{
    .button-container{
      background-color:$primary;
      border:none;
      @include button-container;

      button{
        color:$main;

      }
    }

    .warn{
      background-color:$warn;
    }

  }
}
</style>