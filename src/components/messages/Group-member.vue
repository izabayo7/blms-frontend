<template>
  <div class="my-member">
    <div class="member-container">
      <div class="pic">
        <v-avatar size="35" class="avatar">
          {{ member.data.sur_name | computeText }}
        </v-avatar>
      </div>
      <p class="names">
        {{
          member.data.user_name == $store.state.user.user.user_name
            ? "You"
            : `${member.data.sur_name} ${member.data.other_names}`
        }}
      </p>
      <div class="icons">
        <div
          class="m-message"
          v-if="!IamTheOwner"
          @click="start_conversation(member.data.user_name)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M5.763 17H20V5H4v13.385L5.763 17zm.692 2L2 22.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6.455z"
            />
          </svg>
        </div>
        <div
          class="remove"
          v-if="!IamTheOwner"
          @click="
            set_modal({
              template: 'action_confirmation',
              method: {
                action: 'chat/removeMember',
                parameters: { groupId: $route.params.id, member: member },
              },
              title: 'Delete member',
              message: 'Are you sure you want to delete this member?',
            })
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M14 14.252v2.09A6 6 0 0 0 6 22l-2-.001a8 8 0 0 1 10-7.748zM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm7 6.586l2.121-2.122 1.415 1.415L20.414 19l2.122 2.121-1.415 1.415L19 20.414l-2.121 2.122-1.415-1.415L17.586 19l-2.122-2.121 1.415-1.415L19 17.586z"
            />
          </svg>
        </div>
        <div :class="`exit ${IamAdmin ? '' : 'ml-n6'}`" v-if="IamTheOwner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M5 22a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v3h-2V4H6v16h12v-2h2v3a1 1 0 0 1-1 1H5zm13-6v-3h-7v-2h7V8l5 4-5 4z"
            />
          </svg>
        </div>
      </div>
      <div class="admin">
        <div class="checkbox">
          <checkbox :disabled="IamAdmin" v-model="member.isAdmin" />
        </div>
        <p>Admin</p>
      </div>
    </div>
  </div>
</template>

<script>
import Checkbox from "@/components/reusable/ui/Checkbox";
import { mapActions, mapState } from "vuex";
import apis from "@/services/apis";
export default {
  name: "Group-member",
  components: { Checkbox },
  props: {
    member: { required: true },
    IamAdmin: { required: true },
  },
  data() {
    return {
      checked: true,
    };
  },
  computed: {
    ...mapState("modal", ["confirmed"]),
    IamTheOwner() {
      return (
        this.member.data.user_name === this.$store.state.user.user.user_name
      );
    },
  },
  watch: {
    confirmed() {
      if (this.confirmed) {
        this.$emit("removeMember", this.member);
      }
    },
  },
  methods: {
    async removeMember() {
      await apis.update(
        "chat_group",
        `${this.$route.params.id}/toogle_isAdmin/${this.member.data.user_name}`
      );
      this.$emit("toogleMemberAdmin", this.member);
    },
    ...mapActions("chat", ["start_conversation"]),
    ...mapActions("modal", ["set_modal"]),
  },
};
</script>

<style lang="scss" scoped>
.my-member {
  .member-container {
    padding: 0.5rem;
    padding-right: 2rem;
    &:hover {
      background-color: lighten($secondary, 5);
    }
    display: flex;

    p {
      margin: 0;
      height: fit-content;
      align-self: center;
    }
    .pic {
      padding-left: 0.2rem;
      height: fit-content;
      align-self: center;
      .avatar {
        margin: 0;
        align-self: center;
        color: $main;
        background-color: $primary;
      }
    }
    .names {
      padding-left: 0.8rem;
      width: 17rem;
    }

    .icons {
      align-self: center;
      height: fit-content;
      display: flex;

      div {
        cursor: pointer;
      }
      .m-message {
        svg {
          fill: $success;
        }
      }
      .remove,
      .exit {
        svg {
          fill: $danger;
        }
      }
      .exit {
        padding-left: 1.5rem;
      }

      svg {
        transform: scale(0.8);
      }
    }

    .admin {
      display: flex;
      padding-left: 1rem;

      .checkbox {
        height: 25px;
        align-self: center;
        padding: 0 0.5rem;
      }

      p {
        margin: 0;
      }
    }
  }
}
</style>