<template>
  <div class="loader">
    <div v-if="loader == 1" class="lds-grid">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div v-else-if="loader == 2" class="lds-default">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loader",
  props: {
    loader: {
      type: String,
      default: "2",
    },
  },
};
</script>

<style lang="scss">
.lds-grid {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-grid div {
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: $primary;
  animation: lds-grid 1.2s linear infinite;
}
.lds-grid div:nth-child(1) {
  top: 8px;
  left: 8px;
  animation-delay: 0s;
}
.lds-grid div:nth-child(2) {
  top: 8px;
  left: 32px;
  animation-delay: -0.4s;
}
.lds-grid div:nth-child(3) {
  top: 8px;
  left: 56px;
  animation-delay: -0.8s;
}
.lds-grid div:nth-child(4) {
  top: 32px;
  left: 8px;
  animation-delay: -0.4s;
}
.lds-grid div:nth-child(5) {
  top: 32px;
  left: 32px;
  animation-delay: -0.8s;
}
.lds-grid div:nth-child(6) {
  top: 32px;
  left: 56px;
  animation-delay: -1.2s;
}
.lds-grid div:nth-child(7) {
  top: 56px;
  left: 8px;
  animation-delay: -0.8s;
}
.lds-grid div:nth-child(8) {
  top: 56px;
  left: 32px;
  animation-delay: -1.2s;
}
.lds-grid div:nth-child(9) {
  top: 56px;
  left: 56px;
  animation-delay: -1.6s;
}
@keyframes lds-grid {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.lds-default {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-default div {
  position: absolute;
  width: 6px;
  height: 6px;
  background: $primary;
  border-radius: 50%;
  animation: lds-default 1.2s linear infinite;
}
.lds-default div:nth-child(1) {
  animation-delay: 0s;
  top: 37px;
  left: 66px;
}
.lds-default div:nth-child(2) {
  animation-delay: -0.1s;
  top: 22px;
  left: 62px;
}
.lds-default div:nth-child(3) {
  animation-delay: -0.2s;
  top: 11px;
  left: 52px;
}
.lds-default div:nth-child(4) {
  animation-delay: -0.3s;
  top: 7px;
  left: 37px;
}
.lds-default div:nth-child(5) {
  animation-delay: -0.4s;
  top: 11px;
  left: 22px;
}
.lds-default div:nth-child(6) {
  animation-delay: -0.5s;
  top: 22px;
  left: 11px;
}
.lds-default div:nth-child(7) {
  animation-delay: -0.6s;
  top: 37px;
  left: 7px;
}
.lds-default div:nth-child(8) {
  animation-delay: -0.7s;
  top: 52px;
  left: 11px;
}
.lds-default div:nth-child(9) {
  animation-delay: -0.8s;
  top: 62px;
  left: 22px;
}
.lds-default div:nth-child(10) {
  animation-delay: -0.9s;
  top: 66px;
  left: 37px;
}
.lds-default div:nth-child(11) {
  animation-delay: -1s;
  top: 62px;
  left: 52px;
}
.lds-default div:nth-child(12) {
  animation-delay: -1.1s;
  top: 52px;
  left: 62px;
}
@keyframes lds-default {
  0%,
  20%,
  80%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
}
</style>