<template>
  <div v-if="group.name" class="my-info">
    <div class="info-container">
      <cropper :img="img" @change="imageCropped" />
      <div class="my-info">
        <div class="profile">
          <div class="photo">
            <img v-if="image" :src="image +'?height=100' " @change="image" :alt="`${group.name} group icon`">
            <input type="file" @change="handleFileUpload" ref="file" />
            <div class="icon" @click="$refs.file.click()">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M15.728 9.686l-1.414-1.414L5 17.586V19h1.414l9.314-9.314zm1.414-1.414l1.414-1.414-1.414-1.414-1.414 1.414 1.414 1.414zM7.242 21H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 21z"
                />
              </svg>
            </div>
          </div>
          <p>{{ group.name }}</p>
        </div>
        <div class="members">
          <div class="header">
            <p>{{ group.members.length }} members</p>
            <div class="member-btn" @click="goToAddMember">
              <div class="icon">
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
              <p>add member</p>
            </div>
          </div>
          <div class="members-list">
            <!-- naha -->
            <group-member
              v-for="(member, i) in group.members"
              :key="i"
              :member="member"
              :IamAdmin="IamAdmin"
              @removeMember="removeMember"
              @toogleMemberAdmin="toogleMemberAdmin"
            />
          </div>
          <div class="action-btn">
            <button class="save">Save changes</button>
            <button
              class="cancel"
              @click="$router.push(`/messages/${$route.params.id}`)"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GroupMember from "@/components/messages/Group-member";
import a from "@/services/apis";
import { mapMutations } from "vuex";
import {cropperMixin} from "../../services/mixins"
import apis from "../../services/apis";

export default {
  name: "Group-info",
  components: {
    GroupMember ,
    cropper: () => import("@/components/reusable/ui/ImageCropper"),},
  data() {
    return {
      members: [],
      group: {},
      profile:'',
      profile_link:'',
      img:'',
      uploaded:false
    };
  },
  mixins:[cropperMixin],
  computed: {
    IamAdmin() {
      const me = this.group.members.filter(
        (m) => m.data.user_name == this.$store.state.user.user.user_name
      );
      return me[0] ? me[0].isAdmin : undefined;
    },
    // get image either base64 or profile image
    image(){
      return (this.profile_link.length > 0) ? this.profile_link : this.img.length > 0 ? this.img : false
    }
  },
  methods: {
    ...mapMutations("modal", ["update_confirmation"]),
    goToAddMember() {
      this.$router.push(`${this.$route.path}/add-member`);
    },
    async uploadImage(){

      //profile may be assigned late because of the effect of image size
      //as image have largest size the long it take for it to be assigned to our local variable profile
      //so for the reason that we need to wait for profile to be cropped
      //we have to use recursion loop so that we can wait until profile
      //is filled with something

       //to wait for profile to be filled with something and make sure that no image has been uploaded
      //before
        if(this.profile.length > 0 && !this.uploaded){
          const {data} = await apis.put(`chat_group/${this.group.code}/profile`,{profile:this.profile})

          this.uploaded = true;
          this.profile_link = data.data.profile
        }
        //call the function again
        else{
          const self = this;

          //at least await 30 microsecond so that the recursion can't go that faster
          setTimeout(async ()=>{
            await self.uploadImage()
          },30)
        }

        return 0
    },
    async getGroupInfo() {
      const group = await a.get(`chat_group/${this.$route.params.id}`);
      this.group = group.data.data;
      if(group.data.data.profile)
        this.profile_link = group.data.data.profile
    },
    // aha
    removeMember(member) {
      for (const k in this.group.members) {
        if (this.group.members[k].id == member.id) {
          this.group.members.splice(k, 1);
        }
      }
      this.update_confirmation(false);
    },
    toogleMemberAdmin(member) {
      for (const k in this.group.members) {
        if (this.group.members[k].id == member.id) {
          this.group.members[k].isAdmin = member.isAdmin;
        }
      }
    },
  },
  mounted() {
    this.getGroupInfo();

    //listen on cropped image
    this.$on('image_cropped',()=>{
      this.uploadImage()
    })
  },
};
</script>

<style lang="scss" scoped>
.my-info {
  .info-container {
    .my-info {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      min-width: 50rem;

      .profile {
        align-self: center;
        width: fit-content;
        .photo {
          width: 6rem;
          height: 6rem;
          border-radius: 50%;
          background-image: linear-gradient(#8456fe, #fe5bc8);
          position: relative;

          img{
            width: inherit;
            height: inherit;
            border-radius: 50%;
          }

          input {
            display: none;
          }
          .icon {
            position: absolute;
            top: 65%;
            left: 75%;
            background-color: $success;
            width: 1.8rem;
            height: 1.8rem;
            display: flex;
            justify-content: center;
            border-radius: 50%;
            cursor: pointer;

            svg {
              transform: scale(0.8);
              align-self: center;
              fill: $main;
            }
          }
        }
        p {
          font-weight: 600;
          text-align: center;
        }
      }
      .members {
        align-self: center;
        width: fit-content;

        .header {
          display: flex;
          justify-content: space-between;
          padding: 0.4rem 0;
          p {
            margin: 0;
            height: fit-content;
            align-self: center;
            color: lighten($font, 20);
          }

          .member-btn {
            display: inherit;
            background-color: $primary;
            padding: 0.25rem 2rem 0.25rem 1rem;
            border-radius: 400px;
            box-shadow: 0 0 7px lighten($primary, 20);
            cursor: pointer;
            p {
              color: $main;
            }
            .icon {
              display: inherit;
              align-self: center;
              height: fit-content;
              svg {
                align-self: center;
                transform: scale(0.6);
                fill: $main;
              }
            }
          }
        }

        .members-list {
          padding: 1rem 0;
          max-height: 17rem;
          overflow-x: hidden;
          overflow-y: auto;
          border-top: 1px solid lighten($font, 65);
          border-bottom: 1px solid lighten($font, 65);

          @include scroll-bar;
        }
      }

      .action-btn {
        display: flex;
        justify-content: flex-end;
        padding: 0.4rem 0;
        button {
          padding: 0.4rem 1rem;
          margin: 0.4rem;
          min-width: 8rem;
        }

        .save {
          background-color: $success;
          color: white;
        }
        .cancel {
          background-color: $secondary;
        }
      }
    }
  }
}

/* Portrait phones and smaller */
@media (max-width: 700px) {
  .my-info {
    .info-container {
      .my-info {
        min-width: 90%;
        max-width: 100%;
        .members {
          align-self: start;
          max-width: 100%;
        }
      }
    }
  }
}
</style>