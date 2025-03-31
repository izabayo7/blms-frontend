<template>
<div class="online-user">
  <div class="online-users--pic">
    <figure class="online-user--pic--wrapper">
      <img src="https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png" alt="">
    </figure>
  </div>
  <div class="online-user--details">
    <div class="online-user--details--name"></div>
    <div class="online-user--details--attendency"></div>
  </div>
</div>
</template>

<script>
export default {
  name: "OnlineUser",
  data(){
    return {
      user:{}
    }
  }
}
</script>

<style scoped>

</style>