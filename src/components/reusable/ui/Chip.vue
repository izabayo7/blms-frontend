<template>
<span class="my-chip">
  <span class="content"><slot></slot></span>
  <button @click.prevent="clicked" class="close">
    <svg xmlns="http://www.w3.org/2000/svg" width="11.557" height="11.554" viewBox="0 0 11.557 11.554">
      <path id="Icon_ionic-ios-close" data-name="Icon ionic-ios-close" d="M18.433,17.066l4.128-4.128a.967.967,0,0,0-1.368-1.368L17.065,15.7,12.938,11.57a.967.967,0,1,0-1.368,1.368L15.7,17.066,11.57,21.194a.967.967,0,0,0,1.368,1.368l4.128-4.128,4.128,4.128a.967.967,0,1,0,1.368-1.368Z" transform="translate(-11.285 -11.289)"/>
    </svg>
  </button>
</span>
</template>

<script>
export default {
  name: "Chip",
  methods:{
    clicked(){
      this.$emit('closed')
    }
  }
}
</script>

<style lang="scss" scoped>
.my-chip{
  color:$font;
  font-size: .8rem;
  background-color: lighten($secondary,5) ;
  padding:.25rem .6rem ;
  margin:.3rem;
  display: inline-flex;
  border-radius: 20px;
  transition:all .5s;
  button{
    cursor: pointer;
    svg{
      fill:$font;
      margin-left: .5rem;
      transform: scale(.9);
    }
  }
}
</style>
