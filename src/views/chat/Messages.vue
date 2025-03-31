<template>
<section class="my-messages">
  <div class="row messages-section" id="messages-section">
    <div class="side incoming col-3">
     <div class="header">
       <h2>Chat</h2>
       <div class="icons">
         <div class="add-chat icon px-1" @click="toggleGroup">
           <svg xmlns="http://www.w3.org/2000/svg" width="36" height="19.5" viewBox="0 0 36 19.5">
             <path id="Icon_material-group-add" data-name="Icon material-group-add" d="M12,15H7.5V10.5h-3V15H0v3H4.5v4.5h3V18H12Zm15,1.5a4.5,4.5,0,1,0-1.365-8.79A7.4,7.4,0,0,1,26.985,12a7.547,7.547,0,0,1-1.35,4.29A4.485,4.485,0,0,0,27,16.5Zm-7.5,0A4.5,4.5,0,1,0,15,12,4.481,4.481,0,0,0,19.5,16.5Zm9.93,3.24A5.55,5.55,0,0,1,31.5,24v3H36V24C36,21.69,32.445,20.265,29.43,19.74ZM19.5,19.5c-3,0-9,1.5-9,4.5v3h18V24C28.5,21,22.5,19.5,19.5,19.5Z" transform="translate(0 -7.5)"/>
           </svg>
         </div>
         <div class="new-chat icon px-2">
           <svg id="chat-new-line" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
             <path id="Path_2156" data-name="Path 2156" d="M0,0H24V24H0Z" fill="none"/>
             <path id="Path_2157" data-name="Path 2157" d="M14,3V5H4V18.385L5.763,17H20V10h2v8a1,1,0,0,1-1,1H6.455L2,22.5V4A1,1,0,0,1,3,3Zm5,0V0h2V3h3V5H21V8H19V5H16V3Z"/>
           </svg>
         </div>
       </div>
     </div>
    <div class="message-search"> <search bg="#ffffff" placeholder="search message" :width="100" :fontSize="12" /> </div>
    <div class="incoming-messages" v-if="incomingMessages.length > 0">
      <transition-group name="incoming-contacts" tag="div">
        <incoming-chat v-for="(message,i) in incomingMessages"  :key="i" :data="message" />
      </transition-group>
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
      ...mapMutations('sidebar_navbar',{toggleGroup:'TOGGLE_GROUP_MODEL_VISIBILITY'}),

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
            }
          })
        })

      //when there is no event atleast try this
        this.incomingMessages.map(d => {
          if(this.$route.params.username === d.id){
            this.SET_DISPLAYED_USER(d)
            // console.log(d)
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
  background-color: #f8f8f8;
  height: 100%;
  .side{
    .header{
      display: flex;
      justify-content: space-between;
      align-content: center;

      .icons{
        display:flex;
        align-content: center;

        .icon{
          width: fit-content;
          height: fit-content;
          align-self: center;
          cursor: pointer;

          &:hover{
            svg{
              fill:$font;
            }
          }
          svg{
            transform:scale(.8);
          }
        }

      }

      h2{
        color:$primary;

      }
    }
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

      .incoming-messages{
        max-height: 100%;
        overflow-x: hidden;
        overflow-y: auto;

        @include scroll-bar;

        .incoming-contacts-move {
          transition: transform 1s;
          padding:20rem;
        }
      }

  }
    .chat{
      //height: 100%;
    }
  }
}


</style>
