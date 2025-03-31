<template>
<article class="user-card">

  <article class="user-card--wrapper" >
    <div class="loader" v-if="loading">
      <p>Loading</p>
    </div>
    <div v-else>
      <div class="user-card--row user-card--info user-card--row__1 d-flex">
        <div class="user-card--info--col user-card--info--names-and-type user-card--info--col__1 col-8">
          <h2> <slot name="name"></slot></h2>
          <h6> <slot name="type"></slot> </h6>
        </div>
        <div class="user-card--info--col user-card--info--pic user-card--info--col__2 col-4">
          <div class="image--wrapper">
            <slot name="image"></slot>
          </div>
        </div>
      </div>
      <div class="user-card--row user-card--actions user-card--row__2 d-flex">
        <div class="user-card--actions--col user-card--actions--col__2">
          <router-link to="">
            <button-ui rounded fill :class-list="'px-4 py-2'" class="user-card--actions--button__message user-card--actions--button">
              <template #content>
                <span>Message</span>
              </template>
            </button-ui>
          </router-link>
        </div>

        <div class="user-card--actions--col user-card--actions--col__1 ">
          <router-link to="">
            <button-ui rounded :class-list="'px-2 py-2'"  class="user-card--actions--button__visit-profile user-card--actions--button">
              <template #content>
                <span>Visit profile</span>
              </template>
            </button-ui>
          </router-link>
        </div>

      </div>
    </div>
  </article>

</article>
</template>

<script>
import ButtonUi from "./ui/button-ui";
export default {
  name: "user-simple-card",
  props:{
    loading:{type:Boolean,default:false}
  },
  components: {ButtonUi}
}
</script>

<style lang="scss" scoped>
.user-card{
  width:18rem;
  border-radius:.55rem;
  box-shadow:0 0 10px  lighten($primary,65);

  &--wrapper{
    background-color:$main;
    padding:.5rem;
    border-radius:.55rem;
  }

  &--row{

  }

  &--info{
    &--names-and-type{
      h2{
        font-size:1rem;
        color:$primary;
      }
      h6{
        font-size:.7rem;
        color: $grayish;
        font-weight:500;
      }
    }

    &--col{

      .image--wrapper{
        display:flex;
        justify-content: center;
        align-content: center;

        img{
          width:4rem;
          height:4rem;
          border-radius:50%;
          border:3.5px solid $primary;
        }
        .profile-avatar{
          width:4rem;
          height:4rem;
        }
      }

    }
  }

  &--actions{
    display:flex;
    justify-content: space-between;
    padding-top:1rem;

    &--col{
      &__1{
        a{
          display:block;
          width:8rem;
        }
      }
      &__2{
          width:8rem;

      }
    }

    &--button{
      &__visit-profile{

      }

      &__message{

      }
    }

  }
}
</style>