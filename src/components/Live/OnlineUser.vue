<template>
<div class="online-user">
  <div class="online-users--pic">
    <figure class="online-user--pic--wrapper">
      <img :src="user.img" :alt="`${user.name} profile picture`">
    </figure>
  </div>
  <div class="online-user--details">
    <div class="online-user--details--name">{{user.name}}</div>
    <div class="online-user--details--attendance">{{user.attendance}}</div>
  </div>
</div>
</template>

<script>
export default {
  name: "OnlineUser",
  data(){
    return {
      user:{
        img:'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
        name:'Ntwari liberi',
        attendance:89,
      }
    }
  }
}
</script>

<style scoped>

</style>