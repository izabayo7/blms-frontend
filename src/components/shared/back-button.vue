<template>
  <v-btn :to="to" rounded color="#fff">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10.094"
      height="17.189"
      viewBox="0 0 10.094 17.189"
    >
      <path
        id="Icon_feather-chevron-left"
        data-name="Icon feather-chevron-left"
        d="M19.973,21.946,13.5,15.473,19.973,9"
        transform="translate(-12 -6.879)"
        fill="none"
        stroke="#717171"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="3"
      />
    </svg>
    <span>Back</span>
  </v-btn>
</template>
<script>
export default {
  props: {
    to: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.v-btn {
  height: 30px !important;
  padding: 12px;
  font-size: 11px;
  span {
    margin: 0 12px;
  }
}
</style>