<template>
  <div class="my-error-tooltip">
    <div class="error-tooltip-container">
      <p>you messed with error</p>
    </div>
  </div>
</template>

<script>
export default {
name: "ErrorTooltip"
}
</script>

<style lang="scss" scoped>
.my-error-tooltip{
  position: absolute;
  bottom:10px;
  right: 10px;
  .error-tooltip-container{
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

</style>