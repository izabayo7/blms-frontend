<!-- views/NotFound.vue -->

<template>
  <div class="error-page d-flex justify-center align-center">
    <ErrorPage
    title="The page you are looking for was not found"/>
  </div>
</template>
<script>
export default {
  components: {
    ErrorPage: () => import("@/components/dashboard/error.vue"),
  },
}
</script>
<style>
.error-page{
  height: 100vh;
}
</style>