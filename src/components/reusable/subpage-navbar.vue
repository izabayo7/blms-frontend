<template>
<div class="subpage-navbar">
  <div class="subpage-navbar--wrapper d-flex justify-center">
    <ul class="subpage-navbar--links d-flex">
      <li class="subpage-navbar--link active">
        <router-link to=""> Faculty Overview </router-link>
        </li>
      <li class="subpage-navbar--link">
        <router-link to=""> Users </router-link>
        </li>
      <li class="subpage-navbar--link">
        <router-link to=""> Student Groups </router-link>
        </li>
      <li class="subpage-navbar--link">
        <router-link to=""> Adminstration </router-link>
        </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: "subpage-navbar"
}
</script>

<style lang="scss" scoped>
.subpage-navbar{
  &--wrapper{

  }
  &--links{
    list-style-type: none;
  }

  &--link{
    padding: .5rem 0;
    margin:0 1.7rem;
    cursor: pointer;

    &:hover{
      border-bottom:2px solid lighten($primary,50);
    }

    a{
      text-transform: uppercase !important;
      text-decoration: none;
      color:$font;
      font-weight: 500;
    }

    &.active{
      border-bottom:2px solid $primary;

      a{
        color:$primary;
      }
    }
  }
}
</style>