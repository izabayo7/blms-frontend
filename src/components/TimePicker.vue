<template>
  <div ref="timepicker">
    <!-- time picker -->
    <!-- <transition
      enter-active-class="animate__animated animate__fadeIn animate__faster"
    > -->
    <v-time-picker
      v-model="value"
      :format="format"
      :scrollable="scrollable"
      :min="min"
      :no-title="noTitle"
      :use-seconds="useSeconds"
      :max="max"
    ></v-time-picker>
    <!-- </transition> -->
  </div>
</template>
<script>
export default {
  name: "TimePicker",
  props: {
    defaultValue: String,
    format: String,
    scrollable: Boolean,
    min: String,
    noTitle: Boolean,
    useSeconds: Boolean,
    max: String,
  },
  data: () => ({
    value: "",
  }),
  watch: {
    value() {
      this.$emit("update", this.value);
    },
  },
  mounted() {
    this.value = this.defaultValue;
  },
};
</script>