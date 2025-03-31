<template>
<div class="online-user">
  <div class="online-user--pic">
    <v-avatar size="30">
      <img
          v-if="user.profile"
          :src="`${user.profile}?width=100`"
          alt="profile picture"
      />
      <div v-else class="text">{{ user_full_names | computeText }}</div>
    </v-avatar>
  </div>
  <div class="online-user--details">
    <p class="online-user--details--name">{{user_full_names}}</p>
    <p class="online-user--details--attendance"> Attendance {{user.attendance}}%</p>
  </div>


</div>
</template>

<script>
export default {
  name: "OnlineUser",
  props:{
    user:{required:true}
  },
  computed:{
    status(){
      const a = this.user.attendance
      return (a >= 80 )? "cool" : (a >= 55) ? "warn" : "danger"
    },
    user_full_names() {
      return `${this.user.sur_name} ${this.user.other_names}`
    }
  }
}
</script>

<style lang="scss" scoped>
.online-user{
  display: flex;
  //padding:.1rem;
  padding: 0.3rem 0.1rem 0.1rem;
  margin-bottom: 9.36px;

  &:hover{
    background-color: transparentize($grayish,.9);
  }

  &--pic{
    display: grid;
    place-items: center;
    .v-avatar {
      background-color: $primary;
    }
    .text {
      color: $main;
    }
  }

  &--details{
    padding-left: .5rem;
    p{
      margin:.1rem 0;
    }
      &--name{
        font-family: Montserrat;
        font-style: normal;
        font-weight: 500;
        font-size: 11.3943px;
        line-height: 14px;
        /* identical to box height */


        color: #3C3C3C;
      }

      &--attendance{
        font-family: Montserrat;
        font-style: normal;
        font-weight: normal;
        font-size: 7.92644px;
        line-height: 10px;
        /* identical to box height */


        color: #848484;
      }
  }
}
</style>