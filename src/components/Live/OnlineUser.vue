<template>
<div class="online-user">
  <div class="online-user--pic">
    <figure class="online-user--pic--wrapper" >
      <img :src="user.profile+'?width=100'" :class="status" :alt="`${user.sur_name} ${user.other_names} profile picture`">
    </figure>
  </div>
  <div class="online-user--details">
    <p class="online-user--details--name">{{`${user.sur_name} ${user.other_names}`}}</p>
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
    }
  }
}
</script>

<style lang="scss" scoped>
.online-user{
  display: flex;
  padding:.1rem;
  margin-bottom: 9.36px;

  &:hover{
    background-color: transparentize($grayish,.9);
  }

  &--pic{
    display: grid;
    place-items: center;

    figure{
      display: grid;
      place-items: center;
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