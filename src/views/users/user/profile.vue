<template>
<main class="profile">
  <main class="profile--wrapper">
    <div class="profile--user-profile-card">
      <user-profile-card />
    </div>
  </main>
</main>
</template>

<script>
import UserProfileCard from "../../../components/profile/user-profile-card";
export default {
name: "profile",
  components: {UserProfileCard}
}
</script>

<style scoped>

</style>