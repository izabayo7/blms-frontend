<template>
  <section class="my-chat" ref="my-chat" >
    <div ref="chat-header" class="chat-header">
      <chat-header>
        <!--        profile picture of the current chatter-->
        <template #pic><img src="@/assets/images/instructor.png" alt="sender profile picture"></template>
        <!--        name of the current chatter-->
        <template #name>Ntwari Clarance</template>
      </chat-header>
    </div>
    <div ref="messages-list" class="messages-list" >
      <chat-messaging :data="currentChatMessages"/>
    </div>
    <div ref="send-message" class="send-message">
      <send-message></send-message>
    </div>
  </section>
</template>

<script>
import ChatHeader from '@/components/messages/Chat-header'
import SendMessage from '@/components/messages/Send-message'
import ChatMessaging from '@/components/messages/Chat-messaging'
import {mapGetters, mapState} from 'vuex'
import {emit,on} from '@/services/event_bus'

export default {
  name: "Chat",
  components: {
    ChatHeader,
    SendMessage,
    ChatMessaging
  },
  data(){
    return {
    }
  },
  computed:{
    ...mapState('chat',['currentDisplayedUser','currentChatMessages','username']),
    ...mapGetters('chat',['socket'])
  },
  methods:{

  },
  created() {
    if(this.currentChatMessages.length <=0){
      this.$store.dispatch('chat/loadMessages')
    }
  },
  mounted() {
    //store the current user username/id
    this.$store.commit('chat/SET_USERNAME',this.$route.params.username)
    emit('chat_user_changed',this.$route.params.username) // make new massages loaded

    //listen if user to be display on chat was chenged
    on('chat_user_changed',username => {
      console.log('1')
      if(username !== this.$route.params.username || this.currentChatMessages.length <= 0 ){
        this.$store.dispatch('chat/loadMessages',this.username); //load msgs
        this.$store.commit('chat/SET_USERNAME',this.$route.params.username) // set username in store
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.my-chat {
  background-color: $main;
  margin-top: 1rem;
  //remove 1rem from the height since we have applied margin of 1rem
  height: calc(100% - 1rem);
  display: flex;
  flex-direction: column;


  .chat-header {
    width: 100%;
  }

  .messages-list {
    width: 100%;
    height: 25rem;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-track:hover {
      background-color: lighten($secondary,4);
    }

    &::-webkit-scrollbar-thumb {
      background-color: lighten($font,40);
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb:hover {
      background-color: lighten($font,30);
    }
  }

  .sender-message {
    width: 100%;
    //align-self: flex-end;
    //justify-self: flex-end;
  }

}
</style>
