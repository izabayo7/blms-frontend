<template>
  <span ref="editable" @input="input" role="textbox" contenteditable type="text">
  </span>
</template>

<script>
export default {
  name: "ExpandableInput",
  props: {
    value:{type:String},
    maxHeight: {type:Number,default:100}
  },
  methods:{
    input(e){
      this.$emit('input',e.target.innerText)
    }
  },
  mounted(){
    this.$refs.editable.innerText = this.value;
    this.$refs.editable.style.maxHeight = this.maxHeight + "px"
  }
}
</script>

<style lang="scss" scoped>
  span {
    overflow-y: auto;
    width: 100%;
    color:$font;
    font-size: .8rem;
    outline:none;
    border:.5px solid $secondary;
    border-radius: 3px;
    padding:.5rem;

    @include scroll-bar;
  }
</style>