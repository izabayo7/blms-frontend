<template>
  <main class="incoming-chat" @click="handleClick" :class="{'active-chat':active}">
    <!--    slot for profile picture-->
    <div class="pic col-xs-12 col-sm-2 col-md-3 col-lg-3">
      <img
          v-if="data.image"
          :src="data.image+'?height=50'"
          :alt="`${data.name}'s profile picture`"
      />  
      <div v-else-if="data.name === 'Announcements'" class="announcement">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="20" cy="20" r="20" fill="#FFD248"/>
<path d="M19.9995 28.6957C20.956 28.6957 21.7386 27.9131 21.7386 26.9565H18.2604C18.2604 27.9131 19.043 28.6957 19.9995 28.6957ZM25.2169 23.4783V19.1304C25.2169 16.4609 23.7995 14.2261 21.3038 13.6348V13.0435C21.3038 12.3217 20.7212 11.7391 19.9995 11.7391C19.2778 11.7391 18.6951 12.3217 18.6951 13.0435V13.6348C16.2082 14.2261 14.7821 16.4522 14.7821 19.1304V23.4783L13.043 25.2174V26.087H26.956V25.2174L25.2169 23.4783ZM23.4778 24.3478H16.5212V19.1304C16.5212 16.9739 17.8343 15.2174 19.9995 15.2174C22.1647 15.2174 23.4778 16.9739 23.4778 19.1304V24.3478Z" fill="#343434"/>
</svg>

      </div>
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
            {{ data.name === 'Announcements' ? 
            data.last_message.title :
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
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "Incoming-chat",
  props: {
    data: {required: true},
  },
  data() {
    return {
      typing: false,
      typers: [],
    };
  },
  computed: {
    ...mapGetters("chat", ["socket"]),
    isMobile() {
      return this.$vuetify.breakpoint.width < 960
    },
    formatedIncomingMessagesLength() {
      return this.data.unreadMessagesLength > 9
          ? 9
          : this.data.unreadMessagesLength;
    },
    read() {
      return this.formatedIncomingMessagesLength <= 0;
    },
    active() {
      return String(this.$route.params.username) === String(this.data.id);
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
      return names;
    },
  },
  methods: {
    ...mapMutations("sidebar_navbar", ["TOGGLE_CHAT_MOBILE_NAVBAR"]),
    handleClick() {
      // only navigate to new paths ***going to the same route causes an erro***
      if (this.$route.path !== `/messages/${this.data.id}`) {
        this.$store.commit("chat/SET_DISPLAYED_USER", this.data);
        // this.$store.dispatch('chat/displayMessages',this.data.id)
        // emit('chat_user_changed',this.data.id) //alert that user was changed so we need to fetch some new messages
        this.$router.push({
          path: `/messages/${this.data.id}`,
          params: {username: this.data.id},
        });
      }
      if (this.isMobile)
        this.TOGGLE_CHAT_MOBILE_NAVBAR()
    },
  },
  mounted() {
    let timeout = undefined;

    this.socket.on("res/message/typing", (typist, group) => {
      //if the typist id and this incoming chat id are the same
      if (!this.data.is_group && group) return;

      if (this.data.id === typist || this.data.id == group) {
        if (!this.typers.includes(typist)) this.typers.push(typist);

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
