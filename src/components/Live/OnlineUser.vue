<template>
<div class="online-user">
  <div v-if="user.raisedHand" class="raised-hand">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_3659_1167)">
        <path d="M18.7742 15.3012L18.8725 11.2276C18.888 10.5838 18.3786 10.0565 17.7347 10.0498C17.0908 10.043 16.5562 10.5594 16.5407 11.2032L16.4613 14.4944L16.1183 14.4908L16.3367 5.43879C16.3522 4.79502 15.8428 4.26771 15.1989 4.26097C14.555 4.25424 14.0204 4.77065 14.0049 5.41442L13.8609 11.381L13.518 11.3774L13.6894 4.27456C13.7049 3.63079 13.1955 3.10347 12.5516 3.09674C11.9077 3.09001 11.3731 3.60641 11.3576 4.25018L11.1862 11.353L10.8433 11.3494L10.9872 5.38285C11.0028 4.73908 10.4934 4.21176 9.84944 4.20503C9.20551 4.1983 8.67091 4.71473 8.65541 5.35847L8.51143 11.325L8.16852 11.3214L8.28246 6.59887C8.29799 5.9551 7.7886 5.42778 7.14467 5.42105C6.50074 5.41432 5.96617 5.93072 5.95064 6.5745L5.74339 15.165C5.68364 17.6414 7.65022 19.6772 10.1272 19.7031L14.1737 19.7454C16.6507 19.7713 18.7144 17.7776 18.7742 15.3012Z" fill="#FFAE34"/>
      </g>
      <defs>
        <clipPath id="clip0_3659_1167">
          <rect width="16.8298" height="17.0614" fill="white" transform="translate(12.2695) rotate(45.9905)"/>
        </clipPath>
      </defs>
    </svg>

  </div>
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
  <div v-if="user.raisedHand" class="actions ml-auto">
    <button class="accept" @click="$emit('accept_presenter',user._id)"><svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12.5" cy="12.5" r="12.5" fill="#193074"/>
      <path d="M17 10L10.8125 16L8 13.2727" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    </button>
    <button class="deny ml-3" @click="$emit('deny_presenter',user._id)"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="13" cy="13" r="13" fill="#E9E9E9"/>
      <path d="M16.875 10.0062L15.9938 9.125L12.5 12.6188L9.00625 9.125L8.125 10.0062L11.6188 13.5L8.125 16.9938L9.00625 17.875L12.5 14.3812L15.9938 17.875L16.875 16.9938L13.3812 13.5L16.875 10.0062Z" fill="#C9C9C9"/>
    </svg>
    </button>
  </div>
  <div class="ml-auto d-flex justify-center align-center mr-1" v-else>
    <button class="authorize-presenter" @click="$emit('accept_presenter',user._id)">Authorize presentation</button>
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
.authorize-presenter{
  display: none;
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 10px;
  text-align: center;

  color: #000000;
}
  &:hover{
    background-color: transparentize($grayish,.9);
    .authorize-presenter{
      display: initial;
    }
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