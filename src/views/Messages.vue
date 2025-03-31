<template>
<section class="my-messages">
    <h2>Chat</h2>
  <div class="row messages-section">
    <div class="side incoming col-3">
    <div class="message-search"> <search bg="#ffffff" placeholder="search message" :width="100" :fontSize="12" /> </div>
    <div class="incoming-messages" v-if="incomingMessages.length > 0">
      <incoming-chat v-for="(message,i) in incomingMessages" :read="message.unreadMessagesLength <= 0" :key="i" :username="message.id" :incoming-msgs="message.unreadMessagesLength" :typing="message.typing">
<!--        profile picture of the sender-->
        <template #pic><img src="@/assets/images/instructor.png" alt="profile picture"></template>
<!--        name of the sender-->
        <template #sender>{{ message.name }}</template>
<!--        massage sent by sender-->
        <template #massage> {{ message.last_message.content}}</template>
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
import {mapMutations,mapGetters,mapState} from 'vuex'
import {on} from '@/services/event_bus'

export default {
  name: "Messages",
  components:{
    search,
    incomingChat
  },
  data(){
    return{
      user:null,
    }
  },
  computed: {
      ...mapGetters('chat',['socket',]),
      ...mapState('chat',['username','incomingMessages'])

  },
  methods:{
      ...mapMutations('chat',['SET_USERNAME','SET_DISPLAYED_USER']),

    goToMessages(){
      if(this.$route.params.username)
        return
      console.log('mwa')
      this.SET_DISPLAYED_USER({ contactId: this.incomingMessages[0].id})
      this.$router.push(`/messages/${this.incomingMessages[0].id}`)

    }
  },
  mounted(){
    on('incoming_message_initially_loaded',()=>{
      this.goToMessages()
    })
    this.$store.dispatch('chat/loadIncomingMessages')

    // this.SET_USERNAME(this.$route.params.username).then(()=> this.goToMessages())
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
