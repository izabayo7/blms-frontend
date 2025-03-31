<template>
<div class="my-checkbox">
  <div class="checkbox-container" @click="toggle">
    <transition name="fade" >
      <svg v-if="checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm7.003 13l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z"/></svg>
      <svg v-if="!checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h14V5H5z"/></svg>
    </transition>
  </div>
</div>
</template>

<script>
export default {
  name: "Checkbox",
  data(){
    return {
      checked:false
    }
  },
  methods:{
    toggle(){
      this.checked = !this.checked
      this.$emit('input',this.checked)
    }
  }
}
</script>

<style lang="scss" scoped>
.my-checkbox{
  height: fit-content;
  width: fit-content;
  display: inline-flex;
  align-self: center;
  justify-self: center;
  .checkbox-container{
    cursor: pointer;
    width: 25px;
    height: 25px;

    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
      background-color: red;
    }

    svg{
      fill:$font;
    }
  }
}

</style>