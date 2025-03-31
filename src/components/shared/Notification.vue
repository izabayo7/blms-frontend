<template>
  <div id="notification" :class="`_${status} align-center ${visible? 'd-flex' : 'd-none'}`">
    <div class="notification d-flex">
      <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M7.6534 18.6552C8.70574 18.6552 9.56675 17.7942 9.56675 16.7418H5.74005C5.74005 17.7942 6.60106 18.6552 7.6534 18.6552ZM13.3934 12.9151V8.13174C13.3934 5.19475 11.8341 2.73609 9.08841 2.08555V1.43501C9.08841 0.640972 8.44744 0 7.6534 0C6.85936 0 6.21839 0.640972 6.21839 1.43501V2.08555C3.4823 2.73609 1.91335 5.18518 1.91335 8.13174V12.9151L0 14.8285V15.7851H15.3068V14.8285L13.3934 12.9151ZM11.4801 13.8718H3.8267V8.13174C3.8267 5.75918 5.27128 3.8267 7.6534 3.8267C10.0355 3.8267 11.4801 5.75918 11.4801 8.13174V13.8718Z"
            fill="white"/>
      </svg>
    </div>
    <div v-if="show" class="message">{{ message }}</div>
  </div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  name: "Notification",
  computed: {
    ...mapGetters("app_notification", ["show", "message", "status"]),
    visible() {
      return this.show;
    },
  },
  watch:{
    show(){
      let message = this.$store.getters['app_notification/message']
      console.log(message)
    }
  }
  // enum: ["success", "info", "danger", "warn"],
};
</script>
<style lang="scss" scoped>
#notification {
  width: 355px;
  min-height: 40.62px;
  height: fit-content;
  padding: 11px 21px;
  position: absolute;
  z-index: 9;
  border-radius: 4.06375px;
  right: 17px;
  margin-top: 17px;

  &._info {
    background: #193074;
  }

  &._success {
    background: #3CE970;
  }

  &._danger {
    background: #FF0808;
  }

  &._warn {
    background: #FFD248;
  }

  .message {
    background: none;
    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 12.5px;
    line-height: 14px;
    padding-top: 0;
    padding-bottom: 0;
    color: #FFFFFF;
  }
}

/* Portrait phones and smaller */
@media (max-width: 700px) {
  #notification {
    width: 100%;
    border-radius: 0;
    padding-left: 59px;
    right: 0;
    margin-top: 0;
  }
}
</style>