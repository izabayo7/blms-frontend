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
      <chat-messaging :data="messages"/>
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
    messages:[]
    }
  },
  computed:{
    ...mapState('chat',['currentDisplayedUser']),
    ...mapGetters('chat',['socket'])
  },
  methods:{
    // set the messages container's height according to the screen height
    setMessagesContainerHeight(){
      let chatHolder = this.$refs['my-chat']
      // let chatHeader = this.$refs['chat-header'];
      // let msgsList = this.$refs['messages-list'];
      // let sendMsg = this.$refs['send-message'];

      const height = getComputedStyle(chatHolder)
      console.log(height.height)
    },

    //load user messages
    loadMessages(){


      // get messages new style
      this.socket.emit('request_conversation',{ contactId: this.currentDisplayedUser.contactId});

      // Get messages new style
      this.socket.on('recieve_conversation', ({conversation,}) => {
        console.log(conversation)
        this.$store.commit('chat/STORE_LOADED_DATA',{username:this.currentDisplayedUser.contactId,messages:conversation})
        this.messages = conversation
      })
    },

  },
  created() {
    console.log('wee')
    //let also announce the event since we are reloading the page
    emit('chat_user_changed',this.$route.params.username)
  },
  mounted() {
    //listen if user to be display on chat was chenged
    on('chat_user_changed',username => {
      console.log('mwaa')
      if(username !== this.$route.params.username || this.messages.length <= 0 ){
        console.log('inner')
        this.loadMessages();
        this.$store.commit('chat/SET_USERNAME',this.$route.params.username)
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
