<template>
  <div>
    <section :class="{focus: state}" class="my-messages">
      <div :class="`row ${state && isMobile ? 'mb-0' : isMobile ? 'mb-14' : ''} messages-section mb-md-0`"
           id="messages-section">
        <div v-if="!isMobile || !state" class="side incoming col-12 col-md-3">
          <div class="header">
            <h2>Chat</h2>
            <div class="icons">
              <div class="add-chat icon px-1" @click="toggleGroup">
                <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M11.9792 6.41162H10.8965C11.0068 6.71377 11.0671 7.03984 11.0671 7.3797V11.4717C11.0671 11.6134 11.0425 11.7494 10.9976 11.8759H12.7875C13.4562 11.8759 14.0001 11.3319 14.0001 10.6633V8.43257C14.0002 7.31823 13.0936 6.41162 11.9792 6.41162Z"
                      fill="#193074"/>
                  <path
                      d="M2.93303 7.3797C2.93303 7.03982 2.99333 6.71377 3.10369 6.41162H2.02098C0.906611 6.41162 0 7.31823 0 8.4326V10.6633C0 11.3319 0.54395 11.8759 1.21259 11.8759H3.00257C2.9577 11.7494 2.93303 11.6134 2.93303 11.4717V7.3797Z"
                      fill="#193074"/>
                  <path
                      d="M8.23838 5.35876H5.76317C4.6488 5.35876 3.74219 6.26538 3.74219 7.37974V11.4717C3.74219 11.6949 3.92315 11.8759 4.14638 11.8759H9.85516C10.0784 11.8759 10.2594 11.695 10.2594 11.4717V7.37974C10.2594 6.26538 9.35275 5.35876 8.23838 5.35876Z"
                      fill="#193074"/>
                  <path
                      d="M7.00079 0C5.66062 0 4.57031 1.09031 4.57031 2.43051C4.57031 3.33955 5.07204 4.13348 5.81301 4.55031C6.16445 4.74801 6.56963 4.86099 7.00079 4.86099C7.43195 4.86099 7.83713 4.74801 8.18858 4.55031C8.92957 4.13348 9.43127 3.33953 9.43127 2.43051C9.43127 1.09033 8.34096 0 7.00079 0Z"
                      fill="#193074"/>
                  <path
                      d="M2.73174 2.26544C1.72945 2.26544 0.914062 3.08083 0.914062 4.08312C0.914062 5.08541 1.72945 5.9008 2.73174 5.9008C2.98598 5.9008 3.22809 5.84814 3.44801 5.75347C3.82826 5.58977 4.14178 5.29998 4.33578 4.93699C4.47196 4.68222 4.54942 4.39159 4.54942 4.08312C4.54942 3.08086 3.73403 2.26544 2.73174 2.26544Z"
                      fill="#193074"/>
                  <path
                      d="M11.2669 2.26544C10.2646 2.26544 9.44922 3.08083 9.44922 4.08312C9.44922 4.39161 9.52668 4.68225 9.66286 4.93699C9.85686 5.3 10.1704 5.58979 10.5506 5.75347C10.7706 5.84814 11.0127 5.9008 11.2669 5.9008C12.2692 5.9008 13.0846 5.08541 13.0846 4.08312C13.0846 3.08083 12.2692 2.26544 11.2669 2.26544Z"
                      fill="#193074"/>
                </svg>
                Create group
              </div>
              <!--              <div class="new-chat icon px-2" @click="$router.push('/messages/start-conversation')">-->
              <!--                <svg-->
              <!--                    id="chat-new-line"-->
              <!--                    xmlns="http://www.w3.org/2000/svg"-->
              <!--                    width="24"-->
              <!--                    height="24"-->
              <!--                    viewBox="0 0 24 24"-->
              <!--                >-->
              <!--                  <path-->
              <!--                      id="Path_2156"-->
              <!--                      data-name="Path 2156"-->
              <!--                      d="M0,0H24V24H0Z"-->
              <!--                      fill="none"-->
              <!--                  />-->
              <!--                  <path-->
              <!--                      id="Path_2157"-->
              <!--                      data-name="Path 2157"-->
              <!--                      d="M14,3V5H4V18.385L5.763,17H20V10h2v8a1,1,0,0,1-1,1H6.455L2,22.5V4A1,1,0,0,1,3,3Zm5,0V0h2V3h3V5H21V8H19V5H16V3Z"-->
              <!--                  />-->
              <!--                </svg>-->
              <!--              </div>-->
            </div>
          </div>
          <div class="message-search mb-4">
            <div class="search-input">
              <div v-if="searchKey === ''" class="placeholder vertically--centered">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M7.86164 6.91824H7.36478L7.18868 6.74843C7.80503 6.03145 8.1761 5.10063 8.1761 4.08805C8.1761 1.83019 6.34591 0 4.08805 0C1.83019 0 0 1.83019 0 4.08805C0 6.34591 1.83019 8.1761 4.08805 8.1761C5.10063 8.1761 6.03145 7.80503 6.74843 7.18868L6.91824 7.36478V7.86164L10.0629 11L11 10.0629L7.86164 6.91824ZM4.08805 6.91824C2.52201 6.91824 1.25786 5.65409 1.25786 4.08805C1.25786 2.52201 2.52201 1.25786 4.08805 1.25786C5.65409 1.25786 6.91824 2.52201 6.91824 4.08805C6.91824 5.65409 5.65409 6.91824 4.08805 6.91824Z"
                      fill="#828282"/>
                </svg>
                Search users or messages
              </div>
              <input @input="searchIt" v-model="searchKey" type="text"/>
            </div>
            <div v-if="searchKey !== '' || this.incomingMessages.length < 1" class="search-results">
              <ul class="searched-users" v-if="foundUsers.length > 0">
                <li
                    class="user d-flex align-center"
                    v-for="(user, i) in foundUsers"
                    :key="i"
                    @click="start_conversation(foundUsers[i].user_name);searchKey = ''"
                >
                  <div class="d-flex justify-start">
                    <img
                        v-if="user.pic"
                        :src="user.pic+'?height=50'"
                        :alt="`${user.names} profile picture`"
                    />
                    <v-avatar size="36" v-else class="avatar">
                      {{ user.names | computeText }}
                    </v-avatar>
                    <p class="ml-4 my-auto">{{ user.names }}</p>
                    <span v-if="user.category.toLowerCase() === 'instructor'">{{
                        user.category
                      }}</span>
                  </div>
                </li>
              </ul>
              <div v-else class="centered">
                search users above and start conversations
              </div>
            </div>
          </div>
          <div v-show="searchKey === ''" class="incoming-messages" v-if="incomingMessages.length > 0">
            <transition-group name="incoming-contacts" tag="div">
              <incoming-chat
                  v-for="message in incomingMessages"
                  :key="message.id"
                  :data="message"
              />
            </transition-group>
          </div>
        </div>
        <div v-if="!isMobile || state" class="side chat col-12 col-md-9">
          <router-view></router-view>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import search from "@/components/reusable/Search";
