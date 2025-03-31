<template>
<div class="subpage-navbar">
  <div class="subpage-navbar--wrapper">
    <ul class="subpage-navbar--links">
      <li class="subpage-navbar-link">Faculty Overview</li>
      <li class="subpage-navbar-link">Users</li>
      <li class="subpage-navbar-link">Student Groups</li>
      <li class="subpage-navbar-link">Adminstration</li>
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

  }
  &--link{
    text-transform: uppercase;
  }
}
</style>