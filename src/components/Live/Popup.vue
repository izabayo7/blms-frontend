<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div :class="`modal customScroll`">
        <div class="col-12 title mx-auto" @click="close()">
          {{ title }}
        </div>
        <slot name="content"/>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  props: {
    title: {
      type: String
    },
    liveClassDetails: Object
  },
};
</script>

<style lang="scss">
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.39);
  //filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal {
  max-width: 869px;
  width: 100%;
  height: 438px;
  left: 248px;
  top: 210px;

  background: #FFFFFF;
  border-radius: 13px;

  .title {
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 30px;
    line-height: 36px;
    text-align: center;
    width: 503px;
    height: 72px;
    color: #193074;
    margin-top: 48px;
  }

  .subtitle {
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    margin-bottom: 20px;
    color: #000000;
  }

  .detail {
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 18px;

    color: #828282;

    span {
      font-weight: 500;
      color: #000000;
      margin-left: 10px;
    }
    margin-bottom: 15px;
  }

  .d-md-flex {
    .detail {
      color: #828282;
      span{
        margin-left: 4px;
      }
    }
  }

  .mx-auto {
    width: fit-content;
  }

  button {
    background: none;
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    text-align: center;

    color: #3C3C3C;
    &.action{
      font-family: Inter;
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      line-height: 18px;

      color: #3C3C3C;
      padding: 19px 47px;
      border-radius: 4.75155px;
    }
    &.primary{
      background: #193074 !important;
      color: white;
    }
  }

}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

/* Portrait phones and smaller */
@media (max-width: 1000px) {
  #schedule_live_class {
    padding: 0px;
    .detail span{
      display: block;
      margin-left: 0;
    }
  }
  .modal{
    height: fit-content;
    .action{
      margin-bottom: 32.5px;
    }
  }
}
</style>
