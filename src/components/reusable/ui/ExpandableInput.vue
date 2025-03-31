<template>
  <span ref="editable" @input="input" role="textbox" contenteditable type="text">
  </span>
</template>

<script>
export default {
  name: "ExpandableInput",
  props: ['value'],
  methods:{
    input(e){
      this.$emit('input',e.target.innerText)
    }
  },
  mounted(){
    this.$refs.editable.innerText = this.value;
  }
}
</script>

<style lang="scss" scoped>
  span {
    width: 100%;
    color:$font;
    font-size: .8rem;
    outline:none;
    border:.5px solid $secondary;
    border-radius: 3px;
    padding:.5rem;
  }
</style>