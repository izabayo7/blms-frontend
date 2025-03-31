<template>
  <div class="my-profile-card">
    <div class="profile-card-container">
      <div class="profile-information d-flex">
        <div class="profile-pic">
          <img v-if="user.profile" :src="user.profile" alt="profile picture" />
          <v-avatar @click="logout" v-else size="50" class="avatar">
            {{ `${user.sur_name} ${user.other_names}` | computeText }}
          </v-avatar>
        </div>
        <div class="profile-names-email">
          <p class="name">{{ `${user.sur_name} ${user.other_names}` }}</p>
          <p class="email">{{ `${user.email}` }}</p>
        </div>
        <div class="profile-badge" v-if="user.category.name !== 'STUDENT'">
          <verified-badge />
        </div>
      </div>
      <div class="profile-actions">
        <ul class="actions">
          <li class="d-flex">
            <router-link :to="`/profile/${user.user_name}`">
              <div class="icon"><v-icon>mdi-account</v-icon></div>
              <div class="content">My Account</div>
            </router-link>
          </li>
          <li class="d-flex">
            <router-link to="/reports">
              <div class="icon"><v-icon>mdi-chart-box</v-icon></div>
              <div class="content">Reports</div>
            </router-link>
          </li>
          <li class="d-flex">
            <router-link to="/messages">
              <div class="icon"><v-icon>mdi-message-bulleted </v-icon></div>
              <div class="content">Messages</div>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="logout d-flex" @click="Logout">
        <div class="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12.673"
            height="11.089"
            viewBox="0 0 12.673 11.089"
          >
            <path
              id="Icon_open-account-logout"
              data-name="Icon open-account-logout"
              d="M4.752,0V1.584h6.336V9.5H4.752v1.584h7.92V0ZM3.168,3.168,0,5.544,3.168,7.92V6.336H9.5V4.752H3.168Z"
            />
          </svg>
        </div>
        <div class="content">Logout</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VerifiedBadge from "../reusable/ui/VerifiedBadge";
import { logout } from "../../services/global_functions";

export default {
  name: "ProfileCard",
  components: { VerifiedBadge },
  computed: {
    ...mapGetters("user", ["user"]),
  },
  methods: {
    Logout: logout, //logout
  },
};
</script>

<style lang="scss" scoped>
.profile-card {
  .profile-card-container {
    position: relative;
    background-color: $main;
    padding: 1rem;
    height: 20rem;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 0 0 10px darken($blue-gray, 5);

    &:after {
      position: absolute;
      content: "";
      width: 1.5rem;
      height: 1.5rem;
      background-color: $main;
      transform: rotate(45deg);
      bottom: 96%;
      left: 75%;
      box-shadow: -4px -4px 3px -1px darken($blue-gray, 2);
    }
    img {
      width: 50px;
      border-radius: 50%;
      cursor: pointer;
    }
    .profile-information {
      justify-content: center;
      align-items: center;
      padding-bottom: 1rem;
      border-bottom: 2px solid lighten($font, 45);

      .profile-pic {
        .v-avatar {
          background-color: $primary;
          color: $main;
        }
      }
      .profile-names-email {
        padding: 0.2rem 1.3rem;
        p {
          &.name {
            font-weight: 600;
          }
          &.email {
            font-size: 0.85rem;
            font-weight: 300;
          }
          margin: 0;
        }
      }
      .profile-badge {
      }
    }

    .profile-actions {
      padding-top: 1rem;
      flex-grow: 1;
      ul {
        padding: 0;

        li {
          padding: 0.5rem 0 0.5rem 0.2rem;
          cursor: pointer;

          a {
            text-decoration: none;
            display: flex;
            .icon {
              padding-right: 2rem;

              .v-icon {
                font-size: 1.2rem;
                color: $font;
              }
            }
            .content {
              color: $font;
            }
          }
          &:hover {
            background-color: $blue-gray;
          }
        }
      }
    }

    .logout {
      padding: 0.5rem 0 0.5rem 0.2rem;
      cursor: pointer;
      &:hover {
        background-color: lighten($danger, 25);
      }
      .icon {
        padding-right: 2.5rem;

        svg {
          fill: $font;
          transform: scale(1.1);
        }
      }
      .content {
        color: $font;
      }
    }
  }
}
</style>