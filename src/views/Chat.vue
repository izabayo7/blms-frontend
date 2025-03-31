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
      <chat-messaging/>
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

export default {
  name: "Chat",
  components: {
    ChatHeader,
    SendMessage,
    ChatMessaging
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
    }
  },
  mounted() {
    //set height when component is mounted
    this.setMessagesContainerHeight()
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