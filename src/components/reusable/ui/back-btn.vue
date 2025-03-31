<template>
<div class="my-back-btn">
  <button @click="push">
    <div class="icon"><svg data-v-2bccb33e="" xmlns="http://www.w3.org/2000/svg" width="10.094" height="17.189" viewBox="0 0 10.094 17.189"><path data-v-2bccb33e="" id="Icon_feather-chevron-left" data-name="Icon feather-chevron-left" d="M19.973,21.946,13.5,15.473,19.973,9" transform="translate(-12 -6.879)" fill="none" stroke="#717171" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path></svg></div>
    <div class="text">back</div>
  </button>
</div>
</template>

<script>
export default {
  name: "back-btn",
  props:{
    to:{default:null}
  },
  methods:{
    push(){
      if(this.to) this.$router.push(this.to) // go to this router if exists
      else this.$router.go(-1) // unless go back
    }
  }
}
</script>

<style lang="scss" scoped>
.my-back-btn{
  button{
    display: flex;
    justify-content: center;
    padding:.2rem 1rem;
    box-shadow: 0 0 10px lighten($font,63);
    border-radius: 20px;

    div{
      height: fit-content;
      align-self: center;
      position: relative;
      display: flex;
    }
    .text{
      padding-left: 1rem;
    }
    svg{
      align-self: center;
      transform: scale(.7);
    }
  }
}
</style>