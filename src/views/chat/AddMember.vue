<template>
<div class="my-add-member">
  <div class="add-member-container">
    <div class="add-member-center">
      <div class="row group-members">
        <label for="group_members_input">Add members</label>
        <input @keyup.enter.prevent.stop="addMember" v-model="currentMember" type="text"
               id="group_members_input">
        <div class="added-members-list" v-if="group.members.length > 0">
          <chip-ui v-for="(member,i) in group.members" @closed="closed(i)" :key="i">
            {{ member }}
          </chip-ui>
        </div>
      </div>
      <div class="row action-buttons">
        <button class="create-group-button">Add</button>
        <button class="cancel-group-creation" @click="$router.go(-1)">Cancel</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import ChipUi from "@/components/reusable/ui/Chip";
export default {
  name: "AddMember",
  components: {ChipUi},
  data(){
    return {
      currentMember:'',
      group: {
        name: '',
        public: true,
        members: [],
      }
    }
  },
  methods:{
    closed(i) {
      this.group.members.splice(i, 1)
    },
    addMember() {
      if(this.currentMember.length <=0)
        return
      this.group.members.unshift(this.currentMember)
      this.currentMember = ''
    },
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