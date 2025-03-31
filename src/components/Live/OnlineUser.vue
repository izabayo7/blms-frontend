<template>
<div class="online-user">
  <div class="online-user--pic">
    <figure class="online-user--pic--wrapper" >
      <img :src="user.img" :class="status" :alt="`${user.name} profile picture`">
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
  },
  computed:{
    status(){
      const a = this.user.attendance
      return (a >= 80 )? "cool" : (a >= 55) ? "warn" : "danger"
    }
  }
}
</script>

<style lang="scss" scoped>
.online-user{
  display: flex;

  &--pic{
    figure{
      img{
        width:2.1rem;
        height: 2.1rem;
        border-radius: 50%;

        &.cool{
          border:2px solid $success;
        }
        &.warn{
          border:2px solid $warn;
        }
        &.danger{
          border:2px solid $danger;
        }
      }
    }
  }
}
</style>