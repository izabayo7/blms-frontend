<template>
  <main class="incoming-chat" @click="handleClick">
    <!--    slot for profile picture-->
    <div class="pic col-xs-12 col-sm-2 col-md-3 col-lg-3">
      <img
        v-if="data.image"
        :src="data.image"
        :alt="`${data.name}'s profile picture`"
      />
      <v-avatar v-else size="37" class="avatar">
        {{ data.name | computeText }}
      </v-avatar>
    </div>
    <div class="content col-9">
      <div class="sender">
        <!--          slot for sender name-->
        <p :class="{ unread: !read }">{{ data.name }}</p>
        <div v-if="formatedIncomingMessagesLength > 0">
          <span>{{ formatedIncomingMessagesLength }}</span>
        </div>
      </div>
      <!--        slot for the sent massage-->
      <div class="sender-message">
        <div
          :class="{ 'unread-msg': !read }"
          class="last_message_container"
          v-if="!typing"
        >
          <div v-if="(data.is_group || is_mine) && data.last_message.sender">
            {{ data.last_message.sender.sur_name }} :
          </div>
          <div :class="{ 'pl-1': data.is_group || is_mine }">
            {{
              data.last_message.content
                | trimString(
                  data.is_group
                    ? 15
                    : is_mine || !data.last_message.sender
                    ? 50
                    : 100
                )
            }}
          </div>
        </div>
        <div v-else>
          <div v-if="data.is_group">
            <span v-for="(member, i) in typing_members" :key="i"
              >{{ `${i > 0 ? "," : ""} ${member}` }}
            </span>
            <span
              >{{ typing_members.length > 1 ? " are " : " is " }} typing</span
            >
          </div>
          <div v-else>Typing...</div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Incoming-chat",
  props: {
    data: { required: true },
  },
  data() {
    return {
      typing: false,
      typers: [],
    };
  },
  computed: {
    ...mapGetters("chat", ["socket"]),

    formatedIncomingMessagesLength() {
      return this.data.unreadMessagesLength > 9
        ? 9
        : this.data.unreadMessagesLength;
    },
    read() {
      return this.formatedIncomingMessagesLength <= 0;
    },
    active() {
      return this.$route.params.username === this.data.id;
    },
    is_mine() {
      return this.data.last_message.sender
        ? this.data.last_message.sender.sur_name == "You"
        : undefined;
    },
    typing_members() {
      let names = [];
      for (const i in this.typers) {
        const user = this.data.members.filter(
          (m) => m.data.user_name == this.typers[i]
        );
        names.push(user[0].data.sur_name);
      }
      console.log(names);
      return names;
    },
  },
  methods: {
    handleClick() {
      // only navigate to new paths ***going to the same route causes an erro***
      if (this.$route.path !== `/messages/${this.data.id}`) {
        // console.log(this.data.id)
        this.$store.commit("chat/SET_DISPLAYED_USER", this.data);
        // this.$store.dispatch('chat/displayMessages',this.data.id)
        // emit('chat_user_changed',this.data.id) //alert that user was changed so we need to fetch some new messages
        this.$router.push({
          path: `/messages/${this.data.id}`,
          params: { username: this.data.id },
        });
      }
    },
  },
  mounted() {
    let timeout = undefined;

    this.socket.on("res/message/typing", (typist, group) => {
      //if the typist id and this incoming chat id are the same
      if (!this.data.is_group && group) return;

      if (this.data.id === typist || this.data.id == group) {
        if (!this.typers.includes(typist)) this.typers.push(typist);

        // console.log(typist)
        this.typing = true;
        clearTimeout(timeout);

        timeout = setTimeout(() => {
          this.typing = false;
          this.typers.splice(this.typers.indexOf(typist), 1);
        }, 5000);
      }
    });
    //when message came stop typing
    this.socket.on("res/message/new", (message) => {
      //if the typist id and this incoming chat id are the same
      if (this.data.id === message.sender.user_name) {
        this.typing = false;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.active-chat {
  border-left: 4px solid $primary;
}
.incoming-chat {
  background-color: $main;
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  margin-top: 0.3rem;
  cursor: pointer;
  transition: 0.1s ease-out;

  .pic {
    align-self: center;
    justify-self: center;
    padding: 0.5rem;
    display: flex;
    align-content: center;
    justify-content: center;

    img {
      width: 40px;
      border-radius: 50%;
      margin: auto;
    }

    .avatar {
      margin: auto;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;

    .sender {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      p {
        padding: 0;
        margin: 0;
        font-size: 1rem;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      div {
        display: flex;

        span {
          color: $main;
          background-color: $primary;
          font-size: 8px;
          border-radius: 50%;
          padding: 1px 4px;
          align-self: center;
          justify-self: center;
          display: inline-flex;
          align-items: center;
          vertical-align: middle;
        }
      }
    }
    .sender-message {
      font-size: 0.7rem;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin-top: 0.4rem;
      color: lighten($font, 30);

      span {
        color: inherit;
      }
    }
  }
  .unread {
    font-weight: 800;
  }
  .unread-msg {
    font-weight: 600;
  }
  .avatar {
    margin-top: 0px;
    background-color: $primary;
    color: white;
    cursor: pointer;
  }
  .last_message_container {
    display: flex;
    // overflow: hidden;
  }
}
</style>
