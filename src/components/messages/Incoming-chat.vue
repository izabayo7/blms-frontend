<template>
<main class="incoming-chat" @click="handleClick">
<!--    slot for profile picture-->
      <div class="pic col-3">
        <img src="@/assets/images/instructor.png" alt="profile picture">
      </div>
      <div class="content col-9">
        <div class="sender">
<!--          slot for sender name-->
          <p :class="{'unread':!read}"> {{data.name}}</p> <div v-if="formatedIncomingMessagesLength > 0" ><span >{{formatedIncomingMessagesLength}}</span></div>
        </div>
<!--        slot for the sent massage-->
        <div class="sender-message">
          <div :class="{'unread-msg':!read}" v-if="!typing">{{data.last_message.content}}</div>
          <span v-else>Typing...</span>
        </div>
      </div>
</main>
</template>

<script>
import {emit} from '@/services/event_bus'
export default {
  name: "Incoming-chat",
  props:{
      typing:{type:Boolean,default:false},
      data:{required:true}
  },
  computed:{
      formatedIncomingMessagesLength(){
        return this.data.unreadMessagesLength > 9 ? 9 : this.data.unreadMessagesLength
      },
    read(){
        return this.formatedIncomingMessagesLength <= 0
    }
  },
  methods:{
  handleClick(){
    this.$store.commit('chat/SET_DISPLAYED_USER',this.data)
    emit('chat_user_changed',this.data.id) //alert that user was changed so we need to fetch some new messages
    this.$router.push({path:`/messages/${this.data.id}`,params:{username:this.data.id}})
    console.log(this.data.id)

  }
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
.incoming-chat{
  background-color: $main;
  display: flex;
  flex-direction: row;
  padding: .5rem;
  margin-top: 1rem;
  cursor: pointer;
  .pic{
    align-self: center;
    justify-self: center;
    padding: .5rem;
    img{
      width: 40px;
      border-radius: 50%;
      margin: auto  ;

    }
  }

  .content{
    display: flex;
    flex-direction: column;
    padding: .5rem;

    .sender{
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      p{
        padding: 0;
        margin: 0;
        font-size: 1rem;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      div{
        display: flex;

      span{
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
    .sender-message{
      font-size: .7rem;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin-top: .4rem;
      color:lighten($font,30);

      span{
        color: inherit;
      }
    }
  }
  .unread{
    font-weight:800;
  }
  .unread-msg{
    font-weight:600;
  }
}
</style>
