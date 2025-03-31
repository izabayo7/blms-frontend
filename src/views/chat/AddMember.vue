<template>
<div class="my-add-member">
  <div class="add-member-container">
    <div class="add-member-center">
      <div class="row group-members">
        <label for="group_members_input">Add members</label>
        <input @input="getUsers" v-model="currentMember" type="text"
               id="group_members_input">
        <transition name="member">
          <div class="found-members" v-if="foundUsers.length > 0 || userLoading">
            <svg v-if="userLoading" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 3a9 9 0 0 1 9 9h-2a7 7 0 0 0-7-7V3z"/></svg>
            <div class="no-user" v-if="NotFoundText.length>0">{{ NotFoundText }}</div>
            <transition-group name="members">
              <div class="member" v-for="(user) in foundUsers" @click="addMember(user)" :key="user.email">
                <member :disabled="disabled(user.email)"  :user="user"  />
              </div>
            </transition-group>
          </div>
        </transition>
        <div class="added-members-list" v-if="group.members.length > 0">
          <transition-group name="chips">
            <chip v-for="(member,i) in group.members" @closed="closed(i)" :key="member.email">
              {{ member.sur_name + ' ' + member.other_names }}
            </chip>
          </transition-group>
      </div>
      <div class="row action-buttons">
        <button class="create-group-button">Add</button>
        <button class="cancel-group-creation" @click="$router.go(-1)">Cancel</button>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import Chip from "@/components/reusable/ui/Chip";
import Member from "@/components/messages/Member";
import {mapActions} from "vuex";
import apis from "@/services/apis";
export default {
  name: "AddMember",
  components: {Member, Chip},
  data(){
    return {
      currentMember:'',
      foundUsers:[],
      userLoading:false,
      NotFoundText:'',
      group: {
        members: [],
      }

    }
  },
  methods:{
    ...mapActions('users',['searchNewGroupMembers']),
    closed(i) {
      this.group.members.splice(i, 1)
    },
    disabled(email){
      return this.group.members.some(member => member.email === email)
    },
    getUsers(){
      this.userLoading = true
      this.NotFoundText = ''
      const EmptyStringRegex = /^\s+$/g //regext to detect empty string

      if(EmptyStringRegex.test(this.currentMember) || this.currentMember.length <= 0){
        this.foundUsers = []
        this.userLoading = false
        return
      }

      apis.get(`chat_group/${this.$route.params.id}/search_members?data=${this.currentMember}`).then(result => {
        console.log('before ', result)
        result = result.data.data.results
        console.log('after ', result)
        this.userLoading = false;
        this.foundUsers= result;

        //tell user that we didnt find the user with such id
        this.NotFoundText = (result.length > 0) ? '' : "No user found"
      })
    },
    addMember(user) {
      const membersNotAvailable = this.foundUsers.length <= 0
      const disabled = this.disabled(user.email)

      if(membersNotAvailable || this.currentMember.length <= 0 || disabled)
        return

      this.group.members.unshift(user)
    },
    createAddMember(){
      apis.create()
    }

  }
}
</script>

<style lang="scss" scoped>
.my-add-member{
  height: 100%;
  .add-member-container{
    background-color: $main;
    height:100%;
    display: flex;
    justify-content: center;

    .add-member-center{
      width: 25rem;
      align-self: center;
      max-width: 40rem;
      .row {
        display: flex;
        margin: 1rem 0;


        label {
          display: block;
          margin: .5rem 0;
        }

        input {
          display: block;
          padding: .2rem;
          max-width: 25rem;
          color: darken($font, 30);
          border: 2px solid lighten($font, 45);
          background-color: lighten($secondary, 5);
          padding-left: 1rem;
        }
      }
      .action-buttons {
        display: flex;
        justify-content: flex-end;
        button {
          padding: .5rem 1rem;
          margin: .4rem;

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

      .group-members, .group-name {
        flex-direction: column;

      }

      .group-members {
        .added-members-list {
          max-width: 25rem;
          border-bottom: .5px solid lighten($secondary, 5);
          border-top: .5px solid lighten($secondary, 5);
          margin: 1rem 0;
          max-height: 15rem;
          overflow-x: hidden;
          overflow-y: auto;

          @include scroll-bar;

        }
      }
    }
  }
}
</style>