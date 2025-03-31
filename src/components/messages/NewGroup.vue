<template>
  <div class="new-group" v-show="group_model">
    <div class="group-wrapper">
      <cropper :img="img" @change="imageCropped" />
      <div class="background-darkness"></div>
      <div id="form" class="col-xs-11 col-sm-10 col-md-8 col-lg-8 col-xl-6">
        <div class="group-card row flex flex-column-reverse flex-md-row">
          <div class="infos flex col col-xs-12 col-sm-12 col-md-8">
            <div class="infos-holder justify-center align-center">
              <transition name="fade">
                <div class="row error-wrapper" v-if="groupError.length">
                  <div class="an_error">{{groupError}}</div>
                </div>
              </transition>
              <div class="row group-name">
                <label for="group_name_input">Group name</label>
                <input type="text" id="group_name_input" v-model="group.name" />
              </div>
              <div class="row group-members">
                <label for="group_members_input">Add members</label>
                <div class="members">
                  <input
                    @input="getUsers"
                    v-model="currentMember"
                    type="text"
                    id="group_members_input"
                  />
                  <transition name="member">
                    <div
                      class="found-members"
                      v-if="foundUsers.length > 0 || userLoading"
                    >
                      <svg
                        v-if="userLoading"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M12 3a9 9 0 0 1 9 9h-2a7 7 0 0 0-7-7V3z" />
                      </svg>
                      <div class="no-user" v-if="NotFoundText.length > 0">
                        {{ NotFoundText }}
                      </div>
                      <transition-group name="members">
                        <div
                          class="member"
                          v-for="user in foundUsers"
                          @click="addMember(user)"
                          :key="user.email"
                        >
                          <member
                            :disabled="disabled(user.email)"
                            :user="user"
                          />
                        </div>
                      </transition-group>
                    </div>
                  </transition>
                </div>
                <div class="added-members-list" v-if="group.members.length > 0">
                  <transition-group name="chips">
                    <chip
                      v-for="(member, i) in group.members"
                      @closed="closed(i)"
                      :key="member.email"
                    >
                      {{ member.sur_name + " " + member.other_names }}
                    </chip>
                  </transition-group>
                </div>
              </div>
              <div class="group-privacy">
                <label>Make Public</label>
                <div class="switch">
                  <switch-ui v-model="group.public" />
                </div>
              </div>
              <div class="row action-buttons">
                <button
                  class="create-group-button"
                  :class="{ disabled: btnDisabled }"
                  @click="createGroup"
                >
                  Create group
                </button>
                <button class="cancel-group-creation" @click="toggleGroup">
                  Cancel
                </button>
              </div>
            </div>
          </div>
          <div class="profile-pic col col-xs-12 col-sm-12 col-md-4">
            <div class="circle">
              <div class="pic">
                <img
                  id="preview"
                  onerror="this.style.display = 'none'"
                  src=""
                  alt=""
                />
                <div class="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="83"
                    height="58.1"
                    viewBox="0 0 83 58.1"
                  >
                    <path
                      id="Icon_awesome-users"
                      data-name="Icon awesome-users"
                      d="M12.45,27.15a8.3,8.3,0,1,0-8.3-8.3A8.308,8.308,0,0,0,12.45,27.15Zm58.1,0a8.3,8.3,0,1,0-8.3-8.3A8.308,8.308,0,0,0,70.55,27.15ZM74.7,31.3H66.4a8.276,8.276,0,0,0-5.849,2.412A18.97,18.97,0,0,1,70.291,47.9H78.85A4.146,4.146,0,0,0,83,43.75V39.6A8.308,8.308,0,0,0,74.7,31.3Zm-33.2,0A14.525,14.525,0,1,0,26.975,16.775,14.518,14.518,0,0,0,41.5,31.3Zm9.96,4.15H50.384a20.054,20.054,0,0,1-17.767,0H31.54A14.944,14.944,0,0,0,16.6,50.39v3.735a6.227,6.227,0,0,0,6.225,6.225h37.35A6.227,6.227,0,0,0,66.4,54.125V50.39A14.944,14.944,0,0,0,51.46,35.45ZM22.449,33.712A8.276,8.276,0,0,0,16.6,31.3H8.3A8.308,8.308,0,0,0,0,39.6v4.15A4.146,4.146,0,0,0,4.15,47.9H12.7A19.018,19.018,0,0,1,22.449,33.712Z"
                      transform="translate(0 -2.25)"
                      fill="#aaa"
                    />
                  </svg>
                </div>
                <div class="img-icon" @click="$refs.filePicker.click()">
                  <div class="input">
                    <input
                      ref="filePicker"
                      @change="readURL"
                      type="file"
                      id="profile_img"
                    />
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30.621"
                    height="30.621"
                    viewBox="0 0 30.621 30.621"
                  >
                    <g
                      id="Icon_feather-image"
                      data-name="Icon feather-image"
                      transform="translate(-3 -3)"
                    >
                      <path
                        id="Path_2162"
                        data-name="Path 2162"
                        d="M7.5,4.5h21a3,3,0,0,1,3,3v21a3,3,0,0,1-3,3H7.5a3,3,0,0,1-3-3V7.5a3,3,0,0,1,3-3Z"
                        fill="none"
                        stroke="#fff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="3"
                      />
                      <path
                        id="Path_2163"
                        data-name="Path 2163"
                        d="M15,12.75a2.25,2.25,0,1,1-2.25-2.25A2.25,2.25,0,0,1,15,12.75Z"
                        fill="none"
                        stroke="#fff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="3"
                      />
                      <path
                        id="Path_2164"
                        data-name="Path 2164"
                        d="M31.5,22.5,24,15,7.5,31.5"
                        fill="none"
                        stroke="#fff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="3"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { emit, on } from "@/services/event_bus";
