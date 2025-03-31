<template>
  <main class="my-chat-header">
      <div class="information-header">
        <button v-if="isMobile && state" @click="TOGGLE_CHAT_MOBILE_NAVBAR" class="back"><svg xmlns="http://www.w3.org/2000/svg" width="9.918" height="17.348" viewBox="0 0 9.918 17.348">
          <path id="Icon_ionic-ios-arrow-back" data-name="Icon ionic-ios-arrow-back" d="M14.24,14.866,20.8,8.307a1.24,1.24,0,1,0-1.756-1.751l-7.437,7.432a1.237,1.237,0,0,0-.036,1.709l7.468,7.483A1.24,1.24,0,1,0,20.8,21.43Z" transform="translate(-11.251 -6.194)" fill="#343434"/>
        </svg>
        </button>
          <div class="pic"><slot name="pic"></slot></div>
          <div class="user-info">
              <p class="name"><slot name="name"> </slot></p>
              <p v-if="currentDisplayedUser.is_group">
        <span v-for="(member, i) in currentDisplayedUser.members" :key="i"
        >{{ `${i > 0 ? "," : ""} ${member.data.user_name == $store.state.user.user.user_name ? 'You' : member.data.sur_name}` }}
        </span>
              </p>
              <p v-else class="online">{{ userOnline }}</p>
          </div>
      </div>

      <div class="action-btn-header">
          <div class="action-icons">
              <div class="icon add-member hidden-sm-and-down" v-if="currentDisplayedUser.is_group" @click="$router.push(`/messages/group/${currentDisplayedUser.id}/add-member`)">
                  <svg
                          id="user-add-line"
                          xmlns="http://www.w3.org/2000/svg"
                          width="33"
                          height="33"
                          viewBox="0 0 33 33"
                  >
                      <path
                              id="Path_2152"
                              data-name="Path 2152"
                              d="M0,0H33V33H0Z"
                              fill="none"
                      />
                      <path
                              id="Path_2153"
                              data-name="Path 2153"
                              d="M17.75,19.222V22.1a8.25,8.25,0,0,0-11,7.78H4A11,11,0,0,1,17.75,19.22ZM15,17.5a8.25,8.25,0,1,1,8.25-8.25A8.248,8.248,0,0,1,15,17.5Zm0-2.75a5.5,5.5,0,1,0-5.5-5.5A5.5,5.5,0,0,0,15,14.75ZM23.25,23V18.875H26V23h4.125v2.75H26v4.125H23.25V25.75H19.125V23Z"
                              transform="translate(1.5 0.375)"
                      />
                  </svg>
              </div>
              <div class="icon video-chat hidden-sm-and-down">
                  <svg
                          id="video-chat-line-2"
                          xmlns="http://www.w3.org/2000/svg"
                          width="33"
                          height="33"
                          viewBox="0 0 33 33"
                  >
                      <path
                              id="Path_2154"
                              data-name="Path 2154"
                              d="M0,0H33V33H0Z"
                              fill="none"
                      />
                      <path
                              id="Path_2155"
                              data-name="Path 2155"
                              d="M19.4,13.6l4.35-3.288v8.769L19.4,15.788v3.288H9.25V10.308H19.4ZM7.456,23.462H28.1V5.923H4.9V25.486Zm1,2.923L2,31.5V4.462A1.456,1.456,0,0,1,3.45,3h26.1A1.456,1.456,0,0,1,31,4.462V24.923a1.456,1.456,0,0,1-1.45,1.462Z"
                      />
                  </svg>
              </div>
              <div
                      class="icon settings"
                      @click="$router.push(`/messages/group/${currentDisplayedUser.id}`)"
                      v-if="currentDisplayedUser.is_group"
              >
                  <svg
                          id="Icon_feather-settings"
                          data-name="Icon feather-settings"
                          xmlns="http://www.w3.org/2000/svg"
                          width="36"
                          height="36"
                          viewBox="0 0 36 36"
                  >
                      <path
                              id="Path_1919"
                              data-name="Path 1919"
                              d="M22.5,18A4.5,4.5,0,1,1,18,13.5,4.5,4.5,0,0,1,22.5,18Z"
                              fill="none"
                              stroke="#000"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="3"
                      />
                      <path
                              id="Path_1920"
                              data-name="Path 1920"
                              d="M29.1,22.5a2.475,2.475,0,0,0,.495,2.73l.09.09a3,3,0,1,1-4.245,4.245l-.09-.09a2.5,2.5,0,0,0-4.23,1.77V31.5a3,3,0,1,1-6,0v-.135A2.475,2.475,0,0,0,13.5,29.1a2.475,2.475,0,0,0-2.73.495l-.09.09A3,3,0,1,1,6.435,25.44l.09-.09a2.5,2.5,0,0,0-1.77-4.23H4.5a3,3,0,1,1,0-6h.135A2.475,2.475,0,0,0,6.9,13.5a2.475,2.475,0,0,0-.5-2.73l-.09-.09A3,3,0,1,1,10.56,6.435l.09.09a2.475,2.475,0,0,0,2.73.495h.12A2.475,2.475,0,0,0,15,4.755V4.5a3,3,0,0,1,6,0v.135a2.5,2.5,0,0,0,4.23,1.77l.09-.09a3,3,0,1,1,4.245,4.245l-.09.09a2.475,2.475,0,0,0-.5,2.73v.12A2.475,2.475,0,0,0,31.245,15H31.5a3,3,0,0,1,0,6h-.135A2.475,2.475,0,0,0,29.1,22.5Z"
                              fill="none"
                              stroke="#000"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="3"
                      />
                  </svg>
              </div>
          </div>
      </div>


  </main>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "Chat-header",
  props: {
    online: { type: Boolean, default: false },
  },
  methods:{
    ...mapMutations("sidebar_navbar", ["TOGGLE_CHAT_MOBILE_NAVBAR"])
  },
  computed: {
    ...mapState("chat", ["currentDisplayedUser"]),
    ...mapState("sidebar_navbar", {state: "showChatMobileNavbar"}),
    isMobile() {
      return this.$vuetify.breakpoint.width < 960
    },
    userOnline() {
      return this.online ? "Online" : "Away";
    },
    members() {
      return this.currentDisplayedUser.members;
    },
    group() {
      return this.currentDisplayedUser.is_group;
    },
  },
};
</script>