import incomingChat from "@/components/messages/Incoming-chat";
import {mapMutations, mapGetters, mapState, mapActions} from "vuex";
import {on} from "@/services/event_bus";

export default {
  name: "Messages",
  components: {
    // search,
    incomingChat,
  },
  watch: {
    $route() {
      this.initialise()
      this.searchKey = ""
    },
    searchKey() {
      if (this.searchKey === '')
        this.foundUsers = []
    }
  },
  data() {
    return {
      user: null,
      searchKey: "",
      foundUsers: [],
    };
  },
  computed: {
    ...mapGetters("chat", ["socket"]),
    ...mapState("chat", ["username", "incomingMessages"]),
    ...mapState("sidebar_navbar", {state: "showChatMobileNavbar"}),
    isMobile() {
      return this.$vuetify.breakpoint.width < 960
    }
  },
  methods: {
    ...mapActions("users", ["searchUser"]),
    ...mapActions("chat", ["start_conversation"]),
    ...mapMutations("chat", ["SET_USERNAME", "SET_DISPLAYED_USER"]),
    ...mapMutations("sidebar_navbar", {
      toggleGroup: "TOGGLE_GROUP_MODEL_VISIBILITY",
    }),
    search(str) {
      if (str === '')
        return
      this.foundUsers = [];
      this.searchUser({query: str}).then((results) => {
        this.foundUsers = [];
        for (const i in results) {
          this.foundUsers.push({
            names: `${results[i].sur_name} ${results[i].other_names}`,
            pic: results[i].profile,
            category: results[i].category,
            user_name: results[i].user_name,
            selected: false,
          });
        }
      });
    },
    searchIt() {
      this.search(this.searchKey);
    },
    //here we check if the current route has a selected chat if not we directly
    // select the latest contact in chat and we make it active
    goToMessages() {
      const testReg = /\/messages\/group\/[a-z]+/g; //test for '/messages/group/...route
      const groupRouteFound = testReg.test(this.$route.path);

      const user_found = this.incomingMessages.filter(x => x.id === this.$route.params.username)

      if (user_found.length) return;

      if (this.$route.path === "/messages")
        if (!groupRouteFound && this.incomingMessages.length) {
          this.SET_DISPLAYED_USER(this.incomingMessages[0]);
          if (this.$route.path !== `/messages/${this.incomingMessages[0].id}`)
            this.$router.push(`/messages/${this.incomingMessages[0].id}`);
        }
    },
    storeCurrentDisplayedUser() {
      //listen when the user contacts/incoming messages are loaded
      on("incoming_message_initially_loaded", () => {
        if (!this.incomingMessages.length) {
          if (this.$route.path === "/messages")
            this.$router.push("/messages/no-conversation")
          else
            this.start_conversation(this.$route.params.username)
        } else {
          this.incomingMessages.map((d) => {
            if (this.$route.params.username === d.id.toString()) {
              this.SET_DISPLAYED_USER(d);
            }
          });
        }
      });

      //when there is no event atleast try this
      this.incomingMessages.map((d) => {
        if (this.$route.params.username === d.id) {
          this.SET_DISPLAYED_USER(d);
        }
      });
    },
    initialise() {
      this.storeCurrentDisplayedUser();

      //listen if recent chat contact was loaded
      on("incoming_message_initially_loaded", () => {
        this.goToMessages();
      });
      this.$store.dispatch("chat/loadIncomingMessages");
      // this.SET_USERNAME(this.$route.params.username).then(()=> this.goToMessages())
    }
  },
  mounted() {
    this.initialise()
  },
};
</script>