import { mapMutations, mapState, mapActions, mapGetters } from "vuex";
import a from "@/services/apis";
import Member from "@/components/messages/Member";

export default {
  name: "NewGroup",
  components: {
    Member,
    switchUi: () => import("@/components/reusable/ui/switcher"),
    chip: () => import("@/components/reusable/ui/Chip"),
    cropper: () => import("@/components/reusable/ui/ImageCropper"),
  },
  data() {
    return {
      img: "",
      b64Img: "",
      currentMember: "",
      foundUsers: [],
      userLoading: false,
      NotFoundText: "",
      group: {
        name: "",
        public: true,
        members: [],
      },
    };
  },
  computed: {
    ...mapState("sidebar_navbar", ["group_model"]),
    ...mapGetters("chat", ["groupError"]),
    btnDisabled() {
      const test_empty = /^\s+$/g;
      const is_name_empty =
        test_empty.test(this.group.name) || this.group.name.length <= 0;
      const is_members_empty = this.group.members.length <= 0;
      return is_members_empty || is_name_empty;
    },
  },
  methods: {
    ...mapMutations("sidebar_navbar", {toggleGroup: "TOGGLE_GROUP_MODEL_VISIBILITY"}),
    ...mapMutations("chat", {setGroupError:"SET_GROUP_ERROR"}),
    ...mapActions("users", ["searchUser"]),

    closed(i) {
      this.group.members.splice(i, 1);
    },
    disabled(email) {
      return this.group.members.some((member) => member.email === email);
    },
    getUsers() {
      this.userLoading = true;
      this.NotFoundText = "";
      const EmptyStringRegex = /^\s+$/g; //regext to detect empty string

      if (
        EmptyStringRegex.test(this.currentMember) ||
        this.currentMember.length <= 0
      ) {
        this.foundUsers = [];
        this.userLoading = false;
        return;
      }

      this.searchUser({ query: this.currentMember }).then((result) => {
        this.userLoading = false;
        this.foundUsers = result;

        //tell user that we didnt find the user with such id
        this.NotFoundText = result.length > 0 ? "" : "No user found";
      });
    },
    addMember(user) {
      const membersNotAvailable = this.foundUsers.length <= 0;
      const disabled = this.disabled(user.email);

      if (membersNotAvailable || this.currentMember.length <= 0 || disabled)
        return;

      this.group.members.unshift(user);
    },
    readURL(input) {
      const self = this;
      input = input.target;
      if (input.files && input.files[0]) {
        let reader = new FileReader();

        reader.onload = function (e) {
          self.img = e.target.result;
          emit("new-image-loaded");
          // document.getElementById('preview').setAttribute('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]); // convert to base64 string
      }
    },
    imageCropped(img) {
      const image = document.getElementById("preview");
      image.src = img;
      this.b64Img = img;
    },
    toggleDiv(e) {
      const thisDoc = e.target;
      // const thisDoc = document.getElementById('form')
      const clickInside = thisDoc.contains(e.target); //is what we clicked inside of component
      //if not inside the make img empty to hide this component
      if (!clickInside) this.toggleGroup();
    },
    async createGroup() {
      const body = {
        name: this.group.name,
        // description:'',
        members: this.group.members.map((member) => ({
          user_name: member.user_name,
        })),
        // private:!this.group.public,
        // profile: await getImgFile(this.b64Img,`${this.group.name}_cover_photo.png`),
        college: this.$store.state.user.user.college,
      };
      const newGroup = await a.create("chat_group", body);
      const {status, message} = newGroup.data

      console.log(newGroup,status)

      //on error set an error
      if(status !== 200 || status !== 201) this.setGroupError(message)

      const {code, createdAt,members,name} = newGroup.data.data

      // new group as contact
      const newGroupAsContact = {
        id:code,
        is_group:true,
        last_message:{
          content:"This group was created by ",
          time:createdAt
        },
        members:members,
        name:name,
        unreadMessagesLength:1,

      }
      console.log(newGroupAsContact);
      // this.$router.push(`/messages/${newGroup.data.data.code}`);
      // this.toggleGroup()
    },
  },
  mounted() {
    on("image_cropped", () => {
      document.getElementById("preview").style.display = "block";
    });
  },
};
</script>

<style lang="scss" scoped>
.new-group {
  position: absolute;
  z-index: 100;
  width: 100vw;
  height: 100vh;

  .group-wrapper {
    position: relative;
    height: 100%;
    width: 100%;

    .background-darkness {
      background-color: $font;
      opacity: 0.3;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: -1;
    }

    #form {
      background-color: $main;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);


      .infos {
        .infos-holder {
          align-self: center !important;
          justify-self: center !important;
          max-width: 25rem;
          margin: auto;

          //animation
          .fade-enter-active, .fade-leave-active{
            transition: .4s ease-in;
          }
          .fade-enter, .fade-leave-to{
            opacity: 0;
          }

          .error-wrapper{
            width: 100%;

            .an_error{
              padding: 1rem .5rem;
              width: 100%;
              border-left: 3px solid lighten($danger,5);
              background-color: lighten($danger,25);
              color:lighten($danger,5);
            }
          }

          .group-members,
          .group-name {
            flex-direction: column;
          }

          .group-members {
            .added-members-list {
              max-width: 25rem;
              border-bottom: 0.5px solid lighten($secondary, 5);
              border-top: 0.5px solid lighten($secondary, 5);
              margin: 1rem 0;
              max-height: 15rem;
              overflow-x: hidden;
              overflow-y: auto;

              @include scroll-bar;

              /* aniamation of chips */
              .chips-enter-active,
              .chips-leave-active {
                //transition: all .4s;
              }

              .chips-enter,
              .chips-leave-to {
                opacity: 0;
              }
            }

            .members {
              width: 100%;

              input {
                width: 100%;
              }
            }
          }

          .group-privacy {
            display: flex;

            label {
              margin-right: 1rem;
            }

            .switch {
              display: flex;
              align-content: center;
              justify-content: center;
            }
          }

          .row {
            display: flex;
            margin: 1rem 0;

            label {
              display: block;
              margin: 0.5rem 0;
            }

            input {
              display: block;
              padding: 0.2rem;
              max-width: 25rem;
              color: darken($font, 30);
              border: 2px solid lighten($font, 45);
              background-color: lighten($secondary, 5);
              padding-left: 1rem;
            }
          }

          .action-buttons {
            button {
              padding: 0.5rem 1rem;
              margin: 0.4rem;

              &.create-group-button {
                background-color: $success;
                color: $main;
                width: 8rem;
              }

              &.cancel-group-creation {
                width: 8rem;
                background-color: $secondary;
              }
            }
          }
        }
      }

      .group-card {
        padding: 1rem 2rem;

        .col {
          padding: 0;
        }
      }

      .profile-pic {
        display: flex;
        align-content: center;
        justify-content: center;

        .circle {
          border: 1px solid lighten($font, 10);
          border-radius: 50%;
          height: 10rem;
          width: 10rem;
          display: flex;
          align-content: center;
          justify-content: center;
          position: relative;
          align-self: center;

          .pic {
            width: fit-content;
            height: fit-content;

            img {
              width: 10rem;
              height: 10rem;
              border-radius: 50%;
            }
            .icon {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              z-index: -1;
            }

            .img-icon {
              position: absolute;
              background-color: $success;
              padding: 0.5rem;
              box-sizing: content-box;
              border-radius: 50%;
              top: 80%;
              right: 0;
              height: 30px;
              width: fit-content;
              max-height: 30px;
              max-width: 30px;
              cursor: pointer;

              .input {
                position: absolute;
                max-width: 30px;
                max-height: 30px;

                input {
                  opacity: 0;
                  display: none;
                }
              }

              svg {
                margin: 0;
                padding: 0;
              }
            }
          }
        }
      }
    }
  }
}
</style>