<style lang="scss" scoped>
.my-chat-header {
  display: flex;
    justify-content: space-between;
    align-items: center;
  padding: 0.7rem 1.5rem;
  border-bottom: 2px solid lighten($font, 40);
  button.back{
    margin-right: 21px;
  }
    .information-header{
        display: flex;
        align-items: center;

        .pic {
            height: 5rem;
            display: flex;
            justify-content: center;
            align-items: center;

            .avatar {
                width: 50px;
                background-color: $primary;
                color: $main;
            }
            img {
                width: 50px;
                border-radius: 50%;
            }
        }
        .user-info {
            display: flex;
            flex-direction: column;
            padding-left: 0.8rem;
            justify-content: space-between;

            p{
                margin: 0;
            }
            .name {
                padding: 0;
                margin: 0;
                font-weight: 500;
            }
            .online,
            .group {
                padding: 0;
                margin: 0;
                font-size: 0.8rem;
                color: lighten($font, 50);
            }

            .group {
                max-width: 20rem;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
        }

    }
    .action-btn-header{
        display: flex;

        .action-icons {
            display: flex;
            padding-right: 0.5rem;

            .icon {
                width: 3rem;
                height: 3rem;
                border-radius: 50%;
                display: flex;
                align-content: center;
                justify-content: center;
                cursor: pointer;

                &:hover {
                    background-color: lighten($secondary, 5);

                    svg {
                        fill: $font;
                    }
                }
                svg {
                    display: inline-flex;
                    align-self: center;
                    justify-self: center;
                    transform: scale(0.8);
                }
            }
        }
    }

}
</style>
