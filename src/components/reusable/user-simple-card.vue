<template>
<article class="user-card">
  <article class="user-card--wrapper">
    <div class="user-card--row user-card--info user-card--row__1 d-flex">
      <div class="user-card--info--col user-card--info--names-and-type user-card--info--col__1 col-8">
        <h2> <slot name="name"></slot> </h2>
        <h6> <slot name="type"></slot> </h6>
      </div>
      <div class="user-card--info--col user-card--info--pic user-card--info--col__2 col-4">
        <div class="image--wrapper">
          <slot name="image"></slot>
        </div>
      </div>
    </div>
    <div class="user-card--row user-card--actions user-card--row__2 d-flex">
      <div class="user-card--actions--col user-card--actions--col__1 ">
        <router-link to="">
          <button-ui :class-list="'px-2 py-2'"  class="user-card--actions--button__visit-profile user-card--actions--button">
            <template #content>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M20 22H4v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2zm-8-9a6 6 0 1 1 0-12 6 6 0 0 1 0 12z" fill="rgba(255,255,255,1)"/></svg>
              </span>
              <span>Visit profile</span>
            </template>
          </button-ui>
        </router-link>
      </div>
      <div class="user-card--actions--col user-card--actions--col__2">
        <router-link to="">
          <button-ui :class-list="'px-2 py-2'" class="user-card--actions--button__message user-card--actions--button">
            <template #content>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M7.291 20.824L2 22l1.176-5.291A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.956 9.956 0 0 1-4.709-1.176zm.29-2.113l.653.35A7.955 7.955 0 0 0 12 20a8 8 0 1 0-8-8c0 1.334.325 2.618.94 3.766l.349.653-.655 2.947 2.947-.655z" fill="rgba(255,255,255,1)"/></svg>
              </span>
              <span>Message</span>
            </template>
          </button-ui>
        </router-link>
      </div>
    </div>
  </article>
</article>
</template>

<script>
import ButtonUi from "./ui/button-ui";
export default {
  name: "user-simple-card",
  components: {ButtonUi}
}
</script>

<style lang="scss" scoped>
.user-card{
  width:20rem;
  border-radius:.55rem;
  box-shadow:0 0 10px  lighten($primary,65);

  &--wrapper{
    background-color:$main;
    padding:1rem;
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
      }

    }
  }

  &--actions{
    display:flex;
    justify-content: space-between;

    &--col{
      &__1{
        a{
          display:block;
          width:10rem;
        }
      }
      &__2{

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