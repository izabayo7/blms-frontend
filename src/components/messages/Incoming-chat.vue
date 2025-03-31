<template>
<main class="incoming-chat" @click="handleClick">
<!--    slot for profile picture-->
      <div class="pic col-3"><slot name="pic"></slot></div>
      <div class="content col-9">
        <div class="sender">
<!--          slot for sender name-->
          <p :class="{'unread':!read}"> <slot name="sender"></slot></p> <div v-if="formatedIncomingMsgs > 0" ><span >{{formatedIncomingMsgs}}</span></div>
        </div>
<!--        slot for the sent massage-->
        <div class="sender-message">
          <slot :class="{'unread-msg':!read}" name="massage" v-if="!typing"></slot>
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
      incomingMsgs:{type:Number,default:0}, // number of incoming massages, it
      typing:{type:Boolean,default:false},
      read:{type:Boolean,default:false},
      username:{type:String, required:true}
  },
  computed:{
      formatedIncomingMsgs(){
        return this.incomingMsgs > 9 ? 9 : this.incomingMsgs
      }
  },
  methods:{
  handleClick(){
    this.$store.commit('chat/SET_DISPLAYED_USER',{contactId:this.username})
    emit('chat_user_changed',this.username) //alert that user was changed so we need to fetch some new messages
    this.$router.push(`/messages/${this.username}`)
  }
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
