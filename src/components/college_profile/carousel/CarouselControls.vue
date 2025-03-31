<template>
  <div>
    <button class="carousel-control left" @click="$emit('prev')">
      <svg
        width="43"
        height="70"
        viewBox="0 0 43 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M42 1L1 36.8889L42 69" stroke="#C7C7C7" />
      </svg>
    </button>
    <button class="carousel-control right" @click="$emit('next')">
      <svg
        width="43"
        height="70"
        viewBox="0 0 43 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1 69L42 33.1111L0.999994 1.00001" stroke="#C7C7C7" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  emits: ["prev", "next"], // vue v3
};
</script>
<style scoped>
.carousel-control {
  /* background-color: rgba(0, 0, 0, 0.5); */
  border: none;
  display: inline-block;
  position: absolute;
  /* height: 50px;
  width: 70px; */
  top: calc(50% - 25px);
  color: #f3f3f3;
  cursor: pointer;
}
.left {
  left: 0;
}
.right {
  right: 0;
}
</style>
