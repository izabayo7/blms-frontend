<template>
<section class="my-messages">
    <h2>Chat</h2>
  <div class="row messages-section" id="messages-section">
    <div class="side incoming col-3">
    <div class="message-search"> <search bg="#ffffff" placeholder="search message" :width="100" :fontSize="12" /> </div>
    <div class="incoming-messages" v-if="incomingMessages.length > 0">
      <incoming-chat v-for="(message,i) in incomingMessages"  :key="i" :data="message" :typing="false" />
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

      this.SET_DISPLAYED_USER(this.incomingMessages[0])
      this.$router.push(`/messages/${this.incomingMessages[0].id}`)

    },
    storeCurrentDisplayedUser(){

        //listen when the user contacts/incoming messages are loaded
        on('incoming_message_initially_loaded',()=>{
          this.incomingMessages.map(d => {
            if(this.$route.params.username === d.id){
              this.SET_DISPLAYED_USER(d)
              console.log(d)
            }
          })
        })

      //when there is no event atleast try this
        this.incomingMessages.map(d => {
          if(this.$route.params.username === d.id){
            this.SET_DISPLAYED_USER(d)
            console.log(d)
          }
        })
    }
  },
  mounted(){
    this.storeCurrentDisplayedUser()
    //listen if recent chat contact was loaded
    on('incoming_message_initially_loaded',()=>{
      this.goToMessages()
    })
    this.$store.dispatch('chat/loadIncomingMessages')

    // this.SET_USERNAME(this.$route.params.username).then(()=> this.goToMessages())
  }
}
</script>

<style  lang="scss" scoped>
#messages-section{
  height: 90%;
}
.my-messages{
  background-color: $secondary;
  height: 100%;

  h2{
    padding-left: 1rem;
    padding-top: 1rem;
    color:$primary;
  }
  .messages-section{
    //height: 100%;
    .incoming{
        height: 90%;

      .message-search{
        padding:1rem 0;
        width: 100%;
        margin: auto;
      }



  }
    .chat{
      //height: 100%;
    }
  }
}
</style>
