export default{
  methods:{
    focused(){
      const label = this.$refs['input-label']
      label.classList.add('focused')
    },
    unfocused(){
      if(this.value.length > 0)
        return

      const label = this.$refs['input-label']
      label.classList.remove('focused')
    }
  }
}
