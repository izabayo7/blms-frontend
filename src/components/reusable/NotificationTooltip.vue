<template>
  <div class="my-notification-tooltip">
    <div class="notification-tooltip-container">
      <div class="notification">
        <p>you messed with error</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "NotificationTooltip"
}
</script>

<style lang="scss" scoped>
.my-notification-tooltip{
  position: absolute;
  bottom:10px;
  right: 10px;
  .notification-tooltip-container{
    .notification{
      width: 100%;
      height: 100%;
      background-color: $danger;
      color:$main;
      padding:.3rem 1rem;
      display: flex;
      justify-content:center;
      //border-radius: 10px;
      border-left: 5px solid darken($danger,10);
      p{
        align-self: center;
        color:inherit;
        margin:0;
        font-size: .8rem;
        font-family: Poppins;
      }
    }
  }

}

</style>