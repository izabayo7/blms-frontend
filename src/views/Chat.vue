<template>
  <section class="my-chat" ref="my-chat" >
    <div ref="chat-header" class="chat-header">
      <chat-header>
        <!--        profile picture of the current chatter-->
        <template #pic><img src="@/assets/images/instructor.png" alt="sender profile picture"></template>
        <!--        name of the current chatter-->
        <template #name>{{currentDisplayedUser.name}}</template>
      </chat-header>
    </div>
    <div ref="messages-list" class="messages-list" >
      <div class="messages-container" id="chat-holder">
        <chat-messaging :data="currentChatMessages" id="scrollable-chat"/>
      </div>
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
import {mapGetters, mapState, mapActions} from 'vuex'
import {on} from "@/services/event_bus";

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
    ...mapGetters('chat',['socket']),
  },
  methods:{
    ...mapActions('chat',['setUsername','loadMessages']),
    scrollChatToBottom(){
      let el = document.getElementById('scrollable-chat')
      console.log(el.scrollTop,el.scrollHeight)
      el.scrollTop =el.scrollHeight
      console.log(el.scrollTop,el.scrollHeight)

    }
  },
  created() {
    console.log('created')
    //if there  are no current loaded messages, loads them
    if(this.currentChatMessages.length <=0){
      this.$store.dispatch('chat/loadMessages')
    }
  },
  mounted() {
    on('conversation_loaded',()=>{
      // this.scrollChatToBottom()
      // console.log('loaded')
    })
  },
  beforeMount() {
    //load user since the route have changed
    this.setUsername(this.$route.params.username).then(username => {
      this.loadMessages(username)
    })
  },
  beforeRouteUpdate(to,from,next){
    //since username has changed let us also load new chat
    this.setUsername(to.params.username)

    next()
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
  flex-wrap: wrap;


  .chat-header {
    width: 100%;
    align-self: flex-start;
    justify-self: flex-start;
  }

  .messages-list {
    width: 100%;
    position: relative;
    overflow-y: scroll;
    overscroll-behavior-y: contain;
    flex-grow: 1;

    .messages-container{
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;

      width: 100%;
    }

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

  .send-message {
    width: 100%;
    align-self: flex-end;
    justify-self: flex-end;
  }

}
</style>
