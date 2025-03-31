<template>
<div class="my-no-conversation">
  <div class="no-conversation-container">
    <div class="no-conversation">
      <p>There are no message in your inbox, Try to write for someone</p>
        <div class="buttons">
          <div><button class="convo">Start conversation</button></div>
          <div><button class="group">Create new group</button></div>
        </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
name: "NoConversation"
}
</script>

<style lang="scss" scoped>
.my-no-conversation{

  .no-conversation-container{
    min-height: calc(100vh - 5rem);
    display: flex;
    justify-content: center;


    .no-conversation{
      align-self:center;
      display: inline-flex;
      flex-direction: column;
      padding:1rem;

      p{
        font-size: .9rem;
      }
      .buttons{
        display: flex;
        flex-direction: column;
        font-size: .9rem;
        justify-content: center;
        width: 100%;

        div{
          max-width: 17rem;
          align-self: center;
          width: 15rem;
        }
        button{
          width:100%;
          border-radius: 50px;
          margin:.4rem;
          &.convo{
            background-color: $primary;
            padding:.5rem 1rem;
            color:$main;
          }
          &.group{
            color:$primary;
            padding:.4rem 1rem;
            border:2px solid $primary;
          }
        }
      }
    }
  }
}
</style>