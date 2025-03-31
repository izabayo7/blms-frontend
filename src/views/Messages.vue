<template>
<section class="my-messages">
    <h2>Chat</h2>
  <div class="row messages-section">
    <div class="side incoming col-3">
    <div class="message-search"> <search bg="#ffffff" placeholder="search message" :width="100" :fontSize="12" /> </div>
    <div class="incoming-messages">
      <incoming-chat v-for="(message,i) in incomingMessages" :read="message.read" :key="i" :username="message.username" :incoming-msgs="message.numberOfUnreadMessages" :typing="message.typing">
<!--        profile picture of the sender-->
        <template #pic><img src="@/assets/images/instructor.png" alt="profile picture"></template>
<!--        name of the sender-->
        <template #sender>{{ message.sender }}</template>
<!--        massage sent by sender-->
        <template #massage> {{ message.latestMessage}}</template>
      </incoming-chat>
    </div>
  </div>
  <div class="side chat col-9" >
    <router-view></router-view>
  </div>
  </div>
</section>
</template>

<script>
import search from '@/components/reusable/Search'
import incomingChat from '@/components/messages/Incoming-chat'


export default {
  name: "Messages",
  components:{
    search,
    incomingChat
  },
  data(){
    return{
      incomingMessages:[
        {img:"",username:"liberi",sender:"Ntwari Liberi",numberOfUnreadMessages:2,latestMessage:"ubwo x woe urumva twabikora kweri",typing:false, read:false},
        {img:"",username:"ntwari",sender:"Manzi Gustave",numberOfUnreadMessages:5,latestMessage:"i don't think that we have to make it that way",typing:true, read:false},
        {img:"",username:"clarance.liberi",sender:"Hirwa Cedric",numberOfUnreadMessages:0,latestMessage:"🤣🤣🤣🤣🤣🤣",typing:false, read:true},
        {img:"",username:"olivier",sender:"Umwari Clarance",numberOfUnreadMessages:0,latestMessage:"can you realize ",typing:false, read:true},
        {img:"",username:"sangwa.gustave2",sender:"Izabayo Olivier",numberOfUnreadMessages:20,latestMessage:"rek shn mureke",typing:false, read:false},
      ]
    }
  }


}
</script>

<style  lang="scss" scoped>
.my-messages{
  background-color: $secondary;

  h2{
    padding-left: 1rem;
    padding-top: 1rem;
    color:$primary;
  }
  .messages-section{

  .incoming{
    display: flex;
    flex-direction: column;

      .message-search{
        padding:1rem 0;
        width: 100%;
        margin: auto;
      }

      .incoming-messages{
        //padding-top:2rem;

      }


  }
    .chat{
      height: auto;
    }
  }
}
</style>