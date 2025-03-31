<template>
  <main class="my-chat-messaging">
<!--    messages container-->
    <div class="msg-container" >
<!--      if there are no messages-->
      <div class="no-msgs" v-if="data.length <= 0">you have not yet started conversation with {{currentDisplayedUser.name}}.</div>

<!--      block of messages-->
      <div class="msgs-block" v-for="(msgs,i) in data" :key="i"  :class="{sending:msgGoing(msgs.from),receiving:!msgGoing(msgs.from)}">
<!--        picture of the message sender-->
        <div class="picture"><img src="@/assets/images/instructor.png" alt="sender profile picture" ></div>
<!--        list of messages sent or received-->
        <div class="msgs">
          <div class="msg" v-for="(msg,i) in msgs.messages" :key="i">{{msg.message}}</div>
        </div>

      </div>
    </div>
  </main>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "Chat-messaging",
  props:{
    data:{type:Array,required:true}
  },
  computed:{
    ...mapState('chat',['currentDisplayedUser'])
  },
  methods: {
    // is message going or comming
    msgGoing(owner) {
      return (owner && owner.toLowerCase() === 'me');
    },

  },
  beforeMount() {

  }

}
</script>

<style lang="scss" scoped>
.my-chat-messaging {
  display: block;
  overflow: auto;
  .msg-container{
    margin: 0 10px;
    overflow: auto;
    height: 100%;

    .no-msgs{
      font-size: .8rem;
      font-style: italic;
      text-align: center;
      margin-top: 4rem;
      color: lighten($font,20);
    }
    //css for the whole msg block
    .msgs-block{
      margin: 5px 0;
      display: flex;
      flex-direction: column;

      //css for the image of the sender
      .picture{
        img{
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 20px;
        }
      }
      //whole msg bar css
      .msg {
        max-width: 20rem;
        padding: .3rem .5rem;
        margin: 1.5px;
        width: fit-content;
        font-size: .8rem;
        font-weight: 400;
      }
    }

    //css for the only sending msgs
    .sending {
      .picture{
        display: none;
      }
      .msgs{
        align-self: flex-end;
        display: flex;
        flex-direction: column;
        .msg{
          align-self: flex-end;
          background-color: $primary;
          color: $main;
          border-radius: 15px 0 0 15px;

          &:last-child{
            border-bottom-right-radius: 15px;
          }

          &:first-child{
            border-top-right-radius: 15px;
          }
        }

        &:last-child{

        }
      }
    }

    //css for the only receiving msgs
    .receiving {
      display: flex;
      flex-direction: row;
      .msg{
        border-radius: 0 15px 15px 0;
        background-color: $secondary;
        padding-left: 10px;

        &:last-child{
          border-bottom-left-radius: 15px;
        }

        &:first-child{
          border-top-left-radius: 15px;
        }
      }
    }
  }
}
</style>