<style lang="scss" scoped>
#messages-section {
  height: calc(100vh - 82px);

  &.mb-0 {
    height: 100vh;
  }
}

.my-messages {
  background-color: #f8f8f8;
  height: 100%;
  padding: 20px 10px 0px 34px;

  .add-chat {
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 15px;
    line-height: 17px;
    /* or 110% */


    color: #193074;

  }

  .side {
    .header {
      display: flex;
      justify-content: space-between;
      align-content: center;

      .icons {
        display: flex;
        align-content: center;

        .icon {
          width: fit-content;
          height: fit-content;
          align-self: center;
          cursor: pointer;

          &:hover {
            svg {
              fill: $font;
            }
          }

          svg {
            transform: scale(0.8);
          }
        }
      }

      h2 {
        color: $primary;
      }
    }
  }

  .messages-section {
    //height: 100%;
    .incoming {
      height: 90%;

      .message-search {
        //height: 100%;

        .placeholder {
          font-family: Inter;
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 17px;
          /* or 138% */
          svg {
            margin-right: 6px;
          }

          height: 100%;
          color: #828282;

        }

        .search-input {
          max-width: 288px;
          height: 35px;
          margin-top: 16px;
          background: #DEDEDE;
          border-radius: 10px;
          position: relative;

          input {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            padding: 6px 12px;
          }
        }

        .search-results {
          height: 94%;
          position: absolute;
          z-index: 7;

          .centered {
            width: 100%;
            height: 68%;
            font-family: Inter;
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 17px;
            /* or 138% */

            display: flex;
            align-items: center;
            text-align: center;

            color: #828282;
          }

          .searched-users {
            max-width: 318px;
            max-height: 90%;
            overflow-y: auto;
            left: 121px;
            top: 180px;
            margin-top: 9px;
            background: #FFFFFF;
            padding: 19px 8px !important;

            li {
              margin-bottom: 8px;
              max-width: 303px;;
              list-style-type: none;
              height: 68px;
              display: flex;
              background: #FFFFFF;
              box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
              border-radius: 5px;
              cursor: pointer;
              padding: 16px;

              &:hover {
                background-color: lighten($font, 65);
              }

              .avatar {
                background-color: $primary;
                color: white;
                cursor: pointer;
                margin: 0.2rem 0.3rem;
              }

              img {
                width: 36px;
                height: 36px;
                border-radius: 50%;
              }

              p {
                font-family: Roboto;
                font-style: normal;
                font-weight: bold;
                font-size: 15px;
                /* or 5% */

                display: flex;
                align-items: center;

                /* Type color / Default */

                color: #343434;
              }

              span {
                font-family: Roboto;
                font-style: normal;
                font-weight: bold;
                font-size: 9px;
                line-height: 1px;
                /* identical to box height, or 8% */
                width: fit-content;
                padding: 4px;
                height: 21px;

                /* Alert colors / Success */

                background: #3CE970;
                border-radius: 14px;
                display: flex;
                align-items: center;

                /* Type color / Default */

                color: #343434;
              }
            }
          }
        }
      }

      .incoming-messages {
        max-height: 96%;
        overflow-x: hidden;
        overflow-y: auto;

        @include scroll-bar;

        .incoming-contacts-move {
          transition: transform .3s;
          //padding: 20rem;
        }
      }
    }

    .chat {
      //height: 100%;
    }
  }
}

/* Portrait phones and smaller */
@media (max-width: 700px) {
  .my-messages {
    &.focus {
      padding: 0px;

      .side {
        padding: 0px !important;
      }
    }
  }
}
</style>
