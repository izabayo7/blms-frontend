<template>
  <div class="profile">
    <p class="name d-none d-md-flex">
      <span
        >{{ $store.state.user.user.surName }}
        {{ $store.state.user.user.otherNames }}</span
      >
      <v-icon>mdi-chevron-down</v-icon>
    </p>
    <img
      @click="logout"
      v-if="$store.state.user.user.profile"
      :src="$store.state.user.user.profile"
      alt="profile picture"
    />
    <v-avatar @click="logout" v-else size="50" class="avatar">
      {{
        `${$store.state.user.user.surName} ${$store.state.user.user.otherNames}`
          | computeText
      }}
    </v-avatar>
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$session.destroy();
      this.$store.dispatch("user/unsetUser");
      this.$router.push("/login");
    },
  },
};
</script>
<style lang="scss" scoped>
.profile {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  img {
    width: 50px;
    cursor: pointer;
  }
  .avatar {
    margin-top: 0px;
    background-color: $primary;
    color: white;
    cursor: pointer;
  }
  p {
    height: fit-content;
    width: fit-content;
    margin: 0;
    padding-right: 1.5rem;
    cursor: pointer;

    &:hover {
      color: darken($font, 10);
    }
    span {
      padding-right: 0.7rem;
    }
  }
}
</style>
