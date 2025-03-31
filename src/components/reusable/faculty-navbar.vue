<template>
<div class="subpage-navbar">
  <div class="subpage-navbar--wrapper d-flex justify-center">
    <ul class="subpage-navbar--links d-flex">
      <li class="subpage-navbar--link" :class="{active:activeLink === 'details'}">
        <router-link :to="`/faculties/${facultyId}/details`"> Faculty Overview </router-link>
        </li>
      <li class="subpage-navbar--link" :class="{active:activeLink === 'students'}">
        <router-link :to="`/faculties/${facultyId}/students`"> Users </router-link>
        </li>
      <li class="subpage-navbar--link" :class="{active:activeLink === 'courses'}">
        <router-link :to="`/faculties/${facultyId}/courses`"> Courses </router-link>
        </li>
      <li class="subpage-navbar--link" :class="{active:activeLink === 'groups'}">
        <router-link :to="`/faculties/${facultyId}/groups`"> Student Groups </router-link>
        </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: "faculty-navbar",
  data(){
    return {
      facultyId:this.$route.params.facultyId
    }
  },
  computed:{
    activeLink(){
      return this.$route.path.split("/")[3]
    }
  },
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