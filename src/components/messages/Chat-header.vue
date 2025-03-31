<template>
<main class="my-chat-header">
  <div class="pic"> <slot name="pic"></slot></div>
  <div class="user-info">
    <p class="name"><slot name="name"> </slot></p>
    <p class="online">{{userOnline}}</p>
  </div>
  <div class="action-icons">
    <div class="icon add-member">
      <svg id="user-add-line" xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33">
        <path id="Path_2152" data-name="Path 2152" d="M0,0H33V33H0Z" fill="none"/>
        <path id="Path_2153" data-name="Path 2153" d="M17.75,19.222V22.1a8.25,8.25,0,0,0-11,7.78H4A11,11,0,0,1,17.75,19.22ZM15,17.5a8.25,8.25,0,1,1,8.25-8.25A8.248,8.248,0,0,1,15,17.5Zm0-2.75a5.5,5.5,0,1,0-5.5-5.5A5.5,5.5,0,0,0,15,14.75ZM23.25,23V18.875H26V23h4.125v2.75H26v4.125H23.25V25.75H19.125V23Z" transform="translate(1.5 0.375)"/>
      </svg>

    </div>
    <div class="icon video-chat">
      <svg id="video-chat-line-2" xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33">
        <path id="Path_2154" data-name="Path 2154" d="M0,0H33V33H0Z" fill="none"/>
        <path id="Path_2155" data-name="Path 2155" d="M19.4,13.6l4.35-3.288v8.769L19.4,15.788v3.288H9.25V10.308H19.4ZM7.456,23.462H28.1V5.923H4.9V25.486Zm1,2.923L2,31.5V4.462A1.456,1.456,0,0,1,3.45,3h26.1A1.456,1.456,0,0,1,31,4.462V24.923a1.456,1.456,0,0,1-1.45,1.462Z"/>
      </svg>

    </div>
    <div class="icon settings">
      <svg id="Icon_feather-settings" data-name="Icon feather-settings" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
        <path id="Path_1919" data-name="Path 1919" d="M22.5,18A4.5,4.5,0,1,1,18,13.5,4.5,4.5,0,0,1,22.5,18Z" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
        <path id="Path_1920" data-name="Path 1920" d="M29.1,22.5a2.475,2.475,0,0,0,.495,2.73l.09.09a3,3,0,1,1-4.245,4.245l-.09-.09a2.5,2.5,0,0,0-4.23,1.77V31.5a3,3,0,1,1-6,0v-.135A2.475,2.475,0,0,0,13.5,29.1a2.475,2.475,0,0,0-2.73.495l-.09.09A3,3,0,1,1,6.435,25.44l.09-.09a2.5,2.5,0,0,0-1.77-4.23H4.5a3,3,0,1,1,0-6h.135A2.475,2.475,0,0,0,6.9,13.5a2.475,2.475,0,0,0-.5-2.73l-.09-.09A3,3,0,1,1,10.56,6.435l.09.09a2.475,2.475,0,0,0,2.73.495h.12A2.475,2.475,0,0,0,15,4.755V4.5a3,3,0,0,1,6,0v.135a2.5,2.5,0,0,0,4.23,1.77l.09-.09a3,3,0,1,1,4.245,4.245l-.09.09a2.475,2.475,0,0,0-.5,2.73v.12A2.475,2.475,0,0,0,31.245,15H31.5a3,3,0,0,1,0,6h-.135A2.475,2.475,0,0,0,29.1,22.5Z" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
      </svg>
    </div>
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
  display: grid;
  grid-template-columns: 9% 75% 16%;
  padding: .7rem 1.5rem;
  border-bottom:2px solid lighten($font,40);

  .pic{
    .avatar{
      width: 50px;
      background-color: $primary;
      color:$main;
    }
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
  .action-icons{
    display: flex;
    padding-right: .5rem;

    .icon{
      padding: 0 .3rem;
      border-radius: 50%;
      display: flex;
      align-content: center;
      justify-content: center;
      cursor:pointer;

      &:hover{
      background-color: lighten($secondary,5);

        svg{
          fill:$font;
        }
      }
      svg{
        display: inline-flex;
        align-self: center;
        justify-self: center;
        transform: scale(.8);
      }
    }
  }
}
</style>
