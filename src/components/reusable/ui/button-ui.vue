<template>
<div class="my-button">
  <div @click="clicked" class="button-container bg-color-one px-10 py-3" :class="classList">
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


    button{
      color:$main;
    }
  }
}
</style>