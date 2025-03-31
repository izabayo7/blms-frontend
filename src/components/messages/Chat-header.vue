<template>
<main class="my-chat-header">
  <div class="pic"> <slot name="pic"></slot></div>
  <div class="user-info">
    <p class="name"><slot name="name"> </slot></p>
    <p class="online">{{userOnline}}</p>
  </div>
</main>
</template>

<script>
export default {
  name: "Chat-header",
  props:{
    online:{type:Boolean,default:false}
  },
  computed:{
    userOnline(){
     return this.online ? 'Online' : 'Away'
    }
  }
}
</script>

<style lang="scss" scoped>
.my-chat-header{
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  padding: .7rem 1.5rem;
  border-bottom:2px solid lighten($font,40);

  .pic{
    img{
      width: 50px;
      border-radius: 50%;
    }
  }
  .user-info{
    display: flex;
    flex-direction: column;
    padding-left: .8rem;
    align-content: space-between;
    justify-content: space-between;

    .name{
      padding: 0;
      margin: 0;
      font-weight: 500;
    }
    .online{
      padding: 0;
      margin: 0;
      font-size: .8rem;
      color:lighten($font,40)
    }

  }
}
</style>