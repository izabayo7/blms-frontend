<template>
<section class="my-messages">
    <h2>Chat</h2>
  <div class="row messages-section">
    <div class="side incoming col-3">
    <div class="message-search"> <search bg="#ffffff" placeholder="search message" :width="100" :fontSize="12" /> </div>
    <div class="incoming-messages" v-if="incomingMessages.length > 0">
      <incoming-chat v-for="(message,i) in incomingMessages" :read="message.unreadMessagesLength <= 0" :key="i" :data="message" :typing="message.typing" />
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

    //here we check if the current route has a selected chat if not we directly
    // select the latest contact in chat and we make it active
    goToMessages(){
      if(this.$route.params.username)
        return
      this.SET_DISPLAYED_USER({ contactId: this.incomingMessages[0].id})
      this.$router.push(`/messages/${this.incomingMessages[0].id}`)

    }
  },
  mounted(){

    //listen if recent chat contact was loaded
    on('incoming_message_initially_loaded',()=>{
      this.goToMessages()
      console.log(this.incomingMessages)
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
