<template>
  <span ref="editable" @input="input" role="textbox" contenteditable type="text">
  </span>
</template>

<script>
export default {
  name: "ExpandableInput",
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  method:{
    input(e){
      this.$emit('input',e.target.value)
    }
  },
  mounted(){
    this.$refs.editable.innerText = this.value;
  }
}
</script>

<style scoped>

</style>