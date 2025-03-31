<template>
  <main class="my-chat-messaging">
<!--    messages container-->
    <div class="msg-container" >
<!--      block of messages-->
      <div class="msgs-block" v-for="(msgs,i) in messages" :key="i"  :class="{sending:msgGoing(msgs.from),receiving:!msgGoing(msgs.from)}">
<!--        picture of the message sender-->
        <div class="picture"><img src="@/assets/images/instructor.png" alt="sender profile picture" ></div>
<!--        list of messages sent or received-->
        <div class="msgs">
          <div class="msg" v-for="(msg,i) in msgs.msgs" :key="i">{{msg.msg}}</div>
        </div>

      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "Chat-messaging",

  data() {
    return {
      messages: [
        {
          from: 'me', msgs: [
            {date: '2019-30-12 20:30:32', msg: 'okay cool and now i am going to make everything handled'},
            {date: '2019-30-12 20:30:32', msg: 'But I must explain to you '}
          ],
        },
        {
          from: 'yvan', msgs: [
            {
              date: '2019-30-12 20:30:32',
              msg: 'how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system'
            },
            {date: '2019-30-12 20:30:32', msg: ' and expound the actual teachings of the great explorer of the truth'},
            {date: '2019-30-12 20:30:32', msg: 'right? 😒😒😒'}
          ],
        },
        {
          from: 'me', msg: [
            {date: '2019-30-12 20:30:32', msg: ' the master-builder of human happiness'}
          ]
        },
        {
          from: 'yvan', msgs: [
            {date: '2019-30-12 20:30:32', msg: 'No one rejects'},
            {date: '2019-30-12 20:30:32', msg: 'dislikes, or avoids pleasure itself, because it is pleasure'},
          ]
        },
        {
          from: 'me', msgs: [
            {date: '2019-30-12 20:30:32', msg: 'okay'},
            {date: '2019-30-12 20:30:32', msg: 'cool'},
            {date: '2019-30-12 20:30:32', msg: '.'},
            {ate: '2019-30-12 20:30:32', msg: ' but because'},
          ]
        },
        {
          from: 'yvan', msgs: [
            {
              date: '2019-30-12 20:30:32',
              msg: 'those who do not know how to pursue pleasure rationally encounter consequences that are extremely'
            }
          ]
        },
        {
          from: 'me', msgs: [
            {date: '2019-30-12 20:30:32', msg: ' painful.'},
            {
              date: '2019-30-12 20:30:32',
              msg: ' Nor again is there anyone who loves or pursues or desires to obtain pain of itself'
            },
            {date: '2019-30-12 20:30:32', msg: 'because it is pain'},
          ]
        },
        {
          from: 'yvan', msgs: [
            {date: '2019-30-12 20:30:32', msg: 'but because occasionally circumstances occur'},
            {date: '2019-30-12 20:30:32', msg: ' in which toil and pain can procure him some great pleasure'},
            {date: '2019-30-12 20:30:32', msg: 'To take a trivial example'}
          ]
        },
        {
          from: 'me', msgs: [
            {date: '2019-30-12 20:30:32', msg: 'which of us ever undertakes laborious physical exercise'},
            {date: '2019-30-12 20:30:32', msg: 'noo'},
            {date: '2019-30-12 20:30:32', msg: 'i don\'t agree'},
            {date: '2019-30-12 20:30:32', msg: 'except to obtain some advantage from it'},
          ]
        },
        {
          from: 'yvan', msgs: [
            {date: '2019-30-12 20:30:32', msg: ' But who has any right to find fault with'},
            {date: '2019-30-12 20:30:32', msg: 'a man who chooses to enjoy a pleasure that has?'},
            {date: '2019-30-12 20:30:32', msg: '  no annoying consequences, '},
            {date: '2019-30-12 20:30:32', msg: 'or one who avoids a pain that produces no resultant pleasure?'},
            {date: '2019-30-12 20:30:32', msg: 'some good people like you'}
          ]
        },
        {
          from: 'me', msgs: [
            {date: '2019-30-12 20:30:32', msg: 'are lucky. 🤣🤣💖💖💖❤❤'},
            {date: '2019-30-12 20:30:32', msg: 'why?'},
            {date: '2019-30-12 20:30:32', msg: 'because they are loved'},
            {date: '2019-30-12 20:30:32', msg: 'okay cool, i aprreciate'}
          ]
        }
      ]
    }
  },
  methods: {
    // is message going or comming
    msgGoing(owner) {
      return owner === 'me';
    },

  },

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