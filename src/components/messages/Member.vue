<template>
  <div class="my-member" :class="{disabled:disabled}" >
    <img src="" alt="" v-if="user.pic" >
    <v-avatar size="25" class="avatar" v-else> {{ user.sur_name | computeText }}</v-avatar>
    <div class="name">{{ user.other_names + ' ' + user.sur_name}}</div>
    <div class="type">{{ user.category.toLowerCase() }}</div>
  </div>
</template>

<script>
export default {
  name: "Member",
  props:{
    disabled:{required:true},
    user:{required:true}
  }
}
</script>

<style lang="scss" scoped>
.my-member{
  width: 100%;
  transition:.3s ease-in;
  display: flex;
  padding:.4rem .7rem;
  cursor: pointer;
  font-size: .9rem;

  &:hover{
    background-color: $blue-gray;
  }

  .name {
    margin: 0 .4rem
  }

  .type{
    align-self: center;
    background-color: lighten($success,20);
    color:$font;
    margin-left: 2rem;
    font-size: .65rem;
    border-radius: 20px;
    height: fit-content;
    padding: .05rem .8rem;
  }

  .avatar{
    align-self: center;
    margin:0 .4rem;
    background-color: $primary;
    color:$main;
  }
}
</style>