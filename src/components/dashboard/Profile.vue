<template>
  <div class="profile" ref="profile">
    <div
        class="profile-container"
        @click="profile_card_active = !profile_card_active"
    >
      <img
          v-if="$store.state.user.user.profile"
          :src="$store.state.user.user.profile + '?height=100'"
          alt="profile picture"
      />
      <v-avatar v-else size="50" class="avatar">
        {{
          `${$store.state.user.user.sur_name} ${$store.state.user.user.other_names}`
              | computeText
        }}
      </v-avatar>
      <v-icon color="black"
      >mdi-chevron-{{ profile_card_active ? "up" : "down" }}
      </v-icon
      >
      <div class="profile-card">
        <div class="profile-card-wrapper" v-if="profile_card_active">
          <profile-card/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProfileCard from "./ProfileCard";

export default {
  name: "Profile",
  components: {ProfileCard},
  data() {
    return {
      profile_card_active: false,
    };
  },
  methods: {
    outsideClickDetector() {
      let self = this;
      document.addEventListener("click", function (e) {
        if (
            !self.$refs["profile"] ||
            !self.$refs["profile"].contains(e.target)
        ) {
          self.profile_card_active = false;
        }
      });
    },
  },
  mounted() {
    this.outsideClickDetector();
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

  .profile-container {
    position: relative;
    display: flex;
    align-items: center;

    .profile-card {
      position: absolute;
      right: -1.5rem;
      top: 4rem;
    }

    img {
      width: 50px;
      border-radius: 50%;
      cursor: pointer;
    }

    .avatar {
      margin-top: 0px;
      background-color: $primary;
      color: white;
      cursor: pointer;
    }

    .v-icon {
      padding-left: 1rem;
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
}

/* Portrait phones and smaller */
@media (max-width: 700px) {
  .profile {
    .profile-container {
      .profile-card {
        right: .5rem;
      }
    }
  }
}
</style>
